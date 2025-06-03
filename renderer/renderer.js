document.getElementById("village-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const status = document.getElementById("status");
  status.textContent = "⏳ Enregistrement...";

  const village = {
    coordonnees: document.getElementById("coordonnees").value.trim(),
    type: document.getElementById("type").value,
    libre: document.getElementById("libre").checked,
    last_verification: document.getElementById("last_verification").value,
  };

  const royaume = document.getElementById("royaume").value;

  try {
    await window.api.saveVillage(royaume, village.type, village);
    status.textContent = "✅ Village ajouté avec succès !";
    document.getElementById("type").value = "nourriture";
    document.getElementById("coordonnees").value = "";
  } catch (err) {
    console.error("Erreur lors de l'ajout :", err);
    status.textContent = "❌ Erreur lors de l'ajout du village.";
  }
});
