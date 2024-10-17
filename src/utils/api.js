export const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};




export const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODRhMDg2MWQzYjE0ZDliZWY2MWZlM2E1ZmVhYTNiZiIsIm5iZiI6MTcyODAwNjEwNC4yNTg4MTMsInN1YiI6IjY2ZmU2ZWM0Zjg3OGFkZmVkMDg0ZGUxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hnWcQfCI4JrFvtlpHw-GS3o0ASpBdKOJZnuNW7Vmxcc';

export const fetchMovieData = async (url) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  };

  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};