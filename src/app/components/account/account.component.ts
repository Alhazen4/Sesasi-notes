import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  loggedId: string | null = null;
  loggedUsername: string | null = null;
  loggedEmail: string | null = null;
  loggedPassword: string | null = null;
  showPassStatus = 'password';
  eyeIcon = 'bi bi-eye';
  profPicSrc: string;
  confirmPass: string;

  @ViewChild('updatePassword') updatePassword: any;
  @ViewChild('confirmDelete') confirmDelete: any;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private modalService: NgbModal
  ) {}

  showPass() {
    if (this.showPassStatus === 'password') {
      this.showPassStatus = 'text';
      this.eyeIcon = 'bi bi-eye-slash'
    } else if (this.showPassStatus === 'text') {
      this.showPassStatus = 'password';
      this.eyeIcon = 'bi bi-eye'
    }
  }

  getLoggedUser() {
    this.authService.getUser(this.loggedId).subscribe(res => {
      this.loggedUsername = res.data.username;
      this.loggedPassword = res.data.password;
      this.loggedEmail = res.data.email;
      this.profPicSrc = `https://avatars.dicebear.com/api/micah/${this.loggedUsername}.svg`;
    })
  }

  ngOnInit() {
    this.loggedId = sessionStorage.getItem('id');
    this.getLoggedUser();
  }

  saveAccount() {
    this.authService.updateUser(
      this.loggedId,
      this.loggedUsername,
      this.loggedPassword,
      this.loggedEmail).subscribe(
        res => {
          console.log(res.message);
          this.getLoggedUser();
          if (this.showPassStatus === 'text') {
            this.showPassStatus = 'password';
            this.eyeIcon = 'bi bi-eye'
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  // updatePass() {
  //   this.authService.updateUserPass(
  //     this.loggedId,
  //     this.loggedUsername,
  //     this.loggedEmail,
  //     this.loggedPassword,
  //     this.encKey).subscribe(
  //       res => {
  //         console.log(res.message);
  //         this.getLoggedUser();
  //         this.modalService.dismissAll();
  //         if (this.showPassStatus === 'text') {
  //           this.showPassStatus = 'password';
  //           this.eyeIcon = 'bi bi-eye'
  //         }
  //       },
  //       err => {
  //         if (err.error.message === 'Wrong password!') {
  //           this.modalService.open(this.wrongPassModal);
  //         }
  //       }
  //     );
  // }

  // openConfrim() {
  //   this.encKey = '';
  //   this.modalService.open(this.confirmDelete);
  // }

  // deleteAccount() {
  //   let username = sessionStorage.getItem('username');

  //   this.authService.authUser(username!, this.encKey).subscribe( 
  //     res => {
  //       if (res.status === 200) {
  //         this.authService.deleteUser(this.loggedId).subscribe(res => {
  //           sessionStorage.clear();
  //           this.router.navigate(['/']);
  //           this.modalService.dismissAll();
  //         });
  //       }
  //     },
  //     err => {
  //       if(err.error.message === 'Wrong Password!') {
  //         this.modalService.open(this.wrongPassModal);
  //       }
  //     }
  //   );
  // }
