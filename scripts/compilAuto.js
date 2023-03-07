const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const cobalt = require("./redresseCobalt");

async function getStaticProps() {
  const { data } = await axios.get(
    "https://www.cobaltpoitiers.fr/programmation/"
  );
  const $ = cheerio.load(data);
  $('script[type="application/ld+json"]').each((index, item) => {
    const event = cobalt(item.children[0].data);
    console.log(event);
    const newName = event.name.replace(/ |:/g, "-");
    // (\r\n|\n|\r|\t)
    const newName2=newName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const filterContent = {
      name: event.name ?? "",
      description: event.description ?? "",
      startDate: event.startDate ?? "",
      location: {
        name: event.location?.name ?? "",
        address: {
          addressLocality: event.location?.address?.addressLocality ?? "",
          streetAddress: event.location?.address?.streetAddress ?? "",
          location: event.location?.name ?? "",
        },
      },
      image: event.image ?? "",
      organizer: event.organizer?.name ?? "",
    };
    fs.writeFileSync(
      `./events/newFiles/${encodeURIComponent(newName2)}.json`,
      `<script type="application/ld+json">${JSON.stringify(
        filterContent
      )}</script>`
    );
  });
}

getStaticProps();
