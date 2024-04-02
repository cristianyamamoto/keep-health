import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
      email: new FormControl(""), //  [Validators.required, ]
      password: new FormControl("")
    }
  )
  usersList: any[];
  // localStorage;

  constructor(private router: Router, private authService: AuthService) {
    // this.localStorage = document.defaultView?.localStorage; // workaround para utilizar DOM com SSR ativado
    this.usersList = this.getUsers();
  };

  ngOnInit(): void {
    this.createTempUser();
    this.usersList = this.getUsers();
    const logged = this.usersList.find((user: { auth: boolean; }) => user.auth == true);
    if(logged) {
      console.log("Redirected to home page.")
      this.router.navigate([""]);
    }
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
      // console.log("User already exists.");
    } else {
      console.log("User created successfully.");
      this.usersList.push(tempUser);
      localStorage.setItem("users", JSON.stringify(this.usersList));
    }
  }

  getUsers(){ // : string[]
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

  // // Criado um service (auth.service) para os métodos de autenticação com intuito de criar um event emitter para atualizar o header caso o usuário tenha logado (passar informações entre componentes não relacionados).
  // authenticateEmail(email: string | null | undefined) {
  //   this.usersList = this.getUsers();
  //   return this.usersList.find((user: {
  //     email: string | null | undefined;
  //   }) => {
  //     if(user.email == email) {
  //       return user;
  //     }
  //     return undefined;
  //   });;
  // }

  // authenticatePassword(user: {
  //   auth: boolean;
  //   password: string;
  // }, password: string | null | undefined) {
  //   if(user.password == password){
  //     user.auth = true;
  //     localStorage.setItem("users", JSON.stringify(this.usersList));
  //     this.router.navigate([""]);
  //     console.log("You're logged in.");
  //   } else {
  //     alert("Incorrect Password!");
  //   }
  // }

  forgotPassword() {
    console.log("forgotPassword() called");
    const email = this.loginForm.value.email;
    if (email) {
      let user = this.usersList.find((user: { email: string | null | undefined; }) => user.email == email);
      user.password = "a1b2c4d4";
      localStorage.setItem("users", JSON.stringify(this.usersList));
      alert("Password changed to default: a1b2c4d4");
    }
  }
}
