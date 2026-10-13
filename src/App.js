import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faHouse,faClockRotateLeft,faFolderOpen} from '@fortawesome/free-solid-svg-icons';
import MovieCard from './MovieCard';
import WatchHistory from './WatchHistory';
import MovieDetailsPage from './MovieDetailsPage';
const url = `https://www.omdbapi.com?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;

const Home = () => {

  const [movie, setMovie] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const searchMovie = async (title) => {
    const response = await fetch(`${url}&s=${title}`)
    const data = await response.json()

    setMovie(data.Search)
  }
  useEffect(() => {
    searchMovie('dark')
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
    <div className='grandParent'>
      <nav className='sideBar'>
        <div>
          <Link to="/">
            <FontAwesomeIcon className="icon" icon={faHouse} />
            Home
          </Link>
        </div>
        <div>
          <Link to="/history">
            <FontAwesomeIcon className="icon" icon={faClockRotateLeft} />
            History
          </Link>
        </div>
        <div>
          <a href=''><FontAwesomeIcon className='icon' icon={faFolderOpen} />Categories</a>
        </div>

      </nav>
      <div className="app">
      <h1>Pedantic commentary</h1>
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
  ;
    </div>
)}

const App = () => {
  const [watchedMovies, setWatchedMovies] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('watchedMovies')) || [];
    } catch {
      return [];
    }
  });
  const addWatchedMovie = (movie) => {
  setWatchedMovies(previous => {
    const updated = previous.some(m => m.imdbID === movie.imdbID)
      ? previous
      : [...previous, { ...movie, watchedAt: new Date().toISOString() }];

    localStorage.setItem('watchedMovies', JSON.stringify(updated));
    return updated;
  });
};

const removeWatchedMovie = (movieId) => {
  setWatchedMovies(previous => {
    const updated = previous.filter(m => m.imdbID !== movieId);
    localStorage.setItem('watchedMovies', JSON.stringify(updated));
    return updated;
  });
};
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/history"
          element={<WatchHistory movies={watchedMovies} onBack={() => window.history.back()} onOpenMovie={() => {}} onRemove={removeWatchedMovie} />}
        />
        <Route
  path="/movie/:id"
  element={
    <MovieDetailsPage
      watchedMovies={watchedMovies}
      addWatchedMovie={addWatchedMovie}
      removeWatchedMovie={removeWatchedMovie}
    />
  }
/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;