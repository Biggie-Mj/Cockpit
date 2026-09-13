# Cockpit V1 — Préparation D&D 5e

Console MJ optimisée pour iPad paysage, installable comme Web App et utilisable hors ligne.

## V1

- Nouveau **menu principal** utilisant l’illustration de fond validée : reprise de la session active, nouvelle session, import depuis Fichiers et accès aux sessions sauvegardées.
- **Logo Cockpit** validé utilisé dans l’interface, le manifeste PWA et l’icône iOS.
- En mode **Table**, le bouton texte « Modifier » du lieu devient une icône crayon SVG.
- Le terme **Situations** remplace **Munitions** dans l’ajout et la préparation.
- **Composants** contient désormais l’onglet **Situations** entre Menaces et Récompenses, synchronisé avec les situations de Table.
- PWA renforcée : assets, fond et icônes sont préchargés dans le Service Worker et restent disponibles hors ligne après installation.
- Export d’une session complète au format `.cockpit`. Sur iPad, le partage natif permet notamment **Enregistrer dans Fichiers** lorsqu’il est disponible ; un téléchargement classique sert de repli.
- Import des fichiers `.cockpit` et compatibilité avec les anciens exports JSON.
- Migration automatique des données locales V0.5/V0.4/V0.3/V0.2 vers V1.

## Installation / déploiement

Déposer le contenu du dossier `dm-cockpit/` dans `Table-new-test/dm-cockpit/`.

Adresse GitHub Pages historique :

`https://biggie-mj.github.io/Table-new-test/dm-cockpit/`

Sur iPad : ouvrir l’adresse dans Safari, puis **Partager → Sur l’écran d’accueil**. Après un premier chargement en ligne, Cockpit V1 peut être relancé hors ligne.


## Correctif illustrations V1
Les deux illustrations fournies sont embarquées localement dans `assets/` et les icônes dans `icons/`. Les chemins sont versionnés et le cache hors ligne a été incrémenté afin d'empêcher une ancienne PWA d'afficher les visuels de la version précédente.
