var quickProfiler=function(){"use strict";var a=window.performance||Date,b=0,c=0,d=0,e=a.now(),f="",g=function(){b=0,c=0,d=0},h=function(){return c>0?b/c:0},i=function(b){f=b||"",d=a.now()},j=function(g){void 0===g&&(g=1e4);var i=a.now();c+=1,b+=i-d,i-e>=g&&(console.log("µBlock> %s: %s ms (%d samples)",f,h().toFixed(3),c),e=i)};return{reset:g,start:i,stop:j}}();