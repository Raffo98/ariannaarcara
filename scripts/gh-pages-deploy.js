// const execa = require("execa");
//   const fs = require("fs");

//   (async () => {
//     try {
//       await execa("git", ["checkout", "--orphan", "gh-pages"]);
//       console.log("Building...");
//       await execa("npm", ["run", "build"]);
//       // Understand if it's dist or build folder
//       const folderName = fs.existsSync("dist") ? "dist" : "build";
//       await execa("git", ["--work-tree", folderName, "add", "--all"]);
//       await execa("git", ["--work-tree", folderName, "commit", "-m", "gh-pages"]);
//       console.log("Pushing to gh-pages...");
//       await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
//       await execa("rm", ["-r", folderName]);
//       await execa("git", ["checkout", "-f", "main"]);
//       await execa("git", ["branch", "-D", "gh-pages"]);
//       console.log("Successfully deployed");
//     } catch (e) {
//       console.log(e.message);
//       process.exit(1);
//     }
//   })();

const execa = require("execa");
const fs = require("fs");
require("dotenv").config(); // Carica le variabili di ambiente dal file .env

// Crea il file .env dinamicamente con la tua API key
const createEnvFile = () => {
  const apiKey = process.env.API_KEY;  // Usa la tua API key dai secrets di GitHub

  if (!apiKey) {
    console.error("API_KEY is not defined");
    process.exit(1);
  }

  const envContent = `VUE_APP_API_KEY=${apiKey}\n`;  // Creiamo il contenuto del file .env

  // Scrive il file .env nella root del progetto
  fs.writeFileSync(".env", envContent, "utf8");
  console.log(".env file created successfully");
};

(async () => {
  try {
    // Crea il file .env con la chiave API
    createEnvFile();

    // Esegui il deploy
    await execa("git", ["checkout", "--orphan", "gh-pages"]);
    console.log("Building...");
    await execa("npm", ["run", "build"]);
    
    // Controlla se esiste la cartella dist o build
    const folderName = fs.existsSync("dist") ? "dist" : "build";
    
    await execa("git", ["--work-tree", folderName, "add", "--all"]);
    await execa("git", ["--work-tree", folderName, "commit", "-m", "gh-pages"]);
    
    console.log("Pushing to gh-pages...");
    await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
    
    // Rimuove la cartella build o dist
    await execa("rm", ["-r", folderName]);
    await execa("git", ["checkout", "-f", "main"]);
    await execa("git", ["branch", "-D", "gh-pages"]);

    console.log("Successfully deployed");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
})();

