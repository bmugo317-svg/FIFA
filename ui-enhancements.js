function insertAfter(referenceNode, newNode) {
  if (referenceNode && referenceNode.parentNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
}

function addTrustBadges() {
  if (document.getElementById("trustBadges")) return;

  const stats = document.querySelector(".stats-strip");
  const section = document.createElement("section");
  section.id = "trustBadges";
  section.className = "trust-badges";
  section.innerHTML = `
    <div><span>✅</span><strong>Verified inventory</strong><small>Listings reviewed before sale</small></div>
    <div><span>🔒</span><strong>Secure checkout</strong><small>Paystack and manual payment options</small></div>
    <div><span>🎟️</span><strong>Order tracking</strong><small>Buyer records stored safely</small></div>
    <div><span>⚽</span><strong>Football-first support</strong><small>Help before ticket delivery</small></div>
  `;
  insertAfter(stats, section);
}

function addFAQ() {
  if (document.getElementById("faq")) return;

  const footer = document.querySelector("footer");
  const faq = document.createElement("section");
  faq.id = "faq";
  faq.className = "section faq-section";
  faq.innerHTML = `
    <div class="section-head">
      <p class="badge">FAQ</p>
      <h2>Before you buy</h2>
      <p>Useful answers, because apparently people prefer knowing what happens after they send money.</p>
    </div>
    <div class="faq-grid">
      <details open>
        <summary>How does payment work?</summary>
        <p>You can pay through Paystack or choose manual payment. Paystack orders are saved with a payment reference for verification.</p>
      </details>
      <details>
        <summary>When will I receive my ticket?</summary>
        <p>After payment verification, the order status changes and the ticket delivery process begins.</p>
      </details>
      <details>
        <summary>Is this official FIFA?</summary>
        <p>No. CupRadar is independent unless officially stated otherwise. Use only verified and legally transferable ticket inventory.</p>
      </details>
      <details>
        <summary>Can I get a refund?</summary>
        <p>Refunds depend on ticket transfer status, payment method, and seller terms. Add your final refund policy before public launch.</p>
      </details>
    </div>
  `;
  footer.parentNode.insertBefore(faq, footer);
}

function enhanceFooter() {
  const footer = document.querySelector("footer");
  if (!footer || document.getElementById("footerLinks")) return;

  const links = document.createElement("div");
  links.id = "footerLinks";
  links.className = "footer-links";
  links.innerHTML = `
    <a href="#faq">FAQ</a>
    <a href="#checkout">Refund Policy</a>
    <a href="#auth">Privacy</a>
    <a href="#tickets">Terms</a>
    <a href="mailto:support@cupradar.example">Contact</a>
  `;
  footer.appendChild(links);
}

function addMobileCTA() {
  if (document.getElementById("mobileCta")) return;
  const bar = document.createElement("div");
  bar.id = "mobileCta";
  bar.className = "mobile-cta";
  bar.innerHTML = `
    <a href="#tickets">Browse Tickets</a>
    <a href="#checkout">Checkout</a>
  `;
  document.body.appendChild(bar);
}

function addTotalPreview() {
  const form = document.getElementById("checkoutForm");
  const quantityInput = form ? form.querySelector('input[name="quantity"]') : null;
  const selectedTicket = document.getElementById("selectedTicket");
  if (!form || !quantityInput || !selectedTicket || document.getElementById("totalPreview")) return;

  const preview = document.createElement("div");
  preview.id = "totalPreview";
  preview.className = "total-preview";
  preview.textContent = "Select a ticket to preview total.";
  quantityInput.insertAdjacentElement("afterend", preview);

  function updatePreview() {
    const text = selectedTicket.textContent || "";
    const quantity = Number(quantityInput.value || 1);
    const match = text.match(/(?:USD|KES|\$)\s*([0-9,]+(?:\.\d+)?)/i);
    if (!match) {
      preview.textContent = "Select a ticket to preview total.";
      return;
    }
    const price = Number(match[1].replace(/,/g, ""));
    const total = price * quantity;
    preview.textContent = `${quantity} ticket${quantity === 1 ? "" : "s"} × $${price.toLocaleString()} = $${total.toLocaleString()}`;
  }

  quantityInput.addEventListener("input", updatePreview);
  const observer = new MutationObserver(updatePreview);
  observer.observe(selectedTicket, { childList: true, subtree: true, characterData: true });
  updatePreview();
}

function applySoldOutState() {
  document.querySelectorAll(".ticket-card, .match-card").forEach(card => {
    const text = card.textContent || "";
    const availableMatch = text.match(/Available:\s*(\d+)/i) || text.match(/·\s*(\d+)\s+available/i);
    const button = card.querySelector("button");
    if (!availableMatch || !button) return;

    const available = Number(availableMatch[1]);
    if (available <= 0) {
      button.disabled = true;
      button.textContent = "Sold Out";
      button.classList.add("sold-out-btn");
      card.classList.add("sold-out-card");
    }
  });
}

function populateHomepageMatchesFromTickets() {
  const grid = document.getElementById("homeMatchGrid");
  const ticketCards = Array.from(document.querySelectorAll("#ticketList .ticket-card")).slice(0, 6);
  if (!grid || !ticketCards.length) return;

  grid.innerHTML = "";
  ticketCards.forEach(card => {
    const h3 = card.querySelector("h3")?.textContent || "Match listing";
    const paragraphs = Array.from(card.querySelectorAll("p")).map(p => p.textContent);
    const price = card.querySelector(".price")?.textContent || "Price TBA";
    const matchCard = document.createElement("div");
    matchCard.className = "match-card";
    matchCard.innerHTML = `
      <span class="match-tag">Available</span>
      <h3>${h3}</h3>
      <p>${paragraphs[0] || "Venue TBA"}</p>
      <p>${paragraphs[1] || "City TBA"}</p>
      <p>${paragraphs[2] || "Date TBA"}</p>
      <p><strong>${price}</strong></p>
      <a class="mini-link" href="#tickets">View ticket</a>
    `;
    grid.appendChild(matchCard);
  });
}

function enhanceOrderBadges() {
  document.querySelectorAll(".order-card p").forEach(p => {
    if (!p.textContent.includes("Payment:") && !p.textContent.includes("Status:")) return;
    if (p.querySelector(".status-badge")) return;
    const value = p.textContent.split(":").slice(1).join(":").trim();
    if (!value) return;
    p.innerHTML = p.innerHTML.split(":")[0] + `: <span class="status-badge">${value}</span>`;
  });
}

function runEnhancements() {
  addTrustBadges();
  addFAQ();
  enhanceFooter();
  addMobileCTA();
  addTotalPreview();
  applySoldOutState();
  populateHomepageMatchesFromTickets();
  enhanceOrderBadges();
}

document.addEventListener("DOMContentLoaded", () => {
  runEnhancements();
  const observer = new MutationObserver(runEnhancements);
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
});
