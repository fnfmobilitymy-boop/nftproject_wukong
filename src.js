const dialog = document.querySelector('dialog');
document.querySelector('.wallet').addEventListener('click',()=>dialog.showModal());
document.querySelectorAll('.close,.close-action').forEach(b=>b.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
const menu=document.querySelector('.menu');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);document.querySelector('nav').classList.toggle('open',open)});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('nav').classList.remove('open');menu.setAttribute('aria-expanded','false')}));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b===button));document.querySelectorAll('.card').forEach(card=>card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter)}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.section').forEach(s=>{s.classList.add('reveal');observer.observe(s)});

// A layered cinematic scene. Pointer work stays on the compositor; particles share one canvas.
const hero=document.querySelector('.hero');
const layer=document.createElement('div');layer.className='wukong-motion';layer.setAttribute('aria-hidden','true');hero.querySelector('.hero-art').after(layer);
const mist=document.createElement('div');mist.className='scene-mist';mist.setAttribute('aria-hidden','true');hero.append(mist);
const motionButton=document.createElement('button');motionButton.className='motion-toggle';motionButton.textContent='动效 ON';motionButton.setAttribute('aria-label','暂停场景动效');document.querySelector('.hero-bottom').before(motionButton);
const canvas=document.createElement('canvas');canvas.className='cloud-canvas';canvas.setAttribute('aria-hidden','true');document.body.append(canvas);const ctx=canvas.getContext('2d');
let width=innerWidth,height=innerHeight,dpr=Math.min(devicePixelRatio||1,2),particles=[],running=!matchMedia('(prefers-reduced-motion: reduce)').matches,frame=0,last=0,scroll=0;
function resize(){width=innerWidth;height=innerHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}resize();addEventListener('resize',resize,{passive:true});
function toggleMotion(){running=!running;document.body.classList.toggle('motion-paused',!running);motionButton.textContent=running?'动效 ON':'动效 OFF';motionButton.setAttribute('aria-label',running?'暂停场景动效':'开启场景动效');if(!running){particles=[];ctx.clearRect(0,0,width,height)}}
if(!running){document.body.classList.add('motion-paused');motionButton.textContent='动效 OFF'}motionButton.addEventListener('click',toggleMotion);
function puff(x,y,burst=false){if(!running)return;for(let i=0;i<(burst?24:3);i++){const angle=Math.random()*Math.PI*2;particles.push({x,y,vx:Math.cos(angle)*(burst?2.8:.65),vy:Math.sin(angle)*(burst?2.8:.65)-.3,life:1,size:burst?8+Math.random()*19:12+Math.random()*23,gold:burst&&i%3===0})}if(particles.length>160)particles.splice(0,particles.length-160)}
addEventListener('pointermove',e=>{if(!running)return;const now=performance.now();if(now-last>25){puff(e.clientX,e.clientY);last=now}if(e.clientY<hero.offsetHeight){hero.style.setProperty('--pointer-x',`${(e.clientX/width-.5)*16}px`);hero.style.setProperty('--pointer-y',`${(e.clientY/height-.5)*10}px`) }},{passive:true});
addEventListener('touchmove',e=>{const t=e.touches[0];if(t)puff(t.clientX,t.clientY)},{passive:true});
addEventListener('pointerdown',e=>{if(e.target.closest('.motion-toggle'))return;puff(e.clientX,e.clientY,true);if(running&&e.clientY+window.scrollY<hero.offsetHeight&&!e.target.closest('a,button')){hero.classList.remove('power-strike');void hero.offsetWidth;hero.classList.add('power-strike');setTimeout(()=>hero.classList.remove('power-strike'),1000)}},{passive:true});
addEventListener('scroll',()=>{scroll=window.scrollY;if(running){const progress=Math.min(scroll/hero.offsetHeight,1);hero.style.setProperty('--zoom',1+progress*.2);hero.style.setProperty('--camera-y',`${scroll*.13}px`)}},{passive:true});
function draw(time){if(running&&!document.hidden){ctx.clearRect(0,0,width,height);for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.x+=p.vx;p.y+=p.vy;p.life-=.018;p.size+=.35;if(p.life<=0){particles.splice(i,1);continue}const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size);g.addColorStop(0,p.gold?`rgba(241,195,98,${p.life*.65})`:`rgba(219,231,216,${p.life*.12})`);g.addColorStop(1,'rgba(220,230,215,0)');ctx.fillStyle=g;ctx.fillRect(p.x-p.size,p.y-p.size,p.size*2,p.size*2)} }frame=requestAnimationFrame(draw)}frame=requestAnimationFrame(draw);
