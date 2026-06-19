/* =====================================================
   Monaco Masonry & Tile LLC — behavior
   ===================================================== */

document.documentElement.classList.add("js");
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- Content data (edit these to change the site) ---- */
// To change a service, edit the name/desc. Icon names come from lucide.dev.
const SERVICES = [
  { icon: "hammer",   name: "Brick & Block Masonry",  desc: "Load-bearing walls, columns, and structural brickwork laid to true course." },
  { icon: "layers",   name: "Natural Stone Veneer",   desc: "Granite, limestone, and fieldstone facing for facades, accents, and chimneys." },
  { icon: "grid-3x3", name: "Tile Installation",      desc: "Floors, walls, and backsplashes — herringbone, subway, mosaic, large-format." },
  { icon: "square",   name: "Patios & Walkways",      desc: "Paver and flagstone hardscape with proper base, drainage, and edge restraint." },
  { icon: "wrench",   name: "Repointing & Restoration", desc: "Grinding out failed mortar joints and repointing to match historic brick." },
  { icon: "flame",    name: "Fireplaces & Fire Pits", desc: "Indoor surrounds and outdoor hearths built to code and built to last." },
];

// Gallery tiles. Each tile is a real PHOTO.
// TO ADD A PHOTO: drop it in the "photos" folder (no spaces in filename) and add an entry below.
// "label" is the title, "place" is the town, "h" is the tile height in pixels.
const GALLERY = [
  { label: "Tiled Shower",    place: "Medford, MA",    img: "photos/shower.jpg.jpeg",        h: 320 },
  { label: "Brick Walkway",   place: "Medford, MA",    img: "photos/walkway.jpg.jpeg",       h: 220 },
  { label: "Bathroom Tile",   place: "Medford, MA",    img: "photos/bathroom.jpg.jpeg",      h: 240 },
  { label: "Bathroom Floor Tile", place: "Somerville, MA", img: "photos/shower.jpg%20(2).jpeg",  h: 300 },
  { label: "Brick Walkway",   place: "Medford, MA",    img: "photos/walkway.jpg%20(2).jpeg", h: 220 },
  { label: "Stone Staircase", place: "Providence, RI", img: "photos/staircase.jpg.jpeg",     h: 300 },
  { label: "Shower Niche",    place: "Arlington, MA",  img: "photos/shower.jpg%20(3).jpeg",  h: 320 },
  { label: "Tiled Shower & Niche",  place: "Massachusetts",  img: "photos/tile-shower-niche.jpg",    h: 320 },
  { label: "Carrara Marble Shower", place: "Massachusetts",  img: "photos/carrara-marble-wall.jpg",  h: 340 },
  { label: "Slate Tile Shower",     place: "New Hampshire",  img: "photos/grey-tile-shower.jpg",     h: 300 },
  { label: "Tile Shower & Bench",   place: "Massachusetts",  img: "photos/tile-shower-bench.jpg",    h: 300 },
  { label: "White Subway Shower",   place: "Rhode Island",   img: "photos/subway-tile-shower.jpg",   h: 380 },
  { label: "Marble Tile Bathroom",  place: "Massachusetts",  img: "photos/marble-tile-bathroom.jpg", h: 300 },
  { label: "Paver Patio",           place: "Massachusetts",  img: "photos/paver-patio.jpg",          h: 260 },
];

/* ---- Render services, gallery, project cards ---- */
function serviceCard(s) {
  return `<article class="cm-svc-card">
    <span class="cm-svc-icon"><i data-lucide="${s.icon}"></i></span>
    <h3>${s.name}</h3>
    <p>${s.desc}</p>
  </article>`;
}
function galleryTile(g) {
  return `<figure class="cm-tile" style="height:${g.h}px;" data-full="${g.img}" data-cap="${g.label} — ${g.place}">
    <img class="cm-tile-img" src="${g.img}" alt="${g.label}, ${g.place}" loading="lazy" />
    <figcaption>
      <span class="cm-tile-label">${g.label}</span>
      <span class="cm-tile-place"><i data-lucide="map-pin"></i> ${g.place}</span>
    </figcaption>
  </figure>`;
}
function projectCard(g) {
  return `<article class="cm-project" data-full="${g.img}" data-cap="${g.label} — ${g.place}">
    <div class="cm-project-img"><img src="${g.img}" alt="${g.label}, ${g.place}" loading="lazy" /></div>
    <div class="cm-project-cap"><span class="cm-dot"></span> ${g.label} — ${g.place}</div>
  </article>`;
}

document.getElementById("home-services").innerHTML = SERVICES.map(serviceCard).join("");
document.getElementById("all-services").innerHTML  = SERVICES.map(serviceCard).join("");
document.getElementById("gallery-grid").innerHTML  = GALLERY.map(galleryTile).join("");
document.getElementById("home-gallery").innerHTML  = GALLERY.slice(0, 3).map(projectCard).join("");

/* ---- Hero carousel ---- */
const slides = document.querySelectorAll(".cm-hero-slide");
const dotsWrap = document.getElementById("hero-dots");
let heroIdx = 0;
slides.forEach((_, i) => {
  const b = document.createElement("button");
  b.className = "cm-hero-dot" + (i === 0 ? " is-active" : "");
  b.setAttribute("aria-label", "Show slide " + (i + 1));
  b.addEventListener("click", () => goSlide(i));
  dotsWrap.appendChild(b);
});
function goSlide(i) {
  slides[heroIdx].classList.remove("is-active");
  dotsWrap.children[heroIdx].classList.remove("is-active");
  heroIdx = i;
  slides[heroIdx].classList.add("is-active");
  dotsWrap.children[heroIdx].classList.add("is-active");
}
if (!prefersReduced && slides.length > 1) {
  setInterval(() => goSlide((heroIdx + 1) % slides.length), 5500);
}

/* ---- Lightbox ---- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCap = document.getElementById("lightbox-cap");
function openLightbox(src, cap) {
  lightboxImg.src = src;
  lightboxImg.alt = cap;
  lightboxCap.textContent = cap;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
}
function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
}
document.addEventListener("click", (e) => {
  const item = e.target.closest("[data-full]");
  if (item) openLightbox(item.dataset.full, item.dataset.cap);
});
document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

/* ---- Reveal on scroll / on page show ---- */
function revealWithin(scope) {
  scope.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
}
if (prefersReduced || !("IntersectionObserver" in window)) {
  revealWithin(document);
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  document.querySelectorAll("#page-home .reveal").forEach((el) => io.observe(el));
  window.addEventListener("load", () => setTimeout(() => revealWithin(document.getElementById("page-home")), 2200));
}

/* ---- Nav background (solid on scroll or off the home hero) ---- */
const nav = document.getElementById("nav");
function updateNav() {
  const onHome = document.getElementById("page-home").classList.contains("is-visible");
  nav.classList.toggle("solid", !onHome || window.scrollY > 40);
}
window.addEventListener("scroll", updateNav, { passive: true });

/* ---- Page switching ---- */
const pages = document.querySelectorAll(".page");
function showPage(id) {
  pages.forEach((p) => p.classList.toggle("is-visible", p.id === "page-" + id));
  document.querySelectorAll(".cm-link, .cm-mobile-link").forEach((l) =>
    l.classList.toggle("is-active", l.dataset.nav === id)
  );
  closeMenu();
  const shown = document.getElementById("page-" + id);
  if (shown) requestAnimationFrame(() => revealWithin(shown));
  window.scrollTo({ top: 0, behavior: "smooth" });
  updateNav();
}
document.querySelectorAll("[data-nav]").forEach((btn) =>
  btn.addEventListener("click", () => showPage(btn.dataset.nav))
);

/* ---- Mobile menu ---- */
const menu = document.getElementById("mobile-menu");
const burger = document.getElementById("hamburger");
function closeMenu() {
  menu.classList.remove("is-open");
  burger.innerHTML = '<i data-lucide="menu"></i>';
  if (window.lucide) lucide.createIcons();
}
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("is-open");
  burger.innerHTML = open ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
  if (window.lucide) lucide.createIcons();
});

/* ---- Form helpers ---- */
function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function val(id) { return document.getElementById(id).value.trim(); }
function firstName(name) { return name.split(" ")[0]; }

/* ---- Booking form ---- */
document.getElementById("book-submit").addEventListener("click", () => {
  const name = val("b-name"), phone = val("b-phone"), email = val("b-email"),
        service = val("b-service"), date = val("b-date");
  const err = document.getElementById("book-error");

  if (!name || !phone || !email || !service) {
    err.textContent = "Please add your name, phone, email, and the service you need.";
    err.style.display = "block"; return;
  }
  if (!isEmail(email)) {
    err.textContent = "That email doesn't look right — mind double-checking it?";
    err.style.display = "block"; return;
  }
  err.style.display = "none";
  var bMail = ["New appointment request from the Monaco website:", "",
    "Name: " + name, "Phone: " + phone, "Email: " + email, "Service: " + service,
    "Preferred date: " + (date || "—"), "Preferred time: " + (val("b-time") || "—"),
    "Address: " + (val("b-address") || "—"), "Notes: " + (val("b-notes") || "—")].join("\n");
  window.location.href = "mailto:Mmonaco24@gmail.com?subject=" +
    encodeURIComponent("Appointment request — " + name) + "&body=" + encodeURIComponent(bMail);
  document.getElementById("book-form").style.display = "none";
  document.getElementById("book-success-text").textContent =
    `Thanks, ${firstName(name)}. We've got your request for ${service}` +
    (date ? ` on ${date}` : "") +
    `. We'll call ${phone} within one business day to confirm a time.`;
  document.getElementById("book-success").style.display = "block";
  if (window.lucide) lucide.createIcons();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---- Quote form ---- */
document.getElementById("quote-submit").addEventListener("click", () => {
  const name = val("q-name"), phone = val("q-phone"), email = val("q-email"),
        type = val("q-type");
  const err = document.getElementById("quote-error");

  if (!name || !phone || !email || !type) {
    err.textContent = "Please add your name, phone, email, and project type.";
    err.style.display = "block"; return;
  }
  if (!isEmail(email)) {
    err.textContent = "That email doesn't look right — mind double-checking it?";
    err.style.display = "block"; return;
  }
  err.style.display = "none";
  var qMail = ["New quote request from the Monaco website:", "",
    "Name: " + name, "Phone: " + phone, "Email: " + email, "Project type: " + type,
    "Indoor/outdoor: " + (val("q-loc") || "—"), "Approx. sq ft: " + (val("q-sqft") || "—"),
    "Budget: " + (val("q-budget") || "—"), "Timeline: " + (val("q-timeline") || "—"),
    "Details: " + (val("q-details") || "—")].join("\n");
  window.location.href = "mailto:Mmonaco24@gmail.com?subject=" +
    encodeURIComponent("Quote request — " + name) + "&body=" + encodeURIComponent(qMail);
  document.getElementById("quote-form").style.display = "none";
  document.getElementById("quote-success-text").textContent =
    `Thanks, ${firstName(name)}. We'll review your ${type} details and email a written ` +
    `estimate to ${email}, usually within 2 business days. For anything urgent, call (781) 645-8460.`;
  document.getElementById("quote-success").style.display = "block";
  if (window.lucide) lucide.createIcons();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---- Draw all icons (must run after content is injected) ---- */
if (window.lucide) lucide.createIcons();
updateNav();

/* ---- Elegant cursor + magnetic buttons (fine pointers only) ---- */
if (!prefersReduced && window.matchMedia("(pointer: fine)").matches) {
  // magnetic — gently pull elements toward the cursor
  function magnetic(el, fx, fy) {
    el.addEventListener("mousemove", function (e) {
      var r = el.getBoundingClientRect();
      var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = "translate(" + (dx * fx) + "px," + (dy * fy) + "px)";
    });
    el.addEventListener("mouseleave", function () { el.style.transform = ""; });
  }
  document.querySelectorAll(".cm-pill").forEach(function (p) { magnetic(p, 0.22, 0.3); });   // buttons
  document.querySelectorAll(".cm-brand").forEach(function (p) { magnetic(p, 0.2, 0.35); });   // logo
  document.querySelectorAll(".cm-tile, .cm-project").forEach(function (p) { magnetic(p, 0.1, 0.12); }); // gallery tiles

  // glowing embers that drift behind the cursor like fire
  var eCanvas = document.createElement("canvas");
  eCanvas.className = "cm-embers";
  document.body.appendChild(eCanvas);
  var eCtx = eCanvas.getContext("2d");
  var eDpr = Math.min(window.devicePixelRatio || 1, 2);
  function eSize() {
    eCanvas.width = window.innerWidth * eDpr; eCanvas.height = window.innerHeight * eDpr;
    eCanvas.style.width = window.innerWidth + "px"; eCanvas.style.height = window.innerHeight + "px";
    eCtx.setTransform(eDpr, 0, 0, eDpr, 0, 0);
  }
  eSize(); window.addEventListener("resize", eSize);

  var embers = [], EMB_COLORS = ["#F3E0A6", "#E7CF94", "#C9A663", "#A8843C"], EMB_MAX = 140;
  function spawnEmbers(x, y, n) {
    for (var i = 0; i < n && embers.length < EMB_MAX; i++) {
      embers.push({
        x: x + (Math.random() - 0.5) * 8, y: y + (Math.random() - 0.5) * 8,
        vx: (Math.random() - 0.5) * 0.5, vy: -(0.25 + Math.random() * 0.85),
        size: 1 + Math.random() * 2.2, life: 1, decay: 0.009 + Math.random() * 0.013,
        c: EMB_COLORS[(Math.random() * EMB_COLORS.length) | 0], fl: Math.random() * 6.28
      });
    }
  }
  window.addEventListener("mousemove", function (e) { spawnEmbers(e.clientX, e.clientY, 2); });

  (function emberTick() {
    eCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = embers.length - 1; i >= 0; i--) {
      var p = embers[i];
      p.x += p.vx + Math.sin(p.fl) * 0.35; p.y += p.vy; p.vy -= 0.004; p.fl += 0.12; p.life -= p.decay;
      if (p.life <= 0) { embers.splice(i, 1); continue; }
      eCtx.globalAlpha = Math.max(0, p.life) * 0.9;
      eCtx.fillStyle = p.c; eCtx.shadowColor = p.c; eCtx.shadowBlur = 9;
      eCtx.beginPath(); eCtx.arc(p.x, p.y, p.size * p.life, 0, 6.283); eCtx.fill();
    }
    eCtx.globalAlpha = 1; eCtx.shadowBlur = 0;
    requestAnimationFrame(emberTick);
  })();
}
