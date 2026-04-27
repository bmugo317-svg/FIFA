function updateAdminVisibility() {
  const adminSection = document.getElementById("admin");
  const adminStatus = document.getElementById("adminStatus");
  const adminNavLink = document.querySelector('a[href="#admin"]');

  if (!adminSection || !adminStatus) return;

  const isAdmin = adminStatus.textContent.trim().toLowerCase().includes("admin access active");

  adminSection.style.display = isAdmin ? "block" : "none";
  if (adminNavLink) adminNavLink.style.display = isAdmin ? "inline" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const adminSection = document.getElementById("admin");
  const adminNavLink = document.querySelector('a[href="#admin"]');
  const adminStatus = document.getElementById("adminStatus");

  if (adminSection) adminSection.style.display = "none";
  if (adminNavLink) adminNavLink.style.display = "none";

  updateAdminVisibility();

  if (adminStatus) {
    const observer = new MutationObserver(updateAdminVisibility);
    observer.observe(adminStatus, { childList: true, subtree: true, characterData: true });
  }
});
