import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore, writeBatch } from 'firebase/firestore';
import Constants from 'expo-constants';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.firebaseConfig.apiKey,
  authDomain: Constants.manifest?.extra?.firebaseConfig.authDomain,
  projectId: Constants.manifest?.extra?.firebaseConfig.projectId,
  storageBucket: Constants.manifest?.extra?.firebaseConfig.storageBucket,
  messagingSenderId: Constants.manifest?.extra?.firebaseConfig.messagingSenderId,
  appId: Constants.manifest?.extra?.firebaseConfig.appId,
  measurementId: Constants.manifest?.extra?.firebaseConfig.measurementId,
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const functions = getFunctions(firebaseApp);
export const batch = writeBatch(firestore);
