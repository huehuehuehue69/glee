import React, { useEffect, useState } from "react";
import "../Css/Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await fetch(
        `https://glee-api.herokuapp.com/home/recommended`,
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
          const movies =
            json.recommended[
              Math.floor(Math.random() * json.recommended.length - 1)
            ];
          setMovie(movies);
        });
      return request;
    }
    fetchData();
  }, []);

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      await fetch(
        `https://glee-api.herokuapp.com/home/onclick?movieid=${movie.id}`,
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
          if (!json.detail.videos.results[0]) {
            alert("Movie related video not available");
          } else {
            setTrailerUrl(json.detail.videos.results[0].key);
          }
        });
    }
  };

  function trucate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <div id="bg_gradient">
      <header
        onClick={() => {
          handleClick();
        }}
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
          backgroundPosition: "centre centre",
        }}
      >
        <div className="banner_contents">
          {/* Title  */}
          <h1 className="banner_title">
            {movie?.original_title}
            {" | "}
            {movie?.release_date?.substr(0, 4)}
          </h1>

          {/* Description */}
          <h1 className="banner_description">
            {trucate(movie?.overview, 200)}
          </h1>

          {/* Play */}
          <a>
            <img
              className="plays"
              src="play.png"
              onClick={() => {
                handleClick(movie);
              }}
            />
            <span>Watch Trailer</span>
            
          </a>
        </div>
        <div className="banner--fadeBottom" />
        {trailerUrl && (
          <div className="trailer">
            <iframe
              width="720px"
              className="video"
              title="Trailer/Teaser"
              sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
              src={`https://youtube.com/embed/${trailerUrl}?autoplay=1`}
            />
          </div>
        )}
      </header>
    </div>
  );
}

export default Banner;
