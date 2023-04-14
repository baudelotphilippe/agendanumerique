const fs = require("fs");
const util = require("util");
const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);

const renameFile = (event, i) => {
  let filename = event.name.replace(/( |:|#|&)/g, "-");
  filename = filename.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (i == 0) {
    return filename;
  } else {
    return `${filename}-${i}`;
  }
};

const saveFile = (folder, event, i = 0) => {
  // si folder inexistant, il est créé
  try {
    if (!fs.existsSync(`./events/${folder}`)) {
      fs.mkdirSync(`./events/${folder}`);
    }
  } catch (err) {
    console.error(err);
  }
  const filename = renameFile(event, i);
  fs.writeFileSync(
    `./events/${folder}/${encodeURIComponent(filename)}.json`,
    `<script type="application/ld+json">${JSON.stringify(event)}</script>`
  );
};

async function cleanFolder(folder) {
  let files;
  try {
    files = await readdir(`./events/${folder}/`);
  } catch (err) {
    // dossier vide
    console.log("erreur", err);
  }

  if (files !== undefined) {
    const unlinkPromises = files.map((filename) =>
      unlink(`./events/${folder}/${filename}`)
    );
    return Promise.all(unlinkPromises);
  }
}

module.exports = { saveFile, cleanFolder };
