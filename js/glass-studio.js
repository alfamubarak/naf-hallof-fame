/* NAF / AETHER GLASS 2026 — editorial kinetic storytelling, not games.
 * Uses real GSAP + ScrollTrigger when installed locally. Native fallback works offline.
 * All timelines, photographs, chapter names and video records remain original.
 */
(function(){
'use strict';
const A=window.MuseumApp,D=window.MUSEUM_DATA;
if(!A||!D)return;
const page=document.getElementById('page'), menu=document.getElementById('experienceMenu');
const openBtn=document.getElementById('experienceMenuOpen'),closeBtn=document.getElementById('experienceMenuClose');
const chapters=document.getElementById('experienceMenuChapters'),photo=document.getElementById('menuPhoto');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const touch=matchMedia('(pointer:coarse)').matches;
let manualPause=false,menuOpen=false,routeCleanup=[],observer=null,scrollObserver=null,dockIndex=0;
const realGSAP=()=>!!(window.gsap&&typeof window.gsap.timeline==='function');
const motion=()=>!reduced&&!manualPause;
const sections=A.sections;
const byId=id=>sections.find(x=>x.id===id);
const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const imageUrl=s=>`url("${String(s||'').replaceAll('"','')}")`;
const gs=(targets,props)=>{if(realGSAP()&&motion()){try{return window.gsap.to(targets,props)}catch(e){console.warn('GSAP motion fallback',e)}}return null};
function fallbackIn(elements,delay=0){
 if(!motion())return;
 [...elements].forEach((el,i)=>{try{el.animate([{opacity:0,transform:'translate3d(0,42px,0)',filter:'blur(12px)'},{opacity:1,transform:'translate3d(0,0,0)',filter:'blur(0px)'}],{duration:900,delay:delay+i*110,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'})}catch{}});
}
// Expandable full-screen chapter atlas inspired by editorial multi-layer image reveals.
const homeImage='assets/images/photos/03-aircraft/alpha-jet.jpg';
function populateMenu(){
 chapters.innerHTML=sections.map((s,i)=>`<button type="button" class="menu-chapter" data-menu-route="${s.id}" data-image="${esc(s.image)}" aria-label="Open ${esc(s.name)}"><span class="m-no">${String(i+1).padStart(2,'0')}</span><span class="m-name">${esc(s.name)}</span><span class="m-sub">${esc(s.short)}</span><span class="m-arrow">↗</span></button>`).join('');
 photo.style.backgroundImage=imageUrl(homeImage);
}
function setMenuPhoto(url){if(!url)return;if(motion()&&realGSAP()){window.gsap.to(photo,{opacity:.12,scale:1.13,duration:.23,onComplete:()=>{photo.style.backgroundImage=imageUrl(url);window.gsap.to(photo,{opacity:.65,scale:1.065,duration:.65,ease:'power3.out'})}})}else{photo.style.backgroundImage=imageUrl(url)}}
function toggleMenu(show,immediate=false){
 if(menuOpen===show)return;menuOpen=show;
 openBtn.setAttribute('aria-expanded',String(show));
 if(show){populateMenu();menu.hidden=false;menu.scrollTop=0;document.body.classList.add('menu-active');if(motion()&&!immediate){
   if(realGSAP()){window.gsap.fromTo(menu,{autoAlpha:0,clipPath:'inset(0 0 100% 0)'},{autoAlpha:1,clipPath:'inset(0 0 0% 0)',duration:.95,ease:'expo.inOut'});window.gsap.fromTo('.menu-chapter',{opacity:0,y:34},{opacity:1,y:0,duration:.68,delay:.44,stagger:.055,ease:'power3.out'})}
   else{menu.animate([{opacity:0,clipPath:'inset(0 0 100% 0)'},{opacity:1,clipPath:'inset(0 0 0 0)'}],{duration:820,easing:'cubic-bezier(.78,0,.16,1)'}) ;fallbackIn(chapters.children,300)}
 }closeBtn.focus({preventScroll:true});
 }else{
   document.body.classList.remove('menu-active');
   if(motion()&&!immediate){
     if(realGSAP())window.gsap.to(menu,{opacity:0,clipPath:'inset(0 0 100% 0)',duration:.57,ease:'power3.inOut',onComplete:()=>{menu.hidden=true;window.gsap.set(menu,{clearProps:'all'})}});
     else {const a=menu.animate([{opacity:1,clipPath:'inset(0 0 0 0)'},{opacity:0,clipPath:'inset(0 0 100% 0)'}],{duration:460,easing:'ease-in-out'});a.onfinish=()=>menu.hidden=true;setTimeout(()=>{if(!menuOpen)menu.hidden=true},520);}
   }else menu.hidden=true;
   openBtn.focus({preventScroll:true});
 }
}
openBtn.addEventListener('click',()=>toggleMenu(true));
closeBtn.addEventListener('click',()=>toggleMenu(false));
chapters.addEventListener('pointerover',e=>{const t=e.target.closest('.menu-chapter');if(t)setMenuPhoto(t.dataset.image)});
chapters.addEventListener('focusin',e=>{const t=e.target.closest('.menu-chapter');if(t)setMenuPhoto(t.dataset.image)});
chapters.addEventListener('click',e=>{const t=e.target.closest('[data-menu-route]');if(!t)return;const r=t.dataset.menuRoute;toggleMenu(false,true);A.route(r)});
menu.addEventListener('click',e=>{if(e.target===menu)toggleMenu(false)});
window.addEventListener('keydown',e=>{if(menuOpen&&e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();toggleMenu(false,true)};if(menuOpen&&e.key==='Tab'){const tabbables=[...menu.querySelectorAll('button:not([disabled])')];const first=tabbables[0],last=tabbables[tabbables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}},true);
// More immersive but optional visuals for accessibility and crowded kiosk environments.
const motionBtn=document.getElementById('motionToggle');
function setMotionState(v){manualPause=v;document.body.classList.toggle('motion-paused',v);motionBtn.textContent=v?'MOTION: OFF':'MOTION: ON';motionBtn.setAttribute('aria-pressed',String(v));if(realGSAP()){if(v){window.gsap.globalTimeline.pause();window.ScrollTrigger?.getAll().forEach(t=>t.disable())}else{window.gsap.globalTimeline.resume();window.ScrollTrigger?.getAll().forEach(t=>t.enable())}}}
motionBtn.addEventListener('click',()=>setMotionState(!manualPause));
// Pointer-following theater beam (decorative only; touch devices never show pointer artifacts).
if(!touch&&!reduced){let targetX=-1000,targetY=-1000,x=-1000,y=-1000;
 const beam=document.createElement('div');beam.className='glass-beam';document.body.appendChild(beam);
 document.addEventListener('pointermove',e=>{targetX=e.clientX-180;targetY=e.clientY-180;const h=e.target.closest('.home-title');if(h){const r=h.getBoundingClientRect();h.style.setProperty('--pointer-x',((e.clientX-r.left)/r.width*100).toFixed(2)+'%');h.style.setProperty('--pointer-y',((e.clientY-r.top)/r.height*100).toFixed(2)+'%')}},{passive:true});
 function beamTick(){x+=(targetX-x)*.095;y+=(targetY-y)*.095;beam.style.transform=`translate3d(${x}px,${y}px,0)`;requestAnimationFrame(beamTick)}requestAnimationFrame(beamTick);
}
// Promotional exhibition feature dock is live navigation through supplied chapters, not a game.
const featured=['timeline','leadership','aircraft','college','daw','bases','archive','films'];
function featureDock(){return `<div class="glass-feature-dock"><div class="dock-cover" id="dockCover"></div><div class="dock-eyebrow" id="dockEyebrow">EXPLORE / 01 — 08</div><h2 class="dock-title" id="dockTitle"></h2><div class="dock-bottom"><span class="dock-sub" id="dockSub"></span><div class="dock-arrows"><button data-dock-step="-1" type="button" aria-label="Previous museum chapter">←</button><button data-dock-step="1" type="button" aria-label="Next museum chapter">→</button></div></div><button type="button" class="dock-open" id="dockOpen">DISCOVER THIS CHAPTER <span>↗</span></button></div>`}
function updateDock(dir=0){dockIndex=(dockIndex+featured.length+dir)%featured.length;const s=byId(featured[dockIndex]);if(!s)return;
 const cover=document.getElementById('dockCover');if(!cover)return;
 cover.style.backgroundImage=imageUrl(s.image);document.getElementById('dockTitle').textContent=s.name;
 document.getElementById('dockEyebrow').textContent='EXHIBITION / '+String(dockIndex+1).padStart(2,'0')+' — 08';
 document.getElementById('dockSub').textContent=s.short;
 document.getElementById('dockOpen').onclick=()=>A.route(s.id);
 if(dir&&motion()&&realGSAP()){window.gsap.fromTo(cover,{clipPath:dir>0?'inset(0 100% 0 0)':'inset(0 0 0 100%)',scale:1.1},{clipPath:'inset(0 0% 0 0%)',scale:1,duration:.64,ease:'power3.out'})}
}
function installDock(){const hero=page.querySelector('.home-hero');if(!hero)return;hero.insertAdjacentHTML('beforeend',featureDock());updateDock(0);hero.querySelectorAll('[data-dock-step]').forEach(b=>b.addEventListener('click',()=>updateDock(Number(b.dataset.dockStep))));}
// Supplied photograph strip responds to dragging/wheel, reveals an image in the existing lightbox.
function installRibbon(){if(A.state.route!=='home')return;const target=page.querySelector('.home-hero');if(!target)return;
 const imgs=D.images.filter(x=>x.src).slice(0,13);if(!imgs.length)return;
 const s=document.createElement('section');s.className='glass-ribbon-section';s.innerHTML=`<div class="glass-ribbon-head"><div><div class="eyebrow">WINDOWS INTO THE ARCHIVE / ORIGINAL PHOTOGRAPHS</div><h2>A history you can <em>see.</em></h2></div><p>Explore imagery from the supplied collection. Swipe sideways and select an image to discover its archival label.</p></div><div class="glass-ribbon">${imgs.map(im=>{const i=D.images.indexOf(im);return `<button type="button" class="glass-ribbon-card" data-image-index="${i}" aria-label="View archival image ${esc(im.title||im.caption||String(i+1))}"><img loading="lazy" alt="${esc(im.title||'Supplied archive photo')}" src="${esc(im.src)}"><span>${esc(im.title||im.caption||'ARCHIVE PHOTOGRAPH')}</span></button>`}).join('')}</div>`;
 target.insertAdjacentElement('afterend',s);const strip=s.querySelector('.glass-ribbon');let dragging=false,origin=0,start=0,pointerId=null;
 strip.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')return;dragging=true;origin=e.clientX;start=strip.scrollLeft;pointerId=e.pointerId});
 strip.addEventListener('pointermove',e=>{if(!dragging)return;const dx=e.clientX-origin;if(Math.abs(dx)>8){strip.scrollLeft=start-dx;strip.dataset.dragged='yes'}});
 const release=()=>{dragging=false;pointerId=null;setTimeout(()=>delete strip.dataset.dragged,80)};strip.addEventListener('pointerup',release);strip.addEventListener('pointerleave',release);
 strip.querySelectorAll('.glass-ribbon-card').forEach(b=>b.addEventListener('click',e=>{if(strip.dataset.dragged==='yes'){e.stopImmediatePropagation();e.preventDefault()}}));
}
function installLightSlices(){[...page.querySelectorAll('.chapter-card,.aircraft-card,.film-card')].slice(0,35).forEach(card=>{if(card.querySelector('.light-slice'))return;card.insertAdjacentHTML('beforeend','<span class="light-slice" aria-hidden="true"></span>');card.addEventListener('pointerenter',()=>{card.classList.remove('glass-sweep');void card.offsetWidth;card.classList.add('glass-sweep')});card.addEventListener('animationend',e=>{if(e.animationName==='glass-slice')card.classList.remove('glass-sweep')})});}
function refreshRoute(id){routeCleanup.forEach(fn=>{try{fn()}catch{}});routeCleanup=[];
 observer?.disconnect();observer=null;scrollObserver?.disconnect();scrollObserver=null;
 if(window.ScrollTrigger)try{window.ScrollTrigger.getAll().filter(t=>t.vars?.id==='naf-glass').forEach(t=>t.kill())}catch{}
 if(id==='home'){installDock();installRibbon()}
 installLightSlices();
 const hero=page.querySelector('.home-hero,.chapter-hero');
 if(hero){if(id!=='home')hero.insertAdjacentHTML('beforeend','<div class="glass-bottom-index"><span></span> NIGERIAN AIR FORCE / HISTORICAL EXHIBITION</div>');
 const h=hero.querySelector('.home-title h1,.hero-copy h1'),p=hero.querySelector('.home-title p,.hero-copy p'),media=hero.querySelector('.home-media,.hero-image');
 if(motion()){
   if(realGSAP()){
     const tl=window.gsap.timeline({defaults:{ease:'power4.out'}});
     if(h)tl.fromTo(h,{y:65,opacity:0,filter:'blur(14px)'},{y:0,opacity:1,filter:'blur(0px)',duration:1.2},0);
     if(p)tl.fromTo(p,{y:22,opacity:0},{y:0,opacity:1,duration:.9},.2);
     if(hero.querySelector('.glass-feature-dock'))tl.fromTo(hero.querySelector('.glass-feature-dock'),{y:50,opacity:0,rotateY:11},{y:0,opacity:1,rotateY:0,duration:1.1},.5);
     if(media&&window.ScrollTrigger){window.gsap.to(media,{scale:1.19,rotation:.35,ease:'none',scrollTrigger:{id:'naf-glass',trigger:hero,scroller:page,start:'top top',end:'bottom top',scrub:1.15}})}
   }else fallbackIn([h,p].filter(Boolean),80);
 }
 }
 const reveal=[...page.querySelectorAll('.chapter-card,.aircraft-card,.film-card,.milestone,.section-head,.glass-ribbon-card,.feature-band,.section-banner')];
 if(motion()&&realGSAP()&&window.ScrollTrigger){
   window.gsap.utils.toArray(reveal).forEach(el=>{window.gsap.fromTo(el,{y:36,autoAlpha:0},{y:0,autoAlpha:1,duration:.85,ease:'power3.out',scrollTrigger:{id:'naf-glass',trigger:el,scroller:page,start:'top 95%',once:true}})});
 }else if(motion()&&window.IntersectionObserver){observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){observer.unobserve(e.target);fallbackIn([e.target])}}),{root:page,threshold:.04});reveal.forEach(el=>observer.observe(el))}
 const covers=page.querySelectorAll('.chapter-card,.aircraft-card,.archive-image');
 if(!touch&&motion()){covers.forEach(card=>{const shine=e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%')};card.addEventListener('pointermove',shine,{passive:true});routeCleanup.push(()=>card.removeEventListener('pointermove',shine))})}
}
window.addEventListener('museum:route',e=>refreshRoute(e.detail.id));
window.addEventListener('museum:reset',()=>{toggleMenu(false,true);dockIndex=0});
window.addEventListener('museum:enter',()=>{if(motion()&&realGSAP()){window.gsap.fromTo('.topbar',{y:-90,opacity:0},{y:0,opacity:1,duration:.75,ease:'power3.out'});window.gsap.fromTo('.nav-rail',{x:-90,opacity:0},{x:0,opacity:1,duration:.75,ease:'power3.out'})}});
// GSAP gets loaded from local scripts when the user's Windows machine performs the optional one-time library install.
if(realGSAP()&&window.ScrollTrigger){try{window.gsap.registerPlugin(window.ScrollTrigger)}catch{}}
refreshRoute(A.state.route);
window.NAFGlassStudio={version:'Aether Glass / Immersive Exhibition 2026',games:false,gsapLoaded:realGSAP(),openMenu:()=>toggleMenu(true),closeMenu:()=>toggleMenu(false),refresh:()=>refreshRoute(A.state.route)};
})();
