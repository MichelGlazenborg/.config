var E621PoolDownloader = function (poolUrl)
{
	PoolDownloaderBase.call(this, poolUrl);
}

E621PoolDownloader.prototype = Object.create(PoolDownloaderBase.prototype);
E621PoolDownloader.prototype.constructor = E621PoolDownloader;

E621PoolDownloader.prototype.downloadImages = function() {
	var requestUrl = this.getPoolRequestUrl();
	this.queueOrMakeUrlRequest(requestUrl, this.downloadImagesFromPoolList);
}

E621PoolDownloader.prototype.getPoolIdFromUrl = function(poolUrl) {
	var positionOfLastSlash = poolUrl.lastIndexOf('/');
	
	return poolUrl.substr(positionOfLastSlash + 1);
}

E621PoolDownloader.prototype.getPoolRequestUrl = function() {
	return 'https://e621.net/pool/show.json?id=' + this.poolId + "&page=" + this.currentPoolPage;
}

E621PoolDownloader.prototype.downloadImagesFromPoolList = function(jsonResponseText) {
	var jsonResponse = JSON.parse(jsonResponseText);
	
	if (this.currentPoolPage == 1)
	{
		this.populatePoolName(jsonResponse);
		this.populateMaxPoolPages(jsonResponse);
	}
	
	var imageUrls = this.getImageUrls(jsonResponse);
	
	// download each image
	for (var i = 0; i < imageUrls.length; i++)
	{
	    var imageUrl = imageUrls[i];
		
		var previousImageCount = (this.currentPoolPage - 1) * this.imagesPerPoolPage;
		var imageNumber = previousImageCount + i + 1
		var paddedNumber = this.getPaddedNumber(imageNumber);
		
		var positionOfLastPeriod = imageUrl.lastIndexOf('.');
		var fileExtension = imageUrl.substr(positionOfLastPeriod);
		
		var saveFilename = this.poolName.substr(0, 30) + '_' + paddedNumber + fileExtension;
		
		log(saveFilename);
		
		chrome.downloads.download({
			url: imageUrl,
			filename: this.poolName.substr(0, 50) + '/' + saveFilename,
			conflictAction: "uniquify"
		});
	}
	
	if (this.currentPoolPage < this.maxPoolPages)
	{
		this.currentPoolPage++;
		this.continueTryingToDownloadImages();
	}
}

E621PoolDownloader.prototype.populatePoolName = function(jsonResponse)
{
	this.poolName = jsonResponse.name.replace(/[^\w\-. ]/gi, '');
}

E621PoolDownloader.prototype.populateMaxPoolPages = function(jsonResponse)
{
	this.maxPoolPages = Math.floor((jsonResponse.post_count - 1) / this.imagesPerPoolPage) + 1;
}

E621PoolDownloader.prototype.getImageUrls = function(jsonResponse)
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