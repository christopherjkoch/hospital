import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PatientDetailsComponent } from './patient-details.component';
import { PatientComponent } from './patient.component';


const routes: Routes = [
  {
    path: '',
    component: PatientComponent
  },
  {
    path: 'details/:id',
    component: PatientDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
