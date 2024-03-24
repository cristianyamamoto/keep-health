import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-diet-detail',
  standalone: true,
  imports: [],
  templateUrl: './diet-detail.component.html',
  styleUrl: './diet-detail.component.css'
})
export class DietDetailComponent implements OnInit {
  dietId: number = 0;
  diets: any = [];
  diet: any = {};

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.dietId = param['id'];
    });

    this.diets = this.getDiets();
    this.diet = this.diets.find((diet: { id: number; }) => diet.id == this.dietId)
  }

  getDiets() {
    const diets = localStorage.getItem("diets");
    if (!!diets) {
      return JSON.parse(diets);
    } else {
      return [];
    };
  }


}
