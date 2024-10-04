import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { genreMap, fetchMovieData } from './utils';

const MovieDetails = ({ movie, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const genres = movie.genre_ids.map(id => genreMap[id] || "Unknown").join(", ");

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await fetchMovieData(`https://api.themoviedb.org/3/movie/${movie.id}/reviews?language=en-US&page=1`);
      if (data && data.results) {
        setReviews(data.results);
      }
    };

    fetchReviews();
  }, [movie.id]);

  const sanitizeHTML = (html) => {
    return {
      __html: DOMPurify.sanitize(html)
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
        <div className="relative mb-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Genres:</h3>
          <p>{genres}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Overview:</h3>
          <p>{movie.overview}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Rating:</h3>
          <div className="flex items-center">
            <Star className="text-yellow-400 mr-1" size={20} />
            <span className="text-lg font-semibold">{movie.vote_average.toFixed(1)}</span>
            <span className="ml-2 text-gray-600">({movie.vote_count} votes)</span>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Release Date:</h3>
          <p>{movie.release_date}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Reviews:</h3>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
                <p className="font-semibold">{review.author}</p>
                <p className="text-sm text-gray-600 mb-2">{new Date(review.created_at).toLocaleDateString()}</p>
                <div dangerouslySetInnerHTML={sanitizeHTML(review.content)} />
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default MovieDetails;
