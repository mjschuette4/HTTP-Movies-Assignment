import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const removeMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => props.history.push("/"))
      .catch(err => console.log(err));
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button
        onClick={() =>
          props.history.push(`/update-movie/${props.match.params.id}`)
        }
      >
        Edit movie
      </button>
      <button onClick={removeMovie}>Delete</button>
    </div>
  );
}

export default Movie;
