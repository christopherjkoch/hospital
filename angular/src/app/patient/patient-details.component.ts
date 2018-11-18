import { Component, OnInit } from "@angular/core";
import { Observable, of, forkJoin } from "rxjs";
import { Medication } from "../api/medication/medication.model";
import { PatientService } from "../api/patient/patient.service";
import { MedicationService } from "../api/medication/medication.service";
import { Patient } from "../api/patient/patient.model";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientResponse } from "../api/patient/patient-response.model";
import { MatSnackBar } from "@angular/material";
import { PatientSnackbarComponent } from "./patient-snack-bar";


@Component({
    selector: 'app-patient-details',
    templateUrl: 'patient-details.component.html',
    styleUrls: ['patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {

    loading: boolean = true;
    data: Observable<Medication[]>;
    visibleColumns: string[] = ["Name", "Dose", "StartDate", "StopDate"];
    resultsLength = 0;
    errorMessage: string;
    patientId: number;
    patientForm: FormGroup;

    patient: Patient = {
        FirstName: '',
        LastName: '',
        Town: '',
        Temperature: 0.0,
        Pulse: 0
    };

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        private patientService: PatientService,
        private medicationService: MedicationService,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar
    ) {
        this.patientId = +this.route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.errorMessage = '';
        this.loading = true;
        let patientObservable = this.patientService.getPatient(this.patientId);
        let medicationsObservable = this.medicationService.getMedications(this.patientId);

        // The forkJoin() operator allows us to take a list of Observables and execute them in parallel.
        forkJoin([patientObservable, medicationsObservable]).subscribe(results => {
            this.patient = results[0];
            this.buildForm();
            this.data = of(results[1]);
            this.resultsLength = results[1].length;
            this.loading = false;
        }, (err: any) => {
            console.log(err);
            this.errorMessage = 'Unable to load patient';
            this.loading = false;
        });

        this.buildForm();
    }

    buildForm() {
        this.patientForm = this.formBuilder.group({
            firstName: [this.patient.FirstName, [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z '-]+$/)]],
            lastName: [this.patient.LastName, [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z '-]+$/)]],
            town: [this.patient.Town, [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z '-]+$/)]],
            temperature: [this.patient.Temperature, [Validators.required,  Validators.pattern(/^\d+\.\d{1}$/)]],
            pulse: [this.patient.Pulse, [Validators.required,  Validators.pattern(/^\d+$/)]]
        });
    }

    getErrorFirstName() {
        return this.patientForm.controls.firstName.errors.required ? 'First Name is required' :
            this.patientForm.controls.firstName.errors.minlength ? 'First Name must be at least 2 characters' :
                this.patientForm.controls.firstName.errors.pattern ? 'First name must only contain alphabetic characters, spaces, hyphens, and apostrophes' : '';
    }

    getErrorLastName() {
        return this.patientForm.controls.lastName.errors.required ? 'Last Name is required' :
            this.patientForm.controls.lastName.errors.minlength ? 'Last Name must be at least 2 characters' :
                this.patientForm.controls.lastName.errors.pattern ? 'Last name must only contain alphabetic characters, spaces, hyphens, and apostrophes' : '';
    }

    getErrorTown() {
        return this.patientForm.controls.town.errors.required ? 'Town is required' :
            this.patientForm.controls.town.errors.minlength ? 'Town must be at least 2 characters' :
                this.patientForm.controls.town.errors.pattern ? 'Town must only contain alphabetic characters, spaces, hyphens, and apostrophes' : '';
    }

    getErrorFirstTemperature() {
        return this.patientForm.controls.temperature.errors.required ? 'Temperature is required' :            
                this.patientForm.controls.temperature.errors.pattern ? 'Temperature must only contain numbers with one decimal place' : '';
    }

    getErrorFirstPulse() {
        return this.patientForm.controls.pulse.errors.required ? 'Pulse is required' :            
                this.patientForm.controls.pulse.errors.pattern ? 'Pulse must only contain number' : '';
    }

    back(event: Event) {
        event.preventDefault();
        this.router.navigate(['/']);
    }

    submit({ value, valid }: { value: Patient, valid: boolean }) {
        this.errorMessage = '';
            
        value.Id = this.patientId;
        this.patientService.updatePatient(value)
          .subscribe((patientResponse: PatientResponse) => {
            if (patientResponse.status == true) {
              //TODO: display successful update message to user
              this.snackBar.openFromComponent(PatientSnackbarComponent, {
                duration: 2000,
              });
            }
            else {
              //TODO: This is not a requirement 
              //TODO: Here we would iterate through the errors returned from the server and display them in error message
              this.errorMessage = 'Unable to update patient';
            }
          }
            , (err: any) => {
              console.log(err);
              this.errorMessage = 'Unable to update patient';
            }
          );
      }

}