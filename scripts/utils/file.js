const fs = require("fs");

const renameFile=(event, i) => {
    let filename = event.name.replace(/( |:|#|&)/g, "-");
    filename=filename.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (i==0) {return filename}else{return `${filename}-${i}`}
    
}

const saveFile=(folder,event, i=0) => {
    const filename=renameFile(event, i);
    fs.writeFileSync(
        `./events/${folder}/${encodeURIComponent(filename)}.json`,
        `<script type="application/ld+json">${JSON.stringify(
          event
        )}</script>`
      );

}

module.exports = saveFile