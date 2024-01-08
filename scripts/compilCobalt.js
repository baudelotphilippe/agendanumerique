import axios from "axios";
import * as cheerio from "cheerio";
import redresseCobalt from "./redresseCobalt.js";
import {cleanFolder, saveFile} from "./utils/file.js";

const infosFilename={workingFolder:"cobalt", i:false, uniqueId:false}

async function compilCobalt() {
  const { data } = await axios.get(
    "https://www.cobaltpoitiers.fr/agenda_1550.html"
  );
  const $ = cheerio.load(data);
  await cleanFolder(infosFilename.workingFolder);
  $(".agenda.elem").each((index, item) => {
    const event = redresseCobalt(item);
    saveFile(infosFilename, event);
  });
}

compilCobalt();
