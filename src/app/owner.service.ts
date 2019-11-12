import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from "@angular/router"
import { Owner } from './model/owner';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
/**
 * Owner Service
 */
export class OwnerService {
  baseUrl: string = environment.backend.baseURL;
  private static readonly GET_ALL_OWNER_URL = '/owner/owners';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router) { }
  /**
   * Get All owners
   */
  public getAll(): Observable<Owner> {
    return this.http.get<Owner>(this.baseUrl+OwnerService.GET_ALL_OWNER_URL,
      { headers: this.headers })
  };
}
