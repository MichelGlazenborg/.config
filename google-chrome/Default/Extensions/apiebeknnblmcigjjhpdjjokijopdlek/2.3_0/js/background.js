downloadPoolForDanbooru = function(info) {
	var poolUrl = info.linkUrl;
	var poolDownloader = new DanbooruPoolDownloader(poolUrl);
	poolDownloader.downloadImages();
};

downloadPoolForE621 = function(info) {
	var poolUrl = info.linkUrl;
	var poolDownloader = new E621PoolDownloader(poolUrl);
	poolDownloader.downloadImages();
};

downloadPoolForInkbunnyWithoutSubfolders = function(info) {
	var poolUrl = info.linkUrl;
	var poolDownloader = new InkbunnyPoolDownloader(poolUrl, false);
	poolDownloader.downloadImages();
};

downloadPoolForInkbunnyWithNumericalSubfolders = function(info) {
	var poolUrl = info.linkUrl;
	var poolDownloader = new InkbunnyPoolDownloader(poolUrl, true);
	poolDownloader.downloadImages();
};

downloadPoolForInkbunnyWithNamedSubfolders = function(info) {
	var poolUrl = info.linkUrl;
	var poolDownloader = new InkbunnyPoolDownloader(poolUrl, true, true);
	poolDownloader.downloadImages();
};

clearSavedCredentials = function() {
	var poolDownloader = new InkbunnyPoolDownloader();
	poolDownloader.clearSavedCredentials();
};

chrome.contextMenus.create({
	title: 'Download Pool',
	contexts: ['link'],
	targetUrlPatterns: ['*://danbooru.donmai.us/pools/*'],
	onclick: downloadPoolForDanbooru
});

chrome.contextMenus.create({
	title: 'Download Pool',
	contexts: ['link'],
	targetUrlPatterns: ['*://e621.net/pool/show/*'],
	onclick: downloadPoolForE621
});

chrome.contextMenus.create({
	title: 'Download Pool without Subfolders',
	contexts: ['link'],
	targetUrlPatterns: ['*://inkbunny.net/poolview_process.php?pool_id=*'],
	onclick: downloadPoolForInkbunnyWithoutSubfolders
});

chrome.contextMenus.create({
	title: 'Download Pool with Numerical Subfolders',
	contexts: ['link'],
	targetUrlPatterns: ['*://inkbunny.net/poolview_process.php?pool_id=*'],
	onclick: downloadPoolForInkbunnyWithNumericalSubfolders
});

chrome.contextMenus.create({
	title: 'Download Pool with Named Subfolders',
	contexts: ['link'],
	targetUrlPatterns: ['*://inkbunny.net/poolview_process.php?pool_id=*'],
	onclick: downloadPoolForInkbunnyWithNamedSubfolders
});

chrome.contextMenus.create({
	title: 'Clear Saved Credentials',
	contexts: ['link'],
	targetUrlPatterns: ['*://inkbunny.net/poolview_process.php?pool_id=*'],
	onclick: clearSavedCredentials
});