const utilsDates = require("./utils/convertDates");

const fs = require("fs");
const cheerio = require("cheerio");
const eventsFolder = ["cobalt", "pwn", "emf", "afup", "manuel"];
const newContent = [];

eventsFolder.forEach((folder) => {
  if (!fs.existsSync(`./events/${folder}/`)) return;
  
  const jsonsDir = fs.readdirSync(`./events/${folder}/`);

  jsonsDir.forEach((file) => {
    const data = fs.readFileSync(`./events/${folder}/${file}`);
    const $ = cheerio.load(data);
    const jsonRaw = $("script[type='application/ld+json']")[0].children[0].data;
    const event = JSON.parse(jsonRaw);
    const fileWithoutExt = file.split(".").slice(0, -1).join(".");
    const filterContent = {
      name: event.name ?? "",
      startDate: event.startDate ?? "",
      startDateFormat: utilsDates.formatDate(event.startDate),
      endDate: event.endDate ?? "",
      endDateFormat: event.endDate ? utilsDates.formatDate(event.endDate) : "",
      image:event.image,
      location: {
        addressLocality: event.location?.address?.addressLocality ?? "",
        streetAddress: event.location?.address?.streetAddress ?? "",
        name: event.location?.name ?? "",
      },
      organizer: event.organizer ?? "",
      slug: `${folder}/${fileWithoutExt}`,
      url: event.url,
      subEvent:event.subEvent ?? "",
    };
    newContent.push(filterContent);
  });
});
// console.log(newContent);
fs.writeFileSync("./events/events.json", JSON.stringify(newContent));
