import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBookmark, faTrash } from '@fortawesome/free-solid-svg-icons';

const posterFor = movie => movie.Poster && movie.Poster !== 'N/A'
  ? movie.Poster
  : 'https://placehold.co/180x270?text=No+Poster';

export default function MovieDetails({
  movie, onBack, note, onNoteChange, isWatched, onToggleWatched,
  similarMovies, similarSearch, setSimilarSearch, similarSuggestions,
  onAddSimilar, onRemoveSimilar, onOpenMovie
}) {
  return (
    <section className="details-page">
      <button className="back-button" onClick={onBack}><FontAwesomeIcon icon={faArrowLeft} /> Back to movies</button>
      <div className="details-header">
        <img className="details-poster" src={posterFor(movie)} alt={`${movie.Title} poster`} />
        <div className="details-heading">
          <p className="eyebrow">{movie.Type} · {movie.Year}</p>
          <h2>{movie.Title}</h2>
          <button className={isWatched ? 'primary-button watched' : 'primary-button'} onClick={onToggleWatched}>
            <FontAwesomeIcon icon={faBookmark} /> {isWatched ? 'Remove from watched' : 'Mark as watched'}
          </button>
        </div>
      </div>

      <section className="panel">
        <h3>Your rating</h3>
        <div className="rating-picker" aria-label="Rate this movie">
          {[1, 2, 3, 4, 5].map(star => (
            <button type="button" key={star} className={star <= (note.rating || 0) ? 'star active' : 'star'}
              aria-label={`${star} out of 5 stars`} onClick={() => onNoteChange({ rating: star })}>★</button>
          ))}
          {note.rating > 0 && <button className="clear-rating" onClick={() => onNoteChange({ rating: 0 })}>Clear</button>}
        </div>
        <h3>Your notes</h3>
        <textarea
          className="notes-input"
          value={note.text || ''}
          onChange={e => onNoteChange({ text: e.target.value })}
          placeholder="What did you think of this movie? Favorite scenes, quotes, feelings..."
          rows={7}
        />
        <p className="save-hint">Saved automatically as you type.</p>
      </section>

      <section className="panel">
        <h3>Similar movies</h3>
        <div className="similar-search-wrap">
          <input className="similar-search" value={similarSearch} onChange={e => setSimilarSearch(e.target.value)}
            placeholder="Search for a similar movie..." />
          {similarSuggestions.length > 0 && (
            <div className="similar-suggestions">
              {similarSuggestions.slice(0, 5).map(item => (
                <button key={item.imdbID} onClick={() => onAddSimilar(item)} type="button">
                  {item.Title} <span>{item.Year}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        {similarMovies.length === 0 ? <p className="muted">No similar movies added yet.</p> : (
          <div className="similar-grid">
            {similarMovies.map(item => (
              <div className="similar-card" key={item.imdbID}>
                <button className="similar-open" onClick={() => onOpenMovie(item)}>
                  <img src={posterFor(item)} alt="" />
                  <span>{item.Title}</span>
                </button>
                <button className="icon-button" aria-label={`Remove ${item.Title}`} onClick={() => onRemoveSimilar(item.imdbID)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
