(function(){
 let animId=null,rail=null,paused=false,last=0;
 function stop(){if(animId)cancelAnimationFrame(animId);animId=null;rail=null;last=0}
 function start(selector){stop();rail=typeof selector==='string'?document.querySelector(selector):selector;if(!rail)return;
   const ref=rail;const addPause=()=>paused=true,removePause=()=>paused=false;
   rail.addEventListener('pointerenter',addPause,{once:false});rail.addEventListener('pointerleave',removePause,{once:false});
   rail.addEventListener('focusin',addPause,{once:false});rail.addEventListener('focusout',removePause,{once:false});
   rail.addEventListener('pointerdown',addPause,{once:false});rail.addEventListener('pointerup',()=>setTimeout(removePause,800),{once:false});
   let dragging=false,originX=0,initialScroll=0;
   rail.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;dragging=true;originX=e.clientX;initialScroll=rail.scrollLeft;},{passive:true});
   rail.addEventListener('pointermove',e=>{if(!dragging)return;const diff=e.clientX-originX;if(Math.abs(diff)>5){rail.scrollLeft=initialScroll-diff;rail.dataset.dragged='yes'}},{passive:true});
   window.addEventListener('pointerup',()=>{dragging=false;setTimeout(()=>{if(ref)ref.dataset.dragged=''},150)}, {once:true});
   if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
   const tick=t=>{if(ref!==rail)return;const dt=last?Math.min(40,t-last):16;last=t;if(!paused&&document.visibilityState==='visible'&&rail.scrollWidth>rail.clientWidth+5){rail.scrollLeft+=dt*.02;if(rail.scrollLeft>=rail.scrollWidth-rail.clientWidth-3)rail.scrollLeft=0}animId=requestAnimationFrame(tick)};
   animId=requestAnimationFrame(tick);
 }
 window.MuseumGallery={start,stop,scroll(amount){if(rail){paused=true;rail.scrollBy({left:amount,behavior:'smooth'});setTimeout(()=>paused=false,1400)}}};
})();
