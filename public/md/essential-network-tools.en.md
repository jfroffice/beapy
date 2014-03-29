Getting your ip address
-----------------------

Mac & Linux
```javascript
# ifconfig
```

Windows
```javascript
# ipconfig /all
```

DHCP renew your ip address
--------------------------

Mac
```javascript
# ifconfig set en0 DHCP
```

Linux
```javascript
# dhclient eth0
```

Windows
```javascript
# ipconfig /release
# ipconfig /renew
```

Gateway
-------

Mac & Linux
```javascript
# netstat -nr
# route
```
Windows
```javascript
# ipconfig
```

Beyond the router
-----------------

Mac & Linux
```javascript
# traceroute -q 1 -n 1.2.3.4

```
Windows
```javascript
# tracert -d 1.2.3.4
```

Getting your ip address
-----------------------
Mac & Linux
```javascript
# curl ipinfo.io/ip
```

DNS
---

Mac & Linux
```javascript
# nslookup www.google.fr
# nslookup -type=ns www.google.fr
# nslookup www.google.fr ns4.google.com
# dig www.google.fr
```

Checking your server
--------------------
Mac & Linux
```javascript
# netstat -tlnp
```

References
----------
- Smashing Book 4 - (How to Fix the Web by Paul Tero)
- DnsTool.ch / yougetsignal

