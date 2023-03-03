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
    const newDateFormat = originalDate.split("T");
    const jour = newDateFormat[0].split("-");
    const mois = listeMois[jour[1] - 1];
    return {
      jour: `${jour[2]} ${mois} ${jour[0]}`,
      heure: `${newDateFormat[1]}`,
    };
  };

  export default formatDate;