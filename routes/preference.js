const express = require("express");
const Preference = require("../models/preference");
const auth = require("../middleware/user_jwt");
const genfreq = require("../middleware/genfreq");
const data = require("../middleware/data");
const { default: axios } = require("axios");
const router = express.Router();


// Updating preference in db based on click
router.get("/onclick", auth, async (req, res) => {
  try {
    const preference = await Preference.findByIdAndUpdate(req.preference.id);
    await fetch(
      `https://api.themoviedb.org/3/movie/${req.query.movieid}?api_key=${process.env.TMDBAPIKEY}&language=US-en&append_to_response=videos`)
      .then((response) => response.json())
      .then((data) =>{ 
        const genres = data.genres;
        for (let i of genres) {
          preference.genre[i.id].value += 1;
        }
        preference.save();
        res.status(200).json({
        msg: "success",
        detail:data
      })});
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "server error",
    });
  }
});

// Currently in theater movies based on recommendation
router.get("/intheater", auth, genfreq,data, async (req, res) => {
  try {
    var genre = req.topgenre;
    var country = req.country;
    var adult = req.adult;

    var movieArr = [];
    for (let i = 0; i < genre.length; i++) {
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDBAPIKEY}&language=en-US&page=1&region=${country}&include_adult=${adult}&with_genres=${genre[i]}`
      )
        .then((response) => response.json())
        .then((data) => movieArr.push(data.results));
    }
    movieArr = [].concat.apply([], movieArr);

    res.status(200).json({
      recommended: movieArr,
      msg: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "server error",
    });
  }
});

// Upcoming movies based on recommendation
router.get("/upcoming", auth, genfreq,data, async (req, res) => {
  try {
    var genre = req.topgenre;
    var country = req.country;
    var adult = req.adult;
    var movieArr = [];
    for (let i = 0; i < genre.length; i++) {
      await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDBAPIKEY}&language=en-US&page=1&region=${country}&include_adult=${adult}&with_genres=${genre[i]}`
      )
        .then((response) => movieArr.push(response.results))
        // .then((data) => movieArr.push(data.results));
        
    }
    movieArr = [].concat.apply([], movieArr);

    res.status(200).json({
      recommended: movieArr,
      msg: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "server error",
    });
  }
});

// movies based on interest
router.get("/recommended", auth, genfreq,data, async (req, res) => {
  try {
    var genre = req.topgenre;
    var country = req.country;
    var adult = req.adult;
    var movieArr = [];
    for (let i = 0; i < genre.length; i++) {
      await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDBAPIKEY}&language=en-US&page=1&region=${country}&include_adult=${adult}&with_genres=${genre[i]}`
      )
        .then((response) => response.json())
        .then((data) => movieArr.push(data.results));
    }
    movieArr = [].concat.apply([], movieArr);
    res.status(200).json({
      recommended: movieArr,
      msg: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "server error",
    });
  }
});

// movies of less interest but likely to explore
router.get("/explore", auth, genfreq,data, async (req, res) => {
    try {
      var genre = req.bottomgenre;
      var country = req.country;
      var adult = req.adult;
      var movieArr = [];
      for (let i = 0; i < genre.length; i++) {
        await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDBAPIKEY}&language=en-US&page=1&region=${country}&include_adult=${adult}&with_genres=${genre[i]}`
        )
          .then((response) => response.json())
          .then((data) => movieArr.push(data.results));
      }
      movieArr = [].concat.apply([], movieArr);
      // var movieSet = new Set(movieArr);
      // console.log(movieSet);
      res.status(200).json({
        msg: "success",
        recommended: movieArr
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "server error",
      });
    }
  });

module.exports = router;
