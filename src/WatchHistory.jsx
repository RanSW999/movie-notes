import React from 'react';
import './App.css';
import { faHouse,faClockRotateLeft,faFolderOpen} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function WatchHistory({ movies, onBack, onOpenMovie, onRemove }) {
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
        <div>
          <a href=''><FontAwesomeIcon className='icon' icon={faHouse} />Home</a>
        </div>

      </nav>
      <section className="section history-page">

      <h2>Latest notes</h2>
      
      {movies.length === 0 ? 
      <p className="muted">No  yet. Open a movie and mark it as watched.</p> 
      : (
        <div className="history-list">
          {movies.map(movie => (
            <div className="history-row" key={movie.imdbID}>

              <button className="history-movie" onClick={() =>
                 onOpenMovie(movie)}>
                <img src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/60x90?text=No+Poster'} alt="" />

                <span><strong>{movie.Title}</strong><small>{movie.Year} · Watched {new Date(movie.watchedAt).toLocaleDateString()}</small></span>
              </button>
              <button className="icon-button" onClick={() =>
                 onRemove(movie.imdbID)} aria-label={`Remove ${movie.Title} from history`}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      )}
      </section>
    </div>
  );
}
