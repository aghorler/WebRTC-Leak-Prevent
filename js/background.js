/*	webRTCIPHandlingPolicy, if undefined, set to 'default_public_interface_only'.
	This setting is only supported from Chromium version 48. */
chrome.storage.local.get(null, function(items) {
	if (items.rtcIPHandling == undefined) {
		chrome.storage.local.set({
			rtcIPHandling: 'default_public_interface_only'
		}, function() {
			chrome.privacy.network.webRTCIPHandlingPolicy.set({
				value: 'default_public_interface_only'
			});
		})
	}
});

/*	webRTCMultipleRoutesEnabled statically set to false.
	This option is deprecated from Chromium version 48. */
chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
	value: false,
	scope: 'regular'
});