# 🛠️ GGE Village Manager

**GGE Village Manager** est une application Electron de bureau permettant de **gérer facilement et localement les fichiers JSON** du dépôt :  
📦 [`villages-ressources-gge`](https://github.com/rundredoffi/villages-ressources-gge)

---

## 📌 Description

Cette application facilite l'ajout de villages de ressources (nourriture, bois, pierre) pour les différents royaumes du jeu **GoodGame Empire**.

Elle agit comme une interface utilisateur locale pour :
- Ajouter des villages via un formulaire convivial
- Remplir ou éditer les fichiers JSON présents dans un répertoire cloné localement
- Vérifier l'existence des coordonnées avant insertion

---

## 📂 Dépôt JSON associé

👉 [https://github.com/rundredoffi/villages-ressources-gge](https://github.com/rundredoffi/villages-ressources-gge)

Ce dépôt contient les fichiers structurés par royaumes et types de village.  
Chaque village est défini par les champs suivants :

```json
{
  "coordonnees": "123:456",
  "type": "nourriture",
  "libre": true,
  "last_verification": "2025-06-01"
}
````

---

## 🖥️ Installation & Lancement

### Prérequis

* Node.js >= 18
* Git (pour cloner le dépôt JSON si besoin)

### Étapes

```bash
# Clone ce dépôt
git clone https://github.com/rundredoffi/gge-village-manager
cd gge-village-manager

# Installe les dépendances
npm install

# Lance l'application
npm start
```

---

## ⚙️ Configuration

Un fichier `.env` permet de spécifier **le chemin vers le dossier JSON local** à compléter.

```env
DATA_DIR=C:/Users/<user>/Documents/GGE/villages-ressources-gge
```

---

## 🧩 Fonctionnalités à venir

* Édition et suppression de villages
* Visualisation des villages déjà enregistrés
* Synchronisation Git (pull/push depuis l'app)
* Validation automatique des fichiers JSON

---

## 🙌 Contribuer

Toutes les contributions sont bienvenues !
Voir [`CONTRIBUTING.md`](https://github.com/rundredoffi/villages-ressources-gge/blob/main/CONTRIBUTING.md) pour en savoir plus.

---

## 🪪 Licence

MIT © [Rundredoffi](https://github.com/rundredoffi)
