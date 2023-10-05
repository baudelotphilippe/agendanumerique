const { type } = require("os");
const { stringify } = require("querystring");
const emptyEvent = require("./utils/emptyEvent");
const utilsDates = require("./utils/convertDates");
const cheerio = require("cheerio");
const { info } = require("console");

const redresseCobalt = (infos) => {
  const event = {
    ...emptyEvent,
  };

  const $ = cheerio.load(infos);

  const blocHead = infos.children[0].next;
  let blocInfos =$(".offset")[0]
  //fix when thre is no image ...
  if (!blocInfos) {blocInfos=$(".infos")[0]}
  
  const zoneJourMois = blocHead.children[3];
  const jour = zoneJourMois.children[0].children[0].data;
  const mois = zoneJourMois.children[1].data.split("/")[1];
  
  const zoneHeure = blocInfos.children[2].children[1].data;
  event.startDate = `2023-${mois}-${jour}T${reformatHeure(zoneHeure)}`;

  event.name = blocHead.children[5].children[0].data;

  event.description = $(".inscription").html();

  event.location.name = blocInfos.children[2].children[3].data.trim();
  if (event.location.name === "Cobalt") {
    event.location.address.addressLocality = "86000 Poitiers";
    event.location.address.streetAddress = "5 Rue Victor Hugo";
  }

  event.url = "https://www.cobaltpoitiers.fr/agenda_1550.html";
  event.image = `https://www.cobaltpoitiers.fr${infos.children[2].next.children[0].next.children[0].children[0].attribs.src}`;
  event.organizer = blocInfos.children[3].children[1].data;
  return event;
};

const reformatHeure = (heure) => {
  const arrHeure = heure.split("h");
  // console.log(arrHeure);
  return `${utilsDates.prependNumber(
    arrHeure[0].trim()
  )}:${utilsDates.prependNumber(arrHeure[1].trim())}:00`;
};

module.exports = redresseCobalt;
