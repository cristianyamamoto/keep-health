import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DietDetailComponent } from '../diet-detail/diet-detail.component';
import { authGuard } from '../shared/guards/auth.guard';

const dietRoutes: Routes = [
  { path: ":id",
    component: DietDetailComponent,
    canActivate: [authGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(dietRoutes),
  ]
})
export class DietModule { }
