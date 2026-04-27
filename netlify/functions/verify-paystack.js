exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  const { reference } = JSON.parse(event.body || "{}");

  if (!reference) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing payment reference" })
    };
  }

  const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!paystackSecretKey || !supabaseUrl || !supabaseServiceRoleKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server environment variables are missing" })
    };
  }

  const verifyUrl = "https://api.paystack.co/transaction/verify/" + encodeURIComponent(reference);

  const paystackResponse = await fetch(verifyUrl, {
    headers: {
      Authorization: "Bearer " + paystackSecretKey
    }
  });

  const paystackData = await paystackResponse.json();

  if (!paystackResponse.ok || !paystackData.status || paystackData.data.status !== "success") {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Payment could not be verified", details: paystackData })
    };
  }

  const orderResponse = await fetch(supabaseUrl + "/rest/v1/orders?payment_reference=eq." + encodeURIComponent(reference), {
    method: "PATCH",
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: "Bearer " + supabaseServiceRoleKey,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify({
      payment_status: "paid_verified",
      order_status: "payment_verified_ready_for_ticket_delivery"
    })
  });

  const updatedOrder = await orderResponse.json();

  if (!orderResponse.ok) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not update order", details: updatedOrder })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ verified: true, reference, order: updatedOrder })
  };
};
