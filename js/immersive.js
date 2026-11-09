/* NAF / THE SKY REMEMBERS
   Interactive museum motion: art direction + natural feedback, never a game.
   Runs offline, uses Web Animations API and Canvas. No remote libraries. */
(function(){
 'use strict';
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const fine=window.matchMedia('(hover: hover) and (pointer: fine)').matches;
 const page=document.getElementById('page');
 const welcome=document.getElementById('welcomeScreen');
 const overlay=document.getElementById('sceneTransition');
 const rail=document.getElementById('sectionRail');
 const modal=document.getElementById('modal');
 const modalPanel=document.getElementById('modalPanel');
 const sections=window.MuseumApp?.sections||[];
 const ease='cubic-bezier(.17,1,.3,1)';
 let sceneTimer=null, revealObserver=null, scrollQueued=false, currentRoute='home';

 const animate=(el,frames,options)=>{
   if(!el||reduced||typeof el.animate!=='function')return;
   try{return el.animate(frames,Object.assign({duration:750,easing:ease,fill:'both'},options||{}))}catch(_e){}
 };
 function mountDownArrow(){
   const hero=page.querySelector('.home-hero, .chapter-hero');
   if(!hero)return;
   const btn=document.createElement('button');
   btn.className='exhibition-scroll-cue';btn.type='button';
   btn.setAttribute('aria-label','Scroll to exhibition content');
   btn.innerHTML='<span>SCROLL TO DISCOVER</span><span class="scroll-cue-arrow" aria-hidden="true">↓</span>';
   btn.addEventListener('click',()=>{
      const next=hero.nextElementSibling;if(!next)return;
      next.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});
   });
   hero.appendChild(btn);
 }
 function prepareRoute(id){
   currentRoute=id;mountDownArrow();
   if(revealObserver)revealObserver.disconnect();
   const candidates=page.querySelectorAll('.section-head:not([data-reveal]), .section-banner, .milestone:not([data-reveal]), .film-card:not([data-reveal]), .aircraft-card:not([data-reveal]), .archive-image:not([data-reveal]), .chapter-tail, .feature-band');
   if(!reduced&&window.IntersectionObserver){
     revealObserver=new IntersectionObserver(entries=>{
       entries.forEach(entry=>{
         if(!entry.isIntersecting)return;
         revealObserver.unobserve(entry.target);
         animate(entry.target,[{opacity:0,transform:'translateY(34px)'},{opacity:1,transform:'translateY(0)'}],{duration:850});
       });
     },{threshold:.05,root:page});
     candidates.forEach(el=>revealObserver.observe(el));
   }
   const hero=page.querySelector('.hero-copy, .home-title');
   if(hero){
      const items=[...hero.children];
      items.forEach((el,i)=>animate(el,[{opacity:0,transform:'translate3d(0,40px,0)',filter:'blur(7px)'},{opacity:1,transform:'translate3d(0,0,0)',filter:'blur(0)'}],{duration:1000,delay:90+i*135}));
   }
   const here=id==='home'?0:Math.max(0,sections.findIndex(x=>x.id===id))+1;
   rail.querySelector('.section-rail-no').textContent=String(here).padStart(2,'0');
   rail.querySelector('.section-rail-label').textContent=id==='home'?'THE EXHIBITION':sections.find(s=>s.id===id)?.name||'THE EXHIBITION';
   if(!reduced){
      overlay.classList.remove('active');void overlay.offsetWidth;
      overlay.classList.add('active');clearTimeout(sceneTimer);
      sceneTimer=setTimeout(()=>overlay.classList.remove('active'),1080);
   }
   document.documentElement.style.setProperty('--reading-pct','0%');
   scrollUpdate();
 }
 function scrollUpdate(){
    if(scrollQueued)return;scrollQueued=true;
    requestAnimationFrame(()=>{
      scrollQueued=false;
      const max=Math.max(1,page.scrollHeight-page.clientHeight);
      document.documentElement.style.setProperty('--reading-pct',(Math.max(0,Math.min(100,page.scrollTop/max*100)))+'%');
      const hero=page.querySelector('.hero-image, .home-media');
      if(hero&&!reduced){hero.style.setProperty('--hero-shift',Math.min(145,page.scrollTop*.18)+'px')}
    });
 }
 page.addEventListener('scroll',scrollUpdate,{passive:true});
 window.addEventListener('museum:route',e=>prepareRoute(e.detail?.id||'home'));
 window.addEventListener('museum:enter',()=>{
     if(!reduced)animate(document.querySelector('.brand-mark img'),[{filter:'drop-shadow(0 0 25px #f5d68e)'},{filter:'drop-shadow(0 0 0px transparent)'}],{duration:1800});
 });
 // Make existing custom cursor, cards, and controls feel physically responsive.
 if(fine&&!reduced){
   let activeCard=null,activeButton=null;
   const tiles='.chapter-card, .aircraft-card, .leader-tile, .archive-image';
   document.addEventListener('pointermove',e=>{
     const card=e.target.closest(tiles);
     if(activeCard&&activeCard!==card){activeCard.style.setProperty('--card-rx','0deg');activeCard.style.setProperty('--card-ry','0deg')}
     activeCard=card;
     if(card){
       const rect=card.getBoundingClientRect(),nx=Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width)),ny=Math.max(0,Math.min(1,(e.clientY-rect.top)/rect.height));
       card.style.setProperty('--mx',(nx*100).toFixed(1)+'%');card.style.setProperty('--my',(ny*100).toFixed(1)+'%');
       if(card.classList.contains('chapter-card')){
         card.style.setProperty('--card-rx',((.5-ny)*6).toFixed(2)+'deg');
         card.style.setProperty('--card-ry',((nx-.5)*7).toFixed(2)+'deg');
       }
     }
     const btn=e.target.closest('.button-gold,.ghost-btn');
     if(activeButton&&activeButton!==btn)activeButton.style.removeProperty('--magnetic-x');
     activeButton=btn;
     if(btn){const r=btn.getBoundingClientRect();btn.style.setProperty('--magnetic-x',((e.clientX-(r.left+r.width/2))*0.03).toFixed(1)+'px')}
   },{passive:true});
   document.addEventListener('pointerout',e=>{
     const card=e.target.closest(tiles);
     if(card&&!card.contains(e.relatedTarget)){
       card.style.setProperty('--card-rx','0deg');card.style.setProperty('--card-ry','0deg');
     }
   },{passive:true});
 }
 document.addEventListener('pointerdown',e=>{
   if(reduced||!e.target.closest('button,[role="button"]'))return;
   const glint=document.createElement('span');glint.className='click-glint';glint.style.left=e.clientX+'px';glint.style.top=e.clientY+'px';
   document.body.appendChild(glint);glint.addEventListener('animationend',()=>glint.remove(),{once:true});
 },{passive:true});
 // Special gallery lightbox state and touch-swipe navigation.
 function updateCinema(){const isCinema=!modal.hidden&&!!modalPanel.querySelector('.cinema-stage');modalPanel.classList.toggle('cinema-mode',isCinema)}
 const modalObserver=new MutationObserver(updateCinema);
 modalObserver.observe(modal,{attributes:true,attributeFilter:['hidden']});
 modalObserver.observe(modalPanel,{childList:true});
 let startX=null,startY=null;
 modal.addEventListener('pointerdown',e=>{
    if(!e.target.closest('.cinema-stage'))return;
    startX=e.clientX;startY=e.clientY;
 },{passive:true});
 modal.addEventListener('pointerup',e=>{
    if(startX===null)return;
    const dx=e.clientX-startX,dy=e.clientY-startY;
    startX=null;startY=null;
    if(Math.abs(dx)<65||Math.abs(dx)<Math.abs(dy)*1.4)return;
    modal.querySelector(dx<0?'[data-gallery-step="1"]':'[data-gallery-step="-1"]')?.click();
 },{passive:true});
 // Ambient flecks of gold: subtle particles evoke exhibition lighting, not radar or arcade effects.
 const canvas=document.getElementById('skyParticles');
 if(canvas&&!reduced){
  const ctx=canvas.getContext('2d',{alpha:true});
  if(ctx){
    const stars=[],count=56;let width=0,height=0,pixel=1,raf=0,visible=true;
    function resize(){
      pixel=Math.min(2,devicePixelRatio||1);width=window.innerWidth;height=window.innerHeight;
      canvas.width=Math.round(width*pixel);canvas.height=Math.round(height*pixel);
      ctx.setTransform(pixel,0,0,pixel,0,0);
      stars.length=0;
      for(let i=0;i<count;i++)stars.push({x:Math.random()*width,y:Math.random()*height,r:.35+Math.random()*1.15,speed:.08+Math.random()*.17,p:Math.random()*6.28,green:Math.random()>.75});
    }
    function frame(time){
      if(!visible)return;
      ctx.clearRect(0,0,width,height);
      for(const p of stars){
         p.y-=p.speed;if(p.y<0){p.y=height;p.x=Math.random()*width}
         const a=.17+(Math.sin(time*.0004+p.p)+1)*.17;
         ctx.fillStyle=p.green?`rgba(84,171,130,${a})`:`rgba(239,204,133,${a})`;
         ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
      }
      raf=requestAnimationFrame(frame);
    }
    resize();window.addEventListener('resize',resize,{passive:true});
    document.addEventListener('visibilitychange',()=>{visible=!document.hidden;if(visible)raf=requestAnimationFrame(frame);else cancelAnimationFrame(raf)});
    raf=requestAnimationFrame(frame);
  }
 }
 // Distinct animated entrance once images are ready; do not change historical text.
 if(!reduced){
   const title=welcome.querySelector('h1');
   const cta=welcome.querySelector('.button-gold');
   [title,cta].forEach((el,i)=>animate(el,[{opacity:0,transform:'translateY(45px)',filter:'blur(10px)'},{opacity:1,transform:'translateY(0px)',filter:'blur(0px)'}],{duration:1250,delay:i*220+130}));
 }
 prepareRoute('home');
 window.MuseumImmersive={version:'Cinematic Exhibition',hasGames:false,refresh:()=>prepareRoute(window.MuseumApp.state.route)};
})();
