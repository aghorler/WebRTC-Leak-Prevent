function getMajorVerison() {
	var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
	return raw ? parseInt(raw[2], 10) : false;
}

function writeContent()	{
	if(getMajorVerison() > 48){
		document.getElementById("content").innerHTML = '<p><strong>WebRTC IP handling policy</strong></p><p>IP handling policy:<select id="policy"><option value="default_public_interface_only">Use the default public interface only</option><option value="default_public_and_private_interfaces">Use the default public interface and private interface</option><option value="disable_non_proxied_udp">Disable non-proxied UDP (force proxy)</option></select>';
	}
	else if(getMajorVerison() > 41 && getMajorVerison() < 48){
		document.getElementById("content").innerHTML = '<p><strong>Legacy options</strong><p><label><input type="checkbox" id="multipleroutes"> Prevent WebRTC from using routes other than the default route.<br><i>(Supported from Chrome version 42, and depreciated from version 48)</i></label></p><p><label><input type="checkbox" id="proxy"> Prevent WebRTC from using non-proxied UDP.<br><i>(Supported from Chrome version 47, and depreciated from version 48)</i></label></p></p>';
	}
	else{
		document.getElementById("content").innerHTML = '<p style="color:red">This version of Chrome is incompaitible with the required WebRTC privacy options.';
	}
}

function save_options() {
	if(getMajorVerison() > 48){
		var policy = document.getElementById('policy').value;
		chrome.storage.local.set({
			rtcIPHandling: policy
		}, function() {
			var status = document.getElementById('status');
			status.textContent = 'Options saved.';
			chrome.storage.local.get('rtcIPHandling', function(items) {
				chrome.privacy.network.webRTCIPHandlingPolicy.set({
					value: items.rtcIPHandling
				});
			});
			setTimeout(function() {
				status.textContent = '';
			}, 750);
		});
	}
	else if(getMajorVerison() > 41 && getMajorVerison() < 48){
		var nonProxiedUDP = document.getElementById('proxy').checked;
		var rtcMultipleRoutes = document.getElementById('multipleroutes').checked;
		chrome.storage.local.set({
			nonProxiedUDP: nonProxiedUDP,
			rtcMultipleRoutes: rtcMultipleRoutes
		}, function() {
			var status = document.getElementById('status');
			status.textContent = 'Options saved.';
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
			});
			setTimeout(function() {
				status.textContent = '';
			}, 750);
		});
	}
}

function restore_options() {
	if(getMajorVerison() > 48){
		chrome.storage.local.get({
			rtcIPHandling: 'default_public_interface_only'
		}, function(items) {
			document.getElementById('policy').value = items.rtcIPHandling;
		});
	}
	else if(getMajorVerison() > 41 && getMajorVerison() < 48){
		chrome.storage.local.get({
			nonProxiedUDP: false,
			rtcMultipleRoutes: true
		}, function(items) {
			document.getElementById('proxy').checked = items.nonProxiedUDP;
			document.getElementById('multipleroutes').checked = items.rtcMultipleRoutes;
		});
	}
}
document.addEventListener('DOMContentLoaded', writeContent);
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
