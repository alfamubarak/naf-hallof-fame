(function(){
 const fine=window.matchMedia&&window.matchMedia('(hover: hover) and (pointer: fine)').matches;
 if(!fine||(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches))return;
 const ring=document.getElementById('cursorOrbit'),dot=document.getElementById('cursorDot'),label=document.getElementById('cursorName');
 if(!ring||!dot)return;
 let x=-120,y=-120,rx=-120,ry=-120,hasMoved=false,raf=0;
 const loop=()=>{rx+=(x-rx)*.18;ry+=(y-ry)*.18;ring.style.transform=`translate3d(${rx-41}px,${ry-41}px,0)`;dot.style.transform=`translate3d(${x-3}px,${y-3}px,0)`;raf=requestAnimationFrame(loop)};
 const onMove=e=>{x=e.clientX;y=e.clientY;if(!hasMoved){hasMoved=true;document.documentElement.classList.add('custom-cursor');raf=requestAnimationFrame(loop)}};
 document.addEventListener('pointermove',onMove,{passive:true});
 document.addEventListener('pointerover',e=>{const target=e.target.closest('[data-cursor], button, a, [role="button"]');document.documentElement.classList.toggle('cursor-hover',!!target);label.textContent=(target&&target.dataset.cursor)||'EXPLORE'});
 document.addEventListener('pointerout',e=>{if(!e.relatedTarget||!e.relatedTarget.closest('[data-cursor],button,a,[role="button"]'))document.documentElement.classList.remove('cursor-hover')});
 document.addEventListener('pointerdown',()=>document.documentElement.classList.add('cursor-click'));
 document.addEventListener('pointerup',()=>document.documentElement.classList.remove('cursor-click'));
 window.addEventListener('blur',()=>document.documentElement.classList.remove('cursor-click'));
 window.addEventListener('pagehide',()=>cancelAnimationFrame(raf));
})();
