const cobalt = (infos) => {
  // console.log("infos", infos);
  //remove last virgule
  let cleanInfos = infos.substring(0, infos.lastIndexOf(",")) + "}";
  //remove tab & CR
  cleanInfos = cleanInfos.replace(/(\r\n|\n|\r|\t)/gm, "");

  // converti en array pour chercher les clés pourries, mis les espaces pour éviter de récupérer du texte avec des , ...
  const infosAsArr = cleanInfos.split(",  ");
  for (var j = 0; j < infosAsArr.length; j++) {
    // enlève les " en trop"
    if (infosAsArr[j].match('"name":')) {
      const value = infosAsArr[j].substring(8);
      const cleanValue = value.replace(/\"/g, "");
      infosAsArr[j] = `"name": "${cleanValue}"`;
    }

    if (infosAsArr[j].match('"description":')) {
      const value = infosAsArr[j].substring(14, infosAsArr[j].length - 2);
      const cleanValue = value.replace(/\"/g, "");
      infosAsArr[j] = `"description": "${cleanValue}"}`;
    }
    if (infosAsArr[j].match('"startDate":')) {
      const value = infosAsArr[j].substring(12);
      const newStartDate=reformatDate(value)
      infosAsArr[j] = `"startDate": ${newStartDate}`;
    }
    if (infosAsArr[j].match('"endDate":')) {
      const value = infosAsArr[j].substring(10);
      const newEndDate=reformatDate(value)
      infosAsArr[j] = `"endDate": ${newEndDate}`;
    }
  }
  // console.log(infosAsArr)
  const arrEnString = infosAsArr.toString();
  return JSON.parse(arrEnString);
};

const reformatDate = (date) => {
  const arrDate = date.split("T");
  const arrHeure = arrDate[1].split("-");
  //remove first content (c'est un doublon...)
  arrHeure.shift();
  const newArrHeure=arrHeure.join('-')
 return `${arrDate[0].toString()}T${newArrHeure}`
}

module.exports = cobalt;
