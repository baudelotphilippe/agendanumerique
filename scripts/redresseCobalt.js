const { type } = require("os");
const { stringify } = require("querystring");
const emptyEvent = require("./utils/emptyEvent");

const redresseCobalt = (infos) => {
  const event = {
    ...emptyEvent,
  };

  const jour = infos.children[0].next.children[3].children[0].children[0].data;
  const mois =
    infos.children[0].next.children[3].children[1].data.split("/")[1];
  const heure =
    infos.children[2].next.children[0].next.children[0].next.next.children[2]
      .children[1].data;

  let description = infos.children[2].next.children[2].next.children;
  contentDescription = "";
  description.forEach((element) => {
    if (element.children) {
      contentDescription += element.children[0].data + "\n";
    }
  });

  event.location.name =
    infos.children[2].next.children[0].next.children[0].next.next.children[2].children[3].data;

  //todo : jour / mois sur 1 digit (gérer ajout du 0 ou pas) ? trim
  event.name = infos.children[0].next.children[5].children[0].data;
  event.description = contentDescription;
  event.image = `https://www.cobaltpoitiers.fr${infos.children[2].next.children[0].next.children[0].children[0].attribs.src}`;
  event.startDate = `2023-${mois}-${jour}T${reformatHeure(heure)}`;
  event.endDate = event.startDate;
  event.organizer =
    infos.children[2].next.children[0].next.children[0].next.next.children[3].children[1].data;
  return event;
};

const reformatHeure = (heure) => {
  const arrHeure = heure.split("h");
  return `${parseInt(arrHeure[0])}:${parseInt(arrHeure[1])}:00`;
};

module.exports = redresseCobalt;
