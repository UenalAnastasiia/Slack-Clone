import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signupUsers: any[] = [];
  signupObj: any = {
    userName: '',
    email: ''
  };

  loginObj: any = {
    email: ''
  };

  loggedUser: string;

  constructor(private auth: Auth) {
    const localData = localStorage.getItem('signUpUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
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


  loadSignToStorage() {
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
    this.signupObj = {
      userName: '',
      email: ''
    };
  }


  checkUserInStorage() {
    const currentUser = this.signupUsers.filter(m => this.loginObj.email == m.email);
      localStorage.setItem('loggedUser', JSON.stringify(currentUser[0].userName));
  }


  getLoggedUser() {
    const localData = localStorage.getItem('loggedUser');
    if (localData != null) {
      this.loggedUser = JSON.parse(localData);
    }
  }
}
