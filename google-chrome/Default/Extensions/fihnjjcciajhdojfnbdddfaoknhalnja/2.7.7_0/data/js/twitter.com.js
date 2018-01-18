var t = 0;

var i = setInterval(function(){
	var e = document.querySelector('a[href="https://support.twitter.com/articles/20170514"]');
	t++;
	
	if (e)
	{
		e = e.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('div[role="button"]');
		
		if (e)
			e.click();
	}
	
	if (e || t == 1000)
		clearInterval(i);
}, 100);