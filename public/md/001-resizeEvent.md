Approche simpliste
------------------
vous déclarez un listener sur l'évènement "resize" en utilisant jQuery
```javascript
$(window).on('resize', function() {
	// do your job here
});
```

Que se passe t'il ?
-------------------
Lorsque vous modifiez la taille de votre navigateur (ie. viewport), vous recevez plusieurs évènements de resize.

![Redimensionnement du navigateur](md/img/01.png)

Le problème est que vous recevez plusieurs fois le même évènement. La taille de la fenètre n'a pas été modifié entre ces 2 évènements.

Ce comportement ne correspond pas au comportement attendu.

Aucun navigateur ne semble implémenter cette fonctionnalité correctement.

Pour un évènement __resize__ "théorique", vous recevez plusieurs évènements identiques.

![Redimensionnement du navigateur](md/img/02.png)

Les évènements parasites sont symbolisés en rouge sur le schéma ci-dessus.


Solution de contournement
-------------------------
Ce problème a été remonté par @paulirish en [2009](http://paulirish.com/2009/throttled-smartresize-jquery-event-handler/). Plusieurs libraires traitent ce problème tel que [underscore](http://underscorejs.org/#debounce) ou la librairie [smartresize](https://github.com/louisremi/jquery-smartresize/).

Suppression des évènements parasites
------------------------------------
[jquery.trueresize](https://github.com/jfroffice/jquery.trueresize) est une autre implémentation allégée _(147bytes)_ permettant de résoudre cet problème.

Cette librairie vous autorise une cadence de rafraîchissement jusqu'à 50 images par seconde.

Utilisation
-----------
Son fonctionnement est simple, vous déclarez un listener sur l'évènement __"trueresize"__ et non __"resize"__
```javascript
$(window).on('trueresize', function() {
    // do your job here
});
```