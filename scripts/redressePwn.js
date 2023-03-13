
const cheerio = require("cheerio");
const emptyEvent = require("./utils/emptyEvent")
const utilsDates = require("./utils/convertDates");

const convertDatePwn=(datePwn) => {
  const jourHeureDebut=datePwn.split("à")
  const arrJourDebut=jourHeureDebut[0].trim().split(" ")
  // retire , et force sur 2 digits
  const formatDay=("0"+arrJourDebut[1].slice(0,-1)).slice(-2)
   return `${arrJourDebut[2]}-${utilsDates.moisEnChiffre(arrJourDebut[0])}-${formatDay}T${jourHeureDebut[1].trim().replace(":","-")}-00`
}
const redressePwn = (data) => {
  const $ = cheerio.load(data);
  let name=$('.event-title')[0].children[0].data
  // trim enlève char avant et après string  
  emptyEvent.name = name.replace(/(\r\n|\n|\r|\t)/gm, "").trim();

  emptyEvent.url=$("meta[property='og:url']").attr("content");
  emptyEvent.image=$("meta[property='og:image']").attr("content");

  let description=$('.event-description')[0].children//.length//[4]

  let beginRecord=false
  let contentDescription="";
  description.forEach((elem, index) => {
    // console.log("index >", index)
    
    if (elem.children) {

      if (elem.children[0].data=="infos pratiques") {
        // console.log("indexw ==>", description[index+1].next.children[1].children[2].children[0].data)//adresse

        const lesDates=description[index+1].next.children[2].next.children[1].data
        const cleanDates = lesDates.replace(/(\r\n|\n|\r|\t)/gm, "").trim();
        const arrDates=cleanDates.split("–")

        emptyEvent.startDate=convertDatePwn(arrDates[0])
        emptyEvent.endDate=convertDatePwn(arrDates[1])

        emptyEvent.location.name=description[index+1].next.children[1].children[2].children[0].data.trim()
      }

      if (elem.children[0].data=="description de l'intervenant") {
        beginRecord=false
      }
      if (beginRecord) {
        contentDescription+=elem.children[0].data
      }
      if (elem.children[0].data=="description de l'intervention") {
        beginRecord=true
      }
    }
  }
  )
  emptyEvent.description=contentDescription
  emptyEvent.organizer="Pwn"
  return emptyEvent
};


module.exports = redressePwn;
