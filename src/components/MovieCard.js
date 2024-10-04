import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import { genreMap } from '../utils/movieUtils';
import { addToFavorites, removeFromFavorites } from '../utils/auth';
import { useAuth } from '../contexts/AuthContext'; // We'll create this context later

const MovieCard = ({ movie, onClick, isFavorite }) => {
  const { user } = useAuth();
  const primaryGenre = movie.genre_ids[0] ? genreMap[movie.genre_ids[0]] : "Unknown";
  const secondaryGenre = movie.genre_ids[1] ? genreMap[movie.genre_ids[1]] : null;

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (!user) {
      alert('Please login to add favorites');
      return;
    }
    try {
      if (isFavorite) {
        await removeFromFavorites(user.uid, movie.id);
      } else {
        await addToFavorites(user.uid, movie);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 relative"
      onClick={() => onClick(movie)}
      whileHover={{ y: -5 }}
    >
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
        <div className="flex items-center justify-between">
          <span className="flex space-x-1">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {primaryGenre}
            </span>
            {secondaryGenre && (
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {secondaryGenre}
              </span>
          )}
          </span>
          <div className="flex items-center">
            <Star className="text-yellow-400 mr-1" size={16} />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <button
        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
        onClick={handleFavoriteClick}
      >
        <Heart
          size={20}
          className={isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}
        />
      </button>
    </motion.div>
  );
};

export default MovieCard;
