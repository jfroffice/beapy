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
Lorsque vous modifiez la taille de votre navigateur (ie. viewport), vous recevez plusieurs fois les mêmes évènements.

Ce comportement ne correspond pas au comportement attendu.

Aucun navigateur ne semble implémenter cette fonctionnalité correctement.

Pour un évènement __resize__ "théorique", vous recevez plusieurs évènements identiques.

- todo schéma du navigateur qui est redimensionné
- todo schéma des événements parasites

Il existe plusieurs solutions afin de ne pas recevoir ces événements parasites.

Solution de contournement
-------------------------
Ce problème a été remonté par @paulirish en [2009](http://paulirish.com/2009/throttled-smartresize-jquery-event-handler/). Ce problème a été traité dans plusieurs libraires tel que [underscore](http://underscorejs.org/#debounce) ou par @louisremi avec la librairie [smartresize](https://github.com/louisremi/jquery-smartresize/).

Suppression des évènements parasites
------------------------------------
[jquery.trueresize](https://github.com/jfroffice/jquery.trueresize) est une implémentation allégée _(147bytes)_ qui permet de résoudre ce problème.

Cette librairie vous autorise une cadence de rafraîchissement jusqu'à 50 images par seconde.

Utilisation
-----------
Son fonctionnement est simple, vous déclarez un listener sur l'évènement __"trueresize"__ et non __"resize"__
```javascript
$(window).on('trueresize', function() {
    // do your job here
});
```