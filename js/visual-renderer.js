window.siteVisualRenderer = (() => {
  const galleryClasses = ["phone-gallery", "photo-gallery", "film-gallery", "contact-gallery", "postcard-gallery", "polaroid-gallery", "single-page"];
  const escape = (value = "") => String(value).replace(/[&<>'"]/g, character => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;" })[character]);
  const shot = value => typeof value === "string" ? { src:value, alt:"Game screenshot" } : value;
  const style = game => game.visuals?.style || (game.presentation === "phones" ? "phones" : "default");
  const perPage = game => style(game) === "default" ? 1 : Math.max(1, Number(game.visuals?.screenshotsPerPage) || 2);
  const shots = game => game.screenshots?.length ? game.screenshots : [{ src:"../images/bitmoksha_logo.svg", alt:"Screenshot coming soon" }];
  const pages = game => { const list=shots(game), size=perPage(game); return Array.from({length:Math.ceil(list.length/size)},(_,i)=>list.slice(i*size,(i+1)*size)); };
  const transform = (index, count, game) => window.siteVisualLayouts.style(index, count, game.visuals);

  function frames(page, game, type) {
    if (type === "phones") return page.map((value,index) => { const item=shot(value), orientation=item.orientation==="landscape"?"landscape":"portrait"; return `<figure class="phone-frame phone-${orientation}" style="${transform(index,page.length,game)}"><img src="${escape(item.src)}" alt="${escape(item.alt || game.name+' screenshot')}"></figure>`; }).join("");
    if (type === "photographs") return page.map((value,index) => { const item=shot(value); return `<figure class="photo-frame" style="${transform(index,page.length,game)}"><img src="${escape(item.src)}" alt="${escape(item.alt || game.name+' screenshot')}">${item.caption?`<figcaption>${escape(item.caption)}</figcaption>`:""}</figure>`; }).join("");
    if (type === "postcards") return page.map((value,index) => { const item=shot(value); return `<figure class="postcard-frame" style="${transform(index,page.length,game)}"><img src="${escape(item.src)}" alt="${escape(item.alt || game.name+' screenshot')}"><figcaption><span>${escape(item.caption||game.name)}</span><i aria-hidden="true">PGC</i></figcaption></figure>`; }).join("");
    if (type === "polaroids") return page.map((value,index) => { const item=shot(value); return `<figure class="polaroid-frame" style="${transform(index,page.length,game)}"><img src="${escape(item.src)}" alt="${escape(item.alt || game.name+' screenshot')}"><figcaption>${escape(item.caption||game.name)}</figcaption></figure>`; }).join("");
    return "";
  }

  function pageMarkup(page, pageIndex, game, type, active, bootstrap) {
    const tag=bootstrap?"div":"article", base=bootstrap?"carousel-item":"slide", selected=pageIndex===active, activeClass=selected?" active":"", hidden=bootstrap?"":` aria-hidden="${!selected}"`;
    if (type === "phones") { const landscape=shots(game).every(value=>shot(value).orientation==="landscape"); return `<${tag} class="${base}${activeClass} mobile-screens${landscape?" screens-landscape":""}"${hidden}>${frames(page,game,type)}</${tag}>`; }
    if (type === "photographs" || type === "postcards" || type === "polaroids") { const className={photographs:"photo-screens",postcards:"postcard-screens",polaroids:"polaroid-screens"}[type]; return `<${tag} class="${base}${activeClass} ${className}"${hidden}>${frames(page,game,type)}</${tag}>`; }
    if (type === "filmstrip") return `<${tag} class="${base}${activeClass} film-screens"${hidden}><figure class="filmstrip-frame"><div class="filmstrip-track" style="--film-count:${page.length}">${page.map(value=>{const item=shot(value);return `<img src="${escape(item.src)}" alt="${escape(item.alt||game.name+' screenshot')}">`;}).join("")}</div></figure></${tag}>`;
    if (type === "contact-sheet") return `<${tag} class="${base}${activeClass} contact-screens"${hidden}><div class="contact-sheet-frame">${page.map((value,index)=>{const item=shot(value),number=pageIndex*perPage(game)+index+1;return `<figure class="contact-cell"><img src="${escape(item.src)}" alt="${escape(item.alt||game.name+' screenshot')}"><figcaption>${String(number).padStart(2,"0")}${item.caption?` · ${escape(item.caption)}`:""}</figcaption></figure>`;}).join("")}</div></${tag}>`;
    const item=shot(page[0]), fit=item.fit==="cover"?"screenshot-cover":"screenshot-contain"; return `<${tag} class="${base}${activeClass}"${hidden}><img class="${fit}" src="${escape(item.src)}" alt="${escape(item.alt||game.name+' screenshot')}"></${tag}>`;
  }

  function render(game, { bootstrap=false, activePage=0 } = {}) {
    const type=style(game), grouped=pages(game), active=Math.min(Math.max(0,activePage),grouped.length-1);
    const html=grouped.map((page,index)=>pageMarkup(page,index,game,type,bootstrap?0:active,bootstrap)).join("");
    return { html, activePage:active, pageCount:grouped.length, style:type, landscape:type==="phones"&&shots(game).every(value=>shot(value).orientation==="landscape") };
  }

  function applyClasses(element, visual) {
    galleryClasses.forEach(name=>element.classList.remove(name));
    const className={phones:"phone-gallery",photographs:"photo-gallery",filmstrip:"film-gallery","contact-sheet":"contact-gallery",postcards:"postcard-gallery",polaroids:"polaroid-gallery"}[visual.style];
    if(className) element.classList.add(className);
    if(visual.pageCount===1) element.classList.add("single-page");
  }

  return { applyClasses, pageCount:game=>pages(game).length, render };
})();
