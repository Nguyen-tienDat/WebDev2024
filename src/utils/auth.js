import { db } from '../config/firebase';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

export const getFavorites = async (userId) => {
  const q = query(collection(db, 'favorites'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addToFavorites = async (userId, movie) => {
  await addDoc(collection(db, 'favorites'), {
    userId,
    movie
  });
};

export const removeFromFavorites = async (userId, movieId) => {
  const q = query(
    collection(db, 'favorites'), 
    where('userId', '==', userId),
    where('movieId', '==', movieId)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((document) => {
    deleteDoc(doc(db, 'favorites', document.id));
  });
};