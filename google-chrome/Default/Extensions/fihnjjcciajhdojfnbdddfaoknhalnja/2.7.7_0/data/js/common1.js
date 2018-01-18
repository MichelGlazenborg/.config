setTimeout(function(){
	var t = 0;

	var i = setInterval(function(){
		var e = document.querySelector('\
			form[action*="cookieservice"] #acceptButton,\
			.c-cookie-consent form[name="cookie-consent"] input[type="submit"],\
			#cookieform input.modal__submit,\
			#accept_koe.btn,\
			form[action*="cookie"] .melding #btnYes,\
			#cookie-consent-form input[type="submit"],\
			.cookiebar-actions #grantPermissionButton,\
			.cookiewall #TOL_link1,\
			.cookie-wrap[style] #TOL_link1,\
			#cookieConsentPopup .btn,\
			#cadre_alert_cookies .popup-modal-dismiss,\
			#cookieConsentModal .success,\
			.js-accept-cookies.btn,\
			#btn-allow-cookie,\
			.modal-cookie-warning .modal-close,\
			.cookiemessage__button--accept,\
			button[onclick^="acceptCookie"],\
			.cookieWallContent .ok-cookies,\
			#cookie-master #acceptCookies,\
			.cookie-wall .cookie-button,\
			#cookiebar_wrapper .accept-button,\
			.cookieallowbutton,\
			#js-cookie-message #js-accept-cookie,\
			.popup-cookie--buttons .popup-cookie--save,\
			.cookie-box #cookie-button,\
			#cookie-acceptance .btn.allow,\
			#acceptcookies.btn,\
			#cookiewet_NL .btn[href*="acceptcookie"],\
			.cadre_inner_texte_alert_cookies .popup-modal-dismiss,\
			.cookiewall button.allow_cookies,\
			#agree_with_cookie_terms,\
			.cookie-compliance-ok-btn,\
			a.cookieControlAccept,\
			button#cookie_accept,\
			.close.uiDismissCookiePolicy,\
			#cookiePolicy .info-close,\
			input[name="bw-cookie-consent-agree"] + input[type="submit"],\
			.js-cookie-info-accept-button,\
			#cookiePopup .btn-primary,\
			.modal .button[href*="accepteer-cookies"],\
			#cookie-modal .accept-cookies,\
			.popupframe input[name="cookieconsent_agreed"],\
			#ucCookiePolicy_btnCookiePolicyDismiss,\
			.alternetCookieMessage .alternetCookieAnswerLink,\
			#cookie-modal #cookie-consent-btn,\
			#cookies .button.CookiesOK,\
			.m-cookie-disclaimer .s-btn-close,\
			.consenso a[href*="accept-cookies"],\
			.button_submit[title="I accept the cookies"],\
			.accept-cookies a[onclick*="acceptCookies"],\
			.as_cookies_block_buttons a,\
			#btn-give-cookie-consent,\
			.cookie-info .btn-primary.cookie-accept,\
			.modal-open #cookie-modal .cookie-accept,\
			#js-cookie-popup.magnificPopup .btnSave,\
			#melding .ja,\
			.cookie-notification .btn-primary,\
			.window-cookiewall .cookie-button,\
			#cookieModal .btn-icon-primary,\
			.wall #form_save,\
			.consent #button_yes,\
			.CookieSplashPage #NextButton,\
			#cookieconsent1.accept,\
			#jakoekies,\
			.btn-accept[href*=coockie],\
			.btn-accept[href*=cookie],\
			.btn-accept[href*=Cookie],\
			.layout--cookiewall .fjs-accept,\
			#cookies__modal .btn[href*="AcceptCookie"],\
			.btnAccept[href*="Cookies"],\
			#cookie-wall .btn-accept-cookies,\
			#cookiebox-nieuw .btn-cookie,\
			.cookiecontainer button[name="accept"],\
			.btn--accept[href*="cookiewall"],\
			form[name="cookieconsent"] .btn.consent,\
			body.background .footer button#form_save.button[name="form[save]"],\
			.view-cookie .js-cta-accept-cookie\
		');
		
		t++;
		
		if (e)
			e.click();
		
		if (e || t == 1000)
			clearInterval(i);
	}, 100);
}, 1000);