import { db } from '../config/firebase';
import { collection, getDocs, setDoc, deleteDoc, doc } from 'firebase/firestore';

export const getFavorites = async (userId) => {
  if (!userId) {
    console.error("User ID is required to get favorites");
    return;
  }
  try {
    const favoritesRef = collection(db, 'users', userId, 'favorites');
    const querySnapshot = await getDocs(favoritesRef);
    const favorites = {};
    querySnapshot.docs.forEach((doc) => {
      favorites[doc.id] = true;
    });
    return favorites;
  } catch (error) {
    console.error("Error getting favorites: ", error);
    throw error;
  }
};

export const addToFavorites = async (userId, movie) => {
  try {
    const favoriteDocRef = doc(db, 'users', userId, 'favorites', movie.id.toString());
    await setDoc(favoriteDocRef, { movie });
    console.log("Movie added to favorites with ID: ", movie.id);
    return movie.id;
  } catch (error) {
    console.error("Error adding movie to favorites: ", error);
    throw error;
  }
};

export const removeFromFavorites = async (userId, movieId) => {
  try {
    const favoriteDocRef = doc(db, 'users', userId, 'favorites', movieId.toString());
    await deleteDoc(favoriteDocRef);
    console.log(`Movie (${movieId}) removed from favorites for user ${userId}`);
  } catch (error) {
    console.error("Error removing movie from favorites: ", error);
    throw error;
  }
};