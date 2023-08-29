var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function i(t){return"function"==typeof t}function s(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function r(n,e,o){n.$$.on_destroy.push(function(n,...e){if(null==n){for(const t of e)t(void 0);return t}const o=n.subscribe(...e);return o.unsubscribe?()=>o.unsubscribe():o}(e,o))}function l(t,n,e){return t.set(e),n}function c(t,n){t.appendChild(n)}function a(t,n,e){t.insertBefore(n,e||null)}function u(t){t.parentNode&&t.parentNode.removeChild(t)}function f(t){return document.createElement(t)}function d(t){return document.createTextNode(t)}function h(){return d(" ")}function p(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function m(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function g(t,n,e){n in t?t[n]="boolean"==typeof t[n]&&""===e||e:m(t,n,e)}function $(t,n){n=""+n,t.data!==n&&(t.data=n)}function v(t,n,e,o){null==e?t.style.removeProperty(n):t.style.setProperty(n,e,o?"important":"")}function b(t,n,e){t.classList.toggle(n,!!e)}let y;function w(t){y=t}function x(t){(function(){if(!y)throw new Error("Function called outside component initialization");return y})().$$.on_mount.push(t)}const _=[],k=[];let j=[];const A=[],E=Promise.resolve();let I=!1;function S(t){j.push(t)}const H=new Set;let z=0;function C(){if(0!==z)return;const t=y;do{try{for(;z<_.length;){const t=_[z];z++,w(t),P(t.$$)}}catch(t){throw _.length=0,z=0,t}for(w(null),_.length=0,z=0;k.length;)k.pop()();for(let t=0;t<j.length;t+=1){const n=j[t];H.has(n)||(H.add(n),n())}j.length=0}while(_.length);for(;A.length;)A.pop()();I=!1,H.clear(),w(t)}function P(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(S)}}const L=new Set;let M;function T(t,n){t&&t.i&&(L.delete(t),t.i(n))}function B(t,n,e,o){if(t&&t.o){if(L.has(t))return;L.add(t),M.c.push((()=>{L.delete(t),o&&(e&&t.d(1),o())})),t.o(n)}else o&&o()}function J(t){t&&t.c()}function N(t,e,s){const{fragment:r,after_update:l}=t.$$;r&&r.m(e,s),S((()=>{const e=t.$$.on_mount.map(n).filter(i);t.$$.on_destroy?t.$$.on_destroy.push(...e):o(e),t.$$.on_mount=[]})),l.forEach(S)}function O(t,n){const e=t.$$;null!==e.fragment&&(!function(t){const n=[],e=[];j.forEach((o=>-1===t.indexOf(o)?n.push(o):e.push(o))),e.forEach((t=>t())),j=n}(e.after_update),o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function F(t,n){-1===t.$$.dirty[0]&&(_.push(t),I||(I=!0,E.then(C)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function V(n,i,s,r,l,c,a,f=[-1]){const d=y;w(n);const h=n.$$={fragment:null,ctx:[],props:c,update:t,not_equal:l,bound:e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(i.context||(d?d.$$.context:[])),callbacks:e(),dirty:f,skip_bound:!1,root:i.target||d.$$.root};a&&a(h.root);let p=!1;if(h.ctx=s?s(n,i.props||{},((t,e,...o)=>{const i=o.length?o[0]:e;return h.ctx&&l(h.ctx[t],h.ctx[t]=i)&&(!h.skip_bound&&h.bound[t]&&h.bound[t](i),p&&F(n,t)),e})):[],h.update(),p=!0,o(h.before_update),h.fragment=!!r&&r(h.ctx),i.target){if(i.hydrate){const t=function(t){return Array.from(t.childNodes)}(i.target);h.fragment&&h.fragment.l(t),t.forEach(u)}else h.fragment&&h.fragment.c();i.intro&&T(n.$$.fragment),N(n,i.target,i.anchor),C()}w(d)}class q{$$=void 0;$$set=void 0;$destroy(){O(this,1),this.$destroy=t}$on(n,e){if(!i(e))return t;const o=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return o.push(e),()=>{const t=o.indexOf(e);-1!==t&&o.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}"undefined"!=typeof window&&(window.__svelte||(window.__svelte={v:new Set})).v.add("4");const D={"Software Engineer":{fr:"Ingénieur Logiciel"},Home:{fr:"Acceuil"},Project:{fr:"Projet"},Skills:{fr:"Compétences"},About:{fr:"À Propos"},"How do I work?":{fr:"Comment je travail?"}};function G(t,n){var e,o;return"en"===n?t:void 0===(null===(e=null==D?void 0:D[t])||void 0===e?void 0:e[n])?(console.log("Missing tranlation for: ",t," in ",n," lang"),"null"):null===(o=null==D?void 0:D[t])||void 0===o?void 0:o[n]}function W(t){let n=document.querySelector(t);n&&n.scrollIntoView({behavior:"smooth"})}const R=[];function Y(n,e=t){let o;const i=new Set;function r(t){if(s(n,t)&&(n=t,o)){const t=!R.length;for(const t of i)t[1](),R.push(t,n);if(t){for(let t=0;t<R.length;t+=2)R[t][0](R[t+1]);R.length=0}}}function l(t){r(t(n))}return{set:r,update:l,subscribe:function(s,c=t){const a=[s,c];return i.add(a),1===i.size&&(o=e(r,l)||t),s(n),()=>{i.delete(a),0===i.size&&o&&(o(),o=null)}}}}let Z=Y(0),K=Y(!0),Q=Y(400),U=Y(400),X=Y(400),tt=Y(400),nt=Y(400),et=Y(400),ot=Y(localStorage.getItem("lang")||"en");function it(n){let e,i,s,r,l,y,w,x,_,k,j,A,E,I,S,H,z,C,P,L,M,T,B,J,N,O,F=G("Home",n[1])+"",V=G("Project",n[1])+"",q=G("How do I work?",n[1])+"",D=G("About",n[1])+"";return{c(){e=f("navigation-svlt"),i=f("button"),s=d(F),r=h(),l=f("button"),y=d(V),w=h(),x=f("br"),_=d("\n\tJahmin"),k=h(),j=f("button"),A=d("Bio"),E=h(),I=f("button"),S=d(q),H=h(),z=f("button"),C=d(D),P=h(),L=f("separator"),M=h(),T=f("button"),T.textContent="English",B=h(),J=f("button"),J.textContent="Français",m(i,"class","nostyle"),v(i,"font-variation-settings","'wght' "+n[0]),m(l,"class","nostyle"),v(l,"font-variation-settings","'wght' "+n[2]),m(j,"class","nostyle"),v(j,"font-variation-settings","'wght' "+n[3]),m(I,"class","nostyle"),v(I,"font-variation-settings","'wght' "+n[4]),m(z,"class","nostyle"),v(z,"font-variation-settings","'wght' "+n[5]),m(L,"class","svelte-4vv9iv"),m(T,"class","nostyle langButton svelte-4vv9iv"),b(T,"selected","en"===n[1]),m(J,"class","nostyle langButton svelte-4vv9iv"),b(J,"selected","fr"===n[1]),g(e,"class","svelte-4vv9iv")},m(t,o){a(t,e,o),c(e,i),c(i,s),c(e,r),c(e,l),c(l,y),c(l,w),c(l,x),c(l,_),c(e,k),c(e,j),c(j,A),c(e,E),c(e,I),c(I,S),c(e,H),c(e,z),c(z,C),c(e,P),c(e,L),c(e,M),c(e,T),c(e,B),c(e,J),N||(O=[p(i,"click",n[7]),p(l,"click",n[8]),p(j,"click",n[9]),p(I,"click",n[10]),p(z,"click",n[11]),p(T,"click",n[12]),p(J,"click",n[13])],N=!0)},p(t,[n]){2&n&&F!==(F=G("Home",t[1])+"")&&$(s,F),1&n&&v(i,"font-variation-settings","'wght' "+t[0]),2&n&&V!==(V=G("Project",t[1])+"")&&$(y,V),4&n&&v(l,"font-variation-settings","'wght' "+t[2]),8&n&&v(j,"font-variation-settings","'wght' "+t[3]),2&n&&q!==(q=G("How do I work?",t[1])+"")&&$(S,q),16&n&&v(I,"font-variation-settings","'wght' "+t[4]),2&n&&D!==(D=G("About",t[1])+"")&&$(C,D),32&n&&v(z,"font-variation-settings","'wght' "+t[5]),2&n&&b(T,"selected","en"===t[1]),2&n&&b(J,"selected","fr"===t[1])},i:t,o:t,d(t){t&&u(e),N=!1,o(O)}}}function st(t,n,e){let o,i,s,c,a,u;function f(t){W(`#${t}`)}r(t,U,(t=>e(0,o=t))),r(t,ot,(t=>e(1,i=t))),r(t,et,(t=>e(2,s=t))),r(t,X,(t=>e(3,c=t))),r(t,tt,(t=>e(4,a=t))),r(t,nt,(t=>e(5,u=t)));return[o,i,s,c,a,u,f,()=>f("home-section"),()=>f("jahmin-section"),()=>f("bio-section"),()=>f("how-section"),()=>f("about-section"),()=>l(ot,i="en",i),()=>l(ot,i="fr",i)]}ot.subscribe((t=>{localStorage.setItem("lang",t)}));class rt extends q{constructor(t){super(),V(this,t,st,it,s,{})}}var lt=720,ct=680;function at(t){let n=t.scrollHeight,e=t.getClientRects()[0].top,o=Math.abs(e/n);return Math.trunc(700+-300*o)}function ut(n){let e,o,i,s,r,l,p,v,y,w,x=G("Software Engineer",n[2])+"";return{c(){e=f("section-svlt"),o=f("section-header"),o.innerHTML='<img-container class="svelte-1ixiz2u"><img src="https://placehold.co/400x400/png" alt="" class="svelte-1ixiz2u"/></img-container>',i=h(),s=f("section-body"),r=f("p"),r.textContent="Paco Gimeno",l=h(),p=f("separator"),v=h(),y=f("p"),w=d(x),g(o,"class","svelte-1ixiz2u"),m(r,"class","who svelte-1ixiz2u"),m(p,"class","svelte-1ixiz2u"),m(y,"class","what svelte-1ixiz2u"),g(s,"class","svelte-1ixiz2u"),g(e,"id","home-section"),g(e,"class","svelte-1ixiz2u"),b(e,"isVisible",n[1])},m(t,u){a(t,e,u),c(e,o),c(e,i),c(e,s),c(s,r),c(s,l),c(s,p),c(s,v),c(s,y),c(y,w),n[6](e)},p(t,[n]){4&n&&x!==(x=G("Software Engineer",t[2])+"")&&$(w,x),2&n&&b(e,"isVisible",t[1])},i:t,o:t,d(t){t&&u(e),n[6](null)}}}function ft(t,n,e){let o,i,s,c;r(t,U,(t=>e(3,o=t))),r(t,K,(t=>e(4,i=t))),r(t,Z,(t=>e(5,s=t))),r(t,ot,(t=>e(2,c=t)));let a,u=!1;return x((()=>{e(1,u=!0)})),t.$$.update=()=>{33&t.$$.dirty&&a&&l(U,o=at(a),o),24&t.$$.dirty&&!0===i&&o<=lt&&o>=ct&&W("#home-section")},[a,u,c,o,i,s,function(t){k[t?"unshift":"push"]((()=>{a=t,e(0,a)}))}]}class dt extends q{constructor(t){super(),V(this,t,ft,ut,s,{})}}function ht(n){let e;return{c(){e=f("section-svlt"),e.innerHTML="",g(e,"id","projects-section")},m(t,o){a(t,e,o),n[4](e)},p:t,i:t,o:t,d(t){t&&u(e),n[4](null)}}}function pt(t,n,e){let o,i,s,c;return r(t,Q,(t=>e(1,o=t))),r(t,K,(t=>e(2,i=t))),r(t,Z,(t=>e(3,s=t))),t.$$.update=()=>{9&t.$$.dirty&&c&&l(Q,o=at(c),o),6&t.$$.dirty&&!0===i&&o<=lt&&o>=ct&&W("#projects-section")},[c,o,i,s,function(t){k[t?"unshift":"push"]((()=>{c=t,e(0,c)}))}]}class mt extends q{constructor(t){super(),V(this,t,pt,ht,s,{})}}function gt(n){let e;return{c(){e=f("section-svlt"),e.textContent="Hello! This is a section of the portfolio!",g(e,"id","bio-section"),g(e,"class","svelte-1japyhw")},m(t,o){a(t,e,o),n[4](e)},p:t,i:t,o:t,d(t){t&&u(e),n[4](null)}}}function $t(t,n,e){let o,i,s,c;return r(t,X,(t=>e(1,o=t))),r(t,K,(t=>e(2,i=t))),r(t,Z,(t=>e(3,s=t))),t.$$.update=()=>{9&t.$$.dirty&&c&&l(X,o=at(c),o),6&t.$$.dirty&&!0===i&&o<=lt&&o>=ct&&W("#bio-section")},[c,o,i,s,function(t){k[t?"unshift":"push"]((()=>{c=t,e(0,c)}))}]}class vt extends q{constructor(t){super(),V(this,t,$t,gt,s,{})}}function bt(n){let e;return{c(){e=f("section-svlt"),e.textContent="Hello! This is a section of the portfolio!",g(e,"id","about-section"),g(e,"class","svelte-bm0mcw")},m(t,o){a(t,e,o),n[4](e)},p:t,i:t,o:t,d(t){t&&u(e),n[4](null)}}}function yt(t,n,e){let o,i,s,c;return r(t,nt,(t=>e(1,o=t))),r(t,K,(t=>e(2,i=t))),r(t,Z,(t=>e(3,s=t))),t.$$.update=()=>{9&t.$$.dirty&&c&&l(nt,o=at(c),o),6&t.$$.dirty&&!0===i&&o<=lt&&o>=ct&&W("#about-section")},[c,o,i,s,function(t){k[t?"unshift":"push"]((()=>{c=t,e(0,c)}))}]}class wt extends q{constructor(t){super(),V(this,t,yt,bt,s,{})}}function xt(n){let e;return{c(){e=f("section-svlt"),e.innerHTML='<section-header class="svelte-1txynpi"><img-container class="svelte-1txynpi"><img src="./img/jahmin-logo.svg" alt="" class="svelte-1txynpi"/></img-container> <a href="https://github.com/PacoGim/Jahmin" target="_blank" class="svelte-1txynpi"><h1>Jahmin</h1> <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="28" fill="currentColor" class="svelte-1txynpi"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg></a></section-header> <p class="svelte-1txynpi">Jahmin, my pride and joy, I have been working on this app for some years now. A cross platform Music player based on\n\t\tElectronJS and Svelte, capable of handling thousands of songs while the app is being used thanks to the use of Web Workers.</p> <p class="svelte-1txynpi">A massive codebase that can handle:</p> <ul><li>Song metadata updating</li> <li>Lyrics</li> <li>Configurations</li> <li>Dynamic colors based on album arts</li> <li>Customizable art grid</li> <li>A beautiful song list</li> <li>Album art optimization</li> <li>Song rating</li> <li>Animated album arts</li> <li>And much, much more</li></ul>',g(e,"id","jahmin-section"),g(e,"class","svelte-1txynpi")},m(t,o){a(t,e,o),n[4](e)},p:t,i:t,o:t,d(t){t&&u(e),n[4](null)}}}function _t(t,n,e){let o,i,s,c;return r(t,et,(t=>e(1,o=t))),r(t,K,(t=>e(2,i=t))),r(t,Z,(t=>e(3,s=t))),t.$$.update=()=>{9&t.$$.dirty&&c&&l(et,o=at(c),o),6&t.$$.dirty&&!0===i&&o<=lt&&o>=ct&&W("#jahmin-section")},[c,o,i,s,function(t){k[t?"unshift":"push"]((()=>{c=t,e(0,c)}))}]}class kt extends q{constructor(t){super(),V(this,t,_t,xt,s,{})}}function jt(n){let e;return{c(){e=f("section-svlt"),e.innerHTML="<p>First and foremost, I hate praising myself, I&#39;m a humble programmer that never steps on others.</p> <p>But I need to write all I have done so youy know who am I and what do I do.</p> <p>Programming goes beyond just work or a hobby for me, it is part of my life.</p> <p>I can&#39;t count the amount of mini projects I programmed:</p> <ul><li>Perfect Aaa contrast finder from any color.</li> <li>An impractical new browser DB that I had to scrap.</li> <li>A super complex double player system to fix an audible crackle when chain playing songs in HTML5</li></ul>",g(e,"id","how-section"),g(e,"class","svelte-gte8wo")},m(t,o){a(t,e,o),n[4](e)},p:t,i:t,o:t,d(t){t&&u(e),n[4](null)}}}function At(t,n,e){let o,i,s,c;return r(t,tt,(t=>e(1,o=t))),r(t,K,(t=>e(2,i=t))),r(t,Z,(t=>e(3,s=t))),t.$$.update=()=>{9&t.$$.dirty&&c&&l(tt,o=at(c),o),6&t.$$.dirty&&!0===i&&o<=lt&&o>=ct&&W("#how-section")},[c,o,i,s,function(t){k[t?"unshift":"push"]((()=>{c=t,e(0,c)}))}]}class Et extends q{constructor(t){super(),V(this,t,At,jt,s,{})}}function It(n){let e,o,i,s,r,l,d,p,m,g,$,v,b,y,w;return e=new rt({}),s=new dt({}),l=new mt({}),p=new kt({}),g=new vt({}),v=new Et({}),y=new wt({}),{c(){J(e.$$.fragment),o=h(),i=f("main"),J(s.$$.fragment),r=h(),J(l.$$.fragment),d=h(),J(p.$$.fragment),m=h(),J(g.$$.fragment),$=h(),J(v.$$.fragment),b=h(),J(y.$$.fragment)},m(t,n){N(e,t,n),a(t,o,n),a(t,i,n),N(s,i,null),c(i,r),N(l,i,null),c(i,d),N(p,i,null),c(i,m),N(g,i,null),c(i,$),N(v,i,null),c(i,b),N(y,i,null),w=!0},p:t,i(t){w||(T(e.$$.fragment,t),T(s.$$.fragment,t),T(l.$$.fragment,t),T(p.$$.fragment,t),T(g.$$.fragment,t),T(v.$$.fragment,t),T(y.$$.fragment,t),w=!0)},o(t){B(e.$$.fragment,t),B(s.$$.fragment,t),B(l.$$.fragment,t),B(p.$$.fragment,t),B(g.$$.fragment,t),B(v.$$.fragment,t),B(y.$$.fragment,t),w=!1},d(t){t&&(u(o),u(i)),O(e,t),O(s),O(l),O(p),O(g),O(v),O(y)}}}function St(t,n,e){let o,i,s;return r(t,K,(t=>e(1,o=t))),r(t,Z,(t=>e(2,i=t))),x((()=>{window.addEventListener("scroll",(t=>{l(Z,i=window.scrollY||document.documentElement.scrollTop,i),l(K,o=!1,o),clearTimeout(s),s=setTimeout((()=>{l(K,o=!0,o)}),500)}))})),[]}return new class extends q{constructor(t){super(),V(this,t,St,It,s,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
