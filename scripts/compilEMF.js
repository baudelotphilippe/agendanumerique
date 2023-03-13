const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const saveFile = require("./utils/file");
const utilsDates = require("./utils/convertDates");
const emptyEvent = require("./utils/emptyEvent");
const useSWR = require("swr");


async function compilEMF(urlEvent) {
  const { data } = await axios.get(urlEvent);
  const $ = cheerio.load(data);
  const emptyEvent = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    location: {
      "@type": "Place",
      name: "",
      address: {
        "@type": "PostalAddress",
        addressLocality: "",
        streetAddress: "",
      },
    },
    image: "",
    organizer: "",
    url: "",
  }
  // console.log("emptyEvent=>",emptyEvent)
  //titre
  const infoTitre = $(".hero-title-inside-text h1").text();
  const titreRedresse = infoTitre
    .replace(/(\r\n|\n|\r|\t|)/gm, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  emptyEvent.name = titreRedresse;

  // description
  emptyEvent.description = $("meta[property='og:description']").attr("content");
  //image
  emptyEvent.image = $("meta[property='og:image']").attr("content");
  //url
  emptyEvent.url = $("meta[property='og:url']").attr("content");
  //location
  emptyEvent.location.name = $(".info_lieu b").text();
  const infosAddress = $(".info_lieu").html();
  const posDuBR = 4 + infosAddress.indexOf("<br>");
  emptyEvent.location.address.streetAddress = infosAddress.substring(posDuBR);
  emptyEvent.organizer = "EMF";

  // cherche dates
  const dates = $(".ec3_schedule_date.ec3_schedule_next");

  // console.log(dates.length);
  let i = 0;
  for (event of dates) {
    //loop
    const childWithDates = event.children[0].children;
    let subEventList = [];
    let dateEvent = null;
    childWithDates.forEach((info, index) => {
      // console.log(index)
      if (index == 0) dateEvent = convertDateEMF(info.children[0].data);
      if (index == 1) {
        emptyEvent.startDate = `${dateEvent}T${convertHeureEMF("start",info.children[0].data)}`;
        emptyEvent.endDate = `${dateEvent}T${convertHeureEMF("end",info.children[0].data)}`;
      }
      // quaond on a n dates
      if (index > 1) {
        const oneSubEvent = {
          "@type": "Event",
          startDate: `${dateEvent}T${convertHeureEMF("start",info.children[0].data)}`,
          endDate: `${dateEvent}T${convertHeureEMF("end",info.children[0].data)}`,
        };
        subEventList.push(oneSubEvent);
      }
    });
    // console.log("subEventList.length", subEventList.length)

    if (subEventList.length>0) {
      emptyEvent.subEvent = subEventList
    }
    
    console.log("emptyEvent END", emptyEvent);
    saveFile("emf", emptyEvent, i);
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
  return `${heureEvent[0].trim()}-${heureEvent[1].trim()}-00`;
};

const convertDateEMF = (theDate) => {
  laDate = theDate.split("->")[0].split(" ");
  // console.log(laDate)
  return `${laDate[2]}-${utilsDates.moisEnChiffre(laDate[1])}-${laDate[0]}`;
};

async function ExtractEMF() {
  const data = fs.readFileSync(`./events/eventsEMFlist.txt`);

 JSON.parse(data).urls.map(url=> {
  compilEMF(url.url)
 })
}

ExtractEMF();
