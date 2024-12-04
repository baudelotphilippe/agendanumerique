import {emptyEvent} from "./utils/emptyEvent.js";
import * as cheerio from "cheerio";
import { moisEnChiffre,prependNumber } from "./utils/convertDates.js";

const reformatHeure = (heure) => {
  const arrHeure = heure.split("h");
  const hour = arrHeure[1].split(" ");
  return `${prependNumber(arrHeure[0].trim())}:${prependNumber(hour[0].trim())}:00`;
};

const convertDateEmf = (dateEMF) => {
  const jourHeureDebut = dateEMF.split("à");
  const arrJourDebut = jourHeureDebut[0].trim().split(" ");
  return `${arrJourDebut[3]}-${moisEnChiffre(
    arrJourDebut[2]
  )}-${prependNumber(arrJourDebut[1])}T${reformatHeure(jourHeureDebut[1])}`;
};

export default function redresseEMF (data) {
  const $ = cheerio.load(data);
  const event = {
    ...emptyEvent,
  };

  const dataJson = $("script[type='application/ld+json']:first");
  const dataJsonParsed = JSON.parse(dataJson[0].children[0].data);
  const infos=dataJsonParsed['@graph'][0]
  
  const title = infos.name;
 event.name = title.substring(0, title.lastIndexOf(" - "));

  event.url = infos.url;
  event.image = infos.thumbnailUrl;
  event.description = infos.description;

  const infosDates=convertDateEmf($(".elementor-element.elementor-element-c2a5359 .elementor-heading-title ").text())
  event.startDate =infosDates
  event.endDate = infosDates

  event.location.name = "Espace Mendès France";
  event.location.address.streetAddress ="1 place de la Cathédrale "
  event.location.address.addressLocality = "86000 Poitiers";

  event.organizer = "EMF";

  return event;
};
