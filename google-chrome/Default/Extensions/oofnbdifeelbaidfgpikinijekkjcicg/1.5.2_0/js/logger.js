"use strict";µBlock.logger=function(){var a=function(a){this.init(a)};a.prototype.init=function(a){this.tstamp=Date.now(),this.tab=a[0]||"",this.cat=a[1]||"",this.d0=a[2],this.d1=a[3],this.d2=a[4],this.d3=a[5],this.d4=a[6]};var b=function(){this.lastReadTime=0,this.size=50,this.buffer=new Array(this.size),this.readPtr=0,this.writePtr=0};b.prototype.clearBuffer=function(a,b){for(var c=a;b>c;c++)this.buffer[c]=null},b.prototype.writeOne=function(b){var c=this.buffer[this.writePtr];if(c instanceof a==!1?this.buffer[this.writePtr]=new a(b):c.init(b),this.writePtr+=1,this.writePtr===this.size&&(this.writePtr=0),this.writePtr===this.readPtr){var d=this.buffer.slice(0,this.writePtr);this.clearBuffer(0,this.writePtr);var e=Math.ceil(1.5*this.size);this.size+=d.length,this.size<e?(this.buffer=this.buffer.concat(d,new Array(e-this.size)),this.writePtr=this.size):(this.buffer=this.buffer.concat(d),this.writePtr=0),this.size=this.buffer.length}},b.prototype.readAll=function(){var a;return a=this.readPtr<this.writePtr?this.buffer.slice(this.readPtr,this.writePtr):this.writePtr<this.readPtr?this.buffer.slice(this.readPtr).concat(this.buffer.slice(0,this.writePtr)):[],this.readPtr=this.writePtr,this.lastReadTime=Date.now(),a};var c=null,d=6e4,e=function(){null!==c&&c.lastReadTime<Date.now()-d&&(j.writeOne=f,c=null),null!==c&&vAPI.setTimeout(e,d)},f=function(){},g=function(){c.writeOne(arguments)},h=function(){return null===c&&(j.writeOne=g,c=new b,vAPI.setTimeout(e,d)),c.readAll()},i=function(){return null!==c},j={writeOne:f,readAll:h,isEnabled:i};return j}();