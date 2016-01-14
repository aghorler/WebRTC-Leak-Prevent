/*	Check for undefined values. */
chrome.storage.local.get(null, function(items) {
	/* webRTCIPHandlingPolicy */
	if (items.rtcIPHandling == undefined) {
		chrome.storage.local.set({
			rtcIPHandling: 'default_public_interface_only'
		}, function() {
			chrome.privacy.network.webRTCIPHandlingPolicy.set({
				value: 'default_public_interface_only'
			});
		})
	}
	/* webRTCMultipleRoutesEnabled */
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
});
