import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import MovieCard from '../components/MovieCard';
import MovieDetails from '../components/MovieDetails';

const Favorites = ({ user }) => {
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      const q = query(collection(db, 'favorites'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const favoritesData = querySnapshot.docs.map(doc => doc.data());
      setFavorites(favoritesData);
    };

    fetchFavorites();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} onClick={setSelectedMovie} />
          ))}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {selectedMovie && <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default Favorites;