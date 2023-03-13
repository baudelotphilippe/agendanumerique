const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const saveFile = require("./utils/file");
const utilsDates = require("./utils/convertDates");
const emptyEvent = require("./utils/emptyEvent");

async function compilEMF() {
  const { data } = await axios.get(
    "https://emf.fr/ec3_event/entraide-depannage-rendez-vous-animateur/"
  );
  const $ = cheerio.load(data);
  //titre
  const infoTitre = $(".hero-title-inside-text h1").text();
  const titreRedresse = infoTitre
    .replace(/(\r\n|\n|\r|\t|)/gm, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  emptyEvent.name = titreRedresse;
  // date
  const dateJour = $(".ec3_iconlet .ec3_day").text();
  const infosMoisAnnee = $(".ec3_iconlet .ec3_month td:last").text();
  const splitMoisAnnee = infosMoisAnnee.split(" ");
  const dateMoisEnLettre = splitMoisAnnee[0];

  const dateMoisEnChiffre = utilsDates.moisEnChiffre(dateMoisEnLettre);

  //heure
  const dateHeure = $(".ec3_iconlet .ec3_time .ec3_multi_start").text();
  const dateHeureWithoutSpaces = dateHeure.replace(/ |:/g, "");
  const splitDateHeure = dateHeureWithoutSpaces.split("h");
  const dateFinal = `${splitMoisAnnee[2]}-${dateMoisEnChiffre}-${dateJour}T${splitDateHeure[0]}-${splitDateHeure[1]}-00`;
  emptyEvent.startDate = dateFinal;
  emptyEvent.endDate=dateFinal;
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
  console.log(emptyEvent);
  saveFile("emf", emptyEvent);
}

compilEMF();
