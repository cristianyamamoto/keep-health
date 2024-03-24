import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { BirthdateToAgePipe } from '../pipes/birthdate-to-age.pipe';
import { CentimetersToMetersPipe } from '../pipes/centimeters-to-meters.pipe';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, BirthdateToAgePipe, CentimetersToMetersPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  usersList: any[] = this.getUsers();
  loggedUser: {
    name: string,
    email: string,
    weight: number,
    height: number,
    birthdate: string,
    cep: string,
    auth: boolean
  } | undefined = undefined;
  address: any | undefined = undefined;

  constructor(private router: Router, private addressService: AddressService) { };

  ngOnInit(): void {
    this.usersList = this.getUsers();
    this.loggedUser = this.usersList.find((user: { auth: boolean; }) => user.auth == true);
    if(!this.loggedUser ) {
      console.log("Redirected to login page.")
      this.router.navigate(["/login"]);
    } else {
      console.log("Profile page.")
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

  searchCEP() {
    this.addressService.getAddress(this.loggedUser?.cep).subscribe(
      {
        next: (response) => {
          this.address = response;
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        }
      }
    );
  }

}
