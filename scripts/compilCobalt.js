const axios = require("axios");
const cheerio = require("cheerio");
const redresseCobalt = require("./redresseCobalt");
const utilsFile = require("./utils/file");

const infosFilename={workingFolder:"cobalt", i:false, uniqueId:false}

async function compilCobalt() {
  const { data } = await axios.get(
    "https://www.cobaltpoitiers.fr/agenda_1550.html"
  );
  const $ = cheerio.load(data);
  await utilsFile.cleanFolder(workingFolder);
  $(".agenda.elem").each((index, item) => {
    const event = redresseCobalt(item);
    utilsFile.saveFile(infosFilename, event);
  });
}

compilCobalt();
