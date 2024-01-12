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

// "jan." ... mis en place pour pwn
const months = {
  janvier: "01",
  "jan.": "01",
  février: "02",
  "fév.": "02",
  mars: "03",
  avril: "04",
  "avr.": "04",
  mai: "05",
  juin: "06",
  juillet: "07",
  août: "08",
  septembre: "09",
  "sep.": "09",
  octobre: "10",
  "oct.": "10",
  novembre: "11",
  "nov.": "11",
  décembre: "12",
  "déc.": "12",
};

export const formatDate = (originalDate) => {
  const splitJourHour = originalDate.split("T");
  const arrJour = splitJourHour[0].split("-");
  const mois = listeMois[arrJour[1] - 1];
  const arrHour = splitJourHour[1].split(":");
  return {
    jour: `${arrJour[2]} ${mois} ${arrJour[0]}`,
    heure: `${arrHour[0]}h${arrHour[1]}`,
  };
};

export const moisEnChiffre = (mois) => months[mois];

export const prependNumber = theNumber => ("0" + theNumber).slice(-2);

