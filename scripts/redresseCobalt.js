const { type } = require("os");
const { stringify } = require("querystring");
const emptyEvent = require("./utils/emptyEvent");
const utilsDates = require("./utils/convertDates");
const cheerio = require("cheerio");
const { info } = require("console");

const redresseCobalt = (element) => {
  const event = {
    ...emptyEvent,
  };

  const $ = cheerio.load(element);

  event.name = $(element).find("h3").next("p").text().trim();
  event.description = $(element).find(".inscription").html(); // Sélection de la description dans la div avec la classe "inscription"

  // date event
  const date = $(element).find("h3").text().trim().split("/");
  const jour = date[0];
  const mois = date[1];

  // déduit année event
  // on part du principe que si le mois de l'event est < au mois actuel c'est qu'on est l'année prochaine ... 0 mentions d'années dans les events cobalt
  const ladateActuelle = new Date();
  let anneeActuelle = ladateActuelle.getFullYear();
  const moisActuel = ladateActuelle.getMonth() + 1;

  if (mois < moisActuel) {
    anneeActuelle++;
  }

  // heure event
  const heureElement = $(element).find('span:contains("Heure")').first();
  const heure =
    heureElement.length > 0
      ? heureElement.text().replace("Heure :", "").trim().split(" ")[0]
      : "";

  //format date et heure event
  event.startDate = `${anneeActuelle}-${mois}-${jour}T${reformatHeure(heure)}`;

  event.organizer = $(element)
    .find('span:contains("Organisateur :")')
    .text()
    .replace("Organisateur : ", "");

  event.location.name = $(element)
    .find('span:contains("Lieu :")')
    .text()
    .split(" ")
    .slice(5)
    .toString();
  if (event.location.name === "Cobalt") {
    event.location.address.addressLocality = "86000 Poitiers";
    event.location.address.streetAddress = "5 Rue Victor Hugo";
  }

  const imageSrc = $(element).find("div.img img").attr("src");
  event.image = imageSrc ? `https://www.cobaltpoitiers.fr${imageSrc}` : "";

  event.url = "https://www.cobaltpoitiers.fr/agenda_1550.html";

  // console.log(event);
  return event;
};

const reformatHeure = (heure) => {
  const arrHeure = heure.split("h");
  return `${utilsDates.prependNumber(
    arrHeure[0].trim()
  )}:${utilsDates.prependNumber(arrHeure[1].trim())}:00`;
};

module.exports = redresseCobalt;
