import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable()

export class AuthService {
  
  authState: any = null;
  redirectUrl: string;

  constructor(private fbAuth: AngularFireAuth, private router: Router) { 
    this.fbAuth.authState.subscribe( auth => {
        this.authState = auth;
        localStorage.setItem('user', JSON.stringify(this.authState));
    });
  }

  getAuthState(): any {
    return this.fbAuth.authState;
  }

  // get isUserAnonymousLoggedIn(): boolean {
  //   return (this.authState !== null) ? this.authState.isAnonymous : false
  // }
 
  getCurrentUserId(): string {
    let user = this.getCurrentUser();
    return user.uid;
  }
 
  // geturrentUserName(): string {
  //   return this.authState['email']
  // }
 
  getCurrentUser(): any {
    if(localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    }
    return false;
  }

  signUpWithEmail(email: string, password: string) {
    return this.fbAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signInWithGoogle() {
    return this.fbAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  signInWithFacebook() {
    return this.fbAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
  }

  signInWithTwitter() {
    return this.fbAuth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    )
  }

  loginWithEmail(email: string, password: string) {
    return this.fbAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signOut(): void {
    this.fbAuth.auth.signOut();
  }

}
