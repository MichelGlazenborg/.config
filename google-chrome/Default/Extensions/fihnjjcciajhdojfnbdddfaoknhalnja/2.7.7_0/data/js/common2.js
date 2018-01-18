var t = 0;

var i = setInterval(function(){
	var e = document.querySelector('.cookie-accept a, a.cookie-accept');
	t++;
	
	if (e)
		e.click();
	
	if (e || t == 1000)
		clearInterval(i);
}, 100);