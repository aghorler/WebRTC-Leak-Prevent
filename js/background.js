function getMajorVerison(){
	var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
	return raw ? parseInt(raw[2], 10) : false;
}

chrome.storage.local.get(null, function(items){
	if(getMajorVerison() > 47){
		if(items.rtcIPHandling == undefined){
			try{
				chrome.storage.local.set({
					rtcIPHandling: 'default_public_interface_only'
				}, function(){
					chrome.privacy.network.webRTCIPHandlingPolicy.set({
						value: 'default_public_interface_only'
					});
				})
			}
			catch(e){
				console.log("Error: " + e.message);
			}
		}
	}
	else if(getMajorVerison() > 41 && getMajorVerison() < 48){
		if(items.rtcMultipleRoutes == undefined){
			try{
				chrome.storage.local.set({
					rtcMultipleRoutes: true
				}, function(){
					chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
						value: false,
						scope: 'regular'
					});
				})
			}
			catch(e){
				console.log("Error: " + e.message);
			}
		}
	}
});

chrome.runtime.onInstalled.addListener(function(details){
	if(details.reason == "install"){
		chrome.runtime.openOptionsPage();
	}
});
