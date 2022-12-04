import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { getAuth, signInAnonymously } from "firebase/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  error: string;


  constructor(private service: AuthService, private router: Router) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }


  ngOnInit(): void {}


  onSubmit() {
    this.service.login(this.formLogin.value)
      .then(response => {
        console.log(response);
        window.location.href = '/channel';
      })
      .catch(error => this.error = error);
  }


  signInWithGoogle() {
    this.service.loginWithGoogle()
      .then(response => {
        console.log(response);
        window.location.href = '/channel';
      })
      .catch(error => this.error = error);
  }


  guestLogin() {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        window.location.href = '/channel';
      })
      .catch((error) => {
        this.error = error;
      });
  }

}
