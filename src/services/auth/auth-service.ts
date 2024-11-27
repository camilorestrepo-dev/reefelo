import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

export class AuthService {
  static loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const sigInResponse = await signInWithPopup(auth, provider);
    const rawUser = sigInResponse.user;
    return rawUser;
  };

  static logout = async () => {
    await signOut(auth);
  };

  static currentUser = () => auth.currentUser;

  static getUser = async () => {
    await auth.authStateReady();
    return this.currentUser();
  };
}
