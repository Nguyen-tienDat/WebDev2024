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