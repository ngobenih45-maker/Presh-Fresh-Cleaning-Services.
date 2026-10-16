// Presh Fresh Cleaning Services — navigation, reveal effects and WhatsApp enquiries.
(() => {
  const phone = "27783225938"; // South Africa country code + number, no leading zero.
  const makeWhatsAppUrl = (service, name = "", details = "") => {
    let message = `Hello Presh Fresh Cleaning Services!%0A%0AI'm ${encodeURIComponent(name || "a prospective customer")} and I'm enquiring about: ${encodeURIComponent(service)}.%0A`;
    if (details.trim()) message += `%0AAdditional details: ${encodeURIComponent(details.trim())}%0A`;
    message += `%0APlease let me know your availability and provide a quote. Thank you!`;
    return `https://wa.me/${phone}?text=${message}`;
  };

  document.querySelectorAll("[data-service]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const service = link.dataset.service || "General enquiry";
      window.open(makeWhatsAppUrl(service), "_blank", "noopener");
    });
  });

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.textContent = open ? "×" : "☰";
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    }));
  }

  const form = document.getElementById("quote-form");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const name = document.getElementById("client-name").value.trim();
      const service = document.getElementById("service-select").value;
      const details = document.getElementById("message").value;
      if (!name || !service) return;
      window.open(makeWhatsAppUrl(service, name, details), "_blank", "noopener");
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add("visible"));

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();