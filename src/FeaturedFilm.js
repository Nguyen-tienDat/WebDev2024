import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, X } from 'lucide-react';
import { genreMap, fetchMovieData } from './utils';

const FeaturedFilm = ({ movie, isPlayingTrailer, onWatchTrailer }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      if (isPlayingTrailer && movie) {
        const data = await fetchMovieData(`https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`);
        if (data && data.results) {
          const trailer = data.results.find(video => video.type === "Trailer");
          if (trailer) {
            setTrailerKey(trailer.key);
          }
        }
      }
    };

    fetchTrailer();
  }, [isPlayingTrailer, movie]);

  useEffect(() => {
    let interval;
    if (isPlayingTrailer && trailerKey) {
      interval = setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          const currentTime = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();
          if (currentTime >= duration - 1) {
            onWatchTrailer(false);
          }
        }
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlayingTrailer, trailerKey, onWatchTrailer]);

  if (!movie) return null;

  const genres = movie.genre_ids.map(id => genreMap[id] || "Unknown").join(", ");

  return (
    <div className="relative h-[calc(100vh-64px)]">
      {isPlayingTrailer && trailerKey ? (
        <div className="w-full h-full relative">
          <iframe
            id="youtube-player"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&enablejsapi=1`}
            title="Movie Trailer"
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button
            className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors z-50"
            onClick={() => onWatchTrailer(false)}
          >
            <X size={24} />
          </button>
        </div>
      ) : (
        <>
          <img 
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white max-w-3xl px-4">
              <h2 className="text-4xl font-bold mb-2">{movie.title}</h2>
              <p className="text-xl mb-4">{movie.overview}</p>
              <p className="text-lg mb-4">Genres: {genres}</p>
              <div className="flex justify-center items-center mb-4">
                <Star className="text-yellow-400 mr-1" size={24} />
                <span className="text-2xl">{movie.vote_average.toFixed(1)}</span>
              </div>
              <motion.button 
                className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onWatchTrailer(true)}
              >
                Watch Trailer
              </motion.button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedFilm;
