const { contextBridge } = require("electron");
const fs = require("fs");
const path = require("path");
const simpleGit = require("simple-git");
require("dotenv").config();

const DATA_DIR = process.env.DATA_DIR;
console.log("DATA_DIR:", DATA_DIR);

const git = simpleGit({ baseDir: path.resolve(DATA_DIR, "..") });

function getFilePath(royaume, type) {
  return path.join(DATA_DIR, royaume, `${type}.json`);
}

function loadData(filePath) {
  try {
    const raw = fs.readFileSync(filePath);
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

contextBridge.exposeInMainWorld("api", {
  saveVillage: (royaume, type, village) => {
  if (!royaume || !type || !village.coordonnees) {
    throw new Error("Entrée invalide : royaume, type ou coordonnées manquantes.");
  }

  const dirPath = path.join(DATA_DIR, royaume);
  const filePath = path.join(dirPath, `${type}.json`);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  let data = [];

  if (fs.existsSync(filePath)) {
    try {
      const content = fs.readFileSync(filePath, "utf-8").trim();
      if (content) {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          data = parsed;
        }
      }
    } catch (e) {
      console.warn(`Fichier corrompu ou vide : ${filePath}`);
    }
  }

  const coordonneeExiste = data.some(
    (v) => v.coordonnees.trim() === village.coordonnees.trim()
  );

  if (coordonneeExiste) {
    throw new Error(`Un village avec les coordonnées ${village.coordonnees} existe déjà.`);
  }

  data.push(village);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

  return true;
},
  getVillages: (royaume, type) => {
    const filePath = getFilePath(royaume, type);
    return loadData(filePath);
  }
});

contextBridge.exposeInMainWorld("gitAPI", {
  pull: async () => {
    try {
      await git.pull();
      return "Mise à jour terminée";
    } catch (e) {
      return `Erreur lors du pull : ${e.message}`;
    }
  },
  push: async () => {
    try {
      await git.add(".");
      await git.commit("Ajout automatique depuis l'interface Electron");
      await git.push();
      return "Synchronisation réussie";
    } catch (e) {
      return `Erreur lors du push : ${e.message}`;
    }
  }
});
