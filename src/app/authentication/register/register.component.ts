import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
      userName: new FormControl()
    });
  }


  ngOnInit(): void {
   }


  onSubmit() {
    this.service.register(this.formReg.value)
      .then(() => {
        this.service.signupObj.email = this.formReg.get('email').value;
        this.service.signupObj.userName = this.formReg.get('userName').value;
        this.service.loadSignToStorage();
        this.router.navigate(['/login']);
      })
      .catch(error => this.error = error)
  }
}
