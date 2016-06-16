### Documentation

#### What do the settings mean and do?

**WebRTC IP handling policy (Chrome 48+)**

Setting | Effect 
--- | ---
`Use the default public interface only` | Send WebRTC traffic via the default public network adapter. This will be the VPN adapter for system-VPN users.
`Use the default public interface and private interface` | Same as above, except allow WebRTC traffic through the default private interface to your local network as well.
`Disable non-proxied UDP (force proxy)` | Force the use of a proxy, and only allow WebRTC traffic over UDP proxies. This will effectively disable WebRTC communication for most users (depending on UDP proxy usage).

**Legacy options (Chrome 42 - 47)**

The legacy options are only displayed if you're using an older verison of Chrome. 

`Prevent WebRTC from using routes other than the default route` is identical to `Use the default public interface only`, and `Prevent WebRTC from using non-proxied UDP` is identical to `Disable non-proxied UDP (force proxy)`.

**Older versions of Chrome (Chrome <42)**

WebRTC Leak Prevent is not compaitible with Chrome versions below 42.

--
#### I'm using a VPN or proxy, how do I prevent WebRTC leaks?

Seriously, how do I do this?

--
**I'm using a VPN that I installed software for, or configured in my operating system.**

In your case, the default settings should prevent leaks.

*WebRTC IP handling policy* is set to `Use the default public interface only` by default.

--
**I'm using a VPN in the form of a browser extension.**

These VPNs are considered proxies in Chrome.

Set *WebRTC IP handling policy* to `Disable non-proxied UDP (force proxy)`.

--
**I'm using the built-in VPN feature in Opera.**

Set *WebRTC IP handling policy* to `Disable non-proxied UDP (force proxy)`.

--
**I'm using a proxy.**

Set *WebRTC IP handling policy* to `Disable non-proxied UDP (force proxy)`.

--
**I'm not using a proxy or a VPN, but I want to conceal my local IP address.**

The default settings will prevent local leaks.

*WebRTC IP handling policy* is set to `Use the default public interface only` by default.

--
**I don't want to prevent leaks.**

Remove the extension.

--
**I don't know what leaks are.**

Remove the extension.

#### What is 'Incognito protection'?

By default, Chrome does not allow extensions to run in [Incognito mode](https://support.google.com/chrome/answer/7005900?hl=en&rd=1). WebRTC Leak Prevent therefore cannot prevent WebRTC leaks in Incognito mode by default.

To enable Incognito protection check 'Allow in incognito' under WebRTC Leak Prevent in the Chrome Extension menu.

If you're okay with the extension not running in Incognito mode, or you explicitly don't want it to, you can ignore the warning message.
