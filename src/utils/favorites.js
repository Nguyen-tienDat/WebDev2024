import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getFavorites, removeFavorite } from '../utils/api';
import MovieCard from './MovieCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      loadFavorites();
    }
  }, [currentUser]);

  const loadFavorites = async () => {
    try {
      const favoritesData = await getFavorites(currentUser.uid);
      setFavorites(favoritesData);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const handleRemoveFavorite = async (movieId) => {
    try {
      await removeFavorite(currentUser.uid, movieId);
      setFavorites(favorites.filter(movie => movie.id !== movieId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div className="favorites-container">
      <h2>Your Favorites</h2>
      {favorites.length === 0 ? (
        <p>You haven't added any favorites yet.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onRemoveFavorite={() => handleRemoveFavorite(movie.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;