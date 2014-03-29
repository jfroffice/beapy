Toutes ces commandes doivent être exécuter en tant que __root__ ou avec la commande __sudo__.

Récupérer son adresse IP
------------------------
```javascript
# ifconfig
```

Windows
```javascript
# ipconfig /all
```

Demander une nouvelle adresse IP au serveur DHCP
---------------------------------------------

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

Passerelle
----------

```javascript
# netstat -nr
# route
```
Windows
```javascript
# ipconfig
```

Aller derrière la passerelle
----------------------------

```javascript
# traceroute -q 1 -n 1.2.3.4

```
Windows
```javascript
# tracert -d 1.2.3.4
```

Récupérer son adresse IP
-----------------------
```javascript
# curl ipinfo.io/ip
```

Serveur de Nom (DNS)
--------------------
```javascript
# nslookup www.google.fr
# nslookup -type=ns www.google.fr
# nslookup www.google.fr ns4.google.com
# dig www.google.fr
```

Vérifier son serveur
--------------------
```javascript
# netstat -tlnp
```

Regarder dans les logs
----------------------
```javascript
# zcat -f /var/log/* | grep 'May 5' | less
```

Rechercher dans plusieurs fichiers
----------------------------------
```javascript
find . | xargs grep 'string'
```

Références
----------
- [Smashing Book 4](https://shop.smashingmagazine.com/smashing-book-4-ebooks.html) - (How to Fix the Web by [Paul Tero](http://coding.smashingmagazine.com/author/paul-tero/))
- [DnsTool.ch](http://www.dnstools.ch/) / [yougetsignal](http://www.yougetsignal.com/)