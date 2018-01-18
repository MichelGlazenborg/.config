var t = 0;

var i = setInterval(function(){
	var e = document.querySelector('#firstTimeDialog + .mydialogbutton');
	t++;
	
	if (e)
		e.click();
	
	if (e || t == 1000)
		clearInterval(i);
}, 100);