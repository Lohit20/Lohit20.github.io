/* ============================================================
   Portfolio v3 — single-page role-lens switcher
   ============================================================ */
(function () {
  const ROLES = ["data", "agentic", "ml"];
  const views = {};
  ROLES.forEach((r) => { views[r] = document.querySelector('.role-view[data-role="' + r + '"]'); });

  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const dec = (el.dataset.count.split(".")[1] || "").length;
    const motionOff = document.documentElement.getAttribute("data-motion") === "off"
      || matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (motionOff) { el.textContent = target.toFixed(dec); return; }
    const dur = 1000, start = performance.now();
    (function step(now) {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * e).toFixed(dec);
      if (p < 1) requestAnimationFrame(step); else el.textContent = target.toFixed(dec);
    })(performance.now());
  }

  function activate(role, push) {
    if (!ROLES.includes(role)) role = "data";
    ROLES.forEach((r) => {
      const on = r === role;
      if (views[r]) views[r].classList.toggle("active", on);
    });
    document.querySelectorAll("[data-role-link]").forEach((a) => {
      a.classList.toggle("active", a.dataset.roleLink === role);
    });
    const v = views[role];
    if (v) {
      v.querySelectorAll(".reveal").forEach((el) => { el.classList.remove("armed"); el.classList.add("in"); });
      v.querySelectorAll("[data-count]").forEach((el) => { if (!el.dataset.done) { el.dataset.done = "1"; countUp(el); } });
      const firstCase = v.querySelector(".case");
      if (firstCase && !v.querySelector(".case.open")) firstCase.classList.add("open");
    }
    if (push) history.replaceState(null, "", "#" + role);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  document.querySelectorAll("[data-role-link]").forEach((a) => {
    a.addEventListener("click", (e) => { e.preventDefault(); activate(a.dataset.roleLink, true); });
  });

  // case accordions (delegated — works across all views)
  document.addEventListener("click", (e) => {
    const head = e.target.closest(".case-head");
    if (!head) return;
    const card = head.closest(".case");
    const open = card.classList.contains("open");
    const scope = card.closest(".role-view") || document;
    scope.querySelectorAll(".case.open").forEach((c) => { if (c !== card) c.classList.remove("open"); });
    card.classList.toggle("open", !open);
  });

  // initial view from hash
  const initial = (location.hash || "").replace("#", "");
  activate(ROLES.includes(initial) ? initial : "data", false);
  window.addEventListener("hashchange", () => {
    const r = (location.hash || "").replace("#", "");
    if (ROLES.includes(r)) activate(r, false);
  });

  // reveal shared (non-view) sections immediately
  document.querySelectorAll(".reveal").forEach((el) => { if (!el.closest(".role-view")) { el.classList.remove("armed"); el.classList.add("in"); } });

  // dashboard sparklines
  document.querySelectorAll(".dc-spark").forEach((sp, idx) => {
    if (sp.childElementCount) return;
    let seed = idx * 7 + 3;
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    let base = 0.3;
    for (let i = 0; i < 16; i++) {
      base = Math.min(1, Math.max(0.18, base + (rnd() - 0.42) * 0.3));
      const bar = document.createElement("i");
      bar.style.height = (18 + base * 82) + "%";
      bar.style.opacity = (0.25 + base * 0.6).toFixed(2);
      sp.appendChild(bar);
    }
  });

  // contact form → mailto
  const form = document.getElementById("contactForm");
  if (form) {
    const note = document.getElementById("formNote");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim(), email = form.email.value.trim(), message = form.message.value.trim();
      if (!name || !email || !message) { note.style.color = "var(--accent)"; note.textContent = "Please fill in every field."; return; }
      const subject = encodeURIComponent("Portfolio enquiry — " + name);
      const body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      window.location.href = "mailto:ashwalohit@gmail.com?subject=" + subject + "&body=" + body;
      note.style.color = "var(--live)"; note.textContent = "Opening your email client…";
    });
  }
})();
