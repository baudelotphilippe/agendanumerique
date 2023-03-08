const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

async function getStaticProps() {
  const { data } = await axios.get(
    "https://emf.fr/ec3_event/entraide-depannage-rendez-vous-animateur/"
  );
  const $ = cheerio.load(data);
  //titre
  const infoTitre = $(".hero-title-inside-text h1").text();
  const titreRedresse = infoTitre.replace(/(\r\n|\n|\r|\t|)/gm, "");
  const titre=titreRedresse.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const titre2=titre.replace(/( |:|–)/gm, "-");
  console.log("titre", titre2);
  // date
  const dateJour = $(".ec3_iconlet .ec3_day").text();
  const infosMoisAnnee = $(".ec3_iconlet .ec3_month td:last").text();
  const splitMoisAnnee = infosMoisAnnee.split(" ");
  const dateMoisEnLettre = splitMoisAnnee[0];
  const months = {
    janvier: "01",
    février: "02",
    mars: "03",
    avril: "04",
    mai: "05",
    juin: "06",
    juillet: "07",
    août: "08",
    septembre: "09",
    octobre: "10",
    novembre: "11",
    décembre: "12",
  };
  const dateMoisEnChiffre = months[dateMoisEnLettre];

  //heure
  const dateHeure = $(".ec3_iconlet .ec3_time .ec3_multi_start").text();
  const dateHeureWithoutSpaces = dateHeure.replace(/ |:/g, "");
  const splitDateHeure = dateHeureWithoutSpaces.split("h");
  const dateFinal = `${splitMoisAnnee[2]}-${dateMoisEnChiffre}-${dateJour}T${splitDateHeure[0]}-${splitDateHeure[1]}-00`;
  console.log("dateFinal", dateFinal);
  // "startDate":"2023-3-8T17-00-00"

  // description
  // console.log($("meta[property='og:title']").attr("content"));
  const description = $("meta[property='og:description']").attr("content");
  console.log("description", description);
  //image
  const image = $("meta[property='og:image']").attr("content");
  console.log("image", image);
  //url
  const url = $("meta[property='og:url']").attr("content");
  console.log("url", url);
  //location
  const infosLocation = $(".info_lieu b").text();
  console.log("infosLocation", infosLocation);
  const infosAddress = $(".info_lieu").html();
  const posDuBR=4+infosAddress.indexOf("<br>")
  const adresse=infosAddress.substring(posDuBR);
  console.log("infosAddress", adresse);

  const filterContent = {
    name: titreRedresse ?? "",
    description: description ?? "",
    startDate: dateFinal ?? "",
    location: {
      name: infosLocation ?? "",
      address: {
        addressLocality: adresse ?? "",
        streetAddress:adresse ?? "",
      },
    },
    image: image ?? ""
  };

  fs.writeFileSync(
    `./events/newFiles/${encodeURIComponent(titre2)}.json`,
    `<script type="application/ld+json">${JSON.stringify(
      filterContent
    )}</script>`
  );
}

getStaticProps();
