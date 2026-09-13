# Cockpit V1.6 — GitHub Pages / iPad

Cette version part directement de la V1.5 fournie par l’utilisateur. Aucun changement fonctionnel n’a été apporté hors du menu `…` et de **Sessions sauvegardées**.

## V1.6 — sauvegardes externes

- Le menu `…` ne contient plus :
  - **Exporter la session** ;
  - **Importer une sauvegarde** ;
  - **Restaurer la démo**.
- La démo intégrée reste inchangée dans **Préparations et parties sauvegardées** avec son bouton **Charger**.
- Chaque sauvegarde utilisateur (15 maximum) possède maintenant :
  - **Reprendre** ;
  - **Exporter** en violet ;
  - **Supprimer**.
- **Exporter** produit une copie externe JSON de l’état exact de la sauvegarde sélectionnée. Sur iPad, la feuille de partage est utilisée lorsqu’elle est disponible afin de pouvoir enregistrer le fichier dans **Fichiers**.
- Un bouton **Importer** violet est ajouté à côté de **Sauvegarder l’état actuel**.
- L’import ajoute la sauvegarde au prochain emplacement libre sans modifier la session actuellement ouverte.
- Quand les 15 emplacements sont occupés, l’import valide le fichier puis demande quel emplacement existant remplacer.
- Les exports V1.6 utilisent le format JSON `cockpit-session`, version de format 1, avec `appVersion: "1.6"`. Le sélecteur accepte aussi les anciens `.cockpit`/JSON compatibles.

## Déploiement

Le paquet est root-safe : déposer directement tous les fichiers à la racine du dépôt GitHub Pages, comme pour les versions précédentes.

## Validation réalisée

- `node --check app.js` : OK.
- Import des 4 fichiers de test dans la logique réelle de V1.6 : OK.
- Import sans remplacement de la session actuellement ouverte : OK.
- Export d’un emplacement puis réimport du payload exporté : contenu identique pour les collections contrôlées : OK.
- Limite de 15 emplacements : OK ; un 16e import passe en sélection de remplacement sans créer de 16e slot.
- Sauvegarde colossale testée : 20 PNJ, 12 lieux, 18 secrets, 12 menaces, 10 situations, Strong Start de plus de 1 600 caractères.
