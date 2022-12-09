import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { getAuth, updateProfile } from "firebase/auth";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formReg: FormGroup;
  error: string;

  constructor(public service: AuthService, private router: Router) {
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
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.error = error
    });
  }
}