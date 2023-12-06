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
  let blocInfos = $(".offset")[0];
  //fix when there is no image ...
  if (!blocInfos) {
    blocInfos = $(".infos")[0];
  } else {
    event.image = `https://www.cobaltpoitiers.fr${infos.children[2].next.children[0].next.children[0].children[0].attribs.src}`;
  }

  const ladate = new Date();
  let anneeActuelle = ladate.getFullYear();
  const moisActuel = ladate.getMonth() + 1;

  const zoneJourMois = blocHead.children[3];
  const jour = zoneJourMois.children[0].children[0].data;
  const mois = zoneJourMois.children[1].data.split("/")[1];

  // on part du principe que si le mois de l'event est < au mois actuel c'est qu'on est l'année prochaine ... 0 mentions d'années dans les events cobalt
  if (mois < moisActuel) {
    anneeActuelle++;
  }

  const zoneHeure = blocInfos.children[2].children[1].data;
  event.startDate = `${anneeActuelle}-${mois}-${jour}T${reformatHeure(
    zoneHeure
  )}`;

  event.name = blocHead.children[5].children[0].data;

  event.description = $(".inscription").html();

  const lesInfos = $(".infos span");
  for (var ligneInfo in lesInfos) {
    if (lesInfos[ligneInfo].children?.length && lesInfos[ligneInfo].children[0]) {
      const catInfos =
        lesInfos[ligneInfo].children[0].parent.children[0].children[0].data;
        console.log(catInfos)
      if (catInfos.includes("Organisateur")) {
        event.organizer =
          lesInfos[
            ligneInfo
          ].children[0].parent.children[0].children[0].parent.next.data;
      }
      if (catInfos.includes("Heure")) {
        event.location.name = 
          lesInfos[
            ligneInfo
          ].children[0].parent.children[0].children[0].parent.parent.children[3].data.trim();
      }
    }
  }

  console.log(event.location.name)
  if (event.location.name === "Cobalt") {
    event.location.address.addressLocality = "86000 Poitiers";
    event.location.address.streetAddress = "5 Rue Victor Hugo";
  }

  event.url = "https://www.cobaltpoitiers.fr/agenda_1550.html";

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
