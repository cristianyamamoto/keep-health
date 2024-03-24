import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() loggedUserHeader: any;
  @Input() usersList: any[] = [];

  constructor(private router: Router, private authService: AuthService) {
    // Atualiza o header caso tenha um usuário logado
    authService.getLoggedUser.subscribe(user => this.loggedUserHeader = user);
  };

  signOut(){
    if(this.loggedUserHeader){
      this.loggedUserHeader.auth = false;
      localStorage.setItem("users", JSON.stringify(this.usersList));
      console.log("Signed out successfully.")
      this.router.navigate(["/login"]);
      this.loggedUserHeader = undefined;
    }
  }

}
