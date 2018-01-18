"use strict";µBlock.URLNetFiltering=function(){var a={1:"block",2:"allow",3:"noop"},b={block:1,allow:2,noop:3},c=function(a,b){this.url=a,this.action=b},d=function(a,b){for(var c,d=b.length,e=0;e<a.length&&(c=a[e],!(c.url.length>d));e++)if(c.url===b)return e;return-1},e=function(a,b){for(var c=b.length,d=a.length;d--&&!(a[d].url.length<=c););if(-1!==d)do if(b.startsWith(a[d].url))return d;while(d--);return-1},f=function(a,b){for(var c=0;c<a.length;c++)if(a[c].url.length>b)return c;return-1},g=function(a,b,d){var e=new c(b,d),g=f(a,b.length);-1===g?a.push(e):a.splice(g,0,e)},h=function(){this.reset()};return h.prototype.reset=function(){this.rules=new Map,this.context="",this.url="",this.type="",this.r=0},h.prototype.assign=function(a){var b,c,d=this.rules,e=a.rules;for(b=d.entries();c=b.next(),!c.done;)e.has(c.value)===!1&&d["delete"](c.value);for(b=e.entries();c=b.next(),!c.done;)d.set(c.value[0],c.value[1].slice())},h.prototype.setRule=function(a,b,c,e){if(0===e)return this.removeRule(a,b,c);var f=a+" "+c,h=this.rules.get(f);void 0===h&&(h=[],this.rules.set(f,h));var i,j=d(h,b);if(-1!==j){if(i=h[j],i.action===e)return!1;i.action=e}else g(h,b,e);return!0},h.prototype.removeRule=function(a,b,c){var e=a+" "+c,f=this.rules.get(e);if(void 0===f)return!1;var g=d(f,b);return-1===g?!1:(f.splice(g,1),0===f.length&&this.rules["delete"](e),!0)},h.prototype.evaluateZ=function(a,b,c){if(this.r=0,0===this.rules.size)return this;for(var d,f,g,h;;){if(this.context=a,(d=this.rules.get(a+" "+c))&&(g=e(d,b),-1!==g))return h=d[g],this.url=h.url,this.type=c,this.r=h.action,this;if((d=this.rules.get(a+" *"))&&(g=e(d,b),-1!==g))return h=d[g],this.url=h.url,this.type="*",this.r=h.action,this;if("*"===a)break;f=a.indexOf("."),a=-1!==f?a.slice(f+1):"*"}return this},h.prototype.mustBlockOrAllow=function(){return 1===this.r||2===this.r},h.prototype.toFilterString=function(){if(0===this.r)return"";var a=this.context+" "+this.url+" "+this.type;return 1===this.r?"lb:"+a+" block":2===this.r?"la:"+a+" allow":"ln:"+a+" noop"},h.prototype.copyRules=function(a,b,c,d){for(var e,f,g,h=!1,i=c.length;i--;)e=c[i],a.evaluateZ(b,e,d),f=0!==a.r&&a.context===b&&a.url===e&&a.type===d,this.evaluateZ(b,e,d),g=0!==this.r&&this.context===b&&this.url===e&&this.type===d,f&&!g&&(this.setRule(b,e,d,a.r),h=!0),!f&&g&&(this.removeRule(b,e,d),h=!0);return h},h.prototype.toString=function(){for(var b,c,d,e,f,g,h,i,j=[],k=this.rules.entries();b=k.next(),!b.done;)for(c=b.value[0],d=c.indexOf(" "),e=c.slice(0,d),d=c.lastIndexOf(" "),f=c.slice(d+1),g=b.value[1],h=0;h<g.length;h++)i=g[h],j.push(e+" "+i.url+" "+f+" "+a[i.action]);return j.sort().join("\n")},h.prototype.fromString=function(a){this.reset();for(var c,d,e=new µBlock.LineIterator(a);e.eot()===!1;)c=e.next().trim(),""!==c&&-1!==c.indexOf("://")&&(d=c.split(/\s+/),4===d.length&&-1!==d[1].indexOf("://")&&b.hasOwnProperty(d[3])!==!1&&this.setRule(d[0],d[1],d[2],b[d[3]]))},h}(),µBlock.sessionURLFiltering=new µBlock.URLNetFiltering,µBlock.permanentURLFiltering=new µBlock.URLNetFiltering;