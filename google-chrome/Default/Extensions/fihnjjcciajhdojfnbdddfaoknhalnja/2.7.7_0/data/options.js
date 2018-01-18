function save_options()
{
	var contextmenu = document.getElementById('contextmenu').checked,
		whitelist = document.getElementById('whitelist').value.split("\n"),
		whitelisted_domains = {};
	
	for (var i in whitelist)
	{
		whitelist[i] = whitelist[i].trim().replace(/^w{2,3}\d*\./i, '');
		
		if (whitelist[i].length > 0 && whitelist[i].length < 100)
			whitelisted_domains[whitelist[i]] = true;
	}
	
	chrome.storage.local.set({contextmenu:contextmenu, whitelisted_domains:whitelisted_domains}, function(){
		document.getElementById('status_saved').style.display = 'inline';
		
		setTimeout(function() {
			document.getElementById('status_saved').style.display = 'none';
		}, 2000);
		
		chrome.runtime.sendMessage(contextmenu ? 'show_menu' : 'hide_menu');
		chrome.runtime.sendMessage('update_whitelist');
  });
}

function restore_options() {
  chrome.storage.local.get({
    contextmenu: true,
	whitelisted_domains: {}
  }, function(items) {
    document.getElementById('contextmenu').checked = items.contextmenu;
	document.getElementById('whitelist').value = Object.keys(items.whitelisted_domains).sort().join("\n");
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);