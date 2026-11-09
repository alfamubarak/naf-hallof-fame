/* Offline native motion layer. Uses real GSAP if a local licensed copy is supplied.
   Otherwise animations are powered by the browser's Web Animations API, with no network calls. */
(function(){
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motion={
    reduced,
    to(el,props={}){if(!el)return null; if(window.gsap)return window.gsap.to(el,props);const duration=(props.duration||.65)*1000;const from={},to={};const keymap={x:'translateX',y:'translateY'};const tfrom=[],tto=[];
      ['opacity','scale','rotate','x','y'].forEach(k=>{if(props[k]===undefined)return; if(k==='x'||k==='y'){tfrom.push(`${keymap[k]}(0px)`);tto.push(`${keymap[k]}(${props[k]}px)`)}else if(k==='scale'||k==='rotate'){tfrom.push(k==='scale'?'scale(1)':'rotate(0deg)');tto.push(k==='scale'?`scale(${props[k]})`:`rotate(${props[k]}deg)`)}else{from[k]=getComputedStyle(el)[k];to[k]=props[k]}});
      if(tto.length){from.transform=tfrom.join(' ');to.transform=tto.join(' ')}if(reduced){Object.assign(el.style,to);return null}return el.animate([from,to],{duration,easing:'cubic-bezier(.19,1,.22,1)',fill:'forwards'});
    },
    reveal(root){if(reduced)return; const elements=Array.from(root.querySelectorAll('[data-reveal]')); if(!elements.length)return; const observer=new IntersectionObserver(entries=>{for(const x of entries){if(!x.isIntersecting)continue;observer.unobserve(x.target);x.target.animate([{opacity:0,transform:'translateY(32px)'},{opacity:1,transform:'translateY(0)'}],{duration:760,easing:'cubic-bezier(.19,1,.22,1)',fill:'both'})}},{threshold:.08});elements.forEach(e=>observer.observe(e));return()=>observer.disconnect()},
    enter(el){if(!el||reduced)return; el.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.19,1,.22,1)'})},
    welcomeEnd(el,done){if(reduced){el.hidden=true;done();return}if(window.gsap){window.gsap.to(el,{opacity:0,duration:.72,onComplete:()=>{el.hidden=true;done()}})}else{const anim=el.animate([{opacity:1},{opacity:0}],{duration:720,easing:'ease-in-out',fill:'forwards'});anim.onfinish=()=>{el.hidden=true;done()}}},
    pulse(el){if(!el||reduced)return;el.animate([{transform:'scale(1)'},{transform:'scale(.94)'},{transform:'scale(1)'}],{duration:320})}
  };window.KioskMotion=motion;
})();
