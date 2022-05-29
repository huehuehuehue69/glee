import React, { useState, useEffect } from "react";
import "../Css/Row.css";

const domain = "https://glee-cinema.herokuapp.com";
const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, movietype,method , movieid}) {
  console.log(movieid)
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await fetch(
        `https://glee-api.herokuapp.com/home/${movietype}`,
        {
          method: method,
          body:movieid,
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
        
          console.log(json, "movietype")
          setMovies(json.recommended);

          // console.log(json.recommended)
        });

      return request;
    }
    fetchData();
  }, []);
  return (
    <div key={movies.id} className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies?.map((movie) => (
          <img
            onClick={() => {
              localStorage.setItem("movieid", movie.id);
              window.open(`${domain}/description`);
            }}
            className="row_poster"
            src={`${base_url}${movie.poster_path}`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
