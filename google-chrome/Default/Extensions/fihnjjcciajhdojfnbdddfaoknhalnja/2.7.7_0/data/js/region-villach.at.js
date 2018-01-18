var now = new Date();
now.setTime(now.getTime() + 86400000);
document.cookie = 'app_accept_cookies=true; expires='+now.toGMTString()+'; path=/';