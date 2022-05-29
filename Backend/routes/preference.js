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
    await axios.get(
      `https://api.themoviedb.org/3/movie/${req.query.movieid}?api_key=${process.env.TMDBAPIKEY}&language=US-en&append_to_response=videos`)
      .then((response) => { 
        const genres = response.data.genres;
        for (let i of genres) {
          preference.genre[i.id].value += 1;
        }
        preference.save();
        res.status(200).json({
        msg: "success",
        detail:response.data
      })});
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "server error",
    });
  }
});

// Updating preference with adding to mymovielist in db based on click
router.post("/addtolist", auth, async (req, res) => {
  try {
    const movie = req.body.movie;
    const preference = await Preference.findByIdAndUpdate(req.preference.id,{
      $push:{mymovie:movie}
    });
    
    const genres = movie.genres;
    for (let i of genres) {
      preference.genre[i.id].value += 3;
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


// fetching my movie list
router.get("/mymovies", auth, async (req, res) => {
  try {
    const preference = await Preference.findById(req.preference.id);
    
    res.status(200).json({
      recommended: preference.mymovie,
      msg: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "server error",
    });
  }
});



// fetching my movie list
router.post("/relatedmovies", auth, genfreq,data, async (req, res) => {
  try {
    const preference = await Preference.findById(req.preference.id);
    const genres = req.body.movieid;
    var country = req.country;
    var adult = req.adult;
    var movieArr = [];
    for (let i of genres) {
      await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDBAPIKEY}&language=en-US&page=1&region=${country}&include_adult=${adult}&with_genres=${i.id}`
      )
        .then((response) => movieArr.push(response.data.results));
        
    }
    movieArr = [].concat.apply([], movieArr);
    let movieSet = new Set();

    movieArr.forEach(item => movieSet.add(item))
    console.log(movieSet,"SET")

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

// Currently in theater movies based on recommendation
router.get("/intheater", auth, genfreq,data, async (req, res) => {
  try {
    var genre = req.topgenre;
    var country = req.country;
    var adult = req.adult;

    var movieArr = [];
    for (let i = 0; i < genre.length; i++) {
      await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDBAPIKEY}&language=en-US&page=1&region=${country}&include_adult=${adult}&with_genres=${genre[i]}`
      )
        .then((response) => movieArr.push(response.data.results));
        
    }
    movieArr = [].concat.apply([], movieArr);
    let movieSet = new Set()

    movieArr.forEach(item => movieSet.add(item))
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
        .then((response) => movieArr.push(response.data.results));
        
    }
    movieArr = [].concat.apply([], movieArr);
    let movieSet = new Set()

    movieArr.forEach(item => movieSet.add(item))
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
      await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDBAPIKEY}&language=en-US&page=1&region=${country}&include_adult=${adult}&with_genres=${genre[i]}`
      )
        .then((response) => movieArr.push(response.data.results));
        
    }
    movieArr = [].concat.apply([], movieArr);
    let movieSet = new Set()

    movieArr.forEach(item => movieSet.add(item))
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
        await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDBAPIKEY}&language=en-US&page=1&region=${country}&include_adult=${adult}&with_genres=${genre[i]}`
        )
          .then((response) => movieArr.push(response.data.results));
          
      }
      movieArr = [].concat.apply([], movieArr);
      let movieSet = new Set()

    movieArr.forEach(item => movieSet.add(item))
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
