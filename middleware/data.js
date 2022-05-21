const Preference = require("../models/preference");

module.exports = async (req, res, next) => {
  try {
    const preference = await Preference.findById(req.preference.id);
    var country = preference.country;
    var birthyear = preference.birthyear;
    var curryr = new Date().getFullYear();
    var age = birthyear-curryr;
    var adult = true;
    if(age<18)adult=false;
    req.adult = adult;
    req.country = country;
    next();
  } catch (err) {
    console.log(err);
    next();
  }
};
