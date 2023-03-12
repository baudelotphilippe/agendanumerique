const fs = require("fs");

const renameFile=(event) => {
    let filename = event.name.replace(/( |:|#|&)/g, "-");
    filename=filename.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return filename
}

const saveFile=(folder,event) => {
    const filename=renameFile(event);
    fs.writeFileSync(
        `./events/${folder}/${encodeURIComponent(filename)}.json`,
        `<script type="application/ld+json">${JSON.stringify(
          event
        )}</script>`
      );

}

module.exports = saveFile