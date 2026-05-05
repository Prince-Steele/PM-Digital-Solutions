const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleLabel = document.querySelector("[data-theme-label]");
const THEME_STORAGE_KEY = "theme";

const getPreferredTheme = () => {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
  } catch {
    // Ignore storage failures and fall back to the system preference below.
  }

  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

const applyTheme = (theme, persist = true) => {
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;

  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage failures and keep the active theme in memory.
    }
  }

  if (themeToggle) {
    const isLightTheme = theme === "light";
    themeToggle.setAttribute("aria-pressed", String(isLightTheme));
    themeToggle.setAttribute("aria-label", isLightTheme ? "Switch to dark mode" : "Switch to light mode");
  }

  if (themeToggleLabel) {
    themeToggleLabel.setAttribute("data-mode", theme === "light" ? "Light" : "Dark");
  }
};

applyTheme(getPreferredTheme(), false);

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    });
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
}

if (window.lucide) {
  window.lucide.createIcons();
}

const yearTarget = document.querySelectorAll("#year");
yearTarget.forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const queryParams = new URLSearchParams(window.location.search);
const selectedType = queryParams.get("type");
const selectedItem = queryParams.get("selected");
const selectionNote = document.querySelector("[data-selection-note]");
const selectedInput = document.querySelector("[data-selected-item]");
const selectedTypeInput = document.querySelector("[data-selected-type]");
const messageField = document.querySelector('textarea[name="message"]');
const nameField = document.querySelector('input[name="name"]');
const emailField = document.querySelector('input[name="email"]');
const whatsappLinks = document.querySelectorAll("[data-whatsapp-link]");

const buildWhatsappMessage = () => {
  const name = nameField?.value.trim() || "there";
  const email = emailField?.value.trim();
  const message = messageField?.value.trim();
  const lines = [
    "Hello Prince-Mark,",
    "",
    `My name is ${name}.`,
  ];

  if (selectedItem) {
    const label = selectedType === "project" ? "project" : "package";
    lines.push(`I am interested in the ${label}: ${selectedItem}.`);
  } else {
    lines.push("I am interested in working with you on a website project.");
  }

  if (email) {
    lines.push(`You can reply to me at: ${email}.`);
  }

  if (message) {
    lines.push("", "Project details:");
    lines.push(message);
  }

  return lines.join("\n");
};

const syncWhatsappLinks = () => {
  const text = encodeURIComponent(buildWhatsappMessage());
  whatsappLinks.forEach((link) => {
    link.href = `https://wa.me/18768205761?text=${text}`;
  });
};

if (selectionNote && selectedInput && selectedItem) {
  const label = selectedType === "project" ? "Selected project" : "Selected package";
  selectionNote.hidden = false;
  selectionNote.textContent = `${label}: ${selectedItem}`;
  selectedInput.value = selectedItem;
  if (selectedTypeInput) {
    selectedTypeInput.value = selectedType || "";
  }

  if (messageField && !messageField.value.trim()) {
    const intro = selectedType === "project"
      ? `I'm interested in a website inspired by the ${selectedItem}.`
      : `I'm interested in the ${selectedItem}.`;
    messageField.value = `${intro}\n\nPlease tell me the next steps.`;
  }
}

if (nameField) {
  nameField.addEventListener("input", syncWhatsappLinks);
}

if (emailField) {
  emailField.addEventListener("input", syncWhatsappLinks);
}

if (messageField) {
  messageField.addEventListener("input", syncWhatsappLinks);
}

syncWhatsappLinks();

const contactForm = document.querySelector("[data-contact-form]");
const submitButton = document.querySelector("[data-submit-button]");
const formStatus = document.querySelector("[data-form-status]");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!nameField?.value.trim() || !emailField?.value.trim() || !messageField?.value.trim()) {
      if (formStatus) {
        formStatus.textContent = "Please complete your name, email, and message before sending.";
      }
      return;
    }

    if (window.location.protocol === "file:") {
      if (formStatus) {
        formStatus.textContent = "Email sending needs a local server or deployment so the Resend API route can run.";
      }
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    if (formStatus) {
      formStatus.textContent = "";
    }

    const payload = {
      name: nameField.value.trim(),
      email: emailField.value.trim(),
      message: messageField.value.trim(),
      selectedItem: selectedInput?.value || "",
      selectedType: selectedTypeInput?.value || "",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong while sending your message.");
      }

      contactForm.reset();
      if (selectedInput) {
        selectedInput.value = selectedItem || "";
      }
      if (selectedTypeInput) {
        selectedTypeInput.value = selectedType || "";
      }
      if (selectionNote && selectedItem) {
        selectionNote.hidden = false;
      }
      if (messageField && selectedItem) {
        const intro = selectedType === "project"
          ? `I'm interested in a website inspired by the ${selectedItem}.`
          : `I'm interested in the ${selectedItem}.`;
        messageField.value = `${intro}\n\nPlease tell me the next steps.`;
      }
      syncWhatsappLinks();

      if (formStatus) {
        formStatus.textContent = "Your message was sent successfully. I'll get back to you soon.";
      }
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = error.message;
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send via Email";
      }
    }
  });
}
