import { useState } from "react";

function App() {
  const [movie, setMovie] = useState("");
  const [result, setResult] = useState("");

  const movies = ["Avatar", "Titanic", "Inception", "Interstellar"];

  function search() {
    const found = movies.find(
      (m) => m.toLowerCase() === movie.toLowerCase()
    );

    setResult(found || "Movie not found");
  }

  return (
    <div>
      <h1>Movie Search</h1>

      <input
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
        placeholder="Enter movie name"
      />

      <button onClick={search}>Search</button>

      <h2>{result}</h2>
    </div>
  );
}

export default App;