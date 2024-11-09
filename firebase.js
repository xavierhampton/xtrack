// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app"
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {firebaseConfig} from "@/constants/firebaseKey"

// Initialize Firebase
let app;
if (firebase.getApps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
}
else {
  app = firebase.app()
}

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})

export {auth};
