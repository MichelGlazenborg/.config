!function(o){var e="",i=[],t={},a=["newvaultGlobal","dialog","buttons"],l=["dialog","dialogFields"],r=function(o){i.push(o)},n=function(o){for(var e=0,t=i.length;e<t;++e)i[e]===o&&i.splice(e,1)},g=function(o){return e+LPPlatform.getResourcePath(o)},s=function(){var e=null,i=function(o,i){for(var t=0,a=o.length;t<a;++t){var l=o[t].getAttribute(i);l&&(e[l]=!0)}};return{loadFile:function(o,i){null===e&&s.initialize();var a=g(o.name);void 0===e[a]?(e[a]=!0,t[a]=[i],o.load(function(){var o=t[a];delete t[a];for(var e=0,i=o.length;e<i;++e)o[e]()})):t[a]?t[a].push(i):i()},initialize:function(){null===e&&(e={},i(o.getElementsByTagName("link"),"href"),i(o.getElementsByTagName("script"),"src"))}}}(),d=function(){this.files=[],this.addedFiles={}};d.prototype.load=function(o){var e=0,i=this.files,t=function(){++e,e===i.length?o&&o():s.loadFile(i[e],t)};0===e&&i.length>0&&s.loadFile(i[0],t)},d.prototype.addFile=function(o){void 0===this.addedFiles[o.name]&&(this.files.push(o),this.addedFiles[o.name]=!0)},d.prototype.addFiles=function(o){if(o){o=[].concat(o);for(var e=0,i=o.length;e<i;++e)this.addFile(o[e])}};var c=function(e){e.indexOf(".js")!==e.length-3&&(e=e+=".js"),this.name=e,this.load=function(i){var t=o.createElement("script");t.setAttribute("type","text/javascript"),t.setAttribute("src",g(e)),LPPlatform.addEventListener(t,"load",i),o.body.appendChild(t)}},D=function(e){e.indexOf(".css")!==e.length-4&&(e=e+=".css"),this.name=e,this.load=function(i){var t=o.createElement("link");t.setAttribute("type","text/css"),t.setAttribute("rel","stylesheet"),t.setAttribute("href",g(e)),LPPlatform.addEventListener(t,"load",i),o.body.appendChild(t)}},u=function(o){d.call(this),o=o?a.concat(o):a;for(var e=0,i=o.length;e<i;++e)this.addFile(o[e])};u.prototype=Object.create(d.prototype),u.prototype.constructor=u,u.prototype.addFile=function(o){o&&d.prototype.addFile.call(this,new D(o))},u.prototype.load=function(o){for(var e=0,i=this.files,t=function(){++e===i.length&&o()},a=0,l=i.length;a<l;++a)s.loadFile(i[a],t)};var p=function(o){d.call(this),o=o?l.concat(o):l;for(var e=0,i=o.length;e<i;++e)this.addFile(o[e])};p.prototype=Object.create(d.prototype),p.prototype.constructor=p,p.prototype.addFile=function(o){o&&d.prototype.addFile.call(this,new c(o))};var h=function(o){var i=this,t=!1,a=null,l=new p(o.js),g=new u(o.css),s=null;this.parentElementID=o.parentElementID,this.type=o.type;var d=function(){if(null===s)for(var o in dialogs)if(dialogs[o]===i){s=o;break}return s},c=function(o,e){var i,t,a={},l=o?[].concat(o):[];for(e=e?[].concat(e):[],i=0,t=l.length;i<t;++i)a[l[i]]=!0;for(i=0,t=e.length;i<t;++i)a.hasOwnProperty(e[i])||l.push(e[i]);return l};this.extend=function(e){return new LPDialog.DialogLoader({id:e.id||o.id,htmlSource:c(o.htmlSource,e.htmlSource),css:c(o.css,e.css),js:c(o.js,e.js),type:e.type||o.type,parentElementID:e.parentElementID||o.parentElementID})},this.loadedJS=function(){return t},this.getID=function(){return o.id};var D=function(e){return function(i){var l=window[o.type];a=new l(e),t=!0,i(a)}}(this);this.loadJS=function(o){l?(Topics.get(Topics.DIALOG_LOADING).publish(),l.load(function(){D(o)})):D(o)};var h=function(o,e,i){i=i||0;var t=o.find("img");if(t.length>0)for(var a=function(){function o(){r=!0,a<t.length&&e()}var a=0,l=null,r=!1;return i>0&&(l=setTimeout(o,i)),function(){++a,r||a!==t.length||(clearTimeout(l),l=null,e())}}(),l=0,r=t.length;l<r;++l)$(t[l]).bind("load",a);else e()},m=function(o,e){e=$(e),e.find("[dialogsection]").addBack("[dialogsection]").each(function(){var e=this.getAttribute("dialogsection"),i=o.find("[dialogsection="+e+"]");i.before(this),i.remove()}),e.find("[dialogsectionbefore]").addBack("[dialogsectionbefore]").each(function(){var e=this.getAttribute("dialogsectionbefore");o.find("[dialogsection="+e+"]").before(this)}),e.find("[dialogsectionafter]").addBack("[dialogsectionafter]").each(function(){var e=this.getAttribute("dialogsectionafter");o.find("[dialogsection="+e+"]").after(this)}),e.find("[dialogsectionappend]").addBack("[dialogsectionappend]").each(function(){var e=this.getAttribute("dialogsectionappend");o.find("[dialogsection="+e+"]").append(this)}),e.find("[dialogsectionprepend]").addBack("[dialogsectionprepend]").each(function(){var e=this.getAttribute("dialogsectionprepend");o.find("[dialogsection="+e+"]").prepend(this)})},f=function(i,t,a,l){a<t.length?LPPlatform.getHTML(e+o.htmlSource[a],function(o){m(i,o),f(i,t,++a,l)}):l()},y=function(i,t){var a=function(){h(i,t,7500)};o.htmlSource instanceof Array?LPPlatform.getHTML(e+o.htmlSource[0],function(e){i.html(e),f(i,o.htmlSource,1,a)}):o.htmlSource?LPPlatform.getHTML(e+o.htmlSource,function(o){i.html(o),a()}):a()};this.load=function(o,e){g?g.load(function(){y(o,e)}):y(o,e)},this.open=function(){var o=arguments;o&&o[0]?o[0].type=this.type:o=[{type:this.type}],this.loadedJS()?a.open.apply(a,o):(r(i),this.loadJS(function(){LPDialog.beforeLoad?LPDialog.beforeLoad(d(),function(){a.open.apply(a,o)}):a.open.apply(a,o),n(i)}))},this.close=function(){a&&a.close.apply(a,arguments)},this.getDialog=function(){return a}};LPRequire={requireJS:function(o,e){new p(o).load(e)}},LPDialog={DialogLoader:h,JSFileSet:p,CSSFileSet:u,getPendingCount:function(){return i.length},getDialogs:function(){var o=[];for(var e in dialogs)o.push(dialogs[e]);return o},setBaseURL:function(o){e=o},openDialog:function(o,e){dialogs[o].open(e)}}}(document),dialogs={site:new LPDialog.DialogLoader({id:"siteDialog",htmlSource:"siteDialog.html",css:["buttons","dialog","siteDialog","passwordMeter"],js:["selectDropdown","typeaheadDropdown","dialog","dialogWithGroupInput","editableFieldsDialog","siteDialog","passwordMeter","bloodhound","bloodhoundDropdown"],type:"SiteDialog"}),note:new LPDialog.DialogLoader({id:"noteDialog",htmlSource:"noteDialog.html",css:["buttons","dialog","noteDialog"],js:["selectDropdown","typeaheadDropdown","stateDropdown","phoneInput","cc3l","dialog","dialogWithGroupInput","noteDialog","countrySelect","timezoneSelect"],type:"NoteDialog"}),customNoteTemplate:new LPDialog.DialogLoader({id:"customNoteTemplateDialog",htmlSource:"customNoteTemplateDialog.html",css:["buttons","dialog","customNoteTemplateDialog"],js:["selectDropdown","typeaheadDropdown","dialog","customNoteTemplateDialog"],type:"CustomNoteTemplateDialog"}),formFill:new LPDialog.DialogLoader({id:"formFillDialog",htmlSource:"formFillDialog.html",css:["buttons","dialog","formFillDialog"],js:["selectDropdown","typeaheadDropdown","formFillDialog","countrySelect","timezoneSelect","stateDropdown","phoneInput","cc3l"],type:"FormFillDialog"}),acceptShare:new LPDialog.DialogLoader({id:"acceptShareDialog",htmlSource:"acceptRejectShareDialog.html",css:["buttons","dialog","acceptRejectShareDialog"],js:["selectDropdown","typeaheadDropdown","dialog","dialogWithGroupInput","acceptRejectShareDialog"],type:"AcceptShareDialog"}),share:new LPDialog.DialogLoader({id:"shareDialog",htmlSource:"shareDialog.html",css:["buttons","dialog","shareDialog","containerSelectionDialog","vaultItem"],js:["selectDropdown","typeaheadDropdown","dialog","shareDialog","bloodhound","bloodhoundDropdown","vaultItemTypeahead","sharingModel"],type:"ShareDialog"}),identity:new LPDialog.DialogLoader({id:"identityDialog",htmlSource:"identityDialog.html",css:["buttons","dialog","containerSelectionDialog","identityDialog"],js:["dialog","containerSelectionDialog","identityDialog"],type:"IdentityDialog"}),sharedfolderAccess:new LPDialog.DialogLoader({id:"sharedFolderAccessDialog",htmlSource:"sharedFolderAccessDialog.html",css:["buttons","dialog","containerSelectionDialog","sharedFolderAccessDialog"],js:["dialog","containerSelectionDialog","sharedFolderAccessDialog"],type:"SharedFolderAccessDialog"}),sharedFolder:new LPDialog.DialogLoader({id:"sharedFolderDialog",htmlSource:"sharedFolderDialog.html",css:["buttons","dialog","sharedFolderDialog"],js:["dialog","sharedFolderDialog","bloodhound","selectDropdown","typeaheadDropdown","bloodhoundDropdown"],type:"SharedFolderDialog"}),familiesSharedFolder:new LPDialog.DialogLoader({id:"familiesSharedFolderDialog",htmlSource:"familiesSharedFolderDialog.html",css:["buttons","dialog","familiesSharedFolderDialog"],js:["dialog","selectDropdown","familiesSharedFolderDialog"],type:"FamiliesSharedFolderDialog"}),createSharedFolder:new LPDialog.DialogLoader({id:"createSharedFolderDialog",htmlSource:"createSharedFolderDialog.html",css:["buttons","dialog"],js:["dialog","dialogWithGroupInput","folderDialog"],type:"CreateSharedFolderDialog"}),convertLegacySharedFolder:new LPDialog.DialogLoader({id:"convertLegacySharedFolderDialog",htmlSource:"convertLegacySharedFolderDialog.html",css:["buttons","dialog","convertLegacySharedFolderDialog"],js:["dialog","selectDropdown","convertLegacySharedFolderDialog"],type:"ConvertLegacySharedFolderDialog"}),createCreditMonitoring:new LPDialog.DialogLoader({id:"createCreditMonitoringDialog",htmlSource:"createCreditMonitoringDialog.html",css:["buttons","dialog","createCreditMonitoringDialog"],js:["dialog","createCreditMonitoringDialog"],type:"CreateCreditMonitoringDialog"}),generatePassword:new LPDialog.DialogLoader({id:"generatePasswordDialog",htmlSource:"generatePasswordDialog.html",css:["buttons","dialog","generatePasswordDialog","passwordMeter"],js:["dialog","generatePasswordDialog","selectDropdown","passwordMeter"],type:"GeneratePasswordDialog"}),betterGeneratePassword:new LPDialog.DialogLoader({id:"betterGeneratePasswordDialog",htmlSource:"betterGeneratePasswordDialog.html",css:["buttons","dialog","passwordMeter","betterGeneratePassword","betterGeneratePasswordDialog"],js:["dialog","betterGeneratePasswordDialog","selectDropdown","passwordMeter"],type:"BetterGeneratePasswordDialog"}),login:new LPDialog.DialogLoader({id:"loginDialog",htmlSource:"loginDialog.html",css:["loginDialog"],js:["loginDialog","capslockstate"],type:"LoginDialog"}),reprompt:new LPDialog.DialogLoader({id:"repromptDialog",htmlSource:"repromptDialog.html",css:["repromptDialog"],js:["repromptDialog"],type:"RepromptDialog"}),createAccount:new LPDialog.DialogLoader({id:"createAccountDialog",htmlSource:"createAccountDialog.html",css:["buttons","dialog","createAccountDialog","passwordMeter"],js:["dialog","createAccountDialog","selectDropdown","passwordMeter"],type:"CreateAccountDialog"}),folder:new LPDialog.DialogLoader({id:"folderDialog",type:"FolderDialog",css:["buttons","dialog"],js:["dialog","selectDropdown","typeaheadDropdown","dialogWithGroupInput","folderDialog"],htmlSource:"folderDialog.html"}),fieldHistory:new LPDialog.DialogLoader({id:"fieldHistoryDialog",htmlSource:"fieldHistoryDialog.html",css:["buttons","dialog","fieldHistoryDialog"],js:["dialog","fieldHistoryDialog"],type:"FieldHistoryDialog"}),linkAccount:new LPDialog.DialogLoader({id:"linkAccountDialog",htmlSource:"linkAccountDialog.html",css:["buttons","dialog","linkAccountDialog"],js:["dialog","linkAccountDialog"],type:"LinkAccountDialog"}),confirmation:new LPDialog.DialogLoader({id:"confirmationDialog",htmlSource:"confirmationDialog.html",css:["buttons","dialog"],js:["dialog","confirmationDialog"],type:"ConfirmationDialog"}),alert:new LPDialog.DialogLoader({id:"alertDialog",htmlSource:"alertDialog.html",css:["buttons","dialog"],js:["dialog","confirmationDialog"],type:"AlertDialog"}),enterpriseTrial:new LPDialog.DialogLoader({id:"enterpriseTrialDialog",htmlSource:"enterpriseTrialDialog.html",css:["buttons","dialog"],js:["dialog","enterpriseTrialDialog"],type:"EnterpriseTrialDialog"}),denyEmergencyAccess:new LPDialog.DialogLoader({id:"denyEmergencyAccessDialog",htmlSource:"denyEmergencyAccessDialog.html",css:["buttons","dialog"],js:["dialog","denyEmergencyAccessDialog"],type:"DenyEmergencyAccessDialog"}),verifyEmail:new LPDialog.DialogLoader({id:"verifyEmailDialog",htmlSource:"verifyEmailDialog.html",css:["buttons","dialog"],js:["dialog","verifyEmailDialog"],type:"VerifyEmailDialog"}),application:new LPDialog.DialogLoader({id:"applicationDialog",htmlSource:"applicationDialog.html",css:["buttons","dialog","passwordMeter"],js:["dialog","dialogWithGroupInput","editableFieldsDialog","passwordMeter","applicationDialog","selectDropdown","typeaheadDropdown"],type:"ApplicationDialog"}),chooseProfile:new LPDialog.DialogLoader({id:"chooseProfileDialog",htmlSource:"chooseProfileDialog.html",css:["buttons","dialog","chooseProfileDialog"],js:["dialog","chooseProfileDialog"],type:"ChooseProfileDialog"}),vaultItemSelect:new LPDialog.DialogLoader({id:"vaultItemSelectDialog",htmlSource:"vaultItemSelectDialog.html",css:["buttons","dialog","vaultItem"],js:["dialog","vaultItemSelectDialog"],type:"VaultItemSelectDialog"}),inviteFriends:new LPDialog.DialogLoader({id:"inviteFriendsDialog",htmlSource:"inviteFriendsDialog.html",css:["buttons","dialog"],js:["dialog","inviteFriendsDialog"],type:"InviteFriendsDialog"}),addEmergencyAccess:new LPDialog.DialogLoader({id:"addEmergencyAccessDialog",htmlSource:"addEmergencyAccessDialog.html",css:["buttons","dialog"],js:["dialog","addEmergencyAccessDialog"],type:"AddEmergencyAccessDialog"}),upgradePremium:new LPDialog.DialogLoader({id:"upgradePremiumDialog",htmlSource:"upgradePremiumDialog.html",css:["buttons","dialog"],js:["dialog","upgradePremiumDialog"],type:"UpgradePremiumDialog"}),upgradeFamilies:new LPDialog.DialogLoader({id:"upgradeFamiliesDialog",htmlSource:"upgradeFamiliesDialog.html",css:["buttons","dialog"],js:["dialog","upgradeFamiliesDialog"],type:"UpgradeFamiliesDialog"}),familiesInvitation:new LPDialog.DialogLoader({id:"familiesInvitationDialog",htmlSource:"familiesInvitationDialog.html",css:["buttons","dialog"],js:["dialog","familiesInvitationDialog"],type:"FamiliesInvitationDialog"}),tryFamilies:new LPDialog.DialogLoader({id:"tryFamiliesDialog",htmlSource:"tryFamiliesDialog.html",css:["buttons","dialog"],js:["dialog","tryFamiliesDialog"],type:"TryFamiliesDialog"}),sharingKey:new LPDialog.DialogLoader({id:"sharingKeyDialog",htmlSource:"sharingKeyDialog.html",css:["buttons","dialog"],js:["dialog","sharingKeyDialog"],type:"SharingKeyDialog"}),addFormField:new LPDialog.DialogLoader({id:"addFormFieldDialog",htmlSource:"addFormFieldDialog.html",js:["dialog","dialogWithGroupInput","editableFieldsDialog"],type:"AddFormFieldDialog"}),addItem:new LPDialog.DialogLoader({id:"addItemDialog",htmlSource:"addItemDialog.html",js:["addItemDialog"],css:["addItemDialog","lpGrid"],type:"AddItemDialog"}),tourDialogBase:new LPDialog.DialogLoader({id:"introTourDialog",htmlSource:"Tour/introTourDialog.html",css:["buttons","dialog","lpGrid","Tour/introTourDialog"],js:["dialog","lpArrow","lpPing","Tour/introTourData","Tour/introTourFlow","Tour/introTourQueue","Tour/introTour","Tour/introTourDialog"],type:"IntroTourDialog"})},dialogs.changePassword=dialogs.vaultItemSelect.extend({id:"changePasswordDialog",js:"changePasswordDialog",type:"ChangePasswordDialog"}),$.extend(dialogs,{notification:new LPDialog.DialogLoader({id:"notificationDialog",htmlSource:"notificationDialog.html",css:["buttons","dialog","notificationDialog"],js:["dialog","notificationDialog"],type:"NotificationDialog"}),duplicatePassword:new LPDialog.DialogLoader({id:"duplicatePasswordDialog",htmlSource:"duplicatePasswordDialog.html",css:["buttons","dialog","duplicatePasswordDialog"],js:["dialog","duplicatePasswordDialog"],type:"DuplicatePasswordDialog"}),weakPassword:new LPDialog.DialogLoader({id:"weakPasswordDialog",htmlSource:"weakPasswordDialog.html",css:["buttons","dialog","weakPasswordDialog"],js:["dialog","weakPasswordDialog"],type:"WeakPasswordDialog"}),preferences:new LPDialog.DialogLoader({id:"preferencesDialog",htmlSource:"preferencesDialog.html",css:["buttons","dialog","preferencesDialog"],js:["dialog","preferencesDialog"],type:"PreferencesDialog"}),introTutorialInboxImporter:new LPDialog.DialogLoader({id:"introTutorialInboxImporter",htmlSource:"IntroTutorial/introTutorialInboxImporter.html",css:["buttons","dialog","lpGrid","IntroTutorial/introTutorialHelpDialog","IntroTutorial/introTutorial","IntroTutorial/introTutorialInboxImporter"],js:["dialog","IntroTutorial/introTutorialInboxImporter"],type:"IntroTutorialInboxImporterDialog"}),introTutorialWelcome:new LPDialog.DialogLoader({id:"introTutorialWelcomeDialog",htmlSource:"IntroTutorial/introTutorialWelcomeDialog.html",css:["buttons","dialog","lpGrid","IntroTutorial/introTutorialHelpDialog","IntroTutorial/introTutorial"],js:["dialog","IntroTutorial/introTutorialHelpDialogOriginal","IntroTutorial/introTutorialWelcomeDialog"],type:"IntroTutorialWelcomeDialog"}),introTutorialSelectSite:new LPDialog.DialogLoader({id:"introTutorialSelectSiteDialog",htmlSource:"IntroTutorial/introTutorialSelectSiteDialog.html",css:["buttons","dialog","lpGrid","IntroTutorial/introTutorialHelpDialog","IntroTutorial/introTutorial"],js:["dialog","IntroTutorial/LPSiteService","IntroTutorial/introTutorialImages","IntroTutorial/introTutorialSelectSiteDialog"],type:"IntroTutorialSelectSiteDialog"}),introTutorialComplete:new LPDialog.DialogLoader({id:"introTutorialCompleteDialog",htmlSource:"IntroTutorial/introTutorialCompleteDialog.html",css:["buttons","dialog","lpGrid","IntroTutorial/introTutorialHelpDialog","IntroTutorial/introTutorial"],js:["dialog","IntroTutorial/introTutorialCompleteDialog"],type:"IntroTutorialCompleteDialog"}),introTutorialHelp:new LPDialog.DialogLoader({id:"introTutorialHelpDialog",htmlSource:"IntroTutorial/introTutorialHelpDialog.html",css:"IntroTutorial/introTutorialHelpDialog",js:["IntroTutorial/introTutorialHelpDialog"],type:"IntroTutorialHelpDialog"}),tourDialogBase:new LPDialog.DialogLoader({id:"introTourDialog",htmlSource:"Tour/introTourDialog.html",css:["buttons","dialog","lpGrid","Tour/introTourDialog"],js:["dialog","lpArrow","lpPing","Tour/introTourData","Tour/introTourFlow","Tour/introTourQueue","Tour/introTour","Tour/introTourDialog"],type:"IntroTourDialog"})}),dialogs.login=dialogs.login.extend({htmlSource:"extensionLoginDialog.html",css:"extensionLoginDialog",js:["extensionLoginDialog","selectDropdown","typeaheadDropdown"],type:"ExtensionLoginDialog"}),dialogs.siteTutorial=dialogs.site.extend({css:"IntroTutorial/introTutorialHelpDialogOriginal",js:["IntroTutorial/introTutorialHelpDialogOriginal","extensionSiteTutorialDialog"],type:"ExtensionSiteTutorialDialog"}),function(){var o=new LPDialog.DialogLoader({id:"loginDialog",htmlSource:"extensionLoginDialogSimple.html",css:["fonts/opensans/opensans.css","loginDialog","extensionDialogSimple","extensionLoginDialogBase","lpGrid","backgroundOverlay"],js:["loginDialog","extensionLoginDialog","capslockstate","extensionLoginDialogSimple","selectDropdown","typeaheadDropdown","fieldValidator","backgroundOverlay"],type:"ExtensionLoginDialogSimple"});dialogs.loginSimple=o.extend({css:["extensionLoginDialogSimple"]}),dialogs.loginTab=o.extend({css:["extensionLoginDialogTab"]});var e=new LPDialog.DialogLoader({id:"createAccountDialog",css:["fonts/opensans/opensans.css","extensionDialogSimple","buttons","dialog","lpGrid","passwordMeter","backgroundOverlay","extensionCreateAccountBase"],js:["createAccountDialog","dialog","extensionCreateAccount","selectDropdown","passwordMeter","fieldValidator","backgroundOverlay","fieldToolTip","emailToolTip","buildVars"],type:"ExtensionCreateAccount"});dialogs.createAccountSimple=e.extend({htmlSource:"extensionCreateAccountDialogSimple.html",css:["extensionCreateAccountSimple"],js:["extensionCreateAccountSimple"],type:"ExtensionCreateAccountSimple"}),dialogs.createAccountIcon=e.extend({htmlSource:"extensionCreateAccountDialogIcon.html",css:["extensionCreateAccountIcon","compositeBackgroundOverlay"],js:["extensionCreateAccountIcon","request","lpArrow","compositeBackgroundOverlay"],type:"ExtensionCreateAccountIcon"})}();