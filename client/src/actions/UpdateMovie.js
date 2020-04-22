import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateMovie(props) {
    const [movie, setMovie] = useState({
        id: Date.now(),
        title: "",
        director: "",
        metascore: "",
        stars: []
    });

    const handleChange = e => {
        e.preventDefault();
        setMovie({
          ...movie,
          [e.target.name]: e.target.value
        });
      };

    const [preview, setPreview] = useState(false);

    const handlePreview = e => {
        e.preventDefault();
        setMovie({ ...movie, stars: movie.stars.split(", ")});
        setPreview(true);
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
          .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
          .then(res => {
            props.addToSavedList(res.data);
            props.history.push("/");
          })
          .catch(err => console.log(err));
      };

      useEffect(() => {
        axios
          .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
          .then(res => setMovie({ ...res.data, stars: res.data.stars.join(" ,") }))
          .catch(err => console.log(err));
      }, [props.match.params.id]);

    return (
        <form onSubmit={preview ? handleSubmit : handlePreview}>
      <input
        name="title"
        type="text"
        value={movie.title}
        onChange={handleChange}
      />
      <input
        name="director"
        type="text"
        value={movie.director}
        onChange={handleChange}
      />
      <input
        name="metascore"
        type="text"
        value={movie.metascore}
        onChange={handleChange}
      />
      <p></p>
      Stars:{" "}
      {preview ? (
        movie.stars
      ) : (
        <input
          type="text"
          name="stars"
          value={movie.stars}
          placeholder="Stars"
          onChange={handleChange}
        />
      )}
      <button type="submit">Save</button>
    </form>
  );
}
    
    export default UpdateMovie;