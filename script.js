const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleLabel = document.querySelector("[data-theme-label]");
const THEME_STORAGE_KEY = "theme";

const serviceAnnouncement = document.querySelector("[data-service-announcement]");
const serviceAnnouncementClose = document.querySelector("[data-service-announcement-close]");

if (serviceAnnouncement && serviceAnnouncementClose) {
  serviceAnnouncementClose.addEventListener("click", () => {
    serviceAnnouncement.hidden = true;
  });
}

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

const floatingServicesMenus = document.querySelectorAll("[data-services-menu]");

floatingServicesMenus.forEach((menu) => {
  const trigger = menu.querySelector(".floating-services-trigger");
  const links = menu.querySelectorAll(".floating-services-dropdown a");

  if (!trigger) {
    return;
  }

  const setMenuOpen = (isOpen) => {
    menu.classList.toggle("is-open", isOpen);
    trigger.setAttribute("aria-expanded", String(isOpen));
  };

  trigger.addEventListener("click", () => {
    setMenuOpen(trigger.getAttribute("aria-expanded") !== "true");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && trigger.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      trigger.focus();
    }
  });
});

if (window.lucide) {
  window.lucide.createIcons();
}

const yearTarget = document.querySelectorAll("#year");
yearTarget.forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const currencySelect = document.querySelector("[data-currency-select]");
const currencyStatus = document.querySelector("[data-currency-status]");
const convertiblePrices = document.querySelectorAll("[data-price-min]");
const CURRENCY_STORAGE_KEY = "preferred-currency";
const currencyOptions = {
  JMD: { label: "Jamaican dollars", symbol: "JMD $", rate: 1, rounding: 1 },
  USD: { label: "US dollars", symbol: "US$", rate: 190 / 30000, rounding: 1 },
  EUR: { label: "euros", symbol: "€", rate: 0.00545, rounding: 1 },
  GBP: { label: "British pounds", symbol: "£", rate: 0.0047, rounding: 1 },
  JPY: { label: "Japanese yen", symbol: "¥", rate: 0.93, rounding: 100 },
  INR: { label: "Indian rupees", symbol: "₹", rate: 0.552, rounding: 100 },
};

const formatConvertedAmount = (amount, currency) => {
  const { rate, rounding, symbol } = currencyOptions[currency];
  const convertedAmount = amount * rate;
  const roundedAmount = Math.round(convertedAmount / rounding) * rounding;
  return `${symbol}${roundedAmount.toLocaleString("en-US")}`;
};

const updateDisplayedCurrency = (currency, persist = true) => {
  const selectedCurrency = currencyOptions[currency] ? currency : "JMD";

  convertiblePrices.forEach((price) => {
    const minimum = Number(price.dataset.priceMin);
    const maximum = price.dataset.priceMax ? Number(price.dataset.priceMax) : null;
    const prefix = price.dataset.pricePrefix || "";
    const suffix = price.dataset.priceSuffix || "";
    const plus = price.dataset.pricePlus === "true" ? "+" : "";
    const minimumLabel = formatConvertedAmount(minimum, selectedCurrency);
    const rangeLabel = maximum
      ? `${minimumLabel} - ${formatConvertedAmount(maximum, selectedCurrency)}`
      : `${minimumLabel}${plus}`;

    price.textContent = `${prefix}${rangeLabel}${suffix}`;
  });

  if (currencyStatus) {
    currencyStatus.textContent = selectedCurrency === "JMD"
      ? "Prices shown in Jamaican dollars."
      : `Approximate prices shown in ${currencyOptions[selectedCurrency].label}.`;
  }

  if (currencySelect) {
    currencySelect.value = selectedCurrency;
  }

  if (persist) {
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, selectedCurrency);
    } catch {
      // Keep the selected currency active if browser storage is unavailable.
    }
  }
};

if (currencySelect && convertiblePrices.length) {
  let savedCurrency = "JMD";

  try {
    savedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY) || "JMD";
  } catch {
    // Use Jamaican dollars when browser storage is unavailable.
  }

  updateDisplayedCurrency(savedCurrency, false);
  currencySelect.addEventListener("change", (event) => {
    updateDisplayedCurrency(event.target.value);
  });
}

const queryParams = new URLSearchParams(window.location.search);
const selectedType = queryParams.get("type");
const selectedItem = queryParams.get("selected");
const selectionNote = document.querySelector("[data-selection-note]");
const whatsappHelper = document.querySelector("[data-whatsapp-helper]");
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
  const lines = ["Hello Prince-Mark,", ""];

  if (selectedItem) {
    if (selectedType === "project") {
      lines.push(`I'm interested in your ${selectedItem} project.`);
    } else {
      const packageName = selectedItem.replace(/\s+package$/i, "");
      lines.push(`I'm interested in your ${packageName} website package.`);
    }
  } else {
    lines.push("I'm interested in working with you on a website project.");
  }

  lines.push("I'd like to get started and learn more about the next steps.");

  if (email) {
    lines.push(`My email address is ${email}.`);
  }

  if (message) {
    lines.push("", "A few details about what I'm looking for:");
    lines.push(message);
  } else {
    lines.push("I can also share a few details about what I'm looking for if needed.");
  }

  lines.push("", "Looking forward to your response, thank you.");

  return lines.join("\n");
};

const syncWhatsappLinks = () => {
  const text = encodeURIComponent(buildWhatsappMessage());
  whatsappLinks.forEach((link) => {
    link.href = `https://wa.me/18768205761?text=${text}`;
  });
};

const updateWhatsappHelper = () => {
  if (!whatsappHelper) {
    return;
  }

  if (selectedItem) {
    const label = selectedType === "project" ? "project" : "package";
    whatsappHelper.textContent = `WhatsApp will open a ready-to-send message with your selected ${label} and any details you add to the form.`;
    return;
  }

  whatsappHelper.textContent = "WhatsApp can open a ready-to-send message using your form details.";
};

if (selectionNote && selectedInput && selectedItem) {
  const label = selectedType === "project" ? "Selected project" : "Selected package";
  selectionNote.hidden = false;
  selectionNote.textContent = `${label}: ${selectedItem}`;
  selectedInput.value = selectedItem;
  if (selectedTypeInput) {
    selectedTypeInput.value = selectedType || "";
  }

}

updateWhatsappHelper();

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

const triggerWhatsappSpark = (button) => {
  if (!button) {
    return;
  }

  button.classList.add("is-sparking");

  for (let index = 0; index < 8; index += 1) {
    const spark = document.createElement("span");
    spark.className = "whatsapp-spark";
    spark.style.setProperty("--spark-angle", `${index * 45}deg`);
    button.appendChild(spark);

    window.setTimeout(() => {
      spark.remove();
    }, 650);
  }

  window.setTimeout(() => {
    button.classList.remove("is-sparking");
  }, 320);
};

whatsappLinks.forEach((link) => {
  link.addEventListener("click", () => {
    triggerWhatsappSpark(link);
  });
});

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
