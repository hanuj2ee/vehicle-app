import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from "@angular/router"
import { Vehicle } from './model/vehicle';
@Injectable({
  providedIn: 'root'
})
/**
 * Vehicle service
 */
export class VehicleService {
  private static readonly GET_ALL_VEHICLES_URL = '/vehicle/vehicles';
  private static readonly PING_VEHICLE_URL = '/vehicle/ping';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router) { }
  /**
   * 
   * @param status Get all vehicles as per given status and owner
   * @param owners 
   */
  public getAll(status: string, owners: number[]): Observable<Vehicle> {
    return this.http.get<Vehicle>(VehicleService.GET_ALL_VEHICLES_URL + "?status=" + status + "&owners=" + owners,
      { headers: this.headers })
  };
}
