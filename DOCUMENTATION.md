### Documentation

#### What do the settings mean and do?

**WebRTC IP handling policy**

Setting | Effect 
--- | ---
`Use the default public interface only` | Send WebRTC traffic via the default public network adapter. In the case of OpenVPN users, the default interface will the the virtual one that the VPN creates.
`Use the default public interface and private interface` | Same as above, except allow WebRTC traffic over the default private interface to your local network.
`Disable non-proxied UDP (force proxy)` | Force the use of a proxy, and only allow WebRTC traffic over UDP proxies.

**Legacy options**

`Prevent WebRTC from using routes other than the default route` is identical to `Use the default public interface only`, and `Prevent WebRTC from using non-proxied UDP` is identical to `Disable non-proxied UDP (force proxy)`.

--
#### I'm using a VPN or proxy, how do I prevent WebRTC leaks?

Seriously, how do I do this?

--
**I'm using a VPN that I installed software for, or configured in my operating system.**

In your case, the default settings should prevent leaks.

*WebRTC IP handling policy* is set to `Use the default public interface only` by default, and the equivalent legacy option, `Prevent WebRTC from using routes other than the default route`, is set to `true` by default.

--
**I'm using a VPN in the form of a Chrome extension.**

These VPNs are considered proxies in Chrome.

Set *WebRTC IP handling policy* to `Disable non-proxied UDP (force proxy)`, and optionally the equivalent legacy option, `Prevent WebRTC from using non-proxied UDP`, to `true` (as in checked).

--
**I'm using a proxy.**

Set *WebRTC IP handling policy* to `Disable non-proxied UDP (force proxy)`, and optionally the equivalent legacy option, `Prevent WebRTC from using non-proxied UDP`, to `true` (as in checked).

--
**I'm not using a proxy or a VPN, but I want to conceal my local IP address.**

The default settings will prevent local leaks.

*WebRTC IP handling policy* is set to `Use the default public interface only` by default, and the equivalent legacy option, `Prevent WebRTC from using routes other than the default route`, is set to `true` by default.

--
**I don't want to prevent leaks.**

Remove the extension.

--
**I don't know what leaks are.**

Remove the extension.
