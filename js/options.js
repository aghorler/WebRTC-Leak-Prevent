function save_options() {
	var nonProxiedUDP = document.getElementById('proxy').checked;
	var policy = document.getElementById('policy').value;
	var rtcMultipleRoutes = document.getElementById('multipleroutes').checked;
	chrome.storage.local.set({
		nonProxiedUDP: nonProxiedUDP,
		rtcIPHandling: policy,
		rtcMultipleRoutes: rtcMultipleRoutes
	}, function() {
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		//Set to user preference.
		chrome.storage.local.get('rtcIPHandling', function(items) {
			chrome.privacy.network.webRTCIPHandlingPolicy.set({
				value: items.rtcIPHandling
			});
		});
		chrome.storage.local.get('rtcMultipleRoutes', function(items) {
			chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
				value: !items.rtcMultipleRoutes,
				scope: 'regular'
			});
		});
		chrome.storage.local.get('nonProxiedUDP', function(items) {
			chrome.privacy.network.webRTCNonProxiedUdpEnabled.set({
				value: !items.nonProxiedUDP,
				scope: 'regular'
			});
		}); //End.
		setTimeout(function() {
			status.textContent = '';
		}, 750);
	});
}

function restore_options() {
	chrome.storage.local.get({
		nonProxiedUDP: false,
		rtcIPHandling: 'default_public_interface_only',
		rtcMultipleRoutes: true
	}, function(items) {
		document.getElementById('proxy').checked = items.nonProxiedUDP;
		document.getElementById('policy').value = items.rtcIPHandling;
		document.getElementById('multipleroutes').checked = items.rtcMultipleRoutes;
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
	save_options);
