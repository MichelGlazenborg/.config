// Vars

var whitelisted_domains = {},
	tab_list = {},
	context_menu = {},
	show_context_menu = true;


// Common functions

function getHostname(url, cleanup)
{
	try
	{
		if (!/^http/.test(url))
			throw true;
		
		var a = new URL(url);
		
		return (typeof cleanup == 'undefined' ? a.hostname : a.hostname.replace(/^w{2,3}\d*\./i, ''));
	}
	catch(error)
	{
		return false;
	}
}


// Whitelisting

function updateWhitelist()
{
	chrome.storage.local.get('whitelisted_domains', function(r) {
		if (typeof r.whitelisted_domains != 'undefined')
			whitelisted_domains = r.whitelisted_domains;
	});
}

updateWhitelist();

chrome.runtime.onMessage.addListener(function(request, info){
	if (request == 'update_whitelist')
		updateWhitelist();
});

function isWhitelisted(hostname)
{
	return (typeof whitelisted_domains[hostname] != 'undefined');
}

function toggleWhitelist(info, tab)
{
	if (!/^http/.test(tab.url) || !tab_list[tab.id])
		return;
	
	var is_whitelisted = tab_list[tab.id].whitelisted;
	
	if (is_whitelisted)
	{
		delete whitelisted_domains[tab_list[tab.id].hostname];
		
		for (var i in block_urls_backup)
			if (block_urls_backup[i].indexOf(tab_list[tab.id].hostname) > -1)
				block_urls.push(block_urls_backup[i]);
	}
	else
	{
		whitelisted_domains[tab_list[tab.id].hostname] = true;
		
		var i = block_urls.length;
		
		while (i--)
		{
			if (block_urls[i].indexOf(tab_list[tab.id].hostname) > -1)
				block_urls.splice(i, 1);
		}
	}
	
	chrome.storage.local.set({'whitelisted_domains': whitelisted_domains}, function(){
		for (var i in tab_list)
		{
			if (tab_list[i].hostname == tab_list[tab.id].hostname)
			{
				tab_list[i].whitelisted = !is_whitelisted;
				chrome.tabs.executeScript(tab_list[i].id, {code:'window.location.reload();'});
			}
		}
	});
}


// Maintain tab list

function getPreparedTab(tab)
{
	tab.hostname = false;
	tab.whitelisted = false;
	
	if (tab.url)
	{
		tab.hostname = getHostname(tab.url, true);
		tab.whitelisted = isWhitelisted(tab.hostname);
	}
	
	return tab;
}

function onCreatedListener(tab)
{
    tab_list[tab.id] = getPreparedTab(tab);
}

function onUpdatedListener(tabId, changeInfo, tab) {
    tab_list[tab.id] = getPreparedTab(tab);
}

function onRemovedListener(tabId) {
    if (tab_list[tabId])
		delete tab_list[tabId];
}

function recreateTabList()
{
	tab_list = {};
	
	chrome.tabs.query({}, function(results) {
		results.forEach(onCreatedListener);
		
		for (var i in tab_list)
			doTheMagic(tab_list[i].id);
	});
}

chrome.tabs.onCreated.addListener(onCreatedListener);
chrome.tabs.onUpdated.addListener(onUpdatedListener);
chrome.tabs.onRemoved.addListener(onRemovedListener);

chrome.runtime.onStartup.addListener(recreateTabList);

chrome.runtime.onInstalled.addListener(function(d){
	if (d.reason == "update" && chrome.runtime.getManifest().version > d.previousVersion)
		recreateTabList();
});


// URL blocking

function blockUrlCallback(d)
{
	if (tab_list[d.tabId] && d.url)
	{
		if (!tab_list[d.tabId].whitelisted)
		{
			for (var i in block_urls)
			{
				if (d.url.search(block_urls[i]) > -1 && d.url.search(',') == -1)
					return {cancel:true};
			}
		}
	}
	
	return {cancel:false};
}

chrome.webRequest.onBeforeRequest.addListener(blockUrlCallback, {urls:["http://*/*", "https://*/*"], types:["script","stylesheet"]}, ["blocking"]);


// Reporting

function reportWebsite(info, tab)
{
	if (!/^http/.test(tab.url) || !tab_list[tab.id])
		return;
	
	
	var hostname = getHostname(tab.url);
	
	if (hostname.length == 0)
		return;
	
	
	if (tab_list[tab.id].whitelisted)
	{
		return chrome.notifications.create(
			'report',
			{
				type: "basic",
				title: "Extension is disabled on " + hostname,
				message: "You have disabled the extension on this website. Please enable it and check if you see the cookie warning before reporting.",
				iconUrl: "icons/48.png"
			}
		);
	}
	
	
	chrome.tabs.executeScript(tab.id, {code: "\
		if (confirm('Would you like to report a cookie warning on this website?'))\
		{\
			var img = document.createElement('img');\
			img.src = 'https://www.i-dont-care-about-cookies.eu/report/275.php?d="+hostname+"&t='+(new Date()).getTime();\
			\
			img.onload = function()\
			{\
				chrome.runtime.sendMessage('reported');\
				document.body.removeChild(img);\
			};\
			document.body.appendChild(img);\
		}\
	"});
}

chrome.runtime.onMessage.addListener(function(request, info){
	if (request == 'reported')
	{
		chrome.notifications.create(
			'update',
			{
				type: "basic",
				title: "The cookie warning will be gone very soon :)",
				message: "If you can, please make a small donation to support this project.",
				iconUrl: "icons/48.png"
			}
		);
	}
});


// Context menu

function modifyContextMenu(input)
{
	if (typeof input == 'object')
	{
		if (context_menu.toggle)
		{
			if (input.hostname)
			{
				chrome.contextMenus.update(context_menu.toggle, {
					"title":(input.whitelisted ? 'Enable' : 'Disable') + ' extension on ' + input.hostname,
					"contexts":["all"],
					"onclick":toggleWhitelist
				});
			}
			else
			{
				chrome.contextMenus.update(context_menu.toggle, {
					"title":'Extension doesn\'t work properly on this domain.',
					"contexts":["all"]
				});
			}
		}
		
		return;
	}
	
	if (input == 'show_menu' || input == 'hide_menu')
	{
		show_context_menu = false;
		chrome.contextMenus.removeAll();
		context_menu = {};
		
		if (input == 'show_menu')
		{
			show_context_menu = true;
			
			context_menu.report = chrome.contextMenus.create({
				"title":'Report a cookie warning',
				"contexts":["all"],
				"onclick":reportWebsite
			});
			
			context_menu.toggle = chrome.contextMenus.create({
				"title":'Extension doesn\'t work properly on this domain.',
				"contexts":["all"]
			});
			
			context_menu.support = chrome.contextMenus.create({
				"title":'Support this project',
				"contexts":["all"],
				"onclick":function(){chrome.tabs.create({url:"https://www.i-dont-care-about-cookies.eu/"});}
			});
			
			chrome.tabs.query({currentWindow:true, active:true}, function (tabs) {
				if (tabs[0] && tab_list[tabs[0].id])
					modifyContextMenu(tab_list[tabs[0].id]);
			});
		}
	}
}

chrome.runtime.onMessage.addListener(modifyContextMenu);

chrome.storage.local.get('contextmenu', function(r) {
	if (typeof r.contextmenu != 'undefined')
		show_context_menu = r.contextmenu;
	
	modifyContextMenu((show_context_menu ? 'show' : 'hide') + '_menu');
});

chrome.tabs.onActivated.addListener(function(info){
	if (!tab_list[info.tabId])
		return;
	
	modifyContextMenu(tab_list[info.tabId]);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (!tab_list[tabId])
		return;
	
	chrome.tabs.query({currentWindow:true, active:true}, function (tabs) {
		if (tabs[0] && tab.id == tabs[0].id)
			modifyContextMenu(tab_list[tabId]);
	});
});


// Adding custom CSS/JS

function activateDomain(hostname, tabId)
{
	if (typeof rules[hostname] == 'undefined' || isWhitelisted(hostname))
		return false;
	
	var r = rules[hostname];
	
	if (typeof r.s != 'undefined')
		chrome.tabs.insertCSS(tabId, {code:r.s, allFrames:true, runAt:'document_start'});
	else if (typeof r.c != 'undefined')
		chrome.tabs.insertCSS(tabId, {code:commons[r.c], allFrames:true, runAt:'document_start'});
	else if (typeof r.j != 'undefined')
		chrome.tabs.executeScript(tabId, {file:'data/js/'+(r.j > 0 ? 'common'+r.j : hostname)+'.js', allFrames:true, runAt:'document_end'});
	else
		return false;
	
	return true;
}

function doTheMagic(tabId)
{
	if (!tab_list[tabId] || !/^http/.test(tab_list[tabId].url))
		return;
	
	tab_list[tabId].hostname = getHostname(tab_list[tabId].url, true);
	tab_list[tabId].whitelisted = isWhitelisted(tab_list[tabId].hostname);
	
	if (tab_list[tabId].whitelisted)
		return;
	
	chrome.tabs.insertCSS(tabId, {file:"data/css/common.css", allFrames:true, runAt:'document_start'});
	
	if (activateDomain(tab_list[tabId].hostname, tabId))
		return;
	
	var host_parts = tab_list[tabId].hostname.split('.');
	
	for (var i=host_parts.length; i>=2; i--)
		if (activateDomain(host_parts.slice(-1*i).join('.'), tabId))
			return true;
}

chrome.webNavigation.onCommitted.addListener(function(tab){
	if (tab.frameId > 0)
		return;
	
	tab_list[tab.tabId] = getPreparedTab(tab);
	doTheMagic(tab.tabId);
});


// Update notification

chrome.runtime.onInstalled.addListener(function(d){
// 	if (d.reason == "update" && chrome.runtime.getManifest().version > d.previousVersion)
// 	{
// 		chrome.tabs.create({url:"https://www.i-dont-care-about-cookies.eu/call-for-action/2017/"});
// 		
// 		chrome.notifications.create(
// 			'update',
// 			{
// 				type: "basic",
// 				title: "I don't care about cookies - UPDATED",
// 				message: "If you open extension options, you'll be able to see and edit all whitelisted websites.",
// 				iconUrl: "icons/48.png",
// 				buttons:[{title:'Support this project'}]
// 			}
// 		);
// 		
// 		chrome.notifications.onButtonClicked.addListener(function(){
// 			chrome.tabs.create({url:"https://www.i-dont-care-about-cookies.eu/"});
// 		});
// 	}
	
	if (d.reason == "install")
	{
		chrome.notifications.create(
			'install',
			{
				type: "basic",
				title: "Cookie warnings are gone :)",
				message: "Thanks for using I don't care about cookies! If you want to support this project, please click on the link bellow.",
				iconUrl: "icons/48.png",
				buttons:[{title:'Support this project'}]
			}
		);
		
		chrome.notifications.onButtonClicked.addListener(function(){
			chrome.tabs.create({url:"https://www.i-dont-care-about-cookies.eu/"});
		});
	}
});