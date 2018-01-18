var a = document.getElementById('cookies-warning');

if (a)
{
	a.setAttribute('style', 'display:block !important; visibility:hidden !important');
	a.querySelector('button').click();
}