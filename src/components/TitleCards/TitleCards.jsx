import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

import { options } from "../../components/apiOptions";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);

  // lef&right scroll wheel mouse
  const cardsRef = useRef();

  // const options = {
  //   method: "GET",
  //   headers: {
  //     accept: "application/json",
  //     Authorization:
  //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYWYzYWYzYjMwODEwMmI0ZjI5NDUxZjM0OTk2NTYwNiIsIm5iZiI6MTcyMzY2MDQ2OS4zMTI0ODQsInN1YiI6IjY2YmNmNjUzZjE5ZWI5OTk1NzgyNjI4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-23NI5heaIFy2tLSBSeFauooxdJXUSDlkJ5TeQa9zr4",
  //   },
  // };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    // if you mount category,it should display category otherwise display now_playing
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      {/* if title available display title*/}
      {/*Ortherwise dilpay the text*/}
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
