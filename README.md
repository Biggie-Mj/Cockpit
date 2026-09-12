# DM COCKPIT V0.2 — Sly Flourish

Console MJ D&D 5e conçue pour **iPad en mode paysage**. Cette version remplace l'architecture « scènes ordonnées » de la V0.1 par une préparation réellement orientée Sly Flourish : **composants indépendants + lieux vivants + assemblage à la table**.

## Philosophie de la V0.2

La console sépare trois choses :

1. **Préparation** : les possibilités préparées avant la partie.
2. **Table** : le présent fictionnel, centré sur le lieu actuel.
3. **Journal** : ce qui est réellement devenu vrai pendant la session.

Il n'existe plus de progression « scène 1 → scène 2 → scène 3 ».

## Mode Préparation

La page de préparation regroupe :

- **Personnages / spotlights** : un élément à mettre en valeur par PJ.
- **Fil rouge** : une phrase sur ce que cherche la force active + conséquences logiques si les PJ n'interviennent pas. Les étapes sont manuelles, sans horloge.
- **Strong Start** : une situation initiale déjà en mouvement.
- **Lieux vivants** : lieux principaux et lieux de réserve.
- **Secrets & indices flottants** : aucune localisation prédéterminée.
- **PNJ moteurs** : Identité / Veut / Craint / Sait / Cache / Trait.
- **Menaces** : ordinaires, adversaire sérieux, événement dangereux.
- **Situations potentielles / Munitions MJ** : éléments possibles, jamais obligatoires.
- **Récompenses** : ressources, informations, objets/faveurs/contacts.
- **Blancs volontaires** : questions laissées ouvertes jusqu'à ce que la partie fournisse éventuellement une réponse.

## Lieux vivants

Un lieu peut contenir :

- concept ;
- 3 détails visibles ;
- impulsion du lieu ;
- situation actuelle ;
- faction présente ;
- intrigue locale ;
- intrigue régionale ;
- trace du fil rouge ;
- danger ;
- chose intéressante à obtenir ;
- ce qui arrive si les PJ n'interviennent pas ;
- PNJ actuellement présents.

Les lieux ont seulement trois états descriptifs : **à explorer**, **actuel**, **visité**. Ces états enregistrent ce qui s'est réellement produit et ne prescrivent aucun ordre.

## Mode Table

La vue Table affiche simultanément :

- la liste des lieux, sans ordre imposé ;
- le lieu actuel et ses propriétés actives ;
- les PNJ qui sont ici maintenant ;
- les secrets encore flottants ;
- les menaces disponibles ;
- les munitions MJ ;
- les informations épinglées ;
- une prise de note rapide.

Révéler un secret demande **après coup** comment il est apparu (conversation, observation, document, magie, etc.). Le secret n'est donc jamais attaché à une méthode ou un lieu pendant la préparation.

## Sauvegarde

- sauvegarde automatique via `localStorage` (`dm-cockpit-v02`) ;
- annulation des dernières modifications ;
- export JSON ;
- import JSON V0.2 ;
- PWA installable et utilisable hors connexion après le premier chargement.

## Installation GitHub Pages

Pour remplacer la V0.1, déposer le contenu de ce dossier dans :

`Table-new-test/dm-cockpit/`

L'adresse reste alors :

`https://biggie-mj.github.io/Table-new-test/dm-cockpit/`

Le stockage de la V0.2 utilise une nouvelle clé, donc une V0.1 déjà testée dans le navigateur n'est pas écrasée automatiquement.

## Démonstration intégrée

Une préparation Fausse Hydre est fournie pour tester immédiatement la logique de la console. Elle sert de démonstration d'ergonomie et toutes ses données sont modifiables.
