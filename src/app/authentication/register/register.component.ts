import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { getAuth, updateProfile } from "firebase/auth";
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { collection, addDoc } from '@firebase/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formReg: FormGroup;
  error: string;
  user = new User();

  constructor(public service: AuthService, private router: Router, private firestore: Firestore) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      name: new FormControl()
    });
  }


  ngOnInit(): void {
  }


  onSubmit() {
    this.service.register(this.formReg.value)
      .then(() => {
        this.updateUser();
      })
      .catch(error => this.error = error)
  }


  async updateUser() {
    const auth = getAuth();
    await updateProfile(auth.currentUser, {
      displayName: this.formReg.get('name').value,
      photoURL: 'assets/img/profile.png'
    }).then(() => {
      this.createUserInDB();
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.error = error
    });
  }


  async createUserInDB() {
    const docRef = await addDoc(collection(this.firestore, "users"), this.user.toJSON());
    const auth = getAuth();
    this.user.uid = docRef.id;
    console.log(auth.currentUser)
    this.user.displayName = this.formReg.get('name').value;
    this.user.photoURL = 'assets/img/profile.png';
    this.user.email = this.formReg.get('email').value;
    await setDoc(doc(this.firestore, "users", this.user.uid), this.user.toJSON());
  }
}