import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { genreMap } from './utils';

const MovieCard = ({ movie, onClick }) => {
  const primaryGenre = movie.genre_ids[0] ? genreMap[movie.genre_ids[0]] : "Unknown";
  const secondaryGenre = movie.genre_ids[1] ? genreMap[movie.genre_ids[1]] : null;

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
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
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {primaryGenre}
          </span>
          {secondaryGenre && (
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {secondaryGenre}
            </span>
          )}
          <div className="flex items-center">
            <Star className="text-yellow-400 mr-1" size={16} />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
