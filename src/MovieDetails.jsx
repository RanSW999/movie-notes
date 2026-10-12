import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBookmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import { faHouse,faClockRotateLeft,faFolderOpen} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";



const posterFor = movie => movie.Poster && movie.Poster !== 'N/A'
  ? movie.Poster
  : 'https://placehold.co/180x270?text=No+Poster';

export default function MovieDetails({
  movie, onBack, note, onNoteChange, isWatched, onToggleWatched,
  onOpenMovie
}) {
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
      <section className="details-page">
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
          <h3>Your notes</h3>
          <textarea
            className="notes-input"
            value={note.text || ''}
            onChange={e => onNoteChange({ text: e.target.value })}
            placeholder="What did you think of this movie? Favorite scenes, quotes, feelings..."
            rows={7}
          />
        </section>

    </section>
    </div>
  );
}
