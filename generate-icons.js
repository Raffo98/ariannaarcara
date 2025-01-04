const fs = require("fs");
const path = require("path");

const iconFolder = path.join(__dirname, "src/assets/icons");
const iconFile = iconFolder + "/icons.js";

/**
 * Split svg files into camelCase names
 *
 * @param {*} svgFiles
 * @returns
 */
function getSvgNames(svgFiles) {
  return svgFiles.map((file) =>
    file
      .replace(".svg", "")
      .split(/[\s-_]/)
      .map((word, i) =>
        i === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("")
  );
}

function getImportStatements(svgNames, svgFiles) {
  return svgNames
    .map((name, i) => `import ${name} from "./${svgFiles[i]}";`)
    .join("\n");
}

function getIconProps(svgNames) {
  return svgNames.map((name) => `${name},`).join("\n");
}

fs.readdir(iconFolder, (err, files) => {
  if (err) console.error(err);

  const svgFiles = files.filter((file) => file.endsWith(".svg"));

  // Make js file content and add existing icons to it

  const svgNames = getSvgNames(svgFiles);

  const fileContent = `
        ${getImportStatements(svgNames, svgFiles)}

        export {
            ${getIconProps(svgNames)}
        }
    `;

  fs.writeFile(iconFile, fileContent, (err) => console.error(err));
});
