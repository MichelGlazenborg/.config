var t = 0;

var i = setInterval(function(){
	var e = document.querySelector('.gh-banner.gh-banner-active #gh-cookiebanner-close');
	t++;
	
	if (e)
		e.click();
	
	if (e || t == 1000)
		clearInterval(i);
}, 100);