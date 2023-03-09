const cobalt = (infos) => {
  console.log("infos", infos);
  //remove last virgule
  const lastVirgule = infos.lastIndexOf(",");
  const infos2 = infos.substring(0, lastVirgule) + "}";
  //remove tab & CR
  const info3 = infos2.replace(/(\r\n|\n|\r|\t)/gm, "");
  // console.log("infos", info3)

  // converti en array pour chercher les clés pourries, mis les espaces pour éviter de récupérer du texte avec des , ...
  const infosAsArr = info3.split(",  ");
  for (var j = 0; j < infosAsArr.length; j++) {
    // enlève les " en trop"
    if (infosAsArr[j].match('"name":')) {
      const value = infosAsArr[j].substring(8);
      const info4 = value.replace(/\"/g, "");
      infosAsArr[j] = `"name": "${info4}"`;
    }

    if (infosAsArr[j].match('"description":')) {
      const value = infosAsArr[j].substring(14, infosAsArr[j].length - 2);
      const info4 = value.replace(/\"/g, "");
      infosAsArr[j] = `"description": "${info4}"}`;
    }
    if (infosAsArr[j].match('"startDate":')) {
      const value = infosAsArr[j].substring(12);
      // console.log(value);
      const arrDate = value.split("T");
      const arrHeure = arrDate[1].split("-");
      //remove first content (c'est un doublon...)
      arrHeure.shift();
      const newArrHeure=arrHeure.join('-')
     const newStartDate=`${arrDate[0].toString()}T${newArrHeure}`
    //  console.log("newStartDate",newStartDate);
      infosAsArr[j] = `"startDate": ${newStartDate}`;
    }
    if (infosAsArr[j].match('"endDate":')) {
      const value = infosAsArr[j].substring(10);
      // console.log(value);
      const arrDateEnd = value.split("T");
      const arrHeureEnd = arrDateEnd[1].split("-");
      //remove first content (c'est un doublon...)
      arrHeureEnd.shift();
      const newArrHeureEnd=arrHeureEnd.join('-')
     const newEndDate=`${arrDateEnd[0].toString()}T${newArrHeureEnd}`
      infosAsArr[j] = `"endDate": ${newEndDate}`;
    }
  }
  console.log(infosAsArr)
  const arrEnString = infosAsArr.toString();
  return JSON.parse(arrEnString);
};

module.exports = cobalt;
