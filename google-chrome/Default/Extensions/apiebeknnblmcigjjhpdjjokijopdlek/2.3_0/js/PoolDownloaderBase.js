var PoolDownloaderBase = function (poolUrl)
{
	this.xhr = null;
	this.queuedRequestUrls = [];
	this.queuedRequestOnSuccessMethods = [];
	
	if (poolUrl)
	{
		this.poolId = this.getPoolIdFromUrl(poolUrl);
	}
	
	this.poolName = '';
	this.currentPoolPage = 1;
	this.maxPoolPages = -1;
	this.imagesPerPoolPage = 24;
}

PoolDownloaderBase.prototype.beforeTryingToDownloadImages = function() {
}

PoolDownloaderBase.prototype.downloadImages = function() {
	this.beforeTryingToDownloadImages();
	
	this.continueTryingToDownloadImages();
}

PoolDownloaderBase.prototype.continueTryingToDownloadImages = function() {
	if (this.cancelQueuedRequests)
	{
		return;
	}
	
	if (this.isRunningRequest)
	{
		var poolDownloader = this;
		
		setTimeout(function(){
			poolDownloader.continueTryingToDownloadImages();
		}, 100);
		
		return;
	}
	
	var requestUrl = this.getPoolRequestUrl();
	
	this.queueOrMakeUrlRequest(requestUrl, this.downloadImagesFromPoolList);
}

PoolDownloaderBase.prototype.getPoolRequestUrl = function() {
	log("getPoolRequestUrl() not overridden.");
}

PoolDownloaderBase.prototype.getPoolIdFromUrl = function() {
	log("getPoolIdFromUrl() not overridden.");
}

PoolDownloaderBase.prototype.queueOrMakeUrlRequest = function(url, methodOnSuccessfulRetrieve, runNext)
{
	if (this.isRunningRequest || this.queuedRequestUrls.length > 0)
	{
		this.queueRequest(url, methodOnSuccessfulRetrieve, runNext);
		return;
	}
	
	this.makeUrlRequest(url, methodOnSuccessfulRetrieve);
}

PoolDownloaderBase.prototype.makeUrlRequest = function(url, methodOnSuccessfulRetrieve)
{
	log('Making request to: ' + url);
	
	if (this.xhr != null) 
		this.xhr.abort();
	
	this.xhr = new XMLHttpRequest();
	
	this.isRunningRequest = true;
	
	this.xhr.open('GET', url, true);
	
	var poolDownloader = this;
	
	this.xhr.onload = function() {
		var responseText = poolDownloader.xhr.responseText;
		
		if (poolDownloader.xhr.status == 200)
		{
			if (methodOnSuccessfulRetrieve)
			{
				methodOnSuccessfulRetrieve.call(poolDownloader, responseText);
			}
		}
		else
		{
			poolDownloader.handleWebsiteRequestErrorResponse(url, responseText);
		}
		
		poolDownloader.isRunningRequest = false;
		
		poolDownloader.runNextQueuedRequest();
	};
	
	this.xhr.onerror = function() {
		log('XMLHttpRequest encountered an error.');
	};
	
	this.xhr.send();
}

PoolDownloaderBase.prototype.queueRequest = function(url, methodOnSuccessfulRetrieve, runNext)
{
	if (runNext)
	{
		this.queuedRequestUrls.unshift(url);
		this.queuedRequestOnSuccessMethods.unshift(methodOnSuccessfulRetrieve);
	}
	else
	{
		this.queuedRequestUrls.push(url);
		this.queuedRequestOnSuccessMethods.push(methodOnSuccessfulRetrieve);
	}
}

PoolDownloaderBase.prototype.runNextQueuedRequest = function()
{
	if (this.queuedRequestUrls.length == 0 || this.queuedRequestOnSuccessMethods.length == 0 || this.cancelQueuedRequests)
	{
		return;
	}
	
	var url = this.queuedRequestUrls[0];
	var onSuccessMethod = this.queuedRequestOnSuccessMethods[0];
	
	this.queuedRequestUrls.shift();
	this.queuedRequestOnSuccessMethods.shift();
	
	this.makeUrlRequest(url, onSuccessMethod);
}

PoolDownloaderBase.prototype.handleUrlRequestErrorResponse = function(url, responseText)
{
	log('Error response from url: ' + url);
	log(responseText);
	
	var possibleJson = JSON.parse(responseText);
	
	if (possibleJson == null)
		return;
	
	if (possibleJson.message == null)
		return;
	
	log('Parsed message:');
	log(possibleJson.message);
}

PoolDownloaderBase.prototype.downloadImagesFromPoolList = function(jsonResponseText) {
	log("downloadImagesFromPoolList() not overridden.");
}

PoolDownloaderBase.prototype.populatePoolName = function(jsonResponse)
{
	log("populatePoolName() not overridden.");
}

PoolDownloaderBase.prototype.populateMaxPoolPages = function(jsonResponse)
{
	log("populateMaxPoolPages() not overridden.");
}

PoolDownloaderBase.prototype.getImageUrls = function(jsonResponse)
{
	log("getImageUrls() not overridden.");
}

PoolDownloaderBase.prototype.getPaddedNumber = function(number) {
	var s = number + "";
	while (s.length < 3) s = "0" + s;
	return s;
}

PoolDownloaderBase.prototype.getPaddedNumber4 = function(number) {
	var s = number + "";
	while (s.length < 4) s = "0" + s;
	return s;
}

PoolDownloaderBase.prototype.clearSavedCredentials = function() {
	chrome.storage.sync.clear();
}