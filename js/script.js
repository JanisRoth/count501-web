const root = document.documentElement;
const menu = document.getElementById("navLinks");
const menuButton = document.querySelector(".burger-menu");
const themeButton = document.querySelector(".theme-toggle");

const savedTheme = localStorage.getItem("count501-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    root.setAttribute("data-theme", "dark");
}

function updateThemeLabel() {
    if (!themeButton) return;
    const isDark = root.getAttribute("data-theme") === "dark";
    themeButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

function closeMenu() {
    if (!menu || !menuButton) return;
    menu.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
}

if (themeButton) {
    updateThemeLabel();
    themeButton.addEventListener("click", () => {
        const isDark = root.getAttribute("data-theme") === "dark";
        if (isDark) {
            root.removeAttribute("data-theme");
            localStorage.setItem("count501-theme", "light");
        } else {
            root.setAttribute("data-theme", "dark");
            localStorage.setItem("count501-theme", "dark");
        }
        updateThemeLabel();
    });
}

if (menu && menuButton) {
    menuButton.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("active");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("click", (event) => {
        if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });
}

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const cookieBanner = document.getElementById("cookie-banner");
const acceptCookies = document.getElementById("accept-cookies");

if (cookieBanner && !localStorage.getItem("count501-cookies")) {
    cookieBanner.classList.add("is-visible");
}

if (acceptCookies) {
    acceptCookies.addEventListener("click", () => {
        localStorage.setItem("count501-cookies", "accepted");
        cookieBanner?.classList.remove("is-visible");
    });
}

const contactForm = document.getElementById("kontaktformular");
const messageField = document.getElementById("anliegen");

if (contactForm && messageField) {
    const blockedTerms = [
        "bmlnZ2Vy",
        "bmlnZ2E=",
        "c2NoZWlzc2U=",
        "aHVyZW5zb2hu",
        "ZnVjaw==",
        "Y3VudA==",
        "ZmFnZ290",
    ].map((term) => atob(term));

    const warning = document.createElement("p");
    warning.className = "form-warning";
    warning.setAttribute("role", "alert");
    messageField.parentNode.appendChild(warning);

    contactForm.addEventListener("submit", (event) => {
        const message = messageField.value.toLowerCase();
        const containsBlockedTerm = blockedTerms.some((term) => message.includes(term));

        if (containsBlockedTerm) {
            event.preventDefault();
            warning.textContent = "Please keep your message respectful so our team can help.";
            messageField.focus();
        } else {
            warning.textContent = "";
        }
    });
}
