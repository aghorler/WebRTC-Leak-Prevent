/*	Return major verison of Chrome. */
function getMajorVerison() {
	var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
	return raw ? parseInt(raw[2], 10) : false;
}

/*	Check for undefined values, depending on version of Chrome. */
chrome.storage.local.get(null, function(items) {
	if(getMajorVerison() > 48){
		if (items.rtcIPHandling == undefined) {
			chrome.storage.local.set({
				rtcIPHandling: 'default_public_interface_only'
			}, function() {
				chrome.privacy.network.webRTCIPHandlingPolicy.set({
					value: 'default_public_interface_only'
				});
			})
		}
	}
	else if(getMajorVerison() > 41 && getMajorVerison() < 48){
		if (items.rtcMultipleRoutes == undefined) {
			chrome.storage.local.set({
				rtcMultipleRoutes: true
			}, function() {
				chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
					value: false,
					scope: 'regular'
				});
			})
		}
	}
});
