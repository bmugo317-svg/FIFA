const SUPABASE_URL = "https://gawinrzoymblvmkkcmia.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdhd2lucnpveW1ibHZta2tjbWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyNTkyMzYsImV4cCI6MjA5MjgzNTIzNn0.6KgGOqUGkrD7-1XCCmLLQoKT2maleTGf54DTwWWuViI";
const PAYSTACK_PUBLIC_KEY = "pk_test_142f30c287a55f3ba2fb3e41188d7c62ecf44b5a";

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let tickets = [];
let orders = [];
let selectedTicket = null;
let currentUser = null;
let currentProfile = null;

const ticketList = document.getElementById("ticketList");
const searchInput = document.getElementById("searchInput");
const selectedTicketBox = document.getElementById("selectedTicket");
const checkoutForm = document.getElementById("checkoutForm");
const orderMessage = document.getElementById("orderMessage");
const adminForm = document.getElementById("adminForm");
const ordersList = document.getElementById("ordersList");
const authMessage = document.getElementById("authMessage");
const currentUserBox = document.getElementById("currentUser");
const adminStatus = document.getElementById("adminStatus");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

function setMessage(element, message, isError = false) {
  element.textContent = message;
  element.style.color = isError ? "#b91c1c" : "#0f766e";
}

function loadPaystackScript() {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) return resolve();
    const script = document.createElement("script");
    script.src = "https://" + "js.paystack.co" + "/v1/inline.js";
    script.onload = resolve;
    script.onerror = () => reject(new Error("Could not load Paystack checkout."));
    document.body.appendChild(script);
  });
}

async function startPaystackPayment({ email, amount, metadata, onSuccess, onClose }) {
  if (!PAYSTACK_PUBLIC_KEY) {
    setMessage(orderMessage, "Paystack public key missing.", true);
    return;
  }

  try {
    await loadPaystackScript();
  } catch (error) {
    setMessage(orderMessage, error.message, true);
    return;
  }

  const handler = window.PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email,
    amount: Math.round(amount * 100),
    currency: "KES",
    ref: "CR-" + Date.now(),
    metadata,
    callback: response => onSuccess(response.reference),
    onClose: () => {
      if (onClose) onClose();
    }
  });

  handler.openIframe();
}

async function refreshSession() {
  const { data } = await db.auth.getUser();
  currentUser = data.user || null;

  if (!currentUser) {
    currentProfile = null;
    currentUserBox.textContent = "Not logged in.";
    adminStatus.textContent = "Login as an admin to manage listings.";
    adminForm.style.display = "none";
    renderOrders([]);
    return;
  }

  currentUserBox.textContent = `Logged in as ${currentUser.email}`;

  const { data: profile, error } = await db.from("profiles").select("*").eq("id", currentUser.id).single();

  if (error) {
    currentProfile = null;
    adminStatus.textContent = "Profile not found. Create/repair your profile in Supabase.";
    adminForm.style.display = "none";
    return;
  }

  currentProfile = profile;

  if (currentProfile.role === "admin") {
    adminStatus.textContent = "Admin access active.";
    adminForm.style.display = "block";
  } else {
    adminStatus.textContent = "Buyer account. Admin tools hidden.";
    adminForm.style.display = "none";
  }

  await loadOrders();
}

async function signUp() {
  const fullName = document.getElementById("authName").value.trim();
  const email = document.getElementById("authEmail").value.trim();
  const password = document.getElementById("authPassword").value;

  if (!email || !password) {
    setMessage(authMessage, "Enter email and password.", true);
    return;
  }

  const { error } = await db.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } }
  });

  if (error) {
    setMessage(authMessage, error.message, true);
    return;
  }

  setMessage(authMessage, "Signup successful. Check your email if confirmation is enabled.");
  await refreshSession();
}

async function login() {
  const email = document.getElementById("authEmail").value.trim();
  const password = document.getElementById("authPassword").value;

  if (!email || !password) {
    setMessage(authMessage, "Enter email and password.", true);
    return;
  }

  const { error } = await db.auth.signInWithPassword({ email, password });

  if (error) {
    setMessage(authMessage, error.message, true);
    return;
  }

  setMessage(authMessage, "Logged in successfully.");
  await refreshSession();
}

async function logout() {
  await db.auth.signOut();
  setMessage(authMessage, "Logged out.");
  await refreshSession();
}

async function loadTickets() {
  ticketList.innerHTML = "<p>Loading tickets...</p>";

  const { data, error } = await db.from("tickets").select("*").eq("status", "available").order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    ticketList.innerHTML = `<p>Could not load tickets: ${error.message}</p>`;
    return;
  }

  tickets = data || [];
  renderTickets(tickets);
}

function renderTickets(list = tickets) {
  ticketList.innerHTML = "";

  if (!list.length) {
    ticketList.innerHTML = "<p>No tickets found. Add tickets as admin or seed your Supabase table.</p>";
    return;
  }

  list.forEach(ticket => {
    const card = document.createElement("div");
    card.className = "ticket-card";
    const dateText = ticket.match_date || ticket.date || "Date TBA";
    const currency = ticket.currency || "USD";

    card.innerHTML = `
      <h3>${ticket.match}</h3>
      <p><strong>Venue:</strong> ${ticket.venue}</p>
      <p><strong>City:</strong> ${ticket.city}</p>
      <p><strong>Date:</strong> ${dateText}</p>
      <p><strong>Category:</strong> ${ticket.category}</p>
      <p><strong>Available:</strong> ${ticket.available}</p>
      <p class="price">${currency} ${ticket.price}</p>
      <button onclick="selectTicket('${ticket.id}')">Buy Ticket</button>
    `;
    ticketList.appendChild(card);
  });
}

function selectTicket(id) {
  selectedTicket = tickets.find(ticket => String(ticket.id) === String(id));
  if (!selectedTicket) return;

  selectedTicketBox.innerHTML = `
    Selected: <strong>${selectedTicket.match}</strong><br>
    ${selectedTicket.city} · ${selectedTicket.category} · ${selectedTicket.currency || "USD"} ${selectedTicket.price}
  `;
  window.location.hash = "checkout";
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = tickets.filter(ticket =>
    String(ticket.match || "").toLowerCase().includes(value) ||
    String(ticket.venue || "").toLowerCase().includes(value) ||
    String(ticket.city || "").toLowerCase().includes(value) ||
    String(ticket.category || "").toLowerCase().includes(value)
  );
  renderTickets(filtered);
});

checkoutForm.addEventListener("submit", async event => {
  event.preventDefault();

  if (!selectedTicket) {
    setMessage(orderMessage, "Please select a ticket first.", true);
    return;
  }

  await refreshSession();

  if (!currentUser) {
    setMessage(orderMessage, "Please login before ordering.", true);
    window.location.hash = "auth";
    return;
  }

  const formData = new FormData(checkoutForm);
  const quantity = Number(formData.get("quantity"));
  const paymentMethod = formData.get("payment");

  if (quantity > selectedTicket.available) {
    setMessage(orderMessage, "Not enough tickets available.", true);
    return;
  }

  const total = quantity * Number(selectedTicket.price);

  const createOrder = async ({ paymentStatus, orderStatus, paymentReference }) => {
    const { error } = await db.from("orders").insert({
      user_id: currentUser.id,
      ticket_id: selectedTicket.id,
      buyer_name: formData.get("name"),
      buyer_email: formData.get("email"),
      buyer_phone: formData.get("phone"),
      quantity,
      total,
      payment_provider: paymentMethod,
      payment_reference: paymentReference || null,
      payment_status: paymentStatus,
      order_status: orderStatus
    });

    if (error) {
      console.error(error);
      setMessage(orderMessage, error.message, true);
      return false;
    }

    checkoutForm.reset();
    selectedTicket = null;
    selectedTicketBox.textContent = "No ticket selected yet.";
    await loadOrders();
    return true;
  };

  if (paymentMethod === "paystack_card") {
    setMessage(orderMessage, "Opening Paystack checkout...");

    await startPaystackPayment({
      email: formData.get("email"),
      amount: total,
      metadata: {
        buyer_name: formData.get("name"),
        buyer_phone: formData.get("phone"),
        ticket_id: selectedTicket.id,
        ticket_match: selectedTicket.match,
        quantity
      },
      onSuccess: async reference => {
        const saved = await createOrder({
          paymentStatus: "paid_unverified",
          orderStatus: "payment_received_pending_verification",
          paymentReference: reference
        });
        if (saved) setMessage(orderMessage, `Payment received. Reference: ${reference}. Await admin verification.`);
      },
      onClose: () => setMessage(orderMessage, "Payment window closed before completion.", true)
    });
    return;
  }

  const saved = await createOrder({
    paymentStatus: "pending",
    orderStatus: "pending_payment",
    paymentReference: null
  });

  if (saved) setMessage(orderMessage, "Order submitted. Await manual payment confirmation.");
});

adminForm.addEventListener("submit", async event => {
  event.preventDefault();
  await refreshSession();

  if (!currentProfile || currentProfile.role !== "admin") {
    setMessage(adminStatus, "Access denied. Admin role required.", true);
    return;
  }

  const formData = new FormData(adminForm);
  const { error } = await db.from("tickets").insert({
    match: formData.get("match"),
    venue: formData.get("venue"),
    city: formData.get("city"),
    match_date: formData.get("date"),
    category: formData.get("category"),
    price: Number(formData.get("price")),
    currency: "USD",
    available: Number(formData.get("available")),
    status: "available"
  });

  if (error) {
    console.error(error);
    setMessage(adminStatus, error.message, true);
    return;
  }

  setMessage(adminStatus, "Ticket added successfully.");
  adminForm.reset();
  await loadTickets();
});

async function loadOrders() {
  if (!currentUser) {
    renderOrders([]);
    return;
  }

  let query = db.from("orders").select("*").order("created_at", { ascending: false });
  if (!currentProfile || currentProfile.role !== "admin") query = query.eq("user_id", currentUser.id);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    ordersList.innerHTML = `<p>Could not load orders: ${error.message}</p>`;
    return;
  }

  orders = data || [];
  renderOrders(orders);
}

function renderOrders(list = orders) {
  ordersList.innerHTML = "";

  if (!list.length) {
    ordersList.innerHTML = "<p>No orders yet.</p>";
    return;
  }

  list.forEach(order => {
    const card = document.createElement("div");
    card.className = "order-card";
    card.innerHTML = `
      <h3>${order.id}</h3>
      <p><strong>Buyer:</strong> ${order.buyer_name}</p>
      <p><strong>Email:</strong> ${order.buyer_email}</p>
      <p><strong>Phone:</strong> ${order.buyer_phone}</p>
      <p><strong>Quantity:</strong> ${order.quantity}</p>
      <p><strong>Total:</strong> ${order.total}</p>
      <p><strong>Payment Reference:</strong> ${order.payment_reference || "None"}</p>
      <p><strong>Payment:</strong> ${order.payment_status}</p>
      <p><strong>Status:</strong> ${order.order_status}</p>
    `;
    ordersList.appendChild(card);
  });
}

signupBtn.addEventListener("click", signUp);
loginBtn.addEventListener("click", login);
logoutBtn.addEventListener("click", logout);

db.auth.onAuthStateChange(async () => {
  await refreshSession();
});

(async function init() {
  await refreshSession();
  await loadTickets();
})();
