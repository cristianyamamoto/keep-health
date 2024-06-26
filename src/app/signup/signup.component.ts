import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup(
    {
      name: new FormControl("", [Validators.required, ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ]),
      weight: new FormControl("", [Validators.required, ]),
      height: new FormControl("", [Validators.required, ]),
      birthdate: new FormControl("", [Validators.required, ]),
      cep: new FormControl("", [
        Validators.required,
        Validators.pattern("^([0-9]{5}-[0-9]{3})|([0-9]{8})$"),
        Validators.maxLength(9)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(4)
      ]),
      confirm_password: new FormControl("", [
        Validators.required,
        Validators.minLength(4)
      ])
    }
  )
  usersList: any[] = this.getUsers();

  constructor() { };

  ngOnInit(): void {
    this.usersList = this.getUsers();
  };

  getUsers(){
    const users = localStorage.getItem("users");
    if (!!users) {
      return JSON.parse(users);
    } else {
      localStorage.setItem("users", JSON.stringify([]));
      return [];
    };
  }

  authenticateEmail(email: string | null | undefined) {
    this.usersList = this.getUsers();
    return this.usersList.find((user: {
      email: string | null | undefined;
    }) => {
      if(user.email == email) {
        return user;
      }
      return undefined;
    });;
  }

  signUp(){
    const inputs = [
      { "name": this.signUpForm.value.name },
      { "E-mail": this.signUpForm.value.email },
      { "Weight": Number(this.signUpForm.value.weight) },
      { "Height": Number(this.signUpForm.value.height) },
      { "Birthdate" : this.signUpForm.value.birthdate },
      { "CEP" : this.signUpForm.value.cep },
      { "Password": this.signUpForm.value.password },
      { "Confirm Password": this.signUpForm.value.confirm_password },
    ]

    const checkFormInputs = inputs.find((input) => {
      if(!Object.values(input)[0]) {
        alert(`Fill ${Object.keys(input)} field!`);
        return true;
      }
      return false;
    });

    if (!checkFormInputs){
      if(inputs[3]["Password"] === inputs[4]["Confirm Password"]) {
        if(this.authenticateEmail(inputs[1]["E-mail"])) {
          alert("User E-mail already taken!");
        } else {
          const newUser = {
            name: inputs[0]["name"],
            email: inputs[1]["E-mail"],
            weight: inputs[2]["Weight"],
            height: inputs[3]["Height"],
            birthdate: inputs[4]["Birthdate"],
            cep: inputs[5]["CEP"],
            password: inputs[6]["Password"],
            auth: false
          };
          this.usersList.push(newUser);
          localStorage.setItem("users", JSON.stringify(this.usersList));
          alert("User created successfully!");
          this.signUpForm.reset();
        }
      } else {
        alert("Password doesn't match!");
      }
    }
  }
}
