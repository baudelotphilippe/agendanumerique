import fetch from 'node-fetch';
import { formatDate } from './convertDates.js';
import fs from 'fs';

async function getLastCommitDate(owner, repo) {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits`;
    const response = await fetch(url);
    const data = await response.json();
    return formatDate(data[0].commit.author.date); // Date du dernier commit
}

getLastCommitDate('baudelotphilippe', 'agendanumerique').then(
   (laDate) =>   fs.writeFileSync(
    `./public/dateMAJ.json`,
    JSON.stringify(laDate)
  )
);