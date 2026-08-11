const { company, games } = window.siteContent;
const html = (value = "") => String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[c]);
const ext = url => /^https?:/i.test(url) ? ' target="_blank" rel="noopener noreferrer"' : "";
const contentLink = (link, classes = "") => !link.url || link.url === "#" ? `<span class="${classes} disabled" aria-disabled="true">${html(link.label)}</span>` : `<a class="${classes}" href="${html(link.url)}"${ext(link.url)}>${html(link.label)}</a>`;
let gameIndex = 0;
const normalizeShot = shot => typeof shot === "string" ? { src:shot } : shot;
const chunkScreenshots = (shots, size) => Array.from({ length:Math.ceil(shots.length / size) }, (_, index) => shots.slice(index * size, (index + 1) * size));
const visualStyle = game => game.visuals?.style || (game.presentation === "phones" ? "phones" : "default");
const visualPages = (game, shots) => chunkScreenshots(shots, visualStyle(game) === "default" ? 1 : Math.max(1, Number(game.visuals?.screenshotsPerPage) || 2));

function renderCompany() {
  document.title = `${company.name} — ${company.tagline}`;
  document.querySelector('[data-brand]').innerHTML = `<img class="brand-logo" src="${html(company.logo.src)}" alt="${html(company.logo.alt)}"><span class="brand-name">${html(company.name)}</span>`;
  const links = (company.links || []).map(link => contentLink(link)).join("");
  const partners = (company.partners || []).map(partner => contentLink({ label: partner.name, url: partner.url })).join("");
  document.querySelector('[data-company-info]').innerHTML = `<div class="row g-4 align-items-end"><div class="col-lg-5"><p class="company-label mb-2">About</p><p class="lead mb-0">${html(company.description)}</p></div><div class="col-sm-6 col-lg-2"><p class="company-label mb-2">Contact</p><a href="mailto:${html(company.email)}">${html(company.email)}</a></div><div class="col-sm-6 col-lg-2"><p class="company-label mb-2">Follow</p><nav class="company-links d-flex flex-wrap gap-3">${links}</nav></div>${partners ? `<div class="col-sm-6 col-lg-3"><p class="company-label mb-2">Partners</p><nav class="company-links partner-links d-flex flex-column align-items-start">${partners}</nav></div>` : ""}</div>`;
  document.querySelector('[data-tagline]').textContent = company.tagline;
  const email = document.querySelector('[data-email]'); email.textContent = company.email; email.href = `mailto:${company.email}`;
  document.querySelector('[data-company-name]').textContent = company.name;
}

function renderGame() {
  const game = games[gameIndex];
  window.applySiteTheme(game.theme);
  const shots = game.screenshots?.length ? game.screenshots : [{src:"../images/bitmoksha_logo.svg",alt:"Screenshot coming soon"}];
  const pages = visualPages(game, shots);
  const phonePresentation = visualStyle(game) === "phones";
  const photoPresentation = visualStyle(game) === "photographs";
  const filmPresentation = visualStyle(game) === "filmstrip";
  const contactPresentation = visualStyle(game) === "contact-sheet";
  const postcardPresentation = visualStyle(game) === "postcards";
  const polaroidPresentation = visualStyle(game) === "polaroids";
  const landscapeGallery = phonePresentation && shots.every((shot) => (typeof shot === "string" ? {} : shot).orientation === "landscape");
  const carousel = document.getElementById('screenshots');
  carousel.classList.toggle('phone-gallery', phonePresentation);
  carousel.classList.toggle('photo-gallery', photoPresentation);
  carousel.classList.toggle('film-gallery', filmPresentation);
  carousel.classList.toggle('contact-gallery', contactPresentation);
  carousel.classList.toggle('postcard-gallery', postcardPresentation);
  carousel.classList.toggle('polaroid-gallery', polaroidPresentation);
  carousel.classList.toggle('single-page', pages.length === 1);
  document.querySelector('.visual-pane').classList.toggle('landscape-gallery', landscapeGallery);
  document.querySelector('[data-slides]').innerHTML = phonePresentation ? pages.map((page,pageIndex) => `<div class="carousel-item ${pageIndex ? "" : "active"} mobile-screens${landscapeGallery ? " screens-landscape" : ""}">${page.map((shot,itemIndex) => { const item=normalizeShot(shot); const orientation=item.orientation==="landscape"?"landscape":"portrait"; const layout=window.siteVisualLayouts.style(itemIndex,page.length,game.visuals); return `<figure class="phone-frame phone-${orientation}" style="${layout}"><img src="${html(item.src)}" alt="${html(item.alt || game.name + " screenshot")}"></figure>`; }).join("")}</div>`).join("") : photoPresentation ? pages.map((page,pageIndex) => `<div class="carousel-item ${pageIndex ? "" : "active"} photo-screens">${page.map((shot,itemIndex) => { const item=normalizeShot(shot); const layout=window.siteVisualLayouts.style(itemIndex,page.length,game.visuals); return `<figure class="photo-frame" style="${layout}"><img src="${html(item.src)}" alt="${html(item.alt || game.name+' screenshot')}">${item.caption ? `<figcaption>${html(item.caption)}</figcaption>` : ""}</figure>`; }).join("")}</div>`).join("") : shots.map((shot,i) => { const item=normalizeShot(shot); const fit=item.fit==="cover"?"screenshot-cover":"screenshot-contain"; return `<div class="carousel-item ${i ? "" : "active"}"><img class="${fit}" src="${html(item.src)}" alt="${html(item.alt || game.name + " screenshot")}"></div>`; }).join("");
  if (filmPresentation) document.querySelector('[data-slides]').innerHTML = pages.map((page,pageIndex) => `<div class="carousel-item ${pageIndex?'':'active'} film-screens"><figure class="filmstrip-frame"><div class="filmstrip-track" style="--film-count:${page.length}">${page.map((shot) => { const item=normalizeShot(shot); return `<img src="${html(item.src)}" alt="${html(item.alt || game.name+' screenshot')}">`; }).join("")}</div></figure></div>`).join("");
  if (contactPresentation) document.querySelector('[data-slides]').innerHTML = pages.map((page,pageIndex) => `<div class="carousel-item ${pageIndex?'':'active'} contact-screens"><div class="contact-sheet-frame">${page.map((shot,itemIndex) => { const item=normalizeShot(shot); const number=pageIndex*(Number(game.visuals?.screenshotsPerPage)||page.length)+itemIndex+1; return `<figure class="contact-cell"><img src="${html(item.src)}" alt="${html(item.alt || game.name+' screenshot')}"><figcaption>${String(number).padStart(2,'0')}${item.caption ? ` · ${html(item.caption)}` : ''}</figcaption></figure>`; }).join("")}</div></div>`).join("");
  if (postcardPresentation) document.querySelector('[data-slides]').innerHTML = pages.map((page,pageIndex) => `<div class="carousel-item ${pageIndex?'':'active'} postcard-screens">${page.map((shot,itemIndex) => { const item=normalizeShot(shot); const layout=window.siteVisualLayouts.style(itemIndex,page.length,game.visuals); return `<figure class="postcard-frame" style="${layout}"><img src="${html(item.src)}" alt="${html(item.alt || game.name+' screenshot')}"><figcaption><span>${item.caption ? html(item.caption) : html(game.name)}</span><i aria-hidden="true">PGC</i></figcaption></figure>`; }).join("")}</div>`).join("");
  if (polaroidPresentation) document.querySelector('[data-slides]').innerHTML = pages.map((page,pageIndex) => `<div class="carousel-item ${pageIndex?'':'active'} polaroid-screens">${page.map((shot,itemIndex) => { const item=normalizeShot(shot); const layout=window.siteVisualLayouts.style(itemIndex,page.length,game.visuals); return `<figure class="polaroid-frame" style="${layout}"><img src="${html(item.src)}" alt="${html(item.alt || game.name+' screenshot')}"><figcaption>${item.caption ? html(item.caption) : html(game.name)}</figcaption></figure>`; }).join("")}</div>`).join("");
  const sharedVisual = window.siteVisualRenderer.render(game, { bootstrap:true });
  window.siteVisualRenderer.applyClasses(carousel, sharedVisual);
  document.querySelector('.visual-pane').classList.toggle('landscape-gallery', sharedVisual.landscape);
  document.querySelector('[data-slides]').innerHTML = sharedVisual.html;
  document.querySelector('[data-current]').textContent = "1";
  document.querySelector('[data-total]').textContent = pages.length;
  const words = game.name.split(" "), first = words.shift();
  const tags = (game.tags || []).map(tag => `<span class="badge rounded-pill border text-body-secondary">${html(tag)}</span>`).join("");
  const links = (game.links || []).map(link => contentLink(link,"btn btn-outline-secondary btn-sm")).join("");
  document.querySelector('[data-game-info]').innerHTML = `<p class="status ${/prototype|ideation/i.test(game.status) ? "prototype" : ""}">${html(game.status)} · ${html(game.platform)}</p><h1 class="game-title mb-4">${html(first)}<br><em>${html(words.join(" "))}</em></h1><p class="game-description">${html(game.description)}</p><div class="d-flex flex-wrap gap-2 mb-4">${tags}</div>${links ? `<div class="store-links d-flex gap-2">${links}</div>` : ""}`;
  document.querySelector('[data-game-tabs]').innerHTML = games.map((item,i) => {
    const selected = i === gameIndex;
    return `<button class="list-group-item list-group-item-action ${selected ? "active" : ""}" type="button" role="tab" aria-selected="${selected}" data-game="${i}">${html(item.shortName || item.name)}</button>`;
  }).join("");
  document.querySelectorAll('[data-game]').forEach(button => button.addEventListener('click', () => { gameIndex = Number(button.dataset.game); renderGame(); }));
}

renderCompany();
renderGame();
document.getElementById('screenshots').addEventListener('slid.bs.carousel', event => { document.querySelector('[data-current]').textContent = event.to + 1; });
document.querySelector('[data-year]').textContent = new Date().getFullYear();
