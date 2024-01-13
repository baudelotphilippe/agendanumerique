import fs from "fs";
import * as cheerio from "cheerio";

import {saveFile,cleanFolder} from "./utils/file.js";
import {moisEnChiffre,prependNumber} from "./utils/convertDates.js";
import {emptyEvent} from "./utils/emptyEvent.js";

const infosFilename={workingFolder:"emf", i:false, uniqueId:false}

async function compilEMF(urlEvent) {
  const data =  await fetch(urlEvent).then(res => res.text())
  const $ = cheerio.load(data);
  const event = {
    ...emptyEvent,
  };
  // cherche si le bloc date est grisé, si oui, date dépassée donc pas d'event à gérer
  const pastEvent = $(".ec3_iconlet.ec3_past").text();
  if (pastEvent != "") return;

  //titre
  const infoTitre = $(".hero-title-inside-text h1").text();
  const titreRedresse = infoTitre
    .replace(/(\r\n|\n|\r|\t|)/gm, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  event.name = titreRedresse;

  // description
  event.description = $("meta[property='og:description']").attr("content");
  //image
  event.image = $("meta[property='og:image']").attr("content");
  //url
  event.url = $("meta[property='og:url']").attr("content");
  //location
  event.location.name = $(".info_lieu b").text();
  const infosAddress = $(".info_lieu").html();
  const posDuBR = 4 + infosAddress.indexOf("<br>");
  event.location.address.streetAddress = infosAddress.substring(posDuBR);
  event.organizer = "Espace Mendès France";

  // cherche dates
  const dates = $(".ec3_schedule_date.ec3_schedule_next");

  let i = 0;
  
  for (const oneDate of dates) {
    //loop
    const childWithDates = oneDate.children[0].children;
    let subEventList = [];
    let dateEvent = null;
    childWithDates.forEach((info, index) => {
      if (index == 0) dateEvent = convertDateEMF(info.children[0].data);
      if (index == 1) {
        event.startDate = `${dateEvent}T${convertHeureEMF(
          "start",
          info.children[0].data
        )}`;
        event.endDate = `${dateEvent}T${convertHeureEMF(
          "end",
          info.children[0].data
        )}`;
      }
      // quaond on a n dates
      if (index > 1) {
        const oneSubEvent = {
          "@type": "Event",
          startDate: `${dateEvent}T${convertHeureEMF(
            "start",
            info.children[0].data
          )}`,
          endDate: `${dateEvent}T${convertHeureEMF(
            "end",
            info.children[0].data
          )}`,
        };
        subEventList.push(oneSubEvent);
      }
    });

    if (subEventList.length > 0) {
      event.subEvent = subEventList;
    }
    infosFilename.i=i;
    saveFile(infosFilename, event);
    i++;
  }
}

const convertHeureEMF = (pos, heure) => {
  const splitHeureEvent = (pos, splitHeure) => {
    if (pos == "end") {
      return splitHeure[1].split("h");
    } else {
      return splitHeure[0].split("h");
    }
  };
  const heureEvent = splitHeureEvent(pos, heure.split("->"));
  return `${heureEvent[0].trim()}:${heureEvent[1].trim()}:00`;
};

const convertDateEMF = (theDate) => {
  const laDate = theDate.split("->")[0].split(" ");
  return `${laDate[2]}-${moisEnChiffre(
    laDate[1]
  )}-${prependNumber(laDate[0])}`;
};

async function ExtractEMF() {
  await cleanFolder(infosFilename.workingFolder);
  const data = fs.readFileSync(`./events/eventsEMFlist.json`);

  const urls = JSON.parse(data).urls;

  urls.map((url) => {
    compilEMF(url);
  });

  // Promise.all(
  //   urls.map((url) => {
  //     return compilEMF(url);
  //   })
  // ).then((events) => {
  //   console.log(events);
  // });
}

ExtractEMF();
