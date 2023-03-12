const fs = require("fs");
const axios = require("axios");
const pwn = require("./redressePwn");
const cheerio = require("cheerio");

async function loadEvent(urlEvent) {
  const { data } = await axios.get(`https://pwn-association.org${urlEvent}`);
  const event=pwn(data)

  // console.log(event)
      const newName = event.name.replace(/ |:/g, "-");
    const newName2=newName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    fs.writeFileSync(
      `./events/pwn/${encodeURIComponent(newName2)}.json`,
      `<script type="application/ld+json">${JSON.stringify(
        event
      )}</script>`
    );
}

async function compilPwn() {
  const { data } = await axios.get(
    "https://pwn-association.org/tous-les-evenements-pwn/"
  );
  const $ = cheerio.load(data);
  $('.upcoming-events .event-inner>a').each((index, item) => { 
    const urlEvent=item.attribs.href
    loadEvent(urlEvent)
  });
}

compilPwn();
