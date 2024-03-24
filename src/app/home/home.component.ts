import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  usersList: any[] = this.getUsers();
  loggedUser: {name: string, auth: boolean} | undefined = undefined;

  constructor(private router: Router) { };

  ngOnInit(): void {
    this.usersList = this.getUsers();
    this.loggedUser = this.usersList.find((user: { auth: boolean; }) => user.auth == true);
    if(!this.loggedUser ) {
      console.log("Redirected to login page.")
      this.router.navigate(["/login"]);
    } else {
      console.log(`${this.loggedUser.name} is logged in`);
    }
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

  // signOut(){
  //   this.loggedUser = this.usersList.find((user: { auth: boolean; }) => user.auth == true);
  //   if(this.loggedUser){
  //     this.loggedUser.auth = false;
  //     localStorage.setItem("users", JSON.stringify(this.usersList));
  //     console.log("Signed out successfully.")
  //     this.router.navigate(["/login"]);
  //   }
  // }
}
