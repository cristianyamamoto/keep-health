import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'keep-health';

  loggedUserApp: any;
  usersList: any[] = this.getUsers();

  constructor(private router: Router) { };

  ngOnInit(): void {
    this.usersList = this.getUsers();
    this.loggedUserApp = this.getLoggedUser();
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

  getLoggedUser() {
    return this.usersList.find((user: { auth: boolean; }) => user.auth == true);
  }

}
