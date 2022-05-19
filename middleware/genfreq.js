const Preference = require("../models/preference");

module.exports = async (req, res, next) => {
  try {
    const preference = await Preference.findById(req.preference.id);
    const genres = preference.genre;


    //recommended freq
    let recomm = preference.genre[12].value;
    for (let i in genres) {
      if (genres[i].value > recomm) {
        recomm = genres[i].value;
      }
    }
    recomm = recomm / 2;


    //recommended genre
    var topgenre = [];
    var bottomgenre = [];

    for (let i in genres) {
      if (genres[i].value >= recomm) {
        topgenre.push(i);
      }else if (genres[i].value < recomm) {
        bottomgenre.push(i);
      }
    }
    req.topgenre = topgenre;
    req.bottomgenre = bottomgenre;
    next();
  } catch (err) {
    console.log(err);
    next();
  }
};
