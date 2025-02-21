const execa = require("execa");

(async () => {
  try {
    // Configura l'utente per i commit Git
    await execa("git", ["config", "user.email", "raf.riccardelli@gmail.com"]);
    await execa("git", ["config", "user.name", "Raffaele Riccardelli"]);

    // Passa alla branch gh-pages (creandola se necessario)
    await execa("git", ["checkout", "--orphan", "gh-pages"]);
    console.log("Building...");

    // Costruisce il progetto
    await execa("npm", ["run", "build"]);

    // Imposta la cartella di output
    const folderName = "dist";

    // Aggiunge e committa i file costruiti
    await execa("git", ["--work-tree", folderName, "add", "--all"]);
    await execa("git", ["--work-tree", folderName, "commit", "-m", "Deploy to gh-pages"]);

    // Configura l'URL remoto con token GitHub Actions
    console.log("Pushing to gh-pages...");
    await execa("git", [
      "remote",
      "set-url",
      "origin",
      `https://${process.env.GITHUB_ACTOR}:${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`,
    ]);

    // Effettua il push
    await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);

    // Ripulisce la cartella di build
    await execa("rm", ["-r", folderName]);

    // Torna al branch principale
    await execa("git", ["checkout", "-f", "main"]);

    // Elimina il branch gh-pages locale
    await execa("git", ["branch", "-D", "gh-pages"]);

    console.log("Successfully deployed");
  } catch (e) {
    console.error("Deployment failed:", e.message);
    process.exit(1);
  }
})();



