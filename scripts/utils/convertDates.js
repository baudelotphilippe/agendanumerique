const listeMois = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

const months = {
  janvier: "01",
  février: "02",
  mars: "03",
  avril: "04",
  "avr.": "04",
  mai: "05",
  juin: "06",
  juillet: "07",
  août: "08",
  septembre: "09",
  octobre: "10",
  novembre: "11",
  décembre: "12",
};

const formatDate = (originalDate) => {
  const splitJourHour = originalDate.split("T");
  const arrJour = splitJourHour[0].split("-");
  const mois = listeMois[arrJour[1] - 1];
  const arrHour = splitJourHour[1].split(":");
  return {
    jour: `${arrJour[2]} ${mois} ${arrJour[0]}`,
    heure: `${arrHour[0]}h${arrHour[1]}`,
  };
};

const moisEnChiffre = (mois) => months[mois];

module.exports = {formatDate,moisEnChiffre};
