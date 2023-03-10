const formatDate = (originalDate) => {
    const listeMois = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];
    const splitJourHour = originalDate.split("T");
    const arrJour = splitJourHour[0].split("-");
    const mois = listeMois[arrJour[1] - 1];
    const arrHour=splitJourHour[1].split("-");
    return {
      jour: `${arrJour[2]} ${mois} ${arrJour[0]}`,
      heure: `${arrHour[0]}h${arrHour[1]}`,
    };
  };

module.exports = formatDate;