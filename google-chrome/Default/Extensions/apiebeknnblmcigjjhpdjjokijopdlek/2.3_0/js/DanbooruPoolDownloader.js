var DanbooruPoolDownloader = function (poolUrl)
{
	PoolDownloaderBase.call(this, poolUrl);
	
	this.postIds = null;
	this.currentPostIndex = 0;
}

DanbooruPoolDownloader.prototype = Object.create(PoolDownloaderBase.prototype);
DanbooruPoolDownloader.prototype.constructor = DanbooruPoolDownloader;

DanbooruPoolDownloader.prototype.downloadImages = function() {
	var requestUrl = this.getPoolRequestUrl();
	
	this.queueOrMakeUrlRequest(requestUrl, this.downloadImagesFromPoolList);
}

DanbooruPoolDownloader.prototype.getPoolIdFromUrl = function(poolUrl) {
	var positionOfLastSlash = poolUrl.lastIndexOf('/');
	
	return poolUrl.substr(positionOfLastSlash + 1);
}

DanbooruPoolDownloader.prototype.getPoolRequestUrl = function() {
	return 'https://danbooru.donmai.us/pools/' + this.poolId + ".json";
}

DanbooruPoolDownloader.prototype.downloadImagesFromPoolList = function(jsonResponseText) {
	var jsonResponse = JSON.parse(jsonResponseText);
	
	this.populatePoolName(jsonResponse);
	
	this.getImageUrlsAndThenDownload(jsonResponse);
}

DanbooruPoolDownloader.prototype.populatePoolName = function(jsonResponse)
{
	this.poolName = jsonResponse.name.replace(/[^\w\-. ]/gi, '');
}

DanbooruPoolDownloader.prototype.getImageUrlsAndThenDownload = function(jsonResponse)
{
	this.postIds = jsonResponse.post_ids.split(" ");
	
	this.saveTheNextPostImage();
}

DanbooruPoolDownloader.prototype.saveTheNextPostImage = function(jsonResponseText)
{
	if (this.currentPostIndex < this.postIds.length)
	{
		var postId = this.postIds[this.currentPostIndex];
	
		var requestUrl = "https://danbooru.donmai.us/posts/" + postId + ".json";
		
		this.queueOrMakeUrlRequest(requestUrl, this.afterGettingPostResults);
	}
}

DanbooruPoolDownloader.prototype.afterGettingPostResults = function(jsonResponseText)
{
	var response = JSON.parse(jsonResponseText);
	
	var imageUrl = 'https://danbooru.donmai.us/' + response.file_url;
	
	var paddedNumber = this.getPaddedNumber(this.currentPostIndex + 1);
	
	var positionOfLastPeriod = imageUrl.lastIndexOf('.');
	var fileExtension = imageUrl.substr(positionOfLastPeriod);
	
	var saveFilename = this.poolName.substr(0, 30) + '_' + paddedNumber + fileExtension;
	
	log(saveFilename);
	
	chrome.downloads.download({
		url: imageUrl,
		filename: this.poolName.substr(0, 50) + '/' + saveFilename,
		conflictAction: "uniquify"
	});
	
	this.currentPostIndex++;
	this.saveTheNextPostImage();
}


















DanbooruPoolDownloader.prototype.getImageUrls = function(jsonResponse)
{
	var urlList = [];
	
	var jsonPosts = jsonResponse.posts;
	
	for (var i = 0; i < jsonPosts.length; i++)
	{
	    var jsonPost = jsonPosts[i];
		urlList.push(jsonPost.file_url);
	}
	
	return urlList;
}