var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function s(t){t.forEach(e)}function r(t){return"function"==typeof t}function o(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function l(e,n,s){e.$$.on_destroy.push(function(e,...n){if(null==e){for(const t of n)t(void 0);return t}const s=e.subscribe(...n);return s.unsubscribe?()=>s.unsubscribe():s}(n,s))}function c(t,e,n){return t.set(n),e}function i(t,e){t.appendChild(e)}function a(t,e,n){t.insertBefore(e,n||null)}function u(t){t.parentNode&&t.parentNode.removeChild(t)}function f(t){return document.createElement(t)}function d(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function m(t){return document.createTextNode(t)}function h(){return m(" ")}function p(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function $(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function g(t,e,n){e in t?t[e]="boolean"==typeof t[e]&&""===n||n:$(t,e,n)}function v(t,e,n){t.classList.toggle(e,!!n)}let x;function y(t){x=t}function w(t){(function(){if(!x)throw new Error("Function called outside component initialization");return x})().$$.on_mount.push(t)}const b=[],q=[];let _=[];const k=[],E=Promise.resolve();let S=!1;function C(t){_.push(t)}const M=new Set;let L=0;function H(){if(0!==L)return;const t=x;do{try{for(;L<b.length;){const t=b[L];L++,y(t),T(t.$$)}}catch(t){throw b.length=0,L=0,t}for(y(null),b.length=0,L=0;q.length;)q.pop()();for(let t=0;t<_.length;t+=1){const e=_[t];M.has(e)||(M.add(e),e())}_.length=0}while(b.length);for(;k.length;)k.pop()();S=!1,M.clear(),y(t)}function T(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(C)}}const P=new Set;let j;function A(t,e){t&&t.i&&(P.delete(t),t.i(e))}function z(t,e,n,s){if(t&&t.o){if(P.has(t))return;P.add(t),j.c.push((()=>{P.delete(t),s&&(n&&t.d(1),s())})),t.o(e)}else s&&s()}function D(t){t&&t.c()}function G(t,n,o){const{fragment:l,after_update:c}=t.$$;l&&l.m(n,o),C((()=>{const n=t.$$.on_mount.map(e).filter(r);t.$$.on_destroy?t.$$.on_destroy.push(...n):s(n),t.$$.on_mount=[]})),c.forEach(C)}function N(t,e){const n=t.$$;null!==n.fragment&&(!function(t){const e=[],n=[];_.forEach((s=>-1===t.indexOf(s)?e.push(s):n.push(s))),n.forEach((t=>t())),_=e}(n.after_update),s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function I(t,e){-1===t.$$.dirty[0]&&(b.push(t),S||(S=!0,E.then(H)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function O(e,r,o,l,c,i,a,f=[-1]){const d=x;y(e);const m=e.$$={fragment:null,ctx:[],props:i,update:t,not_equal:c,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(d?d.$$.context:[])),callbacks:n(),dirty:f,skip_bound:!1,root:r.target||d.$$.root};a&&a(m.root);let h=!1;if(m.ctx=o?o(e,r.props||{},((t,n,...s)=>{const r=s.length?s[0]:n;return m.ctx&&c(m.ctx[t],m.ctx[t]=r)&&(!m.skip_bound&&m.bound[t]&&m.bound[t](r),h&&I(e,t)),n})):[],m.update(),h=!0,s(m.before_update),m.fragment=!!l&&l(m.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);m.fragment&&m.fragment.l(t),t.forEach(u)}else m.fragment&&m.fragment.c();r.intro&&A(e.$$.fragment),G(e,r.target,r.anchor),H()}y(d)}class V{$$=void 0;$$set=void 0;$destroy(){N(this,1),this.$destroy=t}$on(e,n){if(!r(n))return t;const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(n),()=>{const t=s.indexOf(n);-1!==t&&s.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function B(e){let n,s,r;return{c(){n=f("div"),s=f("div"),r=m(e[0]),$(s,"class","gold-text highlight svelte-x8r0yh"),$(s,"data-text",e[0]),$(n,"class","gold-container svelte-x8r0yh"),$(n,"style",e[1])},m(t,e){a(t,n,e),i(n,s),i(s,r)},p(t,[e]){1&e&&function(t,e){e=""+e,t.data!==e&&(t.data=e)}(r,t[0]),1&e&&$(s,"data-text",t[0]),2&e&&$(n,"style",t[1])},i:t,o:t,d(t){t&&u(n)}}}function F(t,e,n){let{text:s=""}=e,{style:r=""}=e;return t.$$set=t=>{"text"in t&&n(0,s=t.text),"style"in t&&n(1,r=t.style)},[s,r]}"undefined"!=typeof window&&(window.__svelte||(window.__svelte={v:new Set})).v.add("4");class Z extends V{constructor(t){super(),O(this,t,F,B,o,{text:0,style:1})}}const Y=[];function W(e,n=t){let s;const r=new Set;function l(t){if(o(e,t)&&(e=t,s)){const t=!Y.length;for(const t of r)t[1](),Y.push(t,e);if(t){for(let t=0;t<Y.length;t+=2)Y[t][0](Y[t+1]);Y.length=0}}}function c(t){l(t(e))}return{set:l,update:c,subscribe:function(o,i=t){const a=[o,i];return r.add(a),1===r.size&&(s=n(l,c)||t),o(e),()=>{r.delete(a),0===r.size&&s&&(s(),s=null)}}}}let J=W("big"),K=W(localStorage.getItem("lang")||"en");function Q(t){let e,n,s,r,o,l,c,d;return{c(){e=f("hamburger-menu"),n=f("hamburger-line"),s=h(),r=f("hamburger-line"),o=h(),l=f("hamburger-line"),g(n,"class","svelte-232rqm"),g(r,"class","svelte-232rqm"),g(l,"class","svelte-232rqm"),g(e,"onclick",c=t[3]),g(e,"data-isactive",d=String(t[0])),g(e,"class","svelte-232rqm")},m(t,c){a(t,e,c),i(e,n),i(e,s),i(e,r),i(e,o),i(e,l)},p(t,n){1&n&&c!==(c=t[3])&&g(e,"onclick",c),1&n&&d!==(d=String(t[0]))&&g(e,"data-isactive",d)},d(t){t&&u(e)}}}function R(t){let e,n,r,o,l,c,d,m,x,y,w,b,q,_,k,E,S,C,M,L,H,T,P,j,I,O,V;n=new Z({props:{text:"Paco Gimeno",style:"font-size: 2.5rem;margin-right:1rem;white-space: nowrap;"}});let B="small"===t[1]&&Q(t);return{c(){e=f("navigation-svlt"),D(n.$$.fragment),r=h(),B&&B.c(),o=h(),l=f("nav-links"),c=f("a"),c.textContent="Home",d=h(),m=f("a"),m.textContent="Bio",x=h(),y=f("a"),y.textContent="Projects",w=h(),b=f("a"),b.textContent="Skills",q=h(),_=f("a"),_.textContent="Experience",k=h(),E=f("a"),E.textContent="Education",S=h(),C=f("lang-change"),M=f("button"),M.textContent="English",L=h(),H=f("separator"),H.textContent="|",T=h(),P=f("button"),P.textContent="Français",$(c,"href","#home-section"),$(c,"class","svelte-232rqm"),$(m,"href","#bio-section"),$(m,"class","svelte-232rqm"),$(y,"href","/"),$(y,"class","svelte-232rqm"),$(b,"href","/"),$(b,"class","svelte-232rqm"),$(_,"href","/"),$(_,"class","svelte-232rqm"),$(E,"href","/"),$(E,"class","svelte-232rqm"),$(M,"class","nostyle svelte-232rqm"),v(M,"selected","en"===t[2]),$(H,"class","svelte-232rqm"),$(P,"class","nostyle svelte-232rqm"),v(P,"selected","fr"===t[2]),g(C,"class","svelte-232rqm"),g(l,"data-isactive",j=String(t[0])),g(l,"class","svelte-232rqm"),g(e,"class","svelte-232rqm")},m(s,u){a(s,e,u),G(n,e,null),i(e,r),B&&B.m(e,null),i(e,o),i(e,l),i(l,c),i(l,d),i(l,m),i(l,x),i(l,y),i(l,w),i(l,b),i(l,q),i(l,_),i(l,k),i(l,E),i(l,S),i(l,C),i(C,M),i(C,L),i(C,H),i(C,T),i(C,P),I=!0,O||(V=[p(M,"click",t[4]),p(P,"click",t[5])],O=!0)},p(t,[n]){"small"===t[1]?B?B.p(t,n):(B=Q(t),B.c(),B.m(e,o)):B&&(B.d(1),B=null),(!I||4&n)&&v(M,"selected","en"===t[2]),(!I||4&n)&&v(P,"selected","fr"===t[2]),(!I||1&n&&j!==(j=String(t[0])))&&g(l,"data-isactive",j)},i(t){I||(A(n.$$.fragment,t),I=!0)},o(t){z(n.$$.fragment,t),I=!1},d(t){t&&u(e),N(n),B&&B.d(),O=!1,s(V)}}}function U(t,e,n){let s,r;l(t,J,(t=>n(1,s=t))),l(t,K,(t=>n(2,r=t)));let o=!0;return[o,s,r,()=>n(0,o=!o),()=>c(K,r="en",r),()=>c(K,r="fr",r)]}K.subscribe((t=>{localStorage.setItem("lang",t)}));class X extends V{constructor(t){super(),O(this,t,U,R,o,{})}}function tt(e){let n,s;return{c(){n=d("svg"),s=d("path"),$(s,"d","M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"),$(n,"xmlns","http://www.w3.org/2000/svg"),$(n,"style",e[0]),$(n,"width","32"),$(n,"height","32"),$(n,"fill","#000000"),$(n,"viewBox","0 0 256 256")},m(t,e){a(t,n,e),i(n,s)},p(t,[e]){1&e&&$(n,"style",t[0])},i:t,o:t,d(t){t&&u(n)}}}function et(t,e,n){let{style:s}=e;return t.$$set=t=>{"style"in t&&n(0,s=t.style)},[s]}class nt extends V{constructor(t){super(),O(this,t,et,tt,o,{style:0})}}function st(e){let n,s,r,o,l,c,d,v,x,y,w,b,q,_,k,E,S,C,M,L;return x=new nt({props:{style:"fill: #fff;margin-right: .5rem;"}}),{c(){n=f("section-svlt"),s=f("description-container"),r=f("h1"),r.textContent="Hi, I am Paco Gimeno a Fullstack Engineer based in Paris.",o=h(),l=f("h2"),l.textContent="I make ideas become a reality from start to deployement",c=h(),d=f("email-container"),v=f("a"),D(x.$$.fragment),y=m(" PacoGimDev@gmail.com"),w=h(),b=f("copy-email-container"),q=f("button"),q.textContent="Copy to clipboard",_=h(),k=f("copy-notification"),k.textContent="Copied!",E=h(),S=f("photo-container"),S.innerHTML='<img src="./img/my_face.jpg" alt="" class="svelte-d0ruqp"/>',$(r,"class","svelte-d0ruqp"),$(l,"class","svelte-d0ruqp"),$(v,"class","email svelte-d0ruqp"),$(v,"href","mailto:PacoGimDev@gmail.com"),$(q,"class","nostyle svelte-d0ruqp"),g(k,"class","svelte-d0ruqp"),g(b,"class","svelte-d0ruqp"),g(d,"class","svelte-d0ruqp"),g(s,"class","svelte-d0ruqp"),g(S,"class","svelte-d0ruqp"),g(n,"id","home-section"),g(n,"class","svelte-d0ruqp")},m(t,u){a(t,n,u),i(n,s),i(s,r),i(s,o),i(s,l),i(s,c),i(s,d),i(d,v),G(x,v,null),i(v,y),i(d,w),i(d,b),i(b,q),i(b,_),i(b,k),e[2](k),i(n,E),i(n,S),C=!0,M||(L=p(q,"click",e[1]),M=!0)},p:t,i(t){C||(A(x.$$.fragment,t),C=!0)},o(t){z(x.$$.fragment,t),C=!1},d(t){t&&u(n),N(x),e[2](null),M=!1,L()}}}function rt(t,e,n){let s,r;return[s,function(){navigator.clipboard.writeText("PacoGimDev@gmail.com").then((()=>{n(0,s.style.transform="translateY(-30px)",s),clearTimeout(r),r=setTimeout((()=>{n(0,s.style.transform="translateY(0px)",s)}),2e3)}))},function(t){q[t?"unshift":"push"]((()=>{s=t,n(0,s)}))}]}class ot extends V{constructor(t){super(),O(this,t,rt,st,o,{})}}function lt(e){let n;return{c(){n=f("section-svlt"),n.innerHTML="<h1>Skills Section</h1>",g(n,"id","skills-section")},m(t,e){a(t,n,e)},p:t,i:t,o:t,d(t){t&&u(n)}}}class ct extends V{constructor(t){super(),O(this,t,null,lt,o,{})}}function it(e){let n;return{c(){n=f("section-svlt"),n.innerHTML="<h1>experience Section</h1>",g(n,"id","experience-section")},m(t,e){a(t,n,e)},p:t,i:t,o:t,d(t){t&&u(n)}}}class at extends V{constructor(t){super(),O(this,t,null,it,o,{})}}function ut(e){let n;return{c(){n=f("section-svlt"),n.innerHTML="<h1>Education Section</h1>",g(n,"id","education-section")},m(t,e){a(t,n,e)},p:t,i:t,o:t,d(t){t&&u(n)}}}class ft extends V{constructor(t){super(),O(this,t,null,ut,o,{})}}function dt(e){let n;return{c(){n=f("section-svlt"),n.innerHTML="",g(n,"id","bio-section"),g(n,"class","svelte-e3lt4k")},m(t,e){a(t,n,e)},p:t,i:t,o:t,d(t){t&&u(n)}}}class mt extends V{constructor(t){super(),O(this,t,null,dt,o,{})}}function ht(e){let n;return{c(){n=f("section-svlt"),n.innerHTML="<h1>projects Section</h1>",g(n,"id","projects-section")},m(t,e){a(t,n,e)},p:t,i:t,o:t,d(t){t&&u(n)}}}class pt extends V{constructor(t){super(),O(this,t,null,ht,o,{})}}let $t=document.querySelector("html");function gt(t){$t.setAttribute("screen-size",t),J.set(t)}function vt(t,e){return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t+1))+t}function xt(e){let n;return{c(){n=f("starry-sky"),g(n,"class","svelte-n4ilw5")},m(t,s){a(t,n,s),e[1](n)},p:t,i:t,o:t,d(t){t&&u(n),e[1](null)}}}function yt(t,e,n){let s;function r(t,e){let n=vt(0,e),s=vt(0,t),r=document.createElement("cosmic-smoke");return r.style.left=`${n}px`,r.style.top=`${s}px`,r.style.height="500px",r.style.width="500px",r}function o(t,e){let n=vt(0,e),s=vt(0,t),r=vt(1,6),o=document.createElement("star");return o.style.left=`${n}px`,o.style.top=`${s}px`,o.style.height=`${r}px`,o.style.width=`${r}px`,o.style.animationDelay=`${vt(0,1e3)}ms`,o.style.animationDuration=`${vt(1e4,2e4)}ms`,o}return w((()=>{let t=document.querySelector("html").offsetHeight,e=document.querySelector("html").offsetWidth;for(let n=0;n<100;n++)s.appendChild(o(t,e));for(let n=0;n<2;n++)s.appendChild(r(t,e))})),[s,function(t){q[t?"unshift":"push"]((()=>{s=t,n(0,s)}))}]}class wt extends V{constructor(t){super(),O(this,t,yt,xt,o,{})}}function bt(e){let n,s,r,o,l,c,d,m,p,$,g,v,x,y,w,b,q;return s=new wt({}),o=new X({}),c=new ot({}),m=new mt({}),$=new pt({}),v=new ct({}),y=new at({}),b=new ft({}),{c(){n=f("main"),D(s.$$.fragment),r=h(),D(o.$$.fragment),l=h(),D(c.$$.fragment),d=h(),D(m.$$.fragment),p=h(),D($.$$.fragment),g=h(),D(v.$$.fragment),x=h(),D(y.$$.fragment),w=h(),D(b.$$.fragment)},m(t,e){a(t,n,e),G(s,n,null),i(n,r),G(o,n,null),i(n,l),G(c,n,null),i(n,d),G(m,n,null),i(n,p),G($,n,null),i(n,g),G(v,n,null),i(n,x),G(y,n,null),i(n,w),G(b,n,null),q=!0},p:t,i(t){q||(A(s.$$.fragment,t),A(o.$$.fragment,t),A(c.$$.fragment,t),A(m.$$.fragment,t),A($.$$.fragment,t),A(v.$$.fragment,t),A(y.$$.fragment,t),A(b.$$.fragment,t),q=!0)},o(t){z(s.$$.fragment,t),z(o.$$.fragment,t),z(c.$$.fragment,t),z(m.$$.fragment,t),z($.$$.fragment,t),z(v.$$.fragment,t),z(y.$$.fragment,t),z(b.$$.fragment,t),q=!1},d(t){t&&u(n),N(s),N(o),N(c),N(m),N($),N(v),N(y),N(b)}}}function qt(t){return w((()=>{!function(){let t=window.matchMedia("only screen and (min-width: 360px) and (max-width: 640px");t.addEventListener("change",(t=>{!0===t.matches&&gt("small")}));let e=window.matchMedia("only screen and (min-width: 641px) and (max-width: 1007px)");e.addEventListener("change",(t=>{!0===t.matches&&gt("medium")}));let n=window.matchMedia("only screen and (min-width: 1008px)");n.addEventListener("change",(t=>{!0===t.matches&&gt("big")})),t.matches?gt("small"):e.matches?gt("medium"):n.matches&&gt("big")}()})),[]}return new class extends V{constructor(t){super(),O(this,t,qt,bt,o,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map