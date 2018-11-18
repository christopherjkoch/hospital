import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { Patient } from "../api/patient/patient.model";
import { PatientService } from "../api/patient/patient.service";


@Component({
  selector: 'app-patient',
  templateUrl: 'patient.component.html',
  styleUrls: ['patient.component.scss']
})
export class PatientComponent implements OnInit {
  loading: boolean = true;
  data: Observable<Patient[]>;
  visibleColumns: string[] = ["FirstName", "LastName", "Town", "Temperature", "Pulse"];
  resultsLength = 0;
  errorMessage: string;

  constructor(
    private patientService: PatientService
  ) { }

  ngOnInit() {
    this.loadPatients();
  }


  loadPatients() {
    this.errorMessage = '';
    this.loading = true;

    const patientsObservable = this.patientService.getPatients();

    patientsObservable.subscribe(response => {
      this.loading = false;
      this.data = of(response);
      this.resultsLength = response.length;
    }, (err: any) => {
      console.log(err);
      this.errorMessage = 'Unable to load patients';
      this.loading = false;
    })

  }
}

