import {useState, useEffect} from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import MovieCard from './MovieCard';

const url = 'https://www.omdbapi.com?apikey=d008934e'


const App = () => {

  const [movie, setMovie] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const searchMovie = async (title) => {
    const response = await fetch(`${url}&s=${title}`)
    const data = await response.json()

    setMovie(data.Search)
  }
  useEffect(() => {
    searchMovie('Spiderman')
  },[])
useEffect(() => {
  const timer = setTimeout(async () => {
    if (searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }

    const res = await fetch(
      `${url}&s=${encodeURIComponent(searchTerm)}`
    );
    const data = await res.json();

    setSuggestions(data.Search || []);
  }, 300);

  return () => clearTimeout(timer);
}, [searchTerm]);
  return (
    <div className="app">
      <h1>Movie Dump</h1>
      <div className="search">
  <input
    placeholder="Search your movie"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <button onClick={() => searchMovie(searchTerm)}>
    <FontAwesomeIcon icon={faMagnifyingGlass} />
  </button>

  {suggestions.length > 0 && (
    <div className="suggestions">
      {suggestions.map((movie) => (
        <p
          key={movie.imdbID}
          onClick={() => {
            setSearchTerm(movie.Title);
            setSuggestions([]);
            setMovie([movie]);
          }}
        >
          {movie.Title} ({movie.Year})
        </p>
      ))}
    </div>
  )}
</div>
      {
        movie?.length > 0 ? (
          <div className='cont'>
            {movie.map((movie) => (<MovieCard movie={movie}></MovieCard>) )}
          </div>
        ) : (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )
      }

    </div>
  );
}

export default App;
