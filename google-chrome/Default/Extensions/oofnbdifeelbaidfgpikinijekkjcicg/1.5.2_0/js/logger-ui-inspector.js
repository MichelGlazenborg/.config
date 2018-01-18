"use strict";!function(){var a=uDom.nodeFromId("showdom");if("undefined"==typeof Map||Map.polyfill||"undefined"==typeof WeakMap)return void a.classList.add("disabled");var b=self.logger,c=vAPI.messaging,d="",e="",f="",g=null,h=null,i=uDom.nodeFromId("domInspector"),j=uDom.nodeFromId("domTree"),k=uDom.nodeFromId("pageSelector"),l=1,m=new Map,n=function(a){var b,c,d=document.createElement("li");return d.setAttribute("id",a.nid),b=document.createElement("span"),d.appendChild(b),b=document.createElement("code"),b.textContent=a.sel,d.appendChild(b),c=a.cnt||0,b=document.createElement("span"),b.textContent=0!==c?c.toLocaleString():"",b.setAttribute("data-cnt",c),d.appendChild(b),void 0===a.filter?d:(b=document.createElement("code"),b.classList.add("filter"),c=m.get(a.filter),void 0===c&&(c=l.toString(),m.set(a.filter,c),l+=1),b.setAttribute("data-filter-id",c),b.textContent=a.filter,d.appendChild(b),d.classList.add("isCosmeticHide"),d)},o=function(a,b){if(a.appendChild(b),b.classList.contains("isCosmeticHide")!==!1)for(;b=b.parentElement.parentElement,null!==b;)b.classList.add("hasCosmeticHide")},p=function(a){var c=j.parentElement,d=c.removeChild(j);b.removeAllChildren(j),m.clear();for(var e,f,g=0,h=a.layout,i=h.length,k=0;i>k;k++)if(f=h[k],f.lvl!==g)if(f.lvl>g)d=document.createElement("ul"),e.appendChild(d),e.classList.add("branch"),e=n(f),o(d,e),g=f.lvl;else{for(;f.lvl<g;)d=e.parentNode,e=d.parentNode,d=e.parentNode,g-=1;e=n(f),o(d,e)}else e=n(f),o(d,e);for(;null!==d.parentNode;)d=d.parentNode;d.firstElementChild.classList.add("show"),c.appendChild(j)},q=function(a,b){var c,d,e=a.parentElement.parentElement,f=b>=0&&a.classList.contains("isCosmeticHide")&&e.classList.contains("hasCosmeticHide")===!1;for(0>b&&(b-=s(a));"li"===e.localName;e=e.parentElement.parentElement)c=e.children[2],0!==b&&(d=s(e)+b,c.textContent=0!==d?d.toLocaleString():"",c.setAttribute("data-cnt",d)),f&&e.classList.add("hasCosmeticHide")},r=function(a){for(var b,c,d,e,f=a.journal,g=a.nodes,h=0,i=f.length;i>h;h++)if(b=f[h],-1!==b.what){if(0!==b.what)if(1===b.what&&b.l){if(c=document.getElementById(b.l),null===c)continue;e=c.parentElement,d=n(g[b.nid]),e.insertBefore(d,c.nextElementSibling),q(d,1)}else if(1===b.what&&b.u){if(d=document.getElementById(b.u),null===d)continue;e=d.querySelector("ul"),null===e&&(e=document.createElement("ul"),d.appendChild(e),d.classList.add("branch")),d=n(g[b.nid]),e.appendChild(d),q(d,1)}else;}else{if(d=document.getElementById(b.nid),null===d)continue;q(d,-1),d.parentNode.removeChild(d)}},s=function(a){var b=a.children[2],c=parseInt(b.getAttribute("data-cnt"),10);return isNaN(c)?0:c},t=function(a){for(var b,c="";null!==a&&("li"!==a.localName||(b=a.querySelector("code"),null===b||(c=b.textContent+" > "+c,-1===c.indexOf("#"))));)a=a.parentElement;return c.slice(0,-3)},u=function(a){for(;null!==a;){if("li"===a.localName){var b=a.querySelector("code:nth-of-type(2)");if(null!==b)return b.textContent}a=a.parentElement}return""},v=function(a){for(var b=a;null!==b;){if("li"===b.localName)return b.id||"";b=b.parentElement}return""},w=function(){var a=uDom.nodeFromId("cosmeticFilteringDialog"),b=a.querySelector("textarea"),g=[],h=[],i=null,k=function(){var a=function(){i=null,g=[],h=[];for(var a,c,d=/^([^#]*)(#@?#)(.+)$/,e=b.value.split(/\s*\n\s*/),j=0;j<e.length;j++)a=e[j].trim(),""!==a&&"!"!==a.charAt(0)&&(c=d.exec(a),null!==c&&4===c.length&&-1!==f.lastIndexOf(c[1])&&("##"===c[2]?g.push(c[3]):h.push(c[3])));n()};return function(){null===i&&(i=vAPI.setTimeout(a,743))}}(),l=function(a){var e=a.target;return e.classList.contains("modalDialog")?q():(a.stopPropagation(),"createCosmeticFilters"===e.id?(c.send("loggerUI",{what:"createUserFilter",filters:b.value}),c.send("loggerUI",{what:"reloadTab",tabId:d}),q()):void 0)},m=function(c){if(Array.isArray(c)!==!1){g=c;var d,i,k=[],m=new Date;for(k.push("! "+m.toLocaleString()+" "+e),d=0;d<c.length;d++)k.push(f+"##"+c[d]);var o,p=new Set,q=j.querySelectorAll("code.filter.off");for(d=0;d<q.length;d++)i=q[d],o=i.getAttribute("data-filter-id"),p.has(o)||(p.add(o),h.push(i.textContent),k.push(f+"#@#"+i.textContent));b.value=k.join("\n"),document.body.appendChild(a),a.addEventListener("click",l,!0),n()}},n=function(){c.sendTo("loggerUI",{what:"showCommitted",hide:g.join(",\n"),unhide:h.join(",\n")},d,"domInspector")},o=function(){c.sendTo("loggerUI",{what:"showInteractive",hide:g.join(",\n"),unhide:h.join(",\n")},d,"domInspector")},p=function(){b.addEventListener("input",k);for(var a,e=[],f=j.querySelectorAll("code.off"),g=0;g<f.length;g++)a=f[g],a.classList.contains("filter")===!1&&e.push({nid:v(a),selector:t(a)});c.sendTo("loggerUI",{what:"cookFilters",entries:e},d,"domInspector",m)},q=function(){null!==i&&(clearTimeout(i),i=null),o(),g=[],h=[],b.removeEventListener("input",k),a.removeEventListener("click",l,!0),document.body.removeChild(a)};return p}(),x=function(a){if(a.stopPropagation(),""!==d){var b=a.target,e=b.parentElement;if("span"===b.localName&&e instanceof HTMLLIElement&&e.classList.contains("branch")&&b===e.firstElementChild)return void b.parentElement.classList.toggle("show");if("code"===b.localName){b.classList.contains("filter")?(c.sendTo("loggerUI",{what:"toggleFilter",original:!1,target:b.classList.toggle("off"),selector:t(b),filter:u(b),nid:""},d,"domInspector"),uDom('[data-filter-id="'+b.getAttribute("data-filter-id")+'"]',i).toggleClass("off",b.classList.contains("off"))):c.sendTo("loggerUI",{what:"toggleNodes",original:!0,target:b.classList.toggle("off")===!1,selector:t(b),nid:v(b)},d,"domInspector");var f=null===j.querySelector(".off");i.querySelector(".permatoolbar .revert").classList.toggle("disabled",f),i.querySelector(".permatoolbar .commit").classList.toggle("disabled",f)}}},y=function(){var a=null,b=null,e=function(){b=null,c.sendTo("loggerUI",{what:"highlightOne",selector:t(a),nid:v(a),scrollTo:!0},d,"domInspector")};return function(c){if(""!==d&&!c.shiftKey){for(var f=c.target;null!==f&&"li"!==f.localName;)f=f.parentElement;f!==a&&(a=f,null===b&&(b=vAPI.setTimeout(e,50)))}}}(),z=function(){if(a.classList.contains("active")===!1)return"";var c=b.tabIdFromClassName(k.value)||"";return"bts"!==c?c:""},A=function(){var a=function(a){if(!a||z()!==d)return D(),void C(250);switch(a.status){case"full":p(a),h=a.fingerprint,e=a.url,f=a.hostname;break;case"incremental":r(a);break;case"nochange":case"busy":}A()},b=function(){g=null,c.sendTo("loggerUI",{what:"domLayout",fingerprint:h},d,"domInspector",a)};return function(a){null===g&&(g=vAPI.setTimeout(b,a||2003))}}(),B=function(){var a=z();return""===a?void C():(d=a,h=null,c.send("loggerUI",{what:"scriptlet",tabId:a,scriptlet:"dom-inspector"}),void A(250))},C=function(b){null===g&&a.classList.contains("active")!==!1&&(g=vAPI.setTimeout(function(){g=null,B()},b||1001))},D=function(){""!==d&&c.sendTo("loggerUI",{what:"shutdown"},d,"domInspector"),b.removeAllChildren(j),null!==g&&(clearTimeout(g),g=null),d=""},E=function(){d!==z()&&(D(),C(250))},F=function(){c.sendTo("loggerUI",{what:"highlightMode",invert:uDom.nodeFromSelector("#domInspector .permatoolbar .highlightMode").classList.toggle("invert")},d,"domInspector")},G=function(){uDom("#domTree .off").removeClass("off"),c.sendTo("loggerUI",{what:"resetToggledNodes"},d,"domInspector"),i.querySelector(".permatoolbar .revert").classList.add("disabled"),i.querySelector(".permatoolbar .commit").classList.add("disabled")},H=function(){window.addEventListener("beforeunload",I),k.addEventListener("change",E),j.addEventListener("click",x,!0),j.addEventListener("mouseover",y,!0),uDom.nodeFromSelector("#domInspector .permatoolbar .highlightMode").addEventListener("click",F),uDom.nodeFromSelector("#domInspector .permatoolbar .revert").addEventListener("click",G),uDom.nodeFromSelector("#domInspector .permatoolbar .commit").addEventListener("click",w),B()},I=function(){D(),window.removeEventListener("beforeunload",I),k.removeEventListener("change",E),j.removeEventListener("click",x,!0),j.removeEventListener("mouseover",y,!0),uDom.nodeFromSelector("#domInspector .permatoolbar .highlightMode").removeEventListener("click",F),uDom.nodeFromSelector("#domInspector .permatoolbar .revert").removeEventListener("click",G),uDom.nodeFromSelector("#domInspector .permatoolbar .commit").removeEventListener("click",w),d=""},J=function(){a.classList.toggle("active")?H():I()};a.addEventListener("click",J)}();