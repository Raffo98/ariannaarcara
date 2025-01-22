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


(async () => {
  try {
    await execa("git", ["config", "user.email", "raf.riccardelli@gmail.com"]);
    await execa("git", ["config", "user.name", "Raffaele Riccardelli"]);

    await execa("git", ["checkout", "--orphan", "gh-pages"]);
    console.log("Building...");
    await execa("npm", ["run", "build"]);

    // Assume che la cartella di output sia 'dist'
    const folderName = 'dist'; 

    await execa("git", ["--work-tree", folderName, "add", "--all"]);
    await execa("git", ["--work-tree", folderName, "commit", "-m", "gh-pages"]);
    console.log("Pushing to gh-pages...");
    await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
    await execa("rm", ["-r", folderName]);
    await execa("git", ["checkout", "-f", "main"]);
    await execa("git", ["branch", "-D", "gh-pages"]);
    console.log("Successfully deployed");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
})();


