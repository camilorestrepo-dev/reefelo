import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { fetchAndActivate, getRemoteConfig } from "firebase/remote-config";
import firebaseConfig from "./config";

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Firebase Cloud Firestore
export const db = getFirestore(app);
// Initialize Firebase Remote Config
export const remoteConfig = getRemoteConfig(app);
remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
fetchAndActivate(remoteConfig);
export default app;
