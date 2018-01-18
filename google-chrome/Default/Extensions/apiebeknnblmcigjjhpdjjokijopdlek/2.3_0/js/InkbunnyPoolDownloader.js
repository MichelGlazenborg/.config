var InkbunnyPoolDownloader = function (poolUrl, shouldUseSubfolders, shouldSubfoldersBeNamed)
{
	if (shouldUseSubfolders === undefined) {
          shouldUseSubfolders = false;
    }
	
	if (shouldSubfoldersBeNamed === undefined) {
          shouldSubfoldersBeNamed = false;
    }
	
	if (!shouldUseSubfolders && shouldSubfoldersBeNamed)
	{
		console.log('constructor not used properly');
	}
	
	PoolDownloaderBase.call(this, poolUrl);
	
	this.shouldUseSubfolders = shouldUseSubfolders;
	this.shouldSubfoldersBeNamed = shouldSubfoldersBeNamed;
	
	this.numberOfSavedImages = 0;
	this.currentSubmissionNumber = 1;
	this.readyToLogout = false;
}

InkbunnyPoolDownloader.prototype = Object.create(PoolDownloaderBase.prototype);
InkbunnyPoolDownloader.prototype.constructor = InkbunnyPoolDownloader;

PoolDownloaderBase.prototype.beforeTryingToDownloadImages = function() {
	// alert('In order to download all of the pool images that you can normally view, you have to supply your credentials so that all of the pool submissions will download
	
	// encode window.btoa(val)
	// decode window.atob(val)
	
	// option to save to local storage
	// 'ib-user'
	// 'ib-pass'
	
	this.isRunningRequest = true;
	
	var poolDownloader = this;
	
	chrome.storage.sync.get(['InkbunnyUsername', 'InkbunnyPassword'], function(items) {
		var obfuscatedUsername = items.InkbunnyUsername;
		var obfuscatedPassword = items.InkbunnyPassword;
		
		if (obfuscatedUsername && obfuscatedPassword)
		{
			var username = window.atob(obfuscatedUsername);
			var password = window.atob(obfuscatedPassword);
			
			poolDownloader.setupApiSid(username, password);
		}
		else
		{
			// Prompt if want to enter credentials
			var userWantsToEnterCredentials = true;
			
			if (confirm('Would you like to enter your Inkbunny credentials so that mature images can be downloaded?'))
			{
				// Prompt if want to save credentials
				var username = prompt('Username');
				var password = prompt('Password');
				
				var userWantsToStoredCredentials = true;
				
				if (confirm('Would you like to store these credentials?'))
				{
					obfuscatedUsername = window.btoa(username);
					obfuscatedPassword = window.btoa(password);
					
					chrome.storage.sync.set({'InkbunnyUsername': obfuscatedUsername, 'InkbunnyPassword': obfuscatedPassword});
				}
				
				poolDownloader.setupApiSid(username, password);
			}
			else
			{
				poolDownloader.setupApiSid();
			}
		}
    });
}

InkbunnyPoolDownloader.prototype.getPoolIdFromUrl = function(poolUrl) {
	var positionOfLastSlash = poolUrl.lastIndexOf('=');
	
	return poolUrl.substr(positionOfLastSlash + 1);
}

InkbunnyPoolDownloader.prototype.getPoolRequestUrl = function() {
	if (this.apiRid)
	{
		return 'https://inkbunny.net/api_search.php?sid=' + this.apiSid + '&pool_id=' + this.poolId + "&rid=" + this.apiRid + "&page=" + this.currentPoolPage;
	}
	
	return 'https://inkbunny.net/api_search.php?sid=' + this.apiSid + '&pool_id=' + this.poolId + "&submissions_per_page=100&orderby=pool_order&submission_ids_only=yes&get_rid=yes" + "&page=" + this.currentPoolPage;
}

InkbunnyPoolDownloader.prototype.setupApiSid = function(username, password) {
	if (username && password)
	{
		var requestUrl = "https://inkbunny.net/api_login.php?username="+username+"&password="+password;
		this.queueOrMakeUrlRequest(requestUrl, this.finishLoggingIn, true);
	}
	else
	{
		var requestUrl = "https://inkbunny.net/api_login.php?username=guest";
		this.queueOrMakeUrlRequest(requestUrl, this.finishSettingUpApiSid, true);
	}
	
	this.isRunningRequest = false;
		
	this.runNextQueuedRequest();
}

InkbunnyPoolDownloader.prototype.finishLoggingIn = function(jsonResponseText) {
	var response = JSON.parse(jsonResponseText);
	
	if (response.sid)
	{
		this.apiSid = response.sid;
	}
	else
	{
		this.cancelQueuedRequests = true;
		
		this.clearSavedCredentials();
		
		alert("Failed to login to Inkbunny with the supplied credentials.");
	}
}

InkbunnyPoolDownloader.prototype.finishSettingUpApiSid = function(jsonResponseText) {
	var response = JSON.parse(jsonResponseText);
	
	this.apiSid = response.sid;
	
	var requestUrl = "https://inkbunny.net/api_userrating.php?sid=" + this.apiSid + "&tag[2]=yes&tag[3]=yes&tag[4]=yes&tag[5]=yes&tag[6]=yes";
	this.queueOrMakeUrlRequest(requestUrl, this.afterChangingGuestAllowedRatings, true);
}

InkbunnyPoolDownloader.prototype.afterChangingGuestAllowedRatings = function(jsonResponseText) {
	//var response = JSON.parse(jsonResponseText);
	
	//log(response);
}

InkbunnyPoolDownloader.prototype.downloadImagesFromPoolList = function(jsonResponseText) {
	var jsonResponse = JSON.parse(jsonResponseText);
	
	if (this.currentPoolPage == 1)
	{
		this.populateMaxPoolPages(jsonResponse);
		this.populateApiRid(jsonResponse);
	}
	
	this.getImageUrlsAndThenDownload(jsonResponse);
	
	if (this.currentPoolPage < this.maxPoolPages)
	{
		this.currentPoolPage++;
		this.continueTryingToDownloadImages();
	}
	else
	{
		this.readyToLogout = true;
	}
}

InkbunnyPoolDownloader.prototype.populatePoolName = function(poolName)
{
	this.poolName = poolName.replace(/[^\w\-. ]/gi, '');
}

InkbunnyPoolDownloader.prototype.populateMaxPoolPages = function(jsonResponse)
{
	this.maxPoolPages = jsonResponse.pages_count;
}

InkbunnyPoolDownloader.prototype.populateApiRid = function(jsonResponse)
{
	this.apiRid = jsonResponse.rid;
}

InkbunnyPoolDownloader.prototype.getImageUrlsAndThenDownload = function(jsonResponse)
{
	var submissionIds = this.getSubmissionIds(jsonResponse);
	
	//var submissionIdsList = submissionIds.join();
	
	for (var i = 0; i < submissionIds.length; i++)
	{
	    var submissionId = submissionIds[i];
		
		var requestUrl = "https://inkbunny.net/api_submissions.php?sid=" + this.apiSid + "&submission_ids=" + submissionId;
		
		if (i == 0)
		{
			requestUrl += "&show_pools=yes";
		}
		
		this.queueOrMakeUrlRequest(requestUrl, this.afterGettingSubmissionResults);
	}
}

InkbunnyPoolDownloader.prototype.afterChangingGuestAllowedRatings = function(jsonResponseText) {
	//var response = JSON.parse(jsonResponseText);
	
	//log(response);
}

InkbunnyPoolDownloader.prototype.getSubmissionIds = function(jsonResponse)
{
	var submissionIdList = [];
	
	var submissions = jsonResponse.submissions;
	
	for (var i = 0; i < submissions.length; i++)
	{
	    var submission = submissions[i];
		submissionIdList.push(submission.submission_id);
	}
	
	return submissionIdList;
}

InkbunnyPoolDownloader.prototype.afterGettingSubmissionResults = function(jsonResponseText) {
	var response = JSON.parse(jsonResponseText);
	
	var submissions = response.submissions;
	
	for (var i = 0; i < submissions.length; i++)
	{
	    var submission = submissions[i];
		var submissionPools = submission.pools;
		var submissionFiles = submission.files;
		
		
		
		for (var j = 0; j < submissionPools.length; j++)
		{
			var submissionPool = submissionPools[j];
			
			if (submissionPool.pool_id == this.poolId)
			{
				this.populatePoolName(submissionPool.name);
			}
		}
		
		if (submissionPools.length > 0 && this.poolName == '')
		{
			this.poolName = this.apiSid.substring(0,12);
		}
		
		for (var j = 0; j < submissionFiles.length; j++)
		{
			var submissionFile = submissionFiles[j];
			
			var imageUrl = submissionFile.file_url_full;
			
			log(imageUrl);
			
			var foldersPath = '';
			var filename = '';
			
			var positionOfLastPeriod = imageUrl.lastIndexOf('.');
			var fileExtension = imageUrl.substr(positionOfLastPeriod);
			
			if (this.shouldUseSubfolders)
			{
				var poolNameFolder = this.poolName.substr(0, 30);
				var subfolderName = '';
				
				if (this.shouldSubfoldersBeNamed)
				{
					//*** shouldUseSubfolders = true, shouldSubfoldersBeNamed = true
					// Cold_Storm/Cats/Cats_001
					// Cold_Storm/Hello/Hello_001
					// Cold_Storm/Hello/Hello_002
					// Cold_Storm/Tom/Tom_001
					
					subfolderName = submission.title.substr(0, 30).replace(/[^\w\-. ]/gi, '');
					
					var fileNumber = this.getPaddedNumber(j + 1);
					
					filename = subfolderName.substr(0, 26) + '_' + fileNumber + fileExtension;
				}
				else
				{
					//*** shouldUseSubfolders = true, shouldSubfoldersBeNamed = false
					// Cold_Storm/Cold_Storm_001/Cold_Storm_001_001
					// Cold_Storm/Cold_Storm_001/Cold_Storm_001_002
					// Cold_Storm/Cold_Storm_001/Cold_Storm_001_003
					// Cold_Storm/Cold_Storm_002/Cold_Storm_002_001
					// Cold_Storm/Cold_Storm_003/Cold_Storm_003_001
					// Cold_Storm/Cold_Storm_003/Cold_Storm_003_002
					
					var subfolderNumber = this.getPaddedNumber(this.currentSubmissionNumber);
					
					subfolderName = this.poolName.substr(0, 26) + '_' + subfolderNumber;
					
					var fileNumber = this.getPaddedNumber(j + 1);
					
					filename = this.poolName.substr(0, 26) + '_' + subfolderNumber + '_' + fileNumber + fileExtension;
				}
				
				foldersPath = poolNameFolder + '/' + subfolderName;
			}
			else
			{
				//*** shouldUseSubfolders = false, shouldSubfoldersBeNamed = false
				// Cold_Storm/Cold_Storm_0001
				// Cold_Storm/Cold_Storm_1223
				
				var poolNameFolder = this.poolName.substr(0, 50);
				
				foldersPath = poolNameFolder;
				
				var imageNumber = this.numberOfSavedImages + 1;
				var paddedNumber = this.getPaddedNumber4(imageNumber);
				
				filename = this.poolName.substr(0, 30) + '_' + paddedNumber + fileExtension;
			}
			
			var saveFilename = foldersPath + "/" + filename;
			
			log(saveFilename);
			
			chrome.downloads.download({
				url: imageUrl,
				filename: saveFilename,
				conflictAction: "uniquify"
			});
			
			this.numberOfSavedImages++;
		}
		
		this.currentSubmissionNumber++;
	}
	
	if (this.readyToLogout && this.queuedRequestUrls.length == 0)
	{
		this.logout();
	}
}

InkbunnyPoolDownloader.prototype.logout = function()
{
	var requestUrl = "https://inkbunny.net/api_logout.php?sid=" + this.apiSid;
	this.queueOrMakeUrlRequest(requestUrl, this.afterLoggingOut);
}

InkbunnyPoolDownloader.prototype.afterLoggingOut = function(jsonResponseText) {
	var response = JSON.parse(jsonResponseText);
	
	log(response);
}