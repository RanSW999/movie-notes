import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function WatchHistory({ movies, onBack, onOpenMovie, onRemove }) {
  return (
    <section className="section history-page">
      <button className="back-button" onClick={onBack}><FontAwesomeIcon icon={faArrowLeft} /> Back to movies</button>
      <h2>Watched history</h2>
      {movies.length === 0 ? <p className="muted">No watched movies yet. Open a movie and mark it as watched.</p> : (
        <div className="history-list">
          {movies.map(movie => (
            <div className="history-row" key={movie.imdbID}>
              <button className="history-movie" onClick={() => onOpenMovie(movie)}>
                <img src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/60x90?text=No+Poster'} alt="" />
                <span><strong>{movie.Title}</strong><small>{movie.Year} · Watched {new Date(movie.watchedAt).toLocaleDateString()}</small></span>
              </button>
              <button className="icon-button" onClick={() => onRemove(movie.imdbID)} aria-label={`Remove ${movie.Title} from history`}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
