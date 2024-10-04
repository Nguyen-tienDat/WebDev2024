// src/utils/auth.js
import { auth, db } from '../config/firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';

export const addToFavorites = async (userId, movie) => {
  try {
    await setDoc(doc(db, 'favorites', `${userId}_${movie.id}`), {
      userId,
      movieId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      voteAverage: movie.vote_average,
    });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

export const removeFromFavorites = async (userId, movieId) => {
  try {
    await deleteDoc(doc(db, 'favorites', `${userId}_${movieId}`));
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};

export const signOut = () => {
  return auth.signOut();
};