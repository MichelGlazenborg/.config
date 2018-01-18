!function(t){"use strict";var e=function(e){bg.IntroTutorial.getState(function(i){if(i.enabled&&document.location.host.toLowerCase().includes(i.domain)){var o=i.isInContext?t.InContextIntroTutorialDialogOptions:t.VaultIntroTutorialDialogOptions;e(i,o)}})};Topics.get(Topics.SITE_NOTIFICATION_STATE).subscribe(function(t){function i(t){n&&t&&LPFrame.css({id:n.getDialogID(),css:{top:t.top+45,left:t.left+t.infieldOffset+25}})}function o(t){n?(Topics.get(Topics.INFIELD_FRAME_POSITION_CHANGED).unsubscribe(i),bg.IntroTutorial.getState(function(e){"add_first_site"!==e.inContextOnboardingStep&&(n.close(!0),n=null,t&&t())})):t&&t()}var n=null;e(function(t,e){var i=LPSiteService.getSite(t.domain);if(i.isLoggedIn(document)){if(bg.IntroTutorial.setState({firstLogin:!1}),!LPFrame.hasDialogs()&&(n=t.isLoginTheLastPassWay?LPFrame.openDialog(e.name,{addHide:!0,textChoice:"loginTheLastPassWay",arrow:e.getArrowOptions()},{css:e.getCssOptions()}):LPFrame.openDialog(e.name,{addHide:!0,textChoice:"siteLanding",arrow:e.getArrowOptions()},{css:e.getCssOptions()}))){var o=e.getTrackElementOptions();o.element=i.getTrackingEl(document),n.trackElement(o)}}else t.firstLogin?i.logMeOut(document,e.name):t.isAllSet&&bg.IntroTutorial.completeTutorial({textChoice:"completed"})}),Topics.get(Topics.SITE_NOTIFICATION).subscribe(function(i){e(function(e,o){bg.IntroTutorial.setState({inContextOnboardingStep:"add_site_to_lastpass"}),setTimeout(function(){bg.sendLpImprove("onboardingtour::displayed_onboarding_save_a_site",{version:"incontext"}),i.getInterface().LPDialog.openDialog(o.name,{addHide:!0,siteName:t.defaultData.name,textChoice:"saveSite",parentDialog:"contentScriptSite",css:{position:"absolute",top:"100%","margin-top":"10px","margin-right":0,right:0},arrow:{orientation:"top",positionTarget:"#submit"}})},1e3)})}),Topics.get(Topics.INFIELD_NOTIFICATION_OPENED).subscribe(function(t){e(function(e,s){o(function(){var o=e.inContextOnboardingStep;o&&"add_first_site"!==o&&(n=LPFrame.openDialog(s.name,{addHide:!0,textChoice:"selectYourSite",arrow:s.getArrowOptions()},{css:{width:"auto",height:"auto","min-width":"168px"}})),Topics.get(Topics.INFIELD_FRAME_POSITION_CHANGED).subscribe(i),i(t)})})}),Topics.get(Topics.INFIELD_NOTIFICATION_FILLED).subscribe(function(){e(function(t,e){t.enabled&&(bg.IntroTutorial.setState({isLoginTheLastPassWay:!1}),bg.IntroTutorial.completeTutorial({textChoice:"completed",siteName:t.domain}))})}),Topics.get(Topics.INFIELD_NOTIFICATION_CLOSED).subscribe(function(){e(function(t,e){o()})})})}(IntroTutorialDialogOptions);