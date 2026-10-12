
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import './App.css';


const url = 'https://www.omdbapi.com?apikey=d008934e';

export default function MovieDetailsPage({
  watchedMovies,
  addWatchedMovie,
  removeWatchedMovie
}) {  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [note, setNote] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem(`movie-note-${id}`)
      ) || { text: ''};
    } catch {
      return { text: ''};
    }
  });

  useEffect(() => {
    setMovie(null);

    fetch(`${url}&i=${id}`)
      .then(response => response.json())
      .then(data => setMovie(data));
  }, [id]);

  useEffect(() => {
    try {
      setNote(
        JSON.parse(localStorage.getItem(`movie-note-${id}`))
        || { text: ''}
      );
    } catch {
      setNote({ text: '' });
    }

  }, [id]);

  const onNoteChange = changes => {
    setNote(previous => {
      const updated = { ...previous, ...changes };
      localStorage.setItem(
        `movie-note-${id}`,
        JSON.stringify(updated)
      );
      return updated;
    });
  };
const isWatched = watchedMovies.some(
  m => m.imdbID === id
);
const onToggleWatched = () => {
  if (isWatched) {
    removeWatchedMovie(id);
  } else if (movie) {
    addWatchedMovie(movie);
  }
};

  if (!movie) return <p className='patience'>This is a good test of patience, aye?</p>;

  return (
    <MovieDetails
      movie={movie}
      onBack={() => navigate('/')}
      note={note}
      onNoteChange={onNoteChange}
      isWatched={isWatched}
      onToggleWatched={onToggleWatched}
      onOpenMovie={item => navigate(`/movie/${item.imdbID}`)}
    />
  );
}
