const defaultTickets = [
  {
    id: 1,
    match: "Final - Winner SF1 vs Winner SF2",
    venue: "MetLife Stadium",
    city: "New York/New Jersey",
    date: "July 19, 2026",
    category: "Category 2",
    price: 450,
    available: 8
  },
  {
    id: 2,
    match: "Semi Final",
    venue: "AT&T Stadium",
    city: "Dallas",
    date: "July 14, 2026",
    category: "Category 1",
    price: 320,
    available: 12
  },
  {
    id: 3,
    match: "Group Stage",
    venue: "BMO Field",
    city: "Toronto",
    date: "June 12, 2026",
    category: "Category 3",
    price: 120,
    available: 20
  }
];

let tickets = JSON.parse(localStorage.getItem("tickets")) || defaultTickets;
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let selectedTicket = null;

const ticketList = document.getElementById("ticketList");
const searchInput = document.getElementById("searchInput");
const selectedTicketBox = document.getElementById("selectedTicket");
const checkoutForm = document.getElementById("checkoutForm");
const orderMessage = document.getElementById("orderMessage");
const adminForm = document.getElementById("adminForm");
const ordersList = document.getElementById("ordersList");

function saveTickets() {
  localStorage.setItem("tickets", JSON.stringify(tickets));
}

function saveOrders() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function renderTickets(list = tickets) {
  ticketList.innerHTML = "";

  if (list.length === 0) {
    ticketList.innerHTML = "<p>No tickets found.</p>";
    return;
  }

  list.forEach(ticket => {
    const card = document.createElement("div");
    card.className = "ticket-card";

    card.innerHTML = `
      <h3>${ticket.match}</h3>
      <p><strong>Venue:</strong> ${ticket.venue}</p>
      <p><strong>City:</strong> ${ticket.city}</p>
      <p><strong>Date:</strong> ${ticket.date}</p>
      <p><strong>Category:</strong> ${ticket.category}</p>
      <p><strong>Available:</strong> ${ticket.available}</p>
      <p class="price">$${ticket.price}</p>
      <button onclick="selectTicket(${ticket.id})">Buy Ticket</button>
    `;

    ticketList.appendChild(card);
  });
}

function selectTicket(id) {
  selectedTicket = tickets.find(ticket => ticket.id === id);

  if (!selectedTicket) return;

  selectedTicketBox.innerHTML = `
    Selected: <strong>${selectedTicket.match}</strong><br>
    ${selectedTicket.city} · ${selectedTicket.category} · $${selectedTicket.price}
  `;

  window.location.hash = "checkout";
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = tickets.filter(ticket =>
    ticket.match.toLowerCase().includes(value) ||
    ticket.venue.toLowerCase().includes(value) ||
    ticket.city.toLowerCase().includes(value) ||
    ticket.category.toLowerCase().includes(value)
  );

  renderTickets(filtered);
});

checkoutForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!selectedTicket) {
    orderMessage.textContent = "Please select a ticket first.";
    return;
  }

  const formData = new FormData(checkoutForm);
  const quantity = Number(formData.get("quantity"));

  if (quantity > selectedTicket.available) {
    orderMessage.textContent = "Not enough tickets available.";
    return;
  }

  const order = {
    id: "CR-" + Date.now(),
    ticket: selectedTicket.match,
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    quantity,
    payment: formData.get("payment"),
    total: quantity * selectedTicket.price,
    status: "Pending payment confirmation"
  };

  selectedTicket.available -= quantity;

  orders.unshift(order);
  saveTickets();
  saveOrders();

  checkoutForm.reset();
  selectedTicket = null;
  selectedTicketBox.textContent = "No ticket selected yet.";
  orderMessage.textContent = `Order submitted. Reference: ${order.id}`;

  renderTickets();
  renderOrders();
});

adminForm.addEventListener("submit", event => {
  event.preventDefault();

  const formData = new FormData(adminForm);

  const ticket = {
    id: Date.now(),
    match: formData.get("match"),
    venue: formData.get("venue"),
    city: formData.get("city"),
    date: formData.get("date"),
    category: formData.get("category"),
    price: Number(formData.get("price")),
    available: Number(formData.get("available"))
  };

  tickets.unshift(ticket);
  saveTickets();
  adminForm.reset();
  renderTickets();
});

function renderOrders() {
  ordersList.innerHTML = "";

  if (orders.length === 0) {
    ordersList.innerHTML = "<p>No orders yet.</p>";
    return;
  }

  orders.forEach(order => {
    const card = document.createElement("div");
    card.className = "order-card";

    card.innerHTML = `
      <h3>${order.id}</h3>
      <p><strong>Buyer:</strong> ${order.name}</p>
      <p><strong>Email:</strong> ${order.email}</p>
      <p><strong>Phone:</strong> ${order.phone}</p>
      <p><strong>Ticket:</strong> ${order.ticket}</p>
      <p><strong>Quantity:</strong> ${order.quantity}</p>
      <p><strong>Total:</strong> $${order.total}</p>
      <p><strong>Status:</strong> ${order.status}</p>
    `;

    ordersList.appendChild(card);
  });
}

renderTickets();
renderOrders();
