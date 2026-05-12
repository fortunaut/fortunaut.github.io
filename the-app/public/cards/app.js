"use strict";

const STORAGE = {
  mastered: "plant_flash_mastered_v1",
  mode:     "plant_flash_mode_v1",
  family:   "plant_flash_family_v1",
  pos:      "plant_flash_pos_v1",
  imgCache: "plant_flash_imgcache_v2",
  shuffled: "plant_flash_shuffled_v1",
};

let mode         = localStorage.getItem(STORAGE.mode)    || "study";
let familyFilter = localStorage.getItem(STORAGE.family)  || "all";
let mastered     = new Set(JSON.parse(localStorage.getItem(STORAGE.mastered) || "[]"));
let imgCache     = JSON.parse(localStorage.getItem(STORAGE.imgCache) || "{}");
let shuffled     = localStorage.getItem(STORAGE.shuffled) === "true";
let order        = [];
let pos          = parseInt(localStorage.getItem(STORAGE.pos) || "0", 10);
let flipped      = false;

// In-memory typed answers: Map<botanicalName, {botanical, common, family}>
const typedAnswers = new Map();

// ---------- DOM refs ----------
const card          = document.getElementById("card");
const cardFront     = document.getElementById("cardFront");
const cardBack      = document.getElementById("cardBack");
const modeSelect    = document.getElementById("modeSelect");
const familyFilterEl = document.getElementById("familyFilter");
const shuffleBtn    = document.getElementById("shuffleBtn");
const resetBtn      = document.getElementById("resetBtn");
const prevBtn       = document.getElementById("prevBtn");
const nextBtn       = document.getElementById("nextBtn");
const flipBtn       = document.getElementById("flipBtn");
const masterBtn     = document.getElementById("masterBtn");
const progressBar   = document.getElementById("progressBar");
const progressText  = document.getElementById("progressText");
const statPos       = document.getElementById("statPos");
const statTotal     = document.getElementById("statTotal");
const statMastered  = document.getElementById("statMastered");
const statAll       = document.getElementById("statAll");

// ---------- Init UI ----------
function populateFamilyFilter() {
  const fams = Array.from(new Set(PLANTS.map(p => p.family))).sort();
  fams.forEach(f => {
    const o = document.createElement("option");
    o.value = f; o.textContent = f;
    familyFilterEl.appendChild(o);
  });
  familyFilterEl.value = familyFilter;
  modeSelect.value = mode;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Rebuilds order from scratch, respecting mastered/filter/shuffled state.
// Call this when the filter, mode, or mastered set changes structurally.
function rebuildOrder() {
  order = PLANTS
    .map((p, i) => ({ i, p }))
    .filter(x => !mastered.has(x.p.botanical))
    .filter(x => familyFilter === "all" || x.p.family === familyFilter)
    .map(x => x.i);
  if (shuffled) shuffleArray(order);
  if (pos >= order.length) pos = 0;
}

function save() {
  localStorage.setItem(STORAGE.mode,     mode);
  localStorage.setItem(STORAGE.family,   familyFilter);
  localStorage.setItem(STORAGE.mastered, JSON.stringify(Array.from(mastered)));
  localStorage.setItem(STORAGE.pos,      String(pos));
  localStorage.setItem(STORAGE.imgCache, JSON.stringify(imgCache));
  localStorage.setItem(STORAGE.shuffled, String(shuffled));
}

// ---------- Wikipedia image fetching ----------
async function fetchImage(plant) {
  const key = plant.wiki;
  if (imgCache[key] !== undefined) return imgCache[key];
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(key)}`;
    const resp = await fetch(url, { headers: { "Accept": "application/json" } });
    if (!resp.ok) throw new Error("not ok");
    const data = await resp.json();
    const thumb = (data.thumbnail && data.thumbnail.source) || null;
    const full  = (data.originalimage && data.originalimage.source) || thumb;
    const img   = thumb || full;
    const pageUrl = data.content_urls && data.content_urls.desktop && data.content_urls.desktop.page;
    const result = img ? { src: img, full: full || img, page: pageUrl || null } : null;
    imgCache[key] = result;
    save();
    return result;
  } catch (e) {
    imgCache[key] = null;
    save();
    return null;
  }
}

// ---------- Rendering ----------
function escape(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function normalizeAns(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[''‛′`´']/g, "'")
    .replace(/[""‟″"]/g, '"')
    .replace(/×/g, "x")
    .replace(/\s+/g, " ");
}

// LCS-based char diff. Returns array of {type: 'match'|'extra'|'missing', char}.
function diffStrings(user, correct) {
  const a = String(user    || "");
  const b = String(correct || "");
  const al = a.length, bl = b.length;
  const al2 = a.toLowerCase(), bl2 = b.toLowerCase();
  const dp = Array.from({ length: al + 1 }, () => new Int16Array(bl + 1));
  for (let i = 1; i <= al; i++) {
    for (let j = 1; j <= bl; j++) {
      dp[i][j] = (al2[i - 1] === bl2[j - 1])
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  const out = [];
  let i = al, j = bl;
  while (i > 0 && j > 0) {
    if (al2[i - 1] === bl2[j - 1]) {
      out.unshift({ type: "match",   char: a[i - 1] }); i--; j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      out.unshift({ type: "extra",   char: a[i - 1] }); i--;
    } else {
      out.unshift({ type: "missing", char: b[j - 1] }); j--;
    }
  }
  // Fix: simple index decrement, no off-by-one arithmetic
  while (i > 0) { out.unshift({ type: "extra",   char: a[--i] }); }
  while (j > 0) { out.unshift({ type: "missing", char: b[--j] }); }
  return out;
}

function renderDiffHtml(user, correct) {
  if (!user || user.trim() === "") {
    return '<span class="diff-empty">(not answered)</span>';
  }
  const parts = diffStrings(user, correct);
  return parts.map(p => {
    const ch = p.char === " " ? " " : escape(p.char);
    if (p.type === "match") return `<span class="diff-ok">${ch}</span>`;
    if (p.type === "extra") return `<span class="diff-bad">${ch}</span>`;
    return `<span class="diff-miss">${ch}</span>`;
  }).join("");
}

function getTyped(plant) {
  return typedAnswers.get(plant.botanical) || { botanical: "", common: "", family: "" };
}

function renderInputsHtml(plant) {
  const t = getTyped(plant);
  return `
    <div class="answer-inputs" id="answerInputs">
      <div class="ai-label">Botanical</div>
      <input class="botanical-input" data-field="botanical" type="text" autocomplete="off"
        autocapitalize="off" autocorrect="off" spellcheck="false"
        value="${escape(t.botanical)}" placeholder="Genus species">
      <div class="ai-label">Common</div>
      <input data-field="common" type="text" autocomplete="off"
        autocorrect="off" spellcheck="false"
        value="${escape(t.common)}" placeholder="common name">
      <div class="ai-label">Family</div>
      <input data-field="family" type="text" autocomplete="off"
        autocapitalize="off" autocorrect="off" spellcheck="false"
        value="${escape(t.family)}" placeholder="Family (-aceae)">
      <div class="ai-hint">Type your guesses, then press <kbd>Enter</kbd> or <kbd>Space</kbd> outside the inputs to flip and check.</div>
    </div>`;
}

function answerLine(label, correct, userVal) {
  const correctMatch = userVal && normalizeAns(userVal) === normalizeAns(correct);
  const mark = userVal
    ? (correctMatch ? '<span class="check" title="exact match">✓</span>' : '<span class="xmark" title="not exact">✗</span>')
    : '';
  const className = label === "Botanical" ? "botanical" : (label === "Common" ? "common" : "family");
  const typedRow = userVal
    ? `<div class="typed-row"><span class="typed-prefix">You typed</span>${renderDiffHtml(userVal, correct)}</div>`
    : '';
  return `
    <div class="answer-block">
      <div class="answer-label">${label} ${mark}</div>
      ${typedRow}
      <div class="${className}">${escape(correct)}</div>
    </div>`;
}

function renderEmpty(message) {
  cardFront.innerHTML = `<div class="empty-state"><h2>${escape(message.title)}</h2><div>${escape(message.body)}</div></div>`;
  cardBack.innerHTML = "";
  flipped = false;
  card.classList.remove("flipped");
}

function buildNamesHtml(plant) {
  const t = getTyped(plant);
  const isMastered = mastered.has(plant.botanical);
  return `
    ${answerLine("Botanical", plant.botanical, t.botanical)}
    ${answerLine("Common",    plant.common,    t.common)}
    ${answerLine("Family",    plant.family,    t.family)}
    ${isMastered ? '<div style="margin-top:6px;"><span class="badge">mastered</span></div>' : ''}`;
}

function renderCard() {
  if (order.length === 0) {
    renderEmpty({
      title: "All done in this filter!",
      body: mastered.size === PLANTS.length
        ? "You've mastered every plant. Hit Reset to start over."
        : "No cards remain for the current filter. Switch family or hit Reset to bring mastered cards back."
    });
    updateStats();
    return;
  }
  const plant = PLANTS[order[pos]];
  const isMastered = mastered.has(plant.botanical);
  const imgId = `img-${order[pos]}`;

  if (mode === "reverse") {
    cardFront.innerHTML = `
      <div class="face-tag">Names → Identify it</div>
      <div class="answer-block">
        <div class="answer-label">Botanical</div>
        <div class="botanical">${escape(plant.botanical)}${isMastered ? '<span class="badge">mastered</span>' : ''}</div>
      </div>
      <div class="answer-block">
        <div class="answer-label">Common</div>
        <div class="common">${escape(plant.common)}</div>
      </div>
      <div class="answer-block">
        <div class="answer-label">Family</div>
        <div class="family">${escape(plant.family)}</div>
      </div>
      <div class="hint">Click anywhere or press Space to flip and see the image and traits.</div>`;
    cardBack.innerHTML = `
      <div class="face-tag">Reveal</div>
      <div class="image-wrap" id="${imgId}-back"><div class="img-loading"></div></div>
      <div class="chars-label">Identifying characteristics</div>
      <div class="chars">${escape(plant.chars)}</div>`;
    loadImageInto(`${imgId}-back`, plant);
  } else if (mode === "quiz") {
    cardFront.innerHTML = `
      <div class="face-tag">Quiz — traits only</div>
      <div class="chars-label">Identifying characteristics</div>
      <div class="chars">${escape(plant.chars)}</div>
      ${renderInputsHtml(plant)}`;
    cardBack.innerHTML = `
      <div class="face-tag">Answer</div>
      ${buildNamesHtml(plant)}
      <div class="back-image" id="${imgId}-back"><div class="img-loading"></div></div>`;
    loadImageInto(`${imgId}-back`, plant);
  } else {
    // study
    cardFront.innerHTML = `
      <div class="face-tag">Study — sample view</div>
      <div class="image-wrap" id="${imgId}-front"><div class="img-loading"></div></div>
      <div class="chars-label">Identifying characteristics</div>
      <div class="chars">${escape(plant.chars)}</div>
      ${renderInputsHtml(plant)}`;
    cardBack.innerHTML = `
      <div class="face-tag">Answer</div>
      ${buildNamesHtml(plant)}
      <div class="back-image" id="${imgId}-back"><div class="img-loading"></div></div>`;
    loadImageInto(`${imgId}-front`, plant);
    loadImageInto(`${imgId}-back`, plant);
  }

  if (mode !== "reverse") attachInputHandlers(plant);

  masterBtn.textContent = isMastered ? "Unmark mastered" : "Mark mastered";
  flipped = false;
  card.classList.remove("flipped");
  updateStats();
}

async function loadImageInto(elId, plant) {
  const el = document.getElementById(elId);
  if (!el) return;
  const result = await fetchImage(plant);
  if (!el.isConnected) return;
  if (result && result.src) {
    el.innerHTML = `
      <img src="${escape(result.src)}" alt="${escape(plant.botanical)}" loading="lazy"
        data-fullsrc="${escape(result.full || result.src)}"
        data-page="${escape(result.page || '')}"
        title="Click to view full size"
        onerror="this.parentElement.innerHTML='<div class=\\'placeholder\\'>Image failed to load</div>'">
      ${result.page ? `<a class="image-credit" href="${escape(result.page)}" target="_blank" rel="noopener">Wikipedia</a>` : ''}`;
    const imgEl = el.querySelector('img');
    if (imgEl) {
      imgEl.addEventListener('click', (e) => {
        e.stopPropagation();
        openImageModal(imgEl.dataset.fullsrc, plant.botanical, imgEl.dataset.page || null);
      });
    }
  } else {
    const search = `https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(plant.botanical)}&title=Special:MediaSearch&go=Go&type=image`;
    el.innerHTML = `<div class="placeholder">No Wikipedia image found.<br><a class="wiki-link" href="${escape(search)}" target="_blank" rel="noopener">Search Wikimedia Commons →</a></div>`;
  }
}

// ---------- Image modal ----------
function openImageModal(src, alt, pageUrl) {
  const modal   = document.getElementById('imageModal');
  const img     = document.getElementById('modalImg');
  const loading = document.getElementById('modalLoading');
  img.style.display = 'none';
  loading.style.display = 'block';
  loading.textContent = 'Loading full-size image…';
  img.onload  = () => { loading.style.display = 'none'; img.style.display = 'block'; };
  img.onerror = () => { loading.textContent = 'Failed to load full-size image.'; };
  img.src = src;
  img.alt = "";
  document.getElementById('modalCaption').innerHTML = `Press <strong>Esc</strong> or click outside to close`;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  modal.hidden = true;
  document.body.style.overflow = '';
  document.getElementById('modalImg').src = '';
}

function updateStats() {
  statPos.textContent      = order.length === 0 ? 0 : (pos + 1);
  statTotal.textContent    = order.length;
  statMastered.textContent = mastered.size;
  statAll.textContent      = PLANTS.length;
  const pct = PLANTS.length === 0 ? 0 : (mastered.size / PLANTS.length) * 100;
  progressBar.style.width  = pct.toFixed(1) + "%";
  progressText.textContent = `${mastered.size} / ${PLANTS.length} mastered (${pct.toFixed(0)}%)`;
}

// ---------- Actions ----------
function rerenderBack() {
  if (order.length === 0 || mode === "reverse") return;
  const plant = PLANTS[order[pos]];
  const imgId = `img-${order[pos]}`;
  cardBack.innerHTML = `
    <div class="face-tag">Answer</div>
    ${buildNamesHtml(plant)}
    <div class="back-image" id="${imgId}-back"><div class="img-loading"></div></div>`;
  loadImageInto(`${imgId}-back`, plant);
}

function flip() {
  if (!flipped && mode !== "reverse") rerenderBack();
  flipped = !flipped;
  card.classList.toggle("flipped", flipped);
}

function next() {
  if (order.length === 0) return;
  pos = (pos + 1) % order.length;
  save();
  renderCard();
}

function prev() {
  if (order.length === 0) return;
  pos = (pos - 1 + order.length) % order.length;
  save();
  renderCard();
}

function toggleMastered() {
  if (order.length === 0) return;
  const plantIdx = order[pos];
  const plant    = PLANTS[plantIdx];
  if (mastered.has(plant.botanical)) {
    mastered.delete(plant.botanical);
    // card stays at current position in order — just re-render to drop the badge
  } else {
    mastered.add(plant.botanical);
    // Splice out just this card; preserve the rest of the shuffled order
    order.splice(pos, 1);
    if (pos >= order.length) pos = 0;
  }
  save();
  renderCard();
}

function shuffle() {
  shuffled = true;
  rebuildOrder();
  pos = 0;
  save();
  renderCard();
}

function resetAll() {
  if (!confirm("Reset all mastered cards and start over?")) return;
  mastered.clear();
  shuffled = false;
  pos = 0;
  rebuildOrder();
  save();
  renderCard();
}

// ---------- Input handling ----------
function attachInputHandlers(plant) {
  const wrap = document.getElementById("answerInputs");
  if (!wrap) return;
  const inputs = wrap.querySelectorAll("input[data-field]");

  inputs.forEach(inp => {
    inp.addEventListener("input", () => {
      const cur = getTyped(plant);
      cur[inp.dataset.field] = inp.value;
      typedAnswers.set(plant.botanical, cur);
    });

    inp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const cur = getTyped(plant);
        cur[inp.dataset.field] = inp.value;
        typedAnswers.set(plant.botanical, cur);
        rerenderBack();
        inp.blur();
        if (!flipped) flip();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const all = Array.from(inputs);
        const idx = all.indexOf(inp);
        if (idx < all.length - 1) all[idx + 1].focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const all = Array.from(inputs);
        const idx = all.indexOf(inp);
        if (idx > 0) all[idx - 1].focus();
      }
    });
  });
}

// ---------- Events ----------
card.addEventListener("click", (e) => {
  const tag = e.target.tagName;
  if (tag === "A" || tag === "INPUT" || tag === "LABEL" || tag === "BUTTON" || tag === "IMG") return;
  if (e.target.closest && e.target.closest("#answerInputs")) return;
  flip();
});

document.addEventListener("click", (e) => {
  const modal = document.getElementById("imageModal");
  if (modal.hidden) return;
  if (e.target === modal || e.target.classList.contains("modal-close")) closeImageModal();
});

document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("imageModal");
  if (!modal.hidden && e.key === "Escape") { e.preventDefault(); closeImageModal(); return; }
  if (e.target.tagName === "SELECT" || e.target.tagName === "INPUT") return;
  if      (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); }
  else if (e.key === "ArrowRight") next();
  else if (e.key === "ArrowLeft")  prev();
  else if (e.key === "m" || e.key === "M") toggleMastered();
  else if (e.key === "s" || e.key === "S") shuffle();
});

flipBtn.addEventListener("click",   (e) => { e.stopPropagation(); flip(); });
nextBtn.addEventListener("click",   next);
prevBtn.addEventListener("click",   prev);
masterBtn.addEventListener("click", (e) => { e.stopPropagation(); toggleMastered(); });
shuffleBtn.addEventListener("click", shuffle);
resetBtn.addEventListener("click",  resetAll);

modeSelect.addEventListener("change", () => {
  mode = modeSelect.value;
  save();
  renderCard();
});

familyFilterEl.addEventListener("change", () => {
  familyFilter = familyFilterEl.value;
  pos = 0;
  rebuildOrder();
  save();
  renderCard();
});

// ---------- Boot ----------
populateFamilyFilter();
rebuildOrder();
renderCard();
