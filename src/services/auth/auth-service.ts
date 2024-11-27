import { signInWithPopup, signOut, GoogleAuthProvider, User } from "firebase/auth";
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

  static currentUser = (): User | null => auth.currentUser;

  static getUser = async (): Promise<User | null> => {
    await auth.authStateReady();
    return this.currentUser();
  };
}
