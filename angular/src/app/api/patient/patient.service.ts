import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Patient } from './patient.model';
import { PatientResponse } from './patient-response.model';

@Injectable()
export class PatientService {

    private patientsUrlBase = `${environment.api}/patients`;

    constructor(private http: HttpClient) {
    }

    getPatients(): Observable<Patient[]> {
        return this.http.get<Patient[]>(this.patientsUrlBase)
            .pipe(catchError(this.handleError));
    }

    getPatient(id: number): Observable<Patient> {
        const url = `${this.patientsUrlBase}/${id}`;
        return this.http.get<Patient>(url)
            .pipe(catchError(this.handleError));
    }

    updatePatient(patient: Patient): Observable<PatientResponse> {
        return this.http.put<PatientResponse>(this.patientsUrlBase, patient)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }
}
