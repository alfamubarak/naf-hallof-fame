(function(){
 let observerCleanup=null;
 window.MuseumAnimations={
   onPage(page){if(observerCleanup)observerCleanup();observerCleanup=window.KioskMotion.reveal(page)||null;},
   photoSwap(el){if(!el)return;window.KioskMotion.enter(el)},
   intro(){const logo=document.querySelector('.welcome-logo'),headline=document.querySelector('.welcome-content h1'),cta=document.querySelector('.welcome-actions');if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
      if(window.gsap){window.gsap.from([logo,headline,cta],{opacity:0,y:45,duration:1.1,stagger:.18,ease:'power3.out'})}else [logo,headline,cta].forEach((e,i)=>{e&&e.animate([{opacity:0,transform:'translateY(50px)'},{opacity:1,transform:'translateY(0)'}],{duration:900,delay:180*i,easing:'cubic-bezier(.19,1,.22,1)',fill:'both'})})
   }
 };
 window.addEventListener('load',()=>window.MuseumAnimations.intro());
})();
