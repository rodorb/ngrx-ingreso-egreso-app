import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore) { }

  initAuthListener() {
    this.auth.authState.subscribe((fUser) => {
      console.log(fUser);
      console.log(fUser?.uid);
      console.log(fUser?.email);


    })
  }

  async createUser(_name: string, email: string, password: string) {
    // console.log({ name, email, password });
    try {
      const { user } = await this.auth.createUserWithEmailAndPassword(email, password);
      if (user) {
        const newUser = new User(user.uid, _name, user.email as string);
        return this.firestore.doc(`${user.uid}/usuario`).set({ ...newUser });
      }
    } catch (error) {
      console.error('Error creting user ==>', error);
    }
  }

  loginUser(_name: string, email: string, password: string) {
    console.log({ _name, email, password });

    return this.auth.signInWithEmailAndPassword(email, password);

  }

  logout() {
    console.log("LOGIN OUT");

    return this.auth.signOut();
  }

  isAuthenticated(): Observable<boolean> {
    return this.auth.authState.pipe(
      map((fuser) => !!fuser)
    );
  }
}
