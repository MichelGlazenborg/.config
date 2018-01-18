function _parent(e)
{
	if (e && e.parentNode)
		return e.parentNode;
	
	return false;
}

function _id(s)
{
	return document.getElementById(s);
}

function _sl(s, c)
{
	return (c || document).querySelector(s);
}

function _ev(s)
{
	return document.evaluate("//"+s, document, null, XPathResult.ANY_TYPE, null).iterateNext();
}


function getE(h)
{
	switch (h)
	{
		case 'blikopzeewolde.nl': return _sl('.jBlockerAccept');
		case 'socialmediaacademie.nl': return _sl('.jBlockerAccept');
		case 'cookiewall.vice.com': return _id('i-agree');
		case 'emerce.nl': return _sl('.cc-container a#btn');
		case 'fifa.com': return _sl('.mdl-overlay .close');
		case 'fr12.nl': return _id('cookies');
		case 'iper.it': return _sl('.fancybox-close');
		case 'latagliatellayyo.es': return _sl('#AcceptCookies ~ #Buttonholder > input');
		case 'leroymerlin.it': return _sl('.consent-button button');
		case 'marketingfacts.nl': return _sl('form[name="cookieconsent"] input[name="consent"]');
		case 'marktplaats.nl': return _sl('#track-accept .button');
		case 'mdsrl.it': return _sl('.cookie-modal .ui-button');
		case 'medtronic.nl': return _sl('.acceptcookies');
		case 'online-store.mercedes-benz.de': return _sl('.mb-modal-alert-cookie .close');
		case 'sogeti.nl': return _sl('input[name="cookiewall_answer"] + .button');
		case 'blog.daimler.de': return _sl('.modal-close[title*="Akzeptieren"]');
		case 'zomoto.nl': return _sl('#lnkAccept span');
		case 'lyricsbox.com': return _sl('.button_large[onclick*="cookieconsent"]');
		case 'hyundai.nl': return _sl('.popup .btn input[onclick*="acceptCookies"]');
		case 'runtervomgas.de': return _sl('#cookie-bar a');
		case 'teesbusinesscompass.co.uk': return _sl('#cookiepanel + .ui-dialog-buttonpane button');
		case 'qlstats.net': return _sl('#accept button[onclick*="acceptCookiePolicy"]');
		case 'tallsay.com': return _sl('.buttonblue[name="cookieok"]');
		case 'openlibra.com': return _sl('#ol-cookie-policy button');
		case 'video.gazzanet.gazzetta.it': return _sl('#_evh-ric #AcceptButton');
		case 'zwartecross.nl': return _sl('.cc-cookie-accept');
		case 'zilverenkruis.nl': return _id('cookiedrie');
		case 'cookies.weeronline.nl': return _sl('.btn-accept');
		case 'wampirki.com': return _sl('#NavigationBar1 a');
		case 'volkskrant.nl': return _sl('.button--accept[href*="cookiewall"], .button--accept[onclick*="cookie"]');
		case 'voetbalzone.nl': return _sl('#balkiez a[href*="cookie"]');
		case 'm.voetbalzone.nl': return _sl('a[href*="/actions/cookie.asp"]');
		case 'tradukka.com': return _sl('#cookies_consent button');
		case 'radioveronica.nl': return _sl('.button[onclick*="allowCookies"]');
		case 'zorgverzekeringhema.nl': return _sl('#cookiemelder button');
		case 'meandermc.nl': return _sl('#meanderCookieDialog button');
		case 'e-thermostaat.nl': return _sl('#stAcceptDefault[onclick*="CookieStatement"]');
		case 'tvgids.nl': return _sl('.cookie-backdrop .btn-success');
		case 'longines.it': return _sl('.widget-cookie .allow');
		case 'easyjet.com': return _sl('.cookie-policy-drawer .close-drawer-button > button');
		case 'alternativa.fr': return _id('sub_cookie');
		case 'groepsaccomodaties.org': return _sl('input[name="cookie_answer"] + .button_yes');
		case 'paskoluklubas.lt': return _sl('.cookies-buttons .button');
		case 'onaplus.si': return _sl('.g-popup .btn');
		case 'etransport.pl': return _sl('.NovemediaCookiePolicy .approve');
		case 'letssingit.com': return _sl('.button_large[onclick*="cookieconsent"]');
		case 'skyradio.nl': return _sl('.button[onclick*="allowCookies"]');
		case 'community.ing.nl': return _sl('#cookie-1 .cookie-ctrl a');
		case 'payback.it': return _sl('#modal_CookieConsentOverlay .pb-button[data-dismiss]');
		case 'privacy.sbs.nl': return _sl('#settings-form .submit-button-small');
		case 'anvilknitwear.com': return _sl('.modal.cookie .btn[onclick*="setCookie"]');
		case 'kieskeurig.nl': return _sl('.consent__button a');
		case 'telegraafvandaag.nl': return _sl('.ott-bottom #button-agree');
		case 'o2.pl': return _sl('a[href*="polityka-prywatnosci"] + button');
		case 'outlet.mediamarkt.nl': return _id('cookie-consent');
		case 'plt.nl': return _sl('.site-image .accept');
		case 'monnikenwerk.pzc.wegenerwordpress.nl': return _sl('.pronamic_accept_button');
		case 'plazilla.com': return _sl('.buttonblue[name="cookieok"]');
		case 'rd.nl': return _sl('#myModal input[onclick="cookieInfo.setLevel(1)"]');
		case 'uitjekrant.nl': return _sl('.cw-button button');
		case 'debesteboeken.nl': return _sl('.cw-button button');
		case 'petitpalais.paris.fr': return _sl('.disclaimer .close');
		case 'fashionlab.nl': return _sl('#cookiewarning button[onclick*="close_cookie_agreement"]');
		case 'opencaching.de': return _sl('.cookie-notice--body #js--cookie-notice--close-button');
		case 'puma.com': return _sl('#modal-geoip-cookies.show button.notification__dismiss');
		case 'tube.nl': return _sl('button.js-cookie-consent');
		case 'rechtopgeld.nl': return _sl('#cookiewet .btn-success');
		case 'peaks.nl': return _sl('#cookie-modal .bubble');
		case 'reindicium.com': return _sl('#myModal .btn[onclick*="setCookie"]');
		case 'leroymerlin.ru': return _id('btn-accept_cookies');
		case 'fristadskansas.com': return _sl('label[for="UserAcceptedCookies2"]');
		case 'ikgastarten.nl': return _sl('.cookie-processed .agree-button a');
		case 'cookiesv2.publiekeomroep.nl': return _sl('.btn[onclick*="submit"]');
		case 'tripplite.com': return _sl('#cookieMsg a[onclick="tl.setEUcookie();"]');
		case 'second-hand-ikea.com': return _sl('#cookie_melding .link_button2');
		case 'petsie.nl': return _sl('.jBlockerAccept');
		case 'geostefani.net': return _sl('.popmake-overlay[data-popmake*="assenso-cookie"] .popmake-close');
		case 'relaischateaux.com': return _sl('.cnil-isvisible .close-cnil');
		case 'tournamentsoftware.com': return _sl('#messagewindow .button[name="btnAccept"]');
		case 'cookies-accept-nl.weeronline.cloud': return _sl('.content > .btn-accept');
		case 'polskifrontend.pl': return _ev("a[contains(., 'Rozumiem')]");
		case 'bereavementadvice.org': return _sl('#dialog-cookies .btn-primary');
		case '24kitchen.nl': return _sl('.cookie-container .submit-button');
		case 'henkel-reiniger.de': return _sl('.js-close-cookielayer');
		case 'gerritveldman.nl': return _sl('.gvca_ok_link');
		case 'hampshire.spydus.co.uk': return _sl('form[action*="ALLOWCOOKIES"] input[name="ACSUBMIT"]');
		case 'dulcogas.it': return _sl('.standalonelink[title="chiudere"]');
		case 'amphion.nl': return _sl('.site-image .accept');
		case 'depop.com': var e = _ev("span[contains(., 'By visiting our site you accept')]"); return (e ? _sl('a[href*="javascript"]', e.parentNode.parentNode) : false);
		case 'britishairways.com': return _sl('.cookieModalButton');
		case 'weerstatistieken.nl': return _sl('input[name="cookieconsent"] + input[type="submit"]');
		case 'wetransfer.com': return _sl('#tandcs[style*="block"] #accepting.enabled, .transfer__window.terms-conditions .transfer__button');
		case 'bjuvsbostader.se': return _sl('#cookiecheck .btn');
		case 'zwangerschapspagina.nl': return _sl('.accept[href*="setcookie"]');
		case 'subaru.de': return _sl('.CookieLayer__button');
	}
	
	
	var parts = h.split('.');
	
	if (parts.length > 2)
	{
		parts.shift();
		return getE(parts.join('.'));
	}
	
	return false;
}

setTimeout(function(){
	var h = document.location.hostname.replace(/^w{2,3}\d*\./i, '');
	var t = 0;

	var i = setInterval(function(){
		var e = getE(h);
		
		t++;
		
		if (e)
			e.click();
		
		if (e || t == 1000)
			clearInterval(i);
	}, 100);
}, 1000);