import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from "@angular/router"
import { Vehicle } from './model/vehicle';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
/**
 * Vehicle service
 */
export class VehicleService {
  baseUrl: string = environment.backend.baseURL;
  private static readonly GET_ALL_VEHICLES_URL = '/vehicle/vehicles';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router) { }
  /**
   * 
   * @param status Get all vehicles as per given status and owner
   * @param owners 
   */
  public getAll(status: string, owners: number[]): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.baseUrl+VehicleService.GET_ALL_VEHICLES_URL + "?status=" + status + "&owners=" + owners,
      { headers: this.headers })
  };
}
