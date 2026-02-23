const html=document.documentElement,toggle=document.getElementById('themeToggle');
const stored=localStorage.getItem('mg-theme');if(stored)html.setAttribute('data-theme',stored);
toggle.addEventListener('click',()=>{const c=html.getAttribute('data-theme'),n=c==='light'?'dark':'light';html.setAttribute('data-theme',n);localStorage.setItem('mg-theme',n)});
const nav=document.getElementById('nav');window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>60)});
const navToggle=document.getElementById('navToggle'),mobileMenu=document.getElementById('mobileMenu'),mobileClose=document.getElementById('mobileClose');
navToggle.addEventListener('click',()=>mobileMenu.classList.add('open'));
mobileClose.addEventListener('click',()=>mobileMenu.classList.remove('open'));
mobileMenu.addEventListener('click',function(e){if(e.target===mobileMenu)mobileMenu.classList.remove('open')});
function closeMobile(){mobileMenu.classList.remove('open');}
const reveals=document.querySelectorAll('.reveal'),observer=new IntersectionObserver((entries)=>{entries.forEach((entry,i)=>{if(entry.isIntersecting){setTimeout(()=>entry.target.classList.add('visible'),i*80);observer.unobserve(entry.target)}})},{threshold:0.15});
reveals.forEach(el=>observer.observe(el));
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',function(e){e.preventDefault();const t=document.querySelector(this.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth',block:'start'})})});