const express = require("express");
const Preference = require("../models/preference");
const auth = require("../middleware/user_jwt");
const genfreq = require("../middleware/genfreq");
const router = express.Router();

// Updating preference in db based on click
router.post("/onclick", auth, async (req, res) => {
  try {
    const preference = await Preference.findByIdAndUpdate(req.preference.id);
    const genres = req.body.genres;
    for (let i of genres) {
      preference.genre[i].value += 1;
    }
    preference.save();

    res.status(200).json({
      msg: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "server error",
    });
  }
});

// Currently in theater movies based on recommendation
router.get("/intheater", auth, genfreq, async (req, res) => {
  try {
    var genre = req.topgenre;

    var movieSet = [];
    for (let i = 0; i < genre.length; i++) {
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=1e8236147d475e6013b593098ae706a3&page=1&region=IN&with_genres=${genre[i]}`
      )
        .then((response) => response.json())
        .then((data) => movieSet.push(data.results));
      console.log(i);
    }
    res.status(200).json({
      recommended: movieSet,
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
router.get("/upcoming", auth, genfreq, async (req, res) => {
  try {
    var genre = req.topgenre;
    var movieSet = [];
    for (let i = 0; i < genre.length; i++) {
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=1e8236147d475e6013b593098ae706a3&language=en-US&page=1&with_genres=${genre[i]}`
      )
        .then((response) => response.json())
        .then((data) => movieSet.push(data.results));
      console.log(i);
    }

    res.status(200).json({
      recommended: movieSet,
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
router.get("/recommended", auth, genfreq, async (req, res) => {
  try {
    var genre = req.topgenre;
    var movieSet = [];
    for (let i = 0; i < genre.length; i++) {
      await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=1e8236147d475e6013b593098ae706a3&language=en-US&page=1&with_genres=${genre[i]}`
      )
        .then((response) => response.json())
        .then((data) => movieSet.push(data.results));
    }
    res.status(200).json({
      recommended: movieSet,
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
router.get("/explore", auth, genfreq, async (req, res) => {
    try {
      var genre = req.bottomgenre;
      var movieSet = [];
      for (let i = 0; i < genre.length; i++) {
        await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=1e8236147d475e6013b593098ae706a3&language=en-US&page=1&with_genres=${genre[i]}`
        )
          .then((response) => response.json())
          .then((data) => movieSet.push(data.results));
      }
      res.status(200).json({
        recommended: movieSet,
        msg: "success",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "server error",
      });
    }
  });
module.exports = router;
