import { promises as fs } from 'fs';

export default async function handler(req, res) {
  //Find the absolute path of the json directory
  // const jsonDirectory = path.join(process.cwd(), 'json');
  //Read the json data file data.json
  const query = req.query;
  const {slug, categorie}=query
  // console.log("dir",jsonDirectory, `./events/${encodeURIComponent(categorie)}/${encodeURIComponent(slug)}.json`)
  const fileContents = await fs.readFile(`./events/${encodeURIComponent(categorie)}/${encodeURIComponent(slug)}.json`, 'utf8');
  //Return the content of the data file in json format
  res.status(200).json(fileContents);
}
