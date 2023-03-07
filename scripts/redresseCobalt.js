const cobalt = (infos) => {
  console.log("infos", infos)
  //remove last virgule
  const lastVirgule = infos.lastIndexOf(",");
  const infos2 = infos.substring(0, lastVirgule) + "}";
  //remove tab & CR
  const info3 = infos2.replace(/(\r\n|\n|\r|\t)/gm, "");
  // console.log("infos", info3)

// converti en array pour chercher les clés pourries
  const infosAsArr = info3.split(",  ");
  for (var j = 0; j < infosAsArr.length; j++) {
    // enlève les " en trop"
    if (infosAsArr[j].match('"name":')) {
      // console.log(infosAsArr[j]) ;
      const value = infosAsArr[j].substring(8);
      const info4 = value.replace(/\"/g, "");
      infosAsArr[j] = `"name": "${info4}"`;
      // console.log(infosAsArr) ;
    }

    if (infosAsArr[j].match('"description":')) {
      // console.log("in", infosAsArr[j]);
      const value = infosAsArr[j].substring(14, infosAsArr[j].length - 2);
      const info4 = value.replace(/\"/g, "");
      infosAsArr[j] = `"description": "${info4}"}`;
      // console.log("out", infosAsArr);
    }
  }
  const arrEnString = infosAsArr.toString();
  return JSON.parse(arrEnString);
};

module.exports = cobalt;
