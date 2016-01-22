## WebRTC Leak Prevent
#####Version 1.0.7 | January 21 2016

WebRTC Leak Prevent provides user control over WebRTC settings in Chrome that have no native GUI. The intended use of the extension is to prevent [WebRTC leaks](https://diafygi.github.io/webrtc-ips/).

The only required permissions are 'privacy' and 'storage'.

#####How it works

In **Chromium version 48+**, the extension gives the user control over `webRTCIPHandlingPolicy`, defaulting to `default_public_interface_only`.

In older versions of Chromium, legacy options are supported. This includes `webRTCMultipleRoutesEnabled` for **Chromium version 42+**, and `webRTCNonProxiedUdpEnabled` for **Chromium version 47+**

#####Download

[Chrome Web Store](https://chrome.google.com/webstore/detail/webrtc-leak-prevent/eiadekoaikejlgdbkbdfeijglgfdalml)

[Opera Addons](https://addons.opera.com/en/extensions/details/webrtc-leak-prevent/)

---

#####Privacy

WebRTC Leak Prevent does not collect any user data. 

The extension is hosted entirely on GitHub, the Chrome Web Store, and Opera Addons. These services may collect user data.

#####License

Licensed under the Apache License, Version 2.0.

A copy of the license can be found here:

    https://www.apache.org/licenses/LICENSE-2.0
