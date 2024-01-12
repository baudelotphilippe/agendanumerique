import axios from "axios";
import redressePwn from "./redressePwn.js"
import * as cheerio from "cheerio";
import {saveFile, cleanFolder} from "./utils/file.js";

const infosFilename={workingFolder:"pwn", i:false, uniqueId:false}

async function loadEvent(urlEvent) {
  const { data } = await axios.get(`https://pwn-association.org${urlEvent}`);
  const event = redressePwn(data);
  saveFile(infosFilename, event);
}

async function compilPwn() {
  const { data } = await axios.get(
    "https://pwn-association.org/tous-les-evenements-pwn/"
  );
  const $ = cheerio.load(data);
  await cleanFolder(infosFilename.workingFolder)
  // get all urls from page events
  $(".upcoming-events .event-inner>a").each((index, item) => {
    loadEvent(item.attribs.href);
  });
}

compilPwn();
