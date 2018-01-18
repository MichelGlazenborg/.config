"use strict";var listEntries=Object.create(null),reEscape=function(a){return a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")},reSpecialChars=/[\*\^\t\v\n]/,fromNetFilter=function(a){var b,c,d,e,f=[],g=a.compiledFilter;for(var h in listEntries)if(b=listEntries[h],void 0!==b)for(c=b.content,d=0;d=c.indexOf(g,d),-1!==d;){if((0===d||reSpecialChars.test(c.charAt(d-1)))&&(e=c.charAt(d+g.length),""===e||reSpecialChars.test(e))){f.push({title:b.title,supportURL:b.supportURL});break}d+=g.length}var i={};i[a.rawFilter]=f,postMessage({id:a.id,response:i})},fromCosmeticFilter=function(a){var b=a.rawFilter,c=b.startsWith("#@#");b=c?b.slice(3):b.slice(2);var d=Object.create(null),e=Object.create(null),f=[],g=rePlainSelector.exec(b);g?g[0]===b?f.push("c","lg",reEscape(b)):f.push("c",reEscape("lg+"),reEscape(g[0]),reEscape(b)):reHighLow.test(b)?f.push("c","hlg0",reEscape(b)):reHighMedium.test(b)?f.push("c","hmg0",'[^"]{8}',"[a-z]*"+reEscape(b)):-1===b.indexOf(" ")?f.push("c","hhsg0",reEscape(b)):f.push("c","hhcg0",reEscape(b)),d[a.rawFilter]=new RegExp(f.join("\\v")+"(?:\\n|$)");var h,i="("+reEscape(b)+"|{[^\\v]*"+reEscape(JSON.stringify({raw:b}).slice(1,-1))+"[^\\v]*})",j=a.hostname;if(""!==j)for(;d[j+"##"+b]=new RegExp(["c","h","[^\\v]+",reEscape(j),i].join("\\v")+"(?:\\n|$)"),h=j.indexOf("."),-1!==h;)j=j.slice(h+1);var k=a.domain;if(h=k.indexOf("."),-1!==h){var l=k.slice(0,h)+".*";d[l+"##"+b]=new RegExp(["c","h","[^\\v]+",reEscape(l),i].join("\\v")+"(?:\\n|$)")}var m,n,o;for(var p in d){m=d[p];for(n in listEntries)o=listEntries[n],void 0!==o&&m.test(o.content)!==!1&&(void 0===e[p]&&(e[p]=[]),e[p].push({title:o.title,supportURL:o.supportURL}))}postMessage({id:a.id,response:e})},rePlainSelector=/^([#.][\w-]+)/,reHighLow=/^[a-z]*\[(?:alt|title)="[^"]+"\]$/,reHighMedium=/^\[href\^="https?:\/\/([^"]{8})[^"]*"\]$/;onmessage=function(a){var b=a.data;switch(b.what){case"resetLists":listEntries=Object.create(null);break;case"setList":listEntries[b.details.assetKey]=b.details;break;case"fromNetFilter":fromNetFilter(b);break;case"fromCosmeticFilter":fromCosmeticFilter(b)}};