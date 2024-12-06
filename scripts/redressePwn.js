import * as cheerio from "cheerio";
import { emptyEvent } from "./utils/emptyEvent.js";
import { moisEnChiffre } from "./utils/convertDates.js";

const convertDatePwn = (datePwn) => {
  const jourHeureDebut = datePwn.split("à");
  const arrJourDebut = jourHeureDebut[0].trim().split(" ");
  return `${arrJourDebut[2]}-${moisEnChiffre(
    arrJourDebut[1]
  )}-${arrJourDebut[0]}T${jourHeureDebut[1].trim()}:00`;
};

export default function redressePwn(data) {
  const $ = cheerio.load(data);
  let name = $(".event-title")[0].children[0].data;
  const event = {
    ...emptyEvent,
  };

  event.name = name.replace(/(\r\n|\n|\r|\t)/gm, "").trim();

  event.url = $("meta[property='og:url']").attr("content");
  event.image = $("meta[property='og:image']").attr("content");
  let description = $(".event-description")[0].children;

  let beginRecord = false;
  let contentDescription = "";
  description.forEach((elem, index) => {
    if (elem.children) {
      if (elem.children[0].data == "infos pratiques") {
        const dateElement = $("div.event-description li").filter((i, el) => {
          return $(el).text().includes("Date et heure");
        });
        const laDate = dateElement
          .text()
          .trim()
          .replace(/\s+/g, " ")
          .replace("Date et heure :", "")
          .trim();
          
        event.startDate = convertDatePwn(laDate);
        event.endDate = event.startDate;
        const locationElement = $("div.event-description li").filter(
          (i, el) => {
            return $(el).text().includes("Lieu :");
          }
        );

        const location = locationElement.find("a").text().trim();
        event.location.name = location;
      }

      if (elem.children[0].data == "description de l'intervenant") {
        beginRecord = false;
      }
      if (beginRecord) {
        elem.children.forEach((subElem) => {
          if (subElem.children[0].data) {
            contentDescription += subElem.children[0].data;
          }
        });
      }
      // console.log("*"+elem.children[0].data+"*")
      if (elem.children[0].data?.trim() == "description de l'intervention") {

        beginRecord = true;
      }
    }
  });
  event.description = contentDescription;
  event.organizer = "Pwn";
  return event;
}
