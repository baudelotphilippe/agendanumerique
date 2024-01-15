import fs from "fs";
import util from "util";
import { v4 as uuidv4 } from 'uuid';


const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);

const renameFile = (original_filename, i, uniqueId) => {
  let filename = original_filename.replace(/( |:|#|&)/g, "-");
  filename = filename.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (uniqueId) {
    return uuidv4();
  }else {
    return (i == 0 || !i) ? filename : `${filename}-${i}`;
  }
};

export const saveFile = ({workingFolder, i, uniqueId}, event) => {
  // si folder inexistant, il est créé
  try {
    if (!fs.existsSync(`./events/${workingFolder}`)) {
      fs.mkdirSync(`./events/${workingFolder}`);
    }
  } catch (err) {
    console.error(err);
  }
  const filename = renameFile(event.name, i, uniqueId);
  fs.writeFileSync(
    `./events/${workingFolder}/${encodeURIComponent(filename)}.json`,
    `${JSON.stringify(event)}`
  );
};

export async function cleanFolder(folder) {
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

