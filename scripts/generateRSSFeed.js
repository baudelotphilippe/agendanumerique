import fs from "fs";
import { Feed } from "feed";

async function generateRSSFeed() {
  const data = fs.readFileSync(`./events/events.json`);
  const events = JSON.parse(data);

  const feed = new Feed({
    title: "Agenda du numérique à Poitiers et ses environs",
    description:
      "Agenda du numérique à Poitiers et ses environs. Meetups, conférences, ateliers, formations, etc.",
    id: "https://agendanumerique.vercel.app",
    link: "https://agendanumerique.vercel.app",
    language: "fr",
  });

  for (const event of events) {
    feed.addItem({
      title: event.name,
      id: event.url,
      link: event.url,
      description: event.description,
      date: new Date(event.startDate),
      image: event.image,
      author: [
        {
          name: event.organizer,
        },
      ],
    });
  }

  fs.writeFileSync("./public/feed.xml", feed.rss2());
  fs.writeFileSync("./public/atom.xml", feed.atom1());
  fs.writeFileSync("./public/feed.json", feed.json1());
}

generateRSSFeed();
