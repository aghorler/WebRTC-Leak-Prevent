function save_options() {
	var nonProxiedUDP = document.getElementById('proxy').checked;
	var policy = document.getElementById('policy').value;
	chrome.storage.local.set({
		nonProxiedUDP: nonProxiedUDP,
		rtcIPHandling: policy
	}, function() {
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		//Set to user preference.
		chrome.storage.local.get(null, function(items) {
			chrome.privacy.network.webRTCNonProxiedUdpEnabled.set({
				value: !items.nonProxiedUDP,
				scope: 'regular'
			});
			chrome.privacy.network.webRTCIPHandlingPolicy.set({
				value: items.rtcIPHandling
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
		rtcIPHandling: 'default_public_interface_only'
	}, function(items) {
		document.getElementById('proxy').checked = items.nonProxiedUDP;
		document.getElementById('policy').value = items.rtcIPHandling;
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
	save_options);