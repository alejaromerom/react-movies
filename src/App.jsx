import { useEffect, useState } from "react";
import "./index.css";
import Card from "./Card";

export default function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [search, setSearch] = useState("batman");
  const [input, setInput] = useState("");

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = () => {
    setSearch(input);
    consumoApi();
  };

  const consumoApi = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=2b9c4287&s=${search}&type=movie`
      );
      if (response.ok) {
        const data = await response.json();
        setPeliculas(data.Search);
      }
    } catch (error) {
      console.log("Mostrar error:", error);
    }
  };

  useEffect(() => {
    consumoApi();
  }, []);

  return (
    <div className="App">
      <div className="main">
        <h1>Peliculas</h1>
        <div className="search">
          <h2>Búsqueda</h2>
          <input
            className="buscar"
            type="text"
            placeholder="Peliculas"
            onChange={handleInput}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>
      </div>
      <div className="grid">
        {peliculas.map((pelicula) => {
          return (
            <Card
              title={pelicula.Title}
              poster={pelicula.Poster}
              type={pelicula.Type}
              year={pelicula.Year}
              code={pelicula.imdbID}
            ></Card>
          );
        })}
      </div>
    </div>
  );
}
