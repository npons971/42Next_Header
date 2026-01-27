# Guide de publication sur le VSCode Marketplace

## Étape 1 : Créer un compte Microsoft/Azure DevOps

1. Allez sur https://dev.azure.com
2. Connectez-vous avec un compte Microsoft (ou créez-en un)
3. Créez une organisation si demandé

## Étape 2 : Créer un Personal Access Token (PAT)

1. Allez sur https://dev.azure.com
2. Cliquez sur votre profil (en haut à droite) → **User Settings** → **Personal Access Tokens**
3. Cliquez sur **+ New Token**
4. Configurez :
   - **Name** : `VSCode Publishing`
   - **Organization** : All accessible organizations
   - **Scopes** : Sélectionnez **Marketplace** → ✅ **Manage**
5. Cliquez sur **Create** et **COPIEZ LE TOKEN** (vous ne le verrez qu'une fois !)

## Étape 3 : Créer un Publisher sur le Marketplace

1. Allez sur https://marketplace.visualstudio.com/manage
2. Connectez-vous avec le même compte Microsoft
3. Cliquez sur **Create Publisher**
4. Remplissez :
   - **ID** : `npons` (ou votre choix, doit être unique)
   - **Name** : Votre nom complet
   - **Email** : Votre email
5. Validez

## Étape 4 : Configuration de vsce

**Important** : Vous devrez faire cette étape sur une machine où vous avez les droits (pas à l'école 42).

```bash
# Sur votre machine personnelle
cd 42Next_Header

# Installer vsce globalement (ou utilisez npx)
npm install -g @vscode/vsce

# Ou si pas de droits root :
npm install --save-dev @vscode/vsce

# Login avec votre PAT
npx vsce login npons
# Collez votre Personal Access Token quand demandé
```

## Étape 5 : Publier l'extension

```bash
# Compiler le projet
npm run vscode:prepublish

# Publier sur le marketplace
npx vsce publish

# Ou publier une version spécifique
npx vsce publish 1.0.0
```

## Étape 6 : Mise à jour

Pour publier une mise à jour :

```bash
# Incrémenter la version (patch : 1.0.0 → 1.0.1)
npx vsce publish patch

# Ou minor : 1.0.1 → 1.1.0
npx vsce publish minor

# Ou major : 1.1.0 → 2.0.0
npx vsce publish major
```

## Problèmes connus

### Node version trop ancienne
Si vous avez Node 18, vsce@3.x ne fonctionnera pas. Solutions :
1. Utiliser vsce@2.15.0 : `npm install --save-dev vsce@2.15.0`
2. Ou mettre à jour Node vers la version 20+

### "Publisher 'npons' is not registered"
Vous devez d'abord créer le publisher sur https://marketplace.visualstudio.com/manage

### "Package Error: Missing publisher name"
Vérifiez que `package.json` contient bien `"publisher": "npons"`

## Après publication

1. Votre extension sera visible sur : `https://marketplace.visualstudio.com/items?itemName=npons.42header-next`
2. Installation : `ext install npons.42header-next`
3. Les mises à jour sont automatiques pour les utilisateurs

## Alternative : Publication locale

Si vous ne voulez pas publier publiquement, créez juste le package :

```bash
npx vsce package
# Crée : 42header-next-1.0.0.vsix
```

Partagez le fichier `.vsix` avec vos collègues qui peuvent l'installer :
- Via la ligne de commande : `code --install-extension 42header-next-1.0.0.vsix`
- Via VSCode : Extensions → "..." → "Install from VSIX..."

## Ressources

- Documentation officielle : https://code.visualstudio.com/api/working-with-extensions/publishing-extension
- Marketplace management : https://marketplace.visualstudio.com/manage
- Azure DevOps : https://dev.azure.com
