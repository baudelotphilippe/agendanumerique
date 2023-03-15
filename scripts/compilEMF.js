const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const utilsFile = require("./utils/file");

const utilsDates = require("./utils/convertDates");
const emptyEvent = require("./utils/emptyEvent");
const workingFolder = "emf"

async function compilEMF(urlEvent) {
  const { data } = await axios.get(urlEvent);
  const $ = cheerio.load(data);
  const event = {
    ...emptyEvent
  };
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
  event.organizer = "EMF";

  // cherche dates
  const dates = $(".ec3_schedule_date.ec3_schedule_next");

  // console.log(dates.length);
  let i = 0;
  for (oneDate of dates) {
    //loop
    const childWithDates = oneDate.children[0].children;
    let subEventList = [];
    let dateEvent = null;
    childWithDates.forEach((info, index) => {
      // console.log(index)
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
    // console.log("subEventList.length", subEventList.length)

    if (subEventList.length > 0) {
      event.subEvent = subEventList;
    }

    //console.log("event END", event);
    utilsFile.saveFile(workingFolder, event, i);
    i++;

    return event;
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
  return `${heureEvent[0].trim()}-${heureEvent[1].trim()}-00`;
};

const convertDateEMF = (theDate) => {
  laDate = theDate.split("->")[0].split(" ");
  // console.log(laDate)
  return `${laDate[2]}-${utilsDates.moisEnChiffre(laDate[1])}-${laDate[0]}`;
};

async function ExtractEMF() {
  await utilsFile.cleanFolder(workingFolder)
  const data = fs.readFileSync(`./events/eventsEMFlist.json`);

  const urls = JSON.parse(data).urls;

  Promise.all(
    urls.map((url) => {
      return compilEMF(url);
    })
  ).then((events) => {
    console.log(events);
  });
}

ExtractEMF();
