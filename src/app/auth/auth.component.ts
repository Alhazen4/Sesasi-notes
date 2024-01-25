import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isRegistered = true;
  inputUsername = '';
  inputPassword = '';
  inputNewName = '';
  inputNewUsername = '';
  inputNewPassword = '';
  errorDisplay = "none";

  constructor(private authService: AuthService, private router: Router) {}

  switch() {
    this.errorDisplay = "none";
    this.isRegistered = !this.isRegistered
  }

  ngOnInit() {
    this.authService.getUsers().subscribe(res => { console.log(res) });
  }

  login() {
      this.authService.authUser(this.inputUsername, this.inputPassword).subscribe(
        res => {
        if (res.status === 200) {
          sessionStorage.setItem('id', res.data.id);
          sessionStorage.setItem('username', res.data.username);
          this.router.navigate(['/dashboard']);
        }
      },
        err => {
          this.errorDisplay = 'block';
          document.getElementById("input-error")!.textContent="Wrong username or password!";
          console.log(err.error.message);
        }
      )
  }

  register() {
      this.authService.registerUser(this.inputNewName, this.inputNewUsername, this.inputNewPassword).subscribe(
        res => {
          if (res.status === 200) {
            sessionStorage.setItem('username', res.data.username);
            sessionStorage.setItem('id', res.data.id);
            this.router.navigate(['/dashboard']);
          }
        },
        err => {
          if (err.error.message === 'Username already in use!') {
            this.errorDisplay = 'block';
            document.getElementById("input-error")!.textContent="Username already in use!";
          }
        }
      )
  }
}
