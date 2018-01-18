"use strict";µBlock.HnSwitches=function(){var a=function(){this.reset()},b={"no-strict-blocking":0,"no-popups":2,"no-cosmetic-filtering":4,"no-remote-fonts":6,"no-large-media":8},c={dontBlockDoc:"no-strict-blocking",doBlockAllPopups:"no-popups",noStrictBlocking:"no-strict-blocking",noPopups:"no-popups",noCosmeticFiltering:"no-cosmetic-filtering"},d={1:"true",2:"false"},e={"true":1,"false":2,on:1,off:2},f=/[g-z_-]/,g=/\.\d+$/,h=function(a){return f.test(a)?!1:g.test(a)?!0:a.startsWith("[")},i=function(a){var b=a.indexOf(".");return-1!==b?a.slice(b+1):"*"!==a&&""!==a?"*":""},j=function(a){return"*"!==a&&""!==a?"*":""},k=function(a){return h(a)?j:i};return a.prototype.reset=function(){this.switches={},this.n="",this.z="",this.r=0},a.prototype.toggle=function(a,c,d){var e=b[a];if(void 0===e)return!1;if(d===this.evaluate(a,c))return!1;var f=this.switches[c]||0;return f&=~(3<<e),f|=d<<e,0===f?delete this.switches[c]:this.switches[c]=f,!0},a.prototype.toggleOneZ=function(a,c,d){var e=b[a];if(void 0===e)return!1;var f=this.evaluateZ(a,c);if(d===f)return!1;void 0===d&&(d=!f);var g=this.switches[c]||0;return g&=~(3<<e),0===g?delete this.switches[c]:this.switches[c]=g,f=this.evaluateZ(a,c),f===d?!0:(this.switches[c]=g|(d?1:2)<<e,!0)},a.prototype.toggleBranchZ=function(a,b,c){var d=this.toggleOneZ(a,b,c),e=b.length;for(var f in this.switches)this.switches.hasOwnProperty(f)!==!1&&f!==b&&(f.length<=e||f.endsWith(b)!==!1&&"."===f.charAt(f.length-e-1)&&(d=this.toggle(a,f,0)||d));return d},a.prototype.toggleZ=function(a,b,c,d){return c===!0?this.toggleBranchZ(a,b,d):this.toggleOneZ(a,b,d)},a.prototype.evaluate=function(a,c){var d=this.switches[c]||0;if(0===d)return 0;var e=b[a];return void 0===e?0:d>>>e&3},a.prototype.evaluateZ=function(a,c){var d=b[a];if(void 0===d)return this.r=0,!1;this.n=a;for(var e,f=c,g=k(f);;){if(e=this.switches[f]||0,0!==e&&(e=e>>>d&3,0!==e))return this.z=f,this.r=e,1===e;if(f=g(f),""===f)break}return this.r=0,!1},a.prototype.toResultString=function(){return 1!==this.r?"":"ub:"+this.n+": "+this.z+" true"},a.prototype.toString=function(){var a,c,e,f=[];for(e in this.switches)if(this.switches.hasOwnProperty(e)!==!1)for(a in b)b.hasOwnProperty(a)!==!1&&(c=this.evaluate(a,e),0!==c&&f.push(a+": "+e+" "+d[c]));return f.join("\n")},a.prototype.fromString=function(a){var d,f,g,h,i,j,k,l=a.length,m=0;for(this.reset();l>m;)d=a.indexOf("\n",m),0>d&&(d=a.indexOf("\r",m),0>d&&(d=l)),f=a.slice(m,d).trim(),m=d+1,g=f.indexOf("# "),-1!==g&&(f=f.slice(0,g).trim()),""!==f&&(h=f.split(/\s+/),3===h.length&&(i=h[0],g=i.indexOf(":"),-1!==g&&(i=i.slice(0,g),i=c[i]||i,b.hasOwnProperty(i)!==!1&&(j=punycode.toASCII(h[1]),k=h[2],e.hasOwnProperty(k)!==!1&&this.toggle(i,j,e[k])))))},a}(),µBlock.hnSwitches=new µBlock.HnSwitches;