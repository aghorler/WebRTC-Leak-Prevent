## WebRTC Leak Prevent
#####Version 1.0.5.1 | November 30 2015

WebRTC Leak Prevent provides user control over WebRTC settings in Chrome that have no native GUI. The intented use of the extension is to prevent [WebRTC leaks](https://diafygi.github.io/webrtc-ips/).

The only required permissions are 'privacy' and 'storage'.

#####How it works

In Chromium version 42+, the extension sets 'webRTCMultipleRoutesEnabled' to false.

In Chromium version 47+, the extension gives the user boolean control over 'webRTCNonProxiedUdpEnabled'.

In Chromium version 48+, the extension gives the user control over 'webRTCIPHandlingPolicy'.

#####Download

[Chrome Web Store](https://chrome.google.com/webstore/detail/webrtc-leak-prevent/eiadekoaikejlgdbkbdfeijglgfdalml)

[Opera Addons](https://addons.opera.com/en/extensions/details/webrtc-leak-prevent/)
