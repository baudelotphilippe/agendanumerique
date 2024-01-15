import {formatDate} from "./utils/convertDates.js";
import fs from "fs";

const eventsFolder = ["cobalt", "pwn", "emf", "afup", "manuel"];
const newContent = [];

eventsFolder.forEach((folder) => {
  if (!fs.existsSync(`./events/${folder}/`)) return;
  
  const jsonsDir = fs.readdirSync(`./events/${folder}/`);

  jsonsDir.forEach((file) => {
    const data = fs.readFileSync(`./events/${folder}/${file}`);
    const event = JSON.parse(data);
    const fileWithoutExt = file.split(".").slice(0, -1).join(".");
    const filterContent = {
      name: event.name ?? "",
      startDate: event.startDate ?? "",
      startDateFormat: formatDate(event.startDate),
      endDate: event.endDate ?? "",
      endDateFormat: event.endDate ? formatDate(event.endDate) : "",
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
