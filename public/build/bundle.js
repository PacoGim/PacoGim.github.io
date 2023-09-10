var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function s(t){t.forEach(e)}function o(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function l(e,n,s){e.$$.on_destroy.push(function(e,...n){if(null==e){for(const t of n)t(void 0);return t}const s=e.subscribe(...n);return s.unsubscribe?()=>s.unsubscribe():s}(n,s))}function i(t,e,n){return t.set(n),e}function a(t,e){t.appendChild(e)}function c(t,e,n){t.insertBefore(e,n||null)}function u(t){t.parentNode&&t.parentNode.removeChild(t)}function d(t){return document.createElement(t)}function f(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function m(t){return document.createTextNode(t)}function h(){return m(" ")}function p(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function g(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function $(t,e,n){e in t?t[e]="boolean"==typeof t[e]&&""===n||n:g(t,e,n)}function y(t,e,n){t.classList.toggle(e,!!n)}let v;function x(t){v=t}function w(t){(function(){if(!v)throw new Error("Function called outside component initialization");return v})().$$.on_mount.push(t)}const b=[],k=[];let C=[];const _=[],S=Promise.resolve();let z=!1;function E(t){C.push(t)}const M=new Set;let I=0;function H(){if(0!==I)return;const t=v;do{try{for(;I<b.length;){const t=b[I];I++,x(t),L(t.$$)}}catch(t){throw b.length=0,I=0,t}for(x(null),b.length=0,I=0;k.length;)k.pop()();for(let t=0;t<C.length;t+=1){const e=C[t];M.has(e)||(M.add(e),e())}C.length=0}while(b.length);for(;_.length;)_.pop()();z=!1,M.clear(),x(t)}function L(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(E)}}const T=new Set;let q;function j(t,e){t&&t.i&&(T.delete(t),t.i(e))}function P(t,e,n,s){if(t&&t.o){if(T.has(t))return;T.add(t),q.c.push((()=>{T.delete(t),s&&(n&&t.d(1),s())})),t.o(e)}else s&&s()}function D(t){t&&t.c()}function A(t,n,r){const{fragment:l,after_update:i}=t.$$;l&&l.m(n,r),E((()=>{const n=t.$$.on_mount.map(e).filter(o);t.$$.on_destroy?t.$$.on_destroy.push(...n):s(n),t.$$.on_mount=[]})),i.forEach(E)}function N(t,e){const n=t.$$;null!==n.fragment&&(!function(t){const e=[],n=[];C.forEach((s=>-1===t.indexOf(s)?e.push(s):n.push(s))),n.forEach((t=>t())),C=e}(n.after_update),s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function F(t,e){-1===t.$$.dirty[0]&&(b.push(t),z||(z=!0,S.then(H)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function G(e,o,r,l,i,a,c,d=[-1]){const f=v;x(e);const m=e.$$={fragment:null,ctx:[],props:a,update:t,not_equal:i,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(o.context||(f?f.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:o.target||f.$$.root};c&&c(m.root);let h=!1;if(m.ctx=r?r(e,o.props||{},((t,n,...s)=>{const o=s.length?s[0]:n;return m.ctx&&i(m.ctx[t],m.ctx[t]=o)&&(!m.skip_bound&&m.bound[t]&&m.bound[t](o),h&&F(e,t)),n})):[],m.update(),h=!0,s(m.before_update),m.fragment=!!l&&l(m.ctx),o.target){if(o.hydrate){const t=function(t){return Array.from(t.childNodes)}(o.target);m.fragment&&m.fragment.l(t),t.forEach(u)}else m.fragment&&m.fragment.c();o.intro&&j(e.$$.fragment),A(e,o.target,o.anchor),H()}x(f)}class B{$$=void 0;$$set=void 0;$destroy(){N(this,1),this.$destroy=t}$on(e,n){if(!o(n))return t;const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(n),()=>{const t=s.indexOf(n);-1!==t&&s.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function O(e){let n,s,o;return{c(){n=d("div"),s=d("div"),o=m(e[0]),g(s,"class","gold-text highlight svelte-x8r0yh"),g(s,"data-text",e[0]),g(n,"class","gold-container svelte-x8r0yh"),g(n,"style",e[1])},m(t,e){c(t,n,e),a(n,s),a(s,o)},p(t,[e]){1&e&&function(t,e){e=""+e,t.data!==e&&(t.data=e)}(o,t[0]),1&e&&g(s,"data-text",t[0]),2&e&&g(n,"style",t[1])},i:t,o:t,d(t){t&&u(n)}}}function V(t,e,n){let{text:s=""}=e,{style:o=""}=e;return t.$$set=t=>{"text"in t&&n(0,s=t.text),"style"in t&&n(1,o=t.style)},[s,o]}"undefined"!=typeof window&&(window.__svelte||(window.__svelte={v:new Set})).v.add("4");class Z extends B{constructor(t){super(),G(this,t,V,O,r,{text:0,style:1})}}const Y=[];function R(e,n=t){let s;const o=new Set;function l(t){if(r(e,t)&&(e=t,s)){const t=!Y.length;for(const t of o)t[1](),Y.push(t,e);if(t){for(let t=0;t<Y.length;t+=2)Y[t][0](Y[t+1]);Y.length=0}}}function i(t){l(t(e))}return{set:l,update:i,subscribe:function(r,a=t){const c=[r,a];return o.add(c),1===o.size&&(s=n(l,i)||t),r(e),()=>{o.delete(c),0===o.size&&s&&(s(),s=null)}}}}let W=R("big"),J=R(localStorage.getItem("lang")||"en");function K(t){let e,n,s,o,r,l,i,f;return{c(){e=d("hamburger-menu"),n=d("hamburger-line"),s=h(),o=d("hamburger-line"),r=h(),l=d("hamburger-line"),$(n,"class","svelte-1dsezsd"),$(o,"class","svelte-1dsezsd"),$(l,"class","svelte-1dsezsd"),$(e,"onclick",i=t[3]),$(e,"data-isactive",f=String(t[0])),$(e,"class","svelte-1dsezsd")},m(t,i){c(t,e,i),a(e,n),a(e,s),a(e,o),a(e,r),a(e,l)},p(t,n){1&n&&i!==(i=t[3])&&$(e,"onclick",i),1&n&&f!==(f=String(t[0]))&&$(e,"data-isactive",f)},d(t){t&&u(e)}}}function Q(t){let e,n,o,r,l,i,f,m,v,x,w,b,k,C,_,S,z,E,M,I,H,L,T,q,F,G,B;n=new Z({props:{text:"Paco Gimeno",style:"font-size: 2.5rem;margin-right:1rem;white-space: nowrap;"}});let O="small"===t[1]&&K(t);return{c(){e=d("navigation-svlt"),D(n.$$.fragment),o=h(),O&&O.c(),r=h(),l=d("nav-links"),i=d("a"),i.textContent="Home",f=h(),m=d("a"),m.textContent="Bio",v=h(),x=d("a"),x.textContent="Projects",w=h(),b=d("a"),b.textContent="Skills",k=h(),C=d("a"),C.textContent="Experience",_=h(),S=d("a"),S.textContent="Education",z=h(),E=d("lang-change"),M=d("button"),M.textContent="English",I=h(),H=d("separator"),H.textContent="|",L=h(),T=d("button"),T.textContent="Français",g(i,"href","#/"),g(i,"class","svelte-1dsezsd"),g(m,"href","#bio-section"),g(m,"class","svelte-1dsezsd"),g(x,"href","/"),g(x,"class","svelte-1dsezsd"),g(b,"href","/"),g(b,"class","svelte-1dsezsd"),g(C,"href","/"),g(C,"class","svelte-1dsezsd"),g(S,"href","/"),g(S,"class","svelte-1dsezsd"),g(M,"class","nostyle svelte-1dsezsd"),y(M,"selected","en"===t[2]),g(H,"class","svelte-1dsezsd"),g(T,"class","nostyle svelte-1dsezsd"),y(T,"selected","fr"===t[2]),$(E,"class","svelte-1dsezsd"),$(l,"data-isactive",q=String(t[0])),$(l,"class","svelte-1dsezsd"),$(e,"class","svelte-1dsezsd")},m(s,u){c(s,e,u),A(n,e,null),a(e,o),O&&O.m(e,null),a(e,r),a(e,l),a(l,i),a(l,f),a(l,m),a(l,v),a(l,x),a(l,w),a(l,b),a(l,k),a(l,C),a(l,_),a(l,S),a(l,z),a(l,E),a(E,M),a(E,I),a(E,H),a(E,L),a(E,T),F=!0,G||(B=[p(M,"click",t[4]),p(T,"click",t[5])],G=!0)},p(t,[n]){"small"===t[1]?O?O.p(t,n):(O=K(t),O.c(),O.m(e,r)):O&&(O.d(1),O=null),(!F||4&n)&&y(M,"selected","en"===t[2]),(!F||4&n)&&y(T,"selected","fr"===t[2]),(!F||1&n&&q!==(q=String(t[0])))&&$(l,"data-isactive",q)},i(t){F||(j(n.$$.fragment,t),F=!0)},o(t){P(n.$$.fragment,t),F=!1},d(t){t&&u(e),N(n),O&&O.d(),G=!1,s(B)}}}function U(t,e,n){let s,o;l(t,W,(t=>n(1,s=t))),l(t,J,(t=>n(2,o=t)));let r=!1;return[r,s,o,()=>n(0,r=!r),()=>i(J,o="en",o),()=>i(J,o="fr",o)]}J.subscribe((t=>{localStorage.setItem("lang",t)}));class X extends B{constructor(t){super(),G(this,t,U,Q,r,{})}}function tt(e){let n,s;return{c(){n=f("svg"),s=f("path"),g(s,"d","M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"),g(n,"xmlns","http://www.w3.org/2000/svg"),g(n,"style",e[0]),g(n,"width","32"),g(n,"height","32"),g(n,"fill","#000000"),g(n,"viewBox","0 0 256 256")},m(t,e){c(t,n,e),a(n,s)},p(t,[e]){1&e&&g(n,"style",t[0])},i:t,o:t,d(t){t&&u(n)}}}function et(t,e,n){let{style:s}=e;return t.$$set=t=>{"style"in t&&n(0,s=t.style)},[s]}class nt extends B{constructor(t){super(),G(this,t,et,tt,r,{style:0})}}function st(e){let n,s,o,r,l,i,f;return s=new nt({props:{style:"fill: #fff;margin-right: .5rem;"}}),{c(){n=d("button"),D(s.$$.fragment),o=h(),r=d("span"),r.textContent="PacoGimDev@gmail.com",g(n,"class","nostyle email svelte-1m8tke1")},m(t,e){c(t,n,e),A(s,n,null),a(n,o),a(n,r),l=!0,i||(f=p(n,"click",lt),i=!0)},p:t,i(t){l||(j(s.$$.fragment,t),l=!0)},o(t){P(s.$$.fragment,t),l=!1},d(t){t&&u(n),N(s),i=!1,f()}}}function ot(e){let n,s,o,r;return s=new nt({props:{style:"fill: #fff;margin-right: .5rem;"}}),{c(){n=d("a"),D(s.$$.fragment),o=m(" PacoGimDev@gmail.com"),g(n,"class","email svelte-1m8tke1"),g(n,"href","mailto:PacoGimDev@gmail.com")},m(t,e){c(t,n,e),A(s,n,null),a(n,o),r=!0},p:t,i(t){r||(j(s.$$.fragment,t),r=!0)},o(t){P(s.$$.fragment,t),r=!1},d(t){t&&u(n),N(s)}}}function rt(t){let e,n,o,r,l,i,f,m,y,v,x,w,b,k,C,_,S,z,E;const M=[ot,st],I=[];function H(t,e){return"small"!==t[1]?0:1}return m=H(t),y=I[m]=M[m](t),{c(){e=d("section-svlt"),n=d("description-container"),o=d("h1"),o.textContent="Hi, I am Paco Gimeno a Fullstack Engineer based in Paris.",r=h(),l=d("h2"),l.textContent="I make ideas become a reality from start to deployement",i=h(),f=d("email-container"),y.c(),v=h(),x=d("copy-email-container"),w=d("button"),w.textContent="Copy to clipboard",b=h(),k=d("copy-notification"),k.textContent="Copied!",C=h(),_=d("photo-container"),_.innerHTML='<img src="./img/my_face.jpg" alt="" class="svelte-1m8tke1"/>',g(o,"class","svelte-1m8tke1"),g(l,"class","svelte-1m8tke1"),g(w,"class","nostyle svelte-1m8tke1"),$(k,"class","svelte-1m8tke1"),$(x,"class","svelte-1m8tke1"),$(f,"class","svelte-1m8tke1"),$(n,"class","svelte-1m8tke1"),$(_,"class","svelte-1m8tke1"),$(e,"id","home-section"),$(e,"class","svelte-1m8tke1")},m(s,u){c(s,e,u),a(e,n),a(n,o),a(n,r),a(n,l),a(n,i),a(n,f),I[m].m(f,null),a(f,v),a(f,x),a(x,w),a(x,b),a(x,k),t[3](k),a(e,C),a(e,_),S=!0,z||(E=p(w,"click",t[2]),z=!0)},p(t,[e]){let n=m;m=H(t),m===n?I[m].p(t,e):(q={r:0,c:[],p:q},P(I[n],1,1,(()=>{I[n]=null})),q.r||s(q.c),q=q.p,y=I[m],y?y.p(t,e):(y=I[m]=M[m](t),y.c()),j(y,1),y.m(f,v))},i(t){S||(j(y),S=!0)},o(t){P(y),S=!1},d(n){n&&u(e),I[m].d(),t[3](null),z=!1,E()}}}function lt(t){let e=t.currentTarget,n=e;"span"!==e.tagName&&(n=e.querySelector("span")),window.getSelection().selectAllChildren(n)}function it(t,e,n){let s,o,r;return l(t,W,(t=>n(1,s=t))),[o,s,function(){navigator.clipboard.writeText("PacoGimDev@gmail.com").then((()=>{n(0,o.style.transform="translateY(-30px)",o),clearTimeout(r),r=setTimeout((()=>{n(0,o.style.transform="translateY(0px)",o)}),2e3)}))},function(t){k[t?"unshift":"push"]((()=>{o=t,n(0,o)}))}]}class at extends B{constructor(t){super(),G(this,t,it,rt,r,{})}}function ct(e){let n;return{c(){n=d("section-svlt"),n.innerHTML="<h1>Skills Section</h1>",$(n,"id","skills-section")},m(t,e){c(t,n,e)},p:t,i:t,o:t,d(t){t&&u(n)}}}class ut extends B{constructor(t){super(),G(this,t,null,ct,r,{})}}function dt(e){let n;return{c(){n=d("section-svlt"),n.innerHTML="<h1>experience Section</h1>",$(n,"id","experience-section")},m(t,e){c(t,n,e)},p:t,i:t,o:t,d(t){t&&u(n)}}}class ft extends B{constructor(t){super(),G(this,t,null,dt,r,{})}}function mt(e){let n;return{c(){n=d("section-svlt"),n.innerHTML="<h1>Education Section</h1>",$(n,"id","education-section")},m(t,e){c(t,n,e)},p:t,i:t,o:t,d(t){t&&u(n)}}}class ht extends B{constructor(t){super(),G(this,t,null,mt,r,{})}}function pt(e){let n,s,o,r,l,i,f,m,p,y,v,x,w,b,k,C,_,S,z,E,M,I,H,L;return{c(){n=d("section-svlt"),s=d("h1"),s.textContent="Hello!,",o=h(),r=d("h2"),r.textContent="I’m pleased to see that I may have peaked your interest and for that I’m already glad.",l=h(),i=d("br"),f=h(),m=d("p"),m.textContent="Born in France in 1992, I quickly learned to use computers. High School bored me to death so I finished all the mandatory\n\t\tstudies, moved to Spain then jumped right away in Programming studies.",p=h(),y=d("br"),v=h(),x=d("p"),x.textContent="I managed to surpass my expectations and ended up with the best grades while also helping my other classmates.",w=h(),b=d("br"),k=h(),C=d("p"),C.textContent="For my last year of schooling, I managed to get a place at the multinational INDRA as an intern but more about that in the\n\t\tExperience section.",_=h(),S=d("br"),z=h(),E=d("p"),E.textContent=`Now I'm a full stack engineer with ${function(){const t=new Date,e=new Date(2017,6,29),n=(t.getTime()-e.getTime())/315576e5;return Math.floor(n)}()} years of experience and I’m back in France looking for a job.`,M=h(),I=d("br"),H=h(),L=d("p"),L.textContent="I’m cheerful, kindhearted, lifelong learner, perfectionist and magnanimous.",g(m,"class","svelte-aqtif5"),g(x,"class","svelte-aqtif5"),g(C,"class","svelte-aqtif5"),g(E,"class","svelte-aqtif5"),g(L,"class","svelte-aqtif5"),$(n,"id","bio-section"),$(n,"class","svelte-aqtif5")},m(t,e){c(t,n,e),a(n,s),a(n,o),a(n,r),a(n,l),a(n,i),a(n,f),a(n,m),a(n,p),a(n,y),a(n,v),a(n,x),a(n,w),a(n,b),a(n,k),a(n,C),a(n,_),a(n,S),a(n,z),a(n,E),a(n,M),a(n,I),a(n,H),a(n,L)},p:t,i:t,o:t,d(t){t&&u(n)}}}class gt extends B{constructor(t){super(),G(this,t,null,pt,r,{})}}function $t(e){let n;return{c(){n=d("section-svlt"),n.innerHTML="<h1>projects Section</h1>",$(n,"id","projects-section"),$(n,"class","svelte-eld7zm")},m(t,e){c(t,n,e)},p:t,i:t,o:t,d(t){t&&u(n)}}}class yt extends B{constructor(t){super(),G(this,t,null,$t,r,{})}}let vt=document.querySelector("html");function xt(t){vt.setAttribute("screen-size",t),W.set(t)}function wt(t,e){return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t+1))+t}function bt(e){let n;return{c(){n=d("starry-sky"),$(n,"class","svelte-1chgjs6")},m(t,s){c(t,n,s),e[1](n)},p:t,i:t,o:t,d(t){t&&u(n),e[1](null)}}}function kt(t,e,n){let s;function o(t,e){let n=wt(0,e)-e/3,s=wt(0,t),o=e/3,r=document.createElement("cosmic-smoke");return r.style.left=`${n}px`,r.style.top=`${s}px`,r.style.height=`${o}px`,r.style.width=`${o}px`,r}function r(t,e){let n=wt(0,e),s=wt(0,t),o=wt(1,6),r=document.createElement("star");return r.style.left=`${n}px`,r.style.top=`${s}px`,r.style.height=`${o}px`,r.style.width=`${o}px`,r.style.animationDelay=`${wt(0,1e3)}ms`,r.style.animationDuration=`${wt(1e4,2e4)}ms`,r}return w((()=>{let t=document.querySelector("body").scrollHeight,e=window.innerWidth;for(let n=0;n<100;n++)s.appendChild(r(t,e));for(let n=0;n<3;n++)s.appendChild(o(t,e))})),[s,function(t){k[t?"unshift":"push"]((()=>{s=t,n(0,s)}))}]}class Ct extends B{constructor(t){super(),G(this,t,kt,bt,r,{})}}function _t(e){let n,s,o,r,l,i,f,m,p,$,y,v,x,w,b,k,C;return s=new Ct({}),r=new X({}),i=new at({}),m=new gt({}),$=new yt({}),v=new ut({}),w=new ft({}),k=new ht({}),{c(){n=d("main"),D(s.$$.fragment),o=h(),D(r.$$.fragment),l=h(),D(i.$$.fragment),f=h(),D(m.$$.fragment),p=h(),D($.$$.fragment),y=h(),D(v.$$.fragment),x=h(),D(w.$$.fragment),b=h(),D(k.$$.fragment),g(n,"id","/"),g(n,"class","svelte-1drtneb")},m(t,e){c(t,n,e),A(s,n,null),a(n,o),A(r,n,null),a(n,l),A(i,n,null),a(n,f),A(m,n,null),a(n,p),A($,n,null),a(n,y),A(v,n,null),a(n,x),A(w,n,null),a(n,b),A(k,n,null),C=!0},p:t,i(t){C||(j(s.$$.fragment,t),j(r.$$.fragment,t),j(i.$$.fragment,t),j(m.$$.fragment,t),j($.$$.fragment,t),j(v.$$.fragment,t),j(w.$$.fragment,t),j(k.$$.fragment,t),C=!0)},o(t){P(s.$$.fragment,t),P(r.$$.fragment,t),P(i.$$.fragment,t),P(m.$$.fragment,t),P($.$$.fragment,t),P(v.$$.fragment,t),P(w.$$.fragment,t),P(k.$$.fragment,t),C=!1},d(t){t&&u(n),N(s),N(r),N(i),N(m),N($),N(v),N(w),N(k)}}}function St(t){return w((()=>{!function(){let t=window.matchMedia("only screen and (min-width: 360px) and (max-width: 640px");t.addEventListener("change",(t=>{!0===t.matches&&xt("small")}));let e=window.matchMedia("only screen and (min-width: 641px) and (max-width: 1007px)");e.addEventListener("change",(t=>{!0===t.matches&&xt("medium")}));let n=window.matchMedia("only screen and (min-width: 1008px)");n.addEventListener("change",(t=>{!0===t.matches&&xt("big")})),t.matches?xt("small"):e.matches?xt("medium"):n.matches&&xt("big")}()})),[]}return new class extends B{constructor(t){super(),G(this,t,St,_t,r,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
