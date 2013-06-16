Approche simple
---------------
Pour gérer l'évènement __resize__, vous déclarez un listener sur cet évènement en utilisant jQuery
```javascript
$(window).on('resize', function() {
	// traitement
});
```

Que se passe t'il ?
-------------------
Lorsque vous modifiez la taille de votre navigateur ou du "viewport", vous recevez plusieurs évènements de "resize".

![Redimensionnement du navigateur](md/img/01.png)

Le problème est que vous recevez plusieurs notifications alors les propriétés du viewport n'ont pas été modifiés entre ces 2 évènements.

Ce comportement ne correspond pas au comportement attendu.

Aucun navigateur ne semble implémenter cette fonctionnalité correctement.

Pour un évènement __resize__ "théorique", vous recevez plusieurs évènements identiques.

Les performances de votre application peuvent dégrader de façon majeure si vous ne traitez pas ce problème.

![Redimensionnement du navigateur](md/img/02.png)

Les évènements parasites sont symbolisés en rouge sur le schéma ci-dessus.

Solution de contournement
-------------------------
Ce problème a été remonté par @paulirish en [2009](http://paulirish.com/2009/throttled-smartresize-jquery-event-handler/). Plusieurs libraires traitent ce problème tel que [underscore](http://underscorejs.org/#debounce) ou la librairie [smartresize](https://github.com/louisremi/jquery-smartresize/).

![Redimensionnement du navigateur](md/img/03.png)

Suppression des évènements parasites
------------------------------------
[jquery.trueresize](https://github.com/jfroffice/jquery.trueresize) est une implémentation allégée _(147bytes)_ permettant de résoudre ce problème.

Cette librairie vous autorise jusqu'à 50 images par seconde.

Utilisation
-----------
Son fonctionnement est simple, vous déclarez un listener sur l'évènement __trueresize__ et non __resize__
```javascript
$(window).on('trueresize', function() {
    // traitement
});
```