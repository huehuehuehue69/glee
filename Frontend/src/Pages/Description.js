import React, { useEffect, useState } from "react";
import Footer from "../Component/Footer";
import Row from "../Component/Row";
import "../Css/Description.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Description() {
  const movieid = localStorage.getItem("movieid");
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [genre1, setGenre1] = useState();
  const [genre2, setGenre2] = useState();
  const hr = Math.floor(movie.runtime / 60);
  const min = movie.runtime % 60;
  const time = hr + "h " + min + "m ";

  useEffect(() => {
    async function fetchData() {
      const request = await fetch(
        `https://glee-api.herokuapp.com/home/onclick?movieid=${movieid}`,
        {
          method: "get",

          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          setMovie(json.detail);
          setGenre1(json.detail?.genres[0]?.name);
          setGenre2(json.detail?.genres[1]?.name);
        });
      return request;
    }
    fetchData();
  }, []);

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      if (!movie.videos.results[0]) {
        alert("Movie related video not available");
      } else {
        const video_arr = movie.videos.results;
        for (let i of video_arr) {
          if (i.type == "Trailer") {
            setTrailerUrl(i.key);
            break;
          }
        }
       
      }
    }
  };
  
  // const AddToList = async () => {
  //   await fetch(
  //     `https://glee-api.herokuapp.com/home/addtolist`,
  //     {
  //       method: "post",
  //       body:{"movie":movie},
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: localStorage.getItem("token"),
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((json) => {
  //       alert(json);
        
  //     });
  // };

  return (
    <div className="background">
      <header>
        <a href="/" className="logo">
          {" "}
          <img src="logo1.png" alt="" />{" "}
        </a>
      </header>
      <div
        className="banner"
        onClick={() => {
          (trailerUrl)?setTrailerUrl(""):console.log("tap on the body")
        }}
      >
        <img src={`${base_url}${movie.backdrop_path}`} className="bg" />
        <div className="Con_card">
          <div className="card">
            <img src={`${base_url}${movie.poster_path}`} />
          </div>
          <div className="content">
            <h3> {movie?.name || movie?.title || movie?.original_title}</h3>
            <h4>
              <span>{movie?.release_date?.substr(0, 4)}</span>
              <span>
                <i>{movie.adult ? "A" : "U/A"}</i>
              </span>
              <span>{time}</span>
              <span>
                {genre1} {genre2}
              </span>

              
            </h4>
            <p>{movie.overview}</p>

            <a className="play">
              <img
                src="play.png"
                onClick={() => {
                  handleClick(movie);
                }}
              />
              Watch Trailer
            </a>
            {/* <a className="play" >
              <img
                src="add.png"              />
              Add To My LIst
            </a> */}
          </div>
        </div>
        {trailerUrl && (
          <div className="trailer">
            <iframe
              className="video"
              title="Trailer/Teaser"
              sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
              src={`https://youtube.com/embed/${trailerUrl}?autoplay=1`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Description;
