/* Function to get version of Chrome. https://stackoverflow.com/a/4900484 */
function getMajorVerison(){
    var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    return raw ? parseInt(raw[2], 10) : false;
}

/* Function to determine if extension is allowed to run in Incognito mode. */
function testIncognito(){
    chrome.extension.isAllowedIncognitoAccess(function(isAllowedAccess){
        var incognitoAllowed = document.getElementById('incognitoAllowed');
        var incognitoDisallowed = document.getElementById('incognitoDisallowed');

        if(isAllowedAccess){
            incognitoDisallowed.style.display = 'none';
        }
        else{
            incognitoAllowed.style.display = 'none';
        }
    });
}

/* Function to display setting page content, depending on Chrome version. */
function displayContent(){
    var divContent = document.getElementById('content');
    var divNew = document.getElementById('new');
    var divLegacy = document.getElementById('legacy');
    var pLegacyProxy = document.getElementById('legacyProxy');
    var divFail = document.getElementById('fail');
    var divIncognito = document.getElementById('incognito');
    var divApply = document.getElementById('applyButton');

    if(getMajorVerison() > 47){
        divLegacy.style.display = 'none';
        divFail.style.display = 'none';
        testIncognito();
    }
    else if(getMajorVerison() > 41 && getMajorVerison() < 47){
        divNew.style.display = 'none';
        divFail.style.display = 'none';
        pLegacyProxy.style.display = 'none';
        testIncognito();
    }
    else if(getMajorVerison() == 47){
        divNew.style.display = 'none';
        divFail.style.display = 'none';
        testIncognito();
    }
    else{
        divContent.style.display = 'none';
        divIncognito.style.display = 'none';
        divApply.style.display = 'none';
    }
}

/* Function to save and set options. */
function saveOptions(){
    if(getMajorVerison() > 47){
        var policy = document.getElementById('policy').value;
        chrome.storage.local.set({
            rtcIPHandling: policy
        }, function(){
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            status.style.color = "green";
            try{
                chrome.storage.local.get('rtcIPHandling', function(items){
                    chrome.privacy.network.webRTCIPHandlingPolicy.set({
                        value: items.rtcIPHandling
                    });
                });
            }
            catch(e){
                status.textContent = 'Error.';
                status.style.color = "red";
                console.log("Error: " + e.message);
            }
            setTimeout(function(){
                status.textContent = '';
            }, 750);
        });
    }
    else if(getMajorVerison() > 41 && getMajorVerison() < 47){
        var rtcMultipleRoutes = document.getElementById('multipleroutes').checked;
        chrome.storage.local.set({
            rtcMultipleRoutes: rtcMultipleRoutes
        }, function(){
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            status.style.color = "green";
            try{
                chrome.storage.local.get('rtcMultipleRoutes', function(items){
                    chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
                        value: !items.rtcMultipleRoutes,
                        scope: 'regular'
                    });
                });
            }
            catch(e){
                status.textContent = 'Error.';
                status.style.color = "red";
                console.log("Error: " + e.message);
            }
            setTimeout(function(){
                status.textContent = '';
            }, 750);
        });
    }
    else if(getMajorVerison() == 47){
        var nonProxiedUDP = document.getElementById('proxy').checked;
        var rtcMultipleRoutes = document.getElementById('multipleroutes').checked;
        chrome.storage.local.set({
            nonProxiedUDP: nonProxiedUDP,
            rtcMultipleRoutes: rtcMultipleRoutes
        }, function(){
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            status.style.color = "green";
            try{
                chrome.storage.local.get(null, function(items){
                    chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
                        value: !items.rtcMultipleRoutes,
                        scope: 'regular'
                    });
                    chrome.privacy.network.webRTCNonProxiedUdpEnabled.set({
                        value: !items.nonProxiedUDP,
                        scope: 'regular'
                    });
                });
            }
            catch(e){
                status.textContent = 'Error.';
                status.style.color = "red";
                console.log("Error: " + e.message);
            }
            setTimeout(function(){
                status.textContent = '';
            }, 750);
        });
    }
}

/* Function to restore options. */
function restoreOptions(){
    if(getMajorVerison() > 47){
        chrome.storage.local.get({
            rtcIPHandling: 'default_public_interface_only'
        }, function(items){
            document.getElementById('policy').value = items.rtcIPHandling;
        });
    }
    else if(getMajorVerison() > 41 && getMajorVerison() < 47){
        chrome.storage.local.get({
            rtcMultipleRoutes: true
        }, function(items){
            document.getElementById('multipleroutes').checked = items.rtcMultipleRoutes;
        });
    }
    else if(getMajorVerison() == 47){
        chrome.storage.local.get({
            nonProxiedUDP: false,
            rtcMultipleRoutes: true
        }, function(items){
            document.getElementById('proxy').checked = items.nonProxiedUDP;
            document.getElementById('multipleroutes').checked = items.rtcMultipleRoutes;
        });
    }
}

/* Event listeners. */
document.addEventListener('DOMContentLoaded', displayContent);
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('policy').addEventListener('change', saveOptions);
document.getElementById('proxy').addEventListener('change', saveOptions);
document.getElementById('multipleroutes').addEventListener('change', saveOptions);
