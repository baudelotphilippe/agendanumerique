const { type } = require("os");
const { stringify } = require("querystring");
const emptyEvent = require("./utils/emptyEvent");

const cobalt = (infos) => {
  // console.log("infos", infos);
  //remove last virgule
  let cleanInfos = infos.substring(0, infos.lastIndexOf(",")) + "}";
  //remove tab & CR
  cleanInfos = cleanInfos.replace(/(\r\n|\n|\r|\t)/gm, "");
  cleanInfos = JSON.parse(cleanInfos);
  emptyEvent.name = cleanInfos.name;
  emptyEvent.description = cleanInfos.description;
  emptyEvent.image = cleanInfos.image;
  emptyEvent.startDate = reformatDate(cleanInfos.startDate);
  emptyEvent.endDate = reformatDate(cleanInfos.endDate);
  return emptyEvent;
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

module.exports = cobalt;
