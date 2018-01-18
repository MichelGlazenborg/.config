var t = 0;

var i = setInterval(function(){
	var e = document.querySelector('.dot-cc-wrapper .dot-btn-1');
	t++;
	
	if (e)
	{
		e.click();
		
		e2 = document.querySelector('.dot-cc-wrapper .dot-btn-2');
		
		if (e2)
			e2.click();
	}
	
	if (e || t == 1000)
		clearInterval(i);
}, 100);