import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import TopBar from './TopBar';
import FeaturedFilm from './FeaturedFilm';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';
import { genreMap, fetchMovieData } from './utils';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetchMovieData('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
      if (data && data.results) {
        setMovies(data.results);
        const mostPopularMovie = data.results.reduce((prev, current) => 
          (prev.popularity > current.popularity) ? prev : current
        );
        setFeaturedMovie(mostPopularMovie);
      }
    };

    fetchMovies();
  }, []);

  const genres = ['All', ...new Set(movies.flatMap(movie => movie.genre_ids.map(id => genreMap[id])).filter(Boolean))];

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedGenre === 'All' || movie.genre_ids.some(id => genreMap[id] === selectedGenre))
  ).sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  const handleWatchTrailer = (play) => {
    setIsPlayingTrailer(play);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar />
      <div className="pt-16">
        <FeaturedFilm 
          movie={featuredMovie} 
          isPlayingTrailer={isPlayingTrailer} 
          onWatchTrailer={handleWatchTrailer} 
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="relative flex-grow w-full sm:w-auto mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full p-2 pl-10 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <div className="flex space-x-4">
            <select
              className="p-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-full flex items-center hover:bg-blue-600 transition-colors"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              Sort
              {sortOrder === 'asc' ? <ChevronUp className="ml-1" size={20} /> : <ChevronDown className="ml-1" size={20} />}
            </button>
          </div>
        </div>
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} onClick={setSelectedMovie} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <AnimatePresence>
        {selectedMovie && <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default App;
