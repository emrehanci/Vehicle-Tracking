import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from './models/vehicle.model';
import * as numberToWords from 'number-to-words';
import { VehicleDetail } from './models/vehicle-detail.model';

@Injectable({
  providedIn: 'root'
})

export class DataService {  

  constructor(private http: HttpClient) { }

  getData(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>('assets/vehicle-list-data.json');
  }

  getVehicleDetails(id: string): Observable<VehicleDetail> {
    return this.http.get<VehicleDetail>(`assets/vehicle-${numberToWords.toWords(id)}-details.json`);
  }
}
