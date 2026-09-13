# DM COCKPIT V0.3 — Sly Flourish

Console MJ D&D 5e optimisée pour **iPad paysage**, basée sur la préparation par composants et lieux vivants.

## Ce que change la V0.3

- Navigation unique en bas : plus de double bascule Préparation/Table.
- Bandeau PJ compact et dépliable avec un spotlight par personnage.
- Préparation ramenée à un véritable tableau de bord mono-écran : Fil rouge, Strong Start, lieux, munitions, secrets et compteurs de composants.
- Éditeur de lieu progressif : un lieu de réserve ne demande que nom, concept et situation ; les champs avancés sont réservés aux lieux principaux.
- Mode Table en trois zones : lieux/munitions, lieu consulté, panneau contextuel.
- **Aperçu ≠ lieu actuel** : toucher un lieu le consulte sans modifier la fiction ; `Rendre actuel` effectue explicitement le déplacement.
- Panneau droit à onglets : PNJ, Secrets, Menaces, Épinglés. Une seule famille secondaire développée à la fois.
- Fiche PNJ en volet latéral plutôt qu'en alerte navigateur.
- Secret révélé en deux gestes : `Révéler`, puis mode de découverte (conversation, observation, document, magie, déduction, autre).
- Bouton `⚡ Injecter` regroupant munitions et menaces disponibles.
- Note rapide accessible depuis toutes les vues.
- `Lancer la session` crée un backup, remet les spotlights à zéro et ouvre la Table.
- Backups locaux tournants : début de session + backup automatique toutes les 30 minutes après le lancement.
- Indicateur de sauvegarde en haut de l'écran.
- Recherche globale sur lieux, PNJ, secrets et journal.
- Zoom navigateur à nouveau autorisé.
- Aucune horloge.

## Données

La V0.3 utilise `localStorage` avec la clé `dm-cockpit-v03`. Si cette clé n'existe pas mais que `dm-cockpit-v02` existe sur la même adresse et dans le même navigateur, les données V0.2 sont reprises automatiquement.

Les backups sont stockés séparément dans `dm-cockpit-v03-backups` et limités aux cinq plus récents.

## Installation

Déposer ces fichiers dans :

`Table-new-test/dm-cockpit/`

Puis ouvrir :

`https://biggie-mj.github.io/Table-new-test/dm-cockpit/`

Après une mise à jour, recharger une fois la page puis fermer/réouvrir l'ancienne PWA si Safari conserve l'ancien cache.
