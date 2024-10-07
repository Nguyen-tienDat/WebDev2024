// // src/pages/Home.js
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import FeaturedFilm from '../components/FeaturedFilm';
// import { fetchMovieData } from '../utils/api';

// const Home = () => {
//   const [featuredMovie, setFeaturedMovie] = useState(null);
//   const [popularMovies, setPopularMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
//   const [trailerKey, setTrailerKey] = useState(null);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const popularData = await fetchMovieData('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
//         if (popularData && popularData.results) {
//           setFeaturedMovie(popularData.results[0]);
//           setPopularMovies(popularData.results.slice(1, 7)); // Get the next 6 movies
//         }
//       } catch (error) {
//         console.error('Error fetching movies:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMovies();
//   }, []);

//   const onWatchTrailer = async (movieId) => {
//     try {
//       const trailerData = await fetchMovieData(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`);
//       if (trailerData && trailerData.results) {
//         const trailer = trailerData.results.find(video => video.type === "Trailer" && video.site === "YouTube");
//         if (trailer) {
//           setTrailerKey(trailer.key);
//           setIsPlayingTrailer(true);
//         } else {
//           console.error('No suitable trailer found');
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching trailer:', error);
//     }
//   };

//   const onCloseTrailer = () => {
//     setIsPlayingTrailer(false);
//     setTrailerKey(null);
//   };

//   if (isLoading) {
//     return <div className="container mx-auto p-4 text-center">Loading...</div>;
//   }

//   return (
//     <div className="home-page">
//       {featuredMovie && (
//         <FeaturedFilm 
//           movie={featuredMovie} 
//           onWatchTrailer={onWatchTrailer}
//           onCloseTrailer={onCloseTrailer}
//           isPlayingTrailer={isPlayingTrailer}
//           trailerKey={trailerKey}
//         />
//       )}
      
//       <div className="container mx-auto px-4 py-8">
//         <h2 className="text-3xl font-bold mb-6">Popular Movies</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//           {popularMovies.map(movie => (
//             <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img 
//                 src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
//                 alt={movie.title} 
//                 className="w-full h-64 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="font-semibold text-lg mb-2">{movie.title}</h3>
//                 <p className="text-sm text-gray-600 mb-2">Rating: {movie.vote_average}/10</p>
//                 <Link to={`/movies/${movie.id}`} className="text-blue-500 hover:text-blue-700 text-sm">
//                   More Info
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="bg-gray-100 py-8">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold mb-6">Welcome to MovieMaster</h2>
//           <p className="text-lg mb-4">
//             Discover the latest blockbusters, timeless classics, and hidden gems. 
//             With MovieMaster, you can explore a vast collection of films, create your 
//             personal watchlist, and stay up-to-date with the world of cinema.
//           </p>
//           <Link to="/movies" className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
//             Explore All Movies
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails';
import FeaturedFilm from '../components/FeaturedFilm';
import { fetchMovieData } from '../utils/api';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularData = await fetchMovieData('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
        if (popularData && popularData.results) {
          setFeaturedMovie(popularData.results[0]);
          setPopularMovies(popularData.results.slice(1, 7));
        }
        const nowPlayingData = await fetchMovieData('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1');
        setNowPlayingMovies(nowPlayingData.results.slice(0, 6));

        const topRatedData = await fetchMovieData('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1');
        setTopRatedMovies(topRatedData.results.slice(0, 6));

        const upcomingData = await fetchMovieData('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1');
        setUpcomingMovies(upcomingData.results.slice(0, 6));
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const onWatchTrailer = async (movieId) => {
        try {
          const trailerData = await fetchMovieData(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`);
          if (trailerData && trailerData.results) {
            const trailer = trailerData.results.find(video => video.type === "Trailer" && video.site === "YouTube");
            if (trailer) {
              setTrailerKey(trailer.key);
              setIsPlayingTrailer(true);
            } else {
              console.error('No suitable trailer found');
            }
          }
        } catch (error) {
          console.error('Error fetching trailer:', error);
        }
      };
    
  const onCloseTrailer = () => {
      setIsPlayingTrailer(false);
      setTrailerKey(null);
    };
    

  const renderMovieSection = (title, movies) => (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            onClick={setSelectedMovie} 
            movie={movie} 
          />
        ))}   
      </div>
    </div>
  );

  if (isLoading) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>;
  }

  return (
    <div className="home-page">
      {featuredMovie && (
        <FeaturedFilm 
          movie={featuredMovie} 
          onWatchTrailer={onWatchTrailer}
          onCloseTrailer={onCloseTrailer}
          isPlayingTrailer={isPlayingTrailer}
          trailerKey={trailerKey}
        />
      )}
      
      <div className="container mx-auto px-4">
        {renderMovieSection('Popular Movies', popularMovies)}
        {renderMovieSection('Now Playing', nowPlayingMovies)}
        {renderMovieSection('Top Rated', topRatedMovies)}
        {renderMovieSection('Upcoming Releases', upcomingMovies)}
      </div>

      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Welcome to MovieMaster</h2>
          <p className="text-lg mb-4">
            Discover the latest blockbusters, timeless classics, and hidden gems. 
            With MovieMaster, you can explore a vast collection of films, create your 
            personal watchlist, and stay up-to-date with the world of cinema.
          </p>
          <Link to="/movies" className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
            Explore All Movies
          </Link>
        </div>
        </div>
      <AnimatePresence>
        {selectedMovie && <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default Home;