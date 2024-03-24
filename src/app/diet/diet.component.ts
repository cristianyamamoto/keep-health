import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DietService } from '../services/diet.service';

@Component({
  selector: 'app-diet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './diet.component.html',
  styleUrl: './diet.component.css'
})
export class DietComponent {
  diets : any = [];
  filteredDiets : any = this.diets;
  diet : any = undefined;

  constructor(private dietService: DietService, private router: Router){}

  ngOnInit(){
    this.dietService.listAll().subscribe({
      next: (response) => {
        this.diets = response;
        this.filteredDiets = response;
        if(!localStorage.getItem("diets")){
          localStorage.setItem("diets", JSON.stringify(this.diets));
        }
      },
      error: (e) => { console.error(e) }
    })
  }

  redirectToDetail(id: string){
    this.router.navigate(["diet", id]);
  }

  searchDiet() {
    if(!this.diet) {
      this.filteredDiets = this.diets;
    } else {
      this.filteredDiets = this.diets.filter((diet: { name: any; }) => diet.name.toLowerCase().includes(this.diet.toLowerCase()));
    }
  }

}
