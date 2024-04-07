import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm = new FormGroup(
    {
      email: new FormControl("", [Validators.required, ]),
      password: new FormControl("", [Validators.required, ])
    }
  )
  usersList: any[];

  constructor(private router: Router, private authService: AuthService) {
    this.usersList = this.getUsers();
  };

  ngOnInit(): void {
    this.createTempUser();
  };

  createTempUser(){
    let tempUser = {
      name: "cristian",
      email: "cristian_yamamoto@estudante.sesisenai.org.br",
      weight: 68,
      height: 170,
      birthdate: "1998/05/06",
      cep: "88037-460",
      password: "123",
      auth: false
    };
    if (this.authService.authenticateEmail(tempUser.email, this.usersList)) {
      return; // user already created
    } else {
      this.usersList.push(tempUser);
      localStorage.setItem("users", JSON.stringify(this.usersList));
    }
  }

  getUsers(){
    const users = localStorage.getItem("users");
    if (!!users) {
      return JSON.parse(users);
    } else {
      localStorage.setItem("users", JSON.stringify([]));
      return [];
    };
  }

  signIn() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    if (!email){
      alert("Fill E-mail field!");
    } else if (!password) {
      alert("Fill Password field!");
    } else {
      const user = this.authService.authenticateEmail(email, this.usersList);
      if(user) {
        const pass = this.authService.authenticatePassword(user, this.loginForm.value.password);
        if(pass) {
          user.auth = true;
          localStorage.setItem("users", JSON.stringify(this.usersList));
          this.router.navigate([""]);
          console.log("You're logged in.");
        } else {
          alert("Incorrect Password!");
        }
      } else {
        alert("User E-mail not found!");
      }
    }
  }

  forgotPassword() {
    const email = this.loginForm.value.email;
    if (email) {
      let user = this.usersList.find((user: { email: string | null | undefined; }) => user.email == email);
      user.password = "a1b2c4d4";
      localStorage.setItem("users", JSON.stringify(this.usersList));
      alert("Password changed to default: a1b2c4d4");
    }
  }
}
