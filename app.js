/* LÓGICA — normalmente no hace falta tocar este archivo. Los textos están en content.js */
const $=s=>document.querySelector(s),S=SITE,W=S.obras,MAIL=s=>"mailto:"+S.email+"?subject="+encodeURIComponent(s);
const ficha=w=>`${w.tecnica} · ${w.medidas} · ${w.lugar}, ${w.anio}`,ser=r=>S.series.find(s=>s.r===r);
const card=(w,shop)=>`<div class="card" ${shop?"":`data-w="${w.id}" tabindex="0" role="button"`}><div class="im" ${shop?`data-w="${w.id}" style="cursor:pointer"`:""}><img src="${w.imagen}" alt="${w.titulo}" loading="lazy"></div><h3>${w.titulo}</h3><small>${shop?ficha(w):w.tecnica+", "+w.medidas+", "+w.anio}</small>${shop?`<a class="btn" href="${MAIL("Consulta sobre la obra: "+w.titulo)}">Consultar disponibilidad</a>`:""}</div>`;
const head=(t,l)=>`<div class="ph pad" style="padding-bottom:0"><div class="wrap"><h2>${t}</h2><p class="lead">${l}</p></div></div>`;
const empty=m=>`<div class="empty">${m}</div>`;
$("#nm").textContent=S.nombre;$("#sg").src=S.firma;
$("#nav").innerHTML=S.menu.map(m=>`<a href="#${m[1]}">${m[0]}</a>`).join("");
$("#inicio").innerHTML=`<div class="hero"><img src="${S.portada}" alt=""><p>${S.lema}</p><h1>${S.nombre}</h1></div>`;
$("#sobre-mi").innerHTML=`<div class="ph pad"><div class="wrap split"><img src="${S.retrato}" alt="Retrato de ${S.nombre}"><div><h2>Sobre mí</h2><p class="lead">${S.bio}</p><p class="sts">${S.statement}</p><a class="btn r" href="#contacto">Escríbeme</a></div></div><div class="wrap"><div class="facts">${S.datos.map(d=>`<div><b>${d[0]}</b><span>${d[1]}</span></div>`).join("")}</div></div></div>`;
$("#galeria").innerHTML=head("Galería","Una pieza de cada serie.")+`<div class="pad" style="padding-top:0"><div class="wrap"><div class="grid">${S.series.map(s=>card({...W.find(w=>w.id===s.destacada),titulo:s.titulo})).join("")}</div><a class="btn r" href="#galeria-completa">Ver galería completa</a></div></div>`;
$("#galeria-completa").innerHTML=head("Galería completa",`${W.length} obras, 2024–2026. Abre cada una para leer su texto.`)+`<div class="pad" style="padding-top:0"><div class="wrap"><div class="chips" id="gc"></div><div class="grid big" id="gg"></div></div></div>`;
function filt(r){$("#gc").innerHTML=`<button class="chip" aria-pressed="${!r}" data-f="">Todas</button>`+S.series.map(s=>`<button class="chip" aria-pressed="${r===s.r}" data-f="${s.r}">${s.r}. ${s.titulo}</button>`).join("");$("#gg").innerHTML=W.filter(w=>!r||w.serie===r).map(w=>card(w)).join("")}filt("");
let pc=S.categoriasProyectos[0];
function proy(){$("#pp").innerHTML=S.categoriasProyectos.map(c=>`<button class="chip" aria-pressed="${c===pc}" data-pc="${c}">${c}</button>`).join("");
 const it=pc==="Series"?S.series.map(s=>`<div class="card" data-sr="${s.r}" tabindex="0" role="button"><div class="im"><img src="${W.find(w=>w.id===s.destacada).imagen}" alt=""></div><h3>${s.r}. ${s.titulo}</h3><small>${s.intro}</small></div>`):S.proyectos.filter(p=>p.cat===pc).map(p=>`<div class="card"><div class="im">${p.imagen?`<img src="${p.imagen}" alt="">`:""}</div><h3>${p.titulo}</h3><small>${p.anio} · ${p.texto}</small></div>`);
 $("#pg").innerHTML=it.join("")||empty("Aún no hay proyectos en esta categoría. Se añaden desde content.js.")}
$("#proyectos").innerHTML=head("Proyectos","Series, murales, intervenciones y más.")+`<div class="pad" style="padding-top:0"><div class="wrap"><div class="chips" id="pp"></div><div class="grid" id="pg"></div></div></div>`;proy();
let nc="";
function nws(){$("#nn").innerHTML=`<button class="chip" aria-pressed="${!nc}" data-nc="">Todo</button>`+S.categoriasNoticias.map(c=>`<button class="chip" aria-pressed="${c===nc}" data-nc="${c}">${c}</button>`).join("");
 const n=S.noticias.filter(x=>!nc||x.cat===nc);$("#nl").innerHTML=n.length?n.map(x=>`<div class="it"><span class="d">${x.fecha}<br>${x.cat}</span><h3>${x.titulo}</h3><p>${x.texto}${x.enlace?` <a href="${x.enlace}" rel="noopener">Leer más</a>`:""}</p></div>`).join(""):empty("Aún no hay noticias en esta categoría.")}
$("#noticias").innerHTML=head("Noticias","Prensa, lanzamientos, colaboraciones, exposiciones y charlas.")+`<div class="pad" style="padding-top:0"><div class="wrap"><div class="chips" id="nn"></div><div class="list" id="nl"></div></div></div>`;nws();
$("#tienda").innerHTML=head("Tienda","Cada obra es una pieza única. Escribe al estudio para confirmar disponibilidad, precio y envío.")+`<div class="pad" style="padding-top:0"><div class="wrap"><div class="chips" id="tc"></div><div class="grid" id="tg"></div></div></div>`;
function shop(r){$("#tc").innerHTML=`<button class="chip" aria-pressed="${!r}" data-t="">Todas</button>`+S.series.map(s=>`<button class="chip" aria-pressed="${r===s.r}" data-t="${s.r}">${s.titulo}</button>`).join("");$("#tg").innerHTML=W.filter(w=>!r||w.serie===r).map(w=>card(w,1)).join("")}shop("");
$("#contacto").innerHTML=`<div class="ph pad"><div class="wrap split"><div class="ct"><h2>Contacto</h2><p class="lead" style="margin-bottom:30px">Para consultar disponibilidad, precios o recibir más información, escribe directamente al artista.</p><p><a href="mailto:${S.email}">${S.email}</a></p><p><a href="https://instagram.com/${S.instagram.slice(1)}" rel="noopener">${S.instagram}</a></p>${S.telefonos.map(t=>`<p><a href="tel:${t.replace(/\s/g,"")}">${t}</a></p>`).join("")}</div><form id="cf"><label>Nombre<input name="n" required></label><label>Tu correo<input type="email" name="e" required></label><label>Motivo<select name="m">${S.motivos.map(m=>`<option>${m}</option>`).join("")}</select></label><label>Mensaje<textarea name="t" required></textarea></label><button class="btn r" type="submit" style="justify-self:start">Enviar mensaje</button></form></div></div>`;
$("#ft").innerHTML=`<div>${S.nombre} · ${S.ubicacion}</div><div>${S.menu.map(m=>`<a href="#${m[1]}">${m[0]}</a>`).join("")}</div>`;
const dg=$("#dg");let cur=0;
function open(id){cur=W.findIndex(w=>w.id==id);const w=W[cur];dg.innerHTML=`<button class="x" aria-label="Cerrar" data-x>×</button><div class="dl"><div class="pic"><img src="${w.imagen}" alt="${w.titulo}"></div><div class="tx"><span class="fi">Serie ${w.serie}. ${ser(w.serie).titulo}</span><h3>${w.titulo}</h3><span class="fi">${ficha(w)}</span><p>${w.texto}</p><div class="nv"><button class="btn" data-n="-1">Anterior</button><button class="btn" data-n="1">Siguiente</button><a class="btn r" href="${MAIL("Consulta sobre la obra: "+w.titulo)}">Consultar esta obra</a></div></div></div>`;if(!dg.open)dg.showModal()}
const V=["inicio","sobre-mi","galeria","galeria-completa","proyectos","noticias","tienda","contacto"];
function show(){const v=V.includes(location.hash.slice(1))?location.hash.slice(1):"inicio";document.querySelectorAll("main>section").forEach(s=>s.classList.toggle("on",s.id===v));const nv=v==="galeria-completa"?"galeria":v;document.querySelectorAll("#nav a").forEach(a=>a.toggleAttribute("aria-current",a.hash==="#"+nv));document.title=(v==="inicio"?"":document.querySelector("#nav a[aria-current]")?.textContent.replace(/^./,c=>c.toUpperCase())+" — ")+S.nombre;hd()}
function hd(){$("#hd").classList.toggle("top",$("#inicio").classList.contains("on")&&scrollY<innerHeight-90)}
function go(v){location.hash=v;show();scrollTo(0,0)}
document.addEventListener("click",e=>{const t=e.target;let c;
 if(c=t.closest("[data-w]"))return open(c.dataset.w);
 if(t.closest("[data-x]")||t===dg)return dg.close();
 if(c=t.closest("[data-n]"))return open(W[(cur+ +c.dataset.n+W.length)%W.length].id);
 if(c=t.closest("[data-f]"))return filt(c.dataset.f);
 if(c=t.closest("[data-t]"))return shop(c.dataset.t);
 if(c=t.closest("[data-pc]")){pc=c.dataset.pc;return proy()}
 if(c=t.closest("[data-nc]")){nc=c.dataset.nc;return nws()}
 if(c=t.closest("[data-sr]")){filt(c.dataset.sr);go("galeria-completa")}});
document.addEventListener("keydown",e=>{if(dg.open&&e.key==="ArrowRight")open(W[(cur+1)%W.length].id);if(dg.open&&e.key==="ArrowLeft")open(W[(cur-1+W.length)%W.length].id);if(e.key==="Enter"&&e.target.dataset.w)open(e.target.dataset.w);if(e.key==="Enter"&&e.target.dataset.sr){filt(e.target.dataset.sr);go("galeria-completa")}});
$("#cf").addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target);location.href=MAIL(f.get("m")+" — "+f.get("n"))+"&body="+encodeURIComponent(f.get("t")+"\n\n"+f.get("n")+" ("+f.get("e")+")")});
addEventListener("hashchange",()=>{show();scrollTo(0,0)});addEventListener("scroll",hd,{passive:true});show();
