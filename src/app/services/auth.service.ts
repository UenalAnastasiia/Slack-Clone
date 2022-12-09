import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUser: any;

  constructor(private auth: Auth) {
  }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }


  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }


  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }


  logout() {
    return signOut(this.auth);
  }


  getLoggedUser() {
    const authUser = getAuth();
    onAuthStateChanged(authUser, (user) => {
      if (user) {
        this.loggedUser = user.displayName;
      }
    });
  }
}
