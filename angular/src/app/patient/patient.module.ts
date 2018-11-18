import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatSnackBarModule,
} from '@angular/material';
import { PatientDetailsComponent } from './patient-details.component';
import { PatientComponent } from './patient.component';
import { PatientRoutingModule } from './patient.routing';
import { MedicationService } from '../api/medication/medication.service';
import { PatientService } from '../api/patient/patient.service';
import { PatientSnackbarComponent } from './patient-snack-bar';

@NgModule({
  imports: [
    CommonModule,
    PatientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  declarations: [PatientComponent, PatientDetailsComponent, PatientSnackbarComponent],
  bootstrap: [PatientSnackbarComponent],
  providers: [
    PatientService,
    MedicationService
  ]
})
export class PatientModule { }