import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgStyle],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // properties

  user = new FormGroup({
    username : new FormControl(),
    password : new FormControl(),
    email : new FormControl()
  })

  @Input() isSignup = true;
  formTitle = 'Signup';
  submitBtnText = 'Create';
  toggleLinkText = 'Login';

  constructor(private authenticate : AuthenticateService, private router : Router) {}

  toggleForm() {
    this.isSignup = !this.isSignup;
    if (this.isSignup) {
      this.formTitle = 'Signup';
      this.submitBtnText = 'Create';
      this.toggleLinkText = 'Login';
    } else {
      this.formTitle = 'Login';
      this.submitBtnText = 'Sign in';
      this.toggleLinkText = 'Signup';
    }
  }

  submitCred(){

    if (this.isSignup) {
      this.authenticate.signup(this.user.value).subscribe({
        next: (res: any) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.router.navigateByUrl('/profile');
          }
          else {
            alert(res.error.username);
          }
        },
        error: (err: any) => {
          alert(JSON.stringify(err.error.username[0]));
        }
      });
    }

    else {
      this.authenticate.login(this.user.value).subscribe({
        next: (res : any) => {
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/profile')
        },
        error: (err : any) => {
          alert(JSON.stringify(err.error.error))
        }
      })

    }
  }

}
