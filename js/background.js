/*	Set webRTCIPHandlingPolicy to 'disable_non_proxied_udp'
	if user has previously selected the equivalent legacy 
	option.
	
	This will prevent the default webRTCIPHandlingPolicy
	option from overriding webRTCNonProxiedUdpEnabled: 
	false.
	
	This will only run on update, and will only be
	included in version 1.0.7. */
chrome.runtime.onInstalled.addListener(function(details) {
	if (details.reason == "update") {
		chrome.storage.local.get('nonProxiedUDP', function(items) {
			if (items.nonProxiedUDP == true) {
				chrome.storage.local.set({
					rtcIPHandling: 'disable_non_proxied_udp'
				}, function() {
					chrome.privacy.network.webRTCIPHandlingPolicy.set({
						value: 'disable_non_proxied_udp'
					});
				})
			}
		});

	}
});

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
