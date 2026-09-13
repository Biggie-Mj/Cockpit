# Cockpit V1.1 — package GitHub Pages « root-safe »

Cette variante est volontairement **sans sous-dossiers**. Tous les fichiers, images et icônes doivent être placés directement à la racine du dépôt GitHub Pages, comme dans l’application ENCOUNTER/Table-new-test qui fonctionne déjà.

## Pourquoi
Sur iPad, le téléversement via GitHub avait aplati les dossiers `assets/` et `icons/` : les images existaient bien dans le dépôt, mais `index.html`, `styles.css`, le manifeste et le service worker continuaient à chercher `icons/...` et `assets/...`. Les URLs aboutissaient donc à des 404.

Le service worker V1 utilisait aussi `cache.addAll()`. Une seule ressource 404 suffisait à faire échouer toute son installation, laissant potentiellement l’ancien service worker actif.

## Déploiement
Téléverser **tous les fichiers de ce dossier directement à la racine du dépôt** (au même niveau que `index.html`). Ne créer aucun dossier `assets` ou `icons`.

Après mise en ligne :
1. Attendre la fin du déploiement GitHub Pages.
2. Fermer complètement l’ancienne web app sur l’iPad puis la rouvrir.
3. Si l’icône iOS reste l’ancienne, supprimer le raccourci de l’écran d’accueil puis refaire « Ajouter à l’écran d’accueil » : iOS met l’icône en cache séparément.

Les données de session restent dans le stockage local du navigateur, indépendamment de ces fichiers statiques.
