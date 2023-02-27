const fs= require('fs');
const cheerio = require('cheerio');
const eventsFolder = './events/files/';


const jsonsDir = fs.readdirSync(eventsFolder);
const newContent=[]

jsonsDir.forEach( file => {
    const data=fs.readFileSync(`${eventsFolder}${file}`)
    const $ = cheerio.load(data);
    const jsonRaw = $("script[type='application/ld+json']")[0].children[0].data; 
    const event = JSON.parse(jsonRaw);
    const filterContent={
        "name": event.name ?? "",
         "startDate": event.startDate ?? "",
        "location": {
          "addressLocality": event.location?.address?.addressLocality ?? "",
          "streetAddress": event.location?.address?.streetAddress ?? "",
          "location":event.location?.name ?? ""
        },
        "organizer": event.organizer?.name ?? ""
      }
    newContent.push(filterContent)
})

// console.log(newContent)
fs.writeFileSync('./events/events.json', JSON.stringify(newContent))

