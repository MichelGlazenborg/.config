var now = new Date();
now.setTime(now.getTime() + 86400000);
document.cookie = 'warningDisplayed=yes; expires='+now.toGMTString()+'; path=/';