All of these commands should be mainly executed as __root__ or with __sudo__ command.

Getting your ip address
-----------------------
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

```javascript
# traceroute -q 1 -n 1.2.3.4

```
Windows
```javascript
# tracert -d 1.2.3.4
```

Getting your ip address
-----------------------
```javascript
# curl ipinfo.io/ip
```

DNS
---
```javascript
# nslookup www.google.fr
# nslookup -type=ns www.google.fr
# nslookup www.google.fr ns4.google.com
# dig www.google.fr
```

Checking your server
--------------------
```javascript
# netstat -tlnp
```

System Logs
-----------
```javascript
# zcat -f /var/log/* | grep 'May 5' | less
```

Find in Files
-------------
```javascript
find . | xargs grep 'string'
```

References
----------
- [Smashing Book 4](https://shop.smashingmagazine.com/smashing-book-4-ebooks.html) - (How to Fix the Web by [Paul Tero](http://coding.smashingmagazine.com/author/paul-tero/))
- [DnsTool.ch](http://www.dnstools.ch/) / [yougetsignal](http://www.yougetsignal.com/)