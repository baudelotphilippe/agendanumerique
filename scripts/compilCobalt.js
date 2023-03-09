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
    const newName2=newName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const filterContent = {
      name: event.name ?? "",
      description: event.description ?? "",
      startDate: event.startDate ?? "",
      endDate: event.endDate ?? "",
      location: {
        name: event.location?.name ?? "Cobalt Poitiers",
        address: {
          addressLocality: event.location?.address?.addressLocality ?? "86000 Poitiers",
          streetAddress: event.location?.address?.streetAddress ?? "5 Rue Victor Hugo",
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
