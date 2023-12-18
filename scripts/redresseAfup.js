const emptyEvent = require("./utils/emptyEvent");
const cheerio = require("cheerio");

const redresseAfup = (data) => {
  const $ = cheerio.load(data);
  const event = {
    ...emptyEvent,
  };

  const dataJson = $("head > script").eq(2).html();
  const dataJsonParsed = JSON.parse(dataJson);
  event.name = dataJsonParsed.name;

  event.url = dataJsonParsed.url;
  event.image = dataJsonParsed.image[0];

  event.description = $("div.break-words").html().replace(/<br>/g, "\n");

  event.startDate = dataJsonParsed.startDate;
  event.endDate = dataJsonParsed.endDate;

  event.location.name = dataJsonParsed.location.name;
  event.location.address.streetAddress =
    dataJsonParsed.location.address.streetAddress;
  event.location.address.addressLocality =
    dataJsonParsed.location.address.addressLocality;

  event.organizer = "Afup";

  return event;
};

module.exports = redresseAfup;
