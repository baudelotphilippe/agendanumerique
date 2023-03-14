const { type } = require("os");
const { stringify } = require("querystring");
const emptyEvent = require("./utils/emptyEvent");

const redresseCobalt = (infos) => {
  const event = {
    ...emptyEvent
  };
  //remove last virgule
  let cleanInfos = infos.substring(0, infos.lastIndexOf(",")) + "}";
  //remove tab & CR
  cleanInfos = cleanInfos.replace(/(\r\n|\n|\r|\t)/gm, "");
  cleanInfos = JSON.parse(cleanInfos);
  event.name = cleanInfos.name;
  event.description = cleanInfos.description;
  event.image = cleanInfos.image;
  event.startDate = reformatDate(cleanInfos.startDate);
  event.endDate = reformatDate(cleanInfos.endDate);
  event.organizer="Cobalt"
  return event;
};

const reformatDate = (date) => {
  const arrDateHeure = date.split("T");

  const arrDate = arrDateHeure[0].split("-");
  //force sur 2 chars
  arrDate[1] = ("0" + arrDate[1]).slice(-2);

  const arrHeure = arrDateHeure[1].split("-");
  //remove first content (c'est un doublon...)
  arrHeure.shift();
  const newArrHeure = arrHeure.join("-");
  return `${arrDate[0]}-${arrDate[1]}-${arrDate[2]}T${newArrHeure}`;
};

module.exports = redresseCobalt;
