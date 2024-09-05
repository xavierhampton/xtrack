import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth} from '../firebase'


export function googleSignIn(){
const google = new GoogleAuthProvider();
signInWithPopup(auth, google)
.then((result) => {
  // This gives you a Google Access Token. You can use it to access the Google API.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  const user = result.user;
  
}).catch((error) => {
  const errorCode = error.code;
  console.log(errorCode)
  const errorMessage = error.message;
  console.log(errorMessage)
  const credential = GoogleAuthProvider.credentialFromError(error);
});
}