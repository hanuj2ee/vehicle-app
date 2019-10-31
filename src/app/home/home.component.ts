import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../owner.service';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../model/vehicle';
import { Owner } from '../model/owner';
export interface Status {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
//Home component to display DashBoard
export class HomeComponent implements OnInit {
  interval = 60;
  time: any;

  error: '';
  this
  owners: Owner[] = [];
  vehicles: Vehicle[][] = [];
  status = "all";
  filteredOwners: number[] = [];
  statusArr: Status[] = [
    { value: "all", viewValue: 'All' },
    { value: "connected", viewValue: 'Connected' },
    { value: "disconnected", viewValue: 'Disconnected' }];
  constructor(private ownerService: OwnerService, private vehicleService: VehicleService) {

  }
/**
 * Load owners
 */
  loadOwners() {
    this.ownerService.getAll().subscribe(data => {
      let type = data["type"];
      if ("error" != type) {
        this.owners = data["result"];
      }
    });
  }
  /**
   * Load Vehicles
   */
  loadVehicles() {
    this.vehicles = [];
    this.vehicleService.getAll(this.status, this.filteredOwners).subscribe(data => {
      let type = data["type"];
      if ("error" != type) {
        let temp = data["result"];
        let cnt = 0;
        //Create group of 2 vehicles
        let arr = [];
        temp.forEach(vehicle => {
          if (cnt < 2) {
            arr.push(vehicle);
            cnt++;
          } else {
            cnt = 0;
            this.vehicles.push(arr);
            arr = [];
            arr.push(vehicle);
            cnt++;
          }

        });
        this.vehicles.push(arr);
      }
    });

  }
  ngOnInit() {
    this.loadOwners();
    this.loadVehicles();
    let t = 0;
    t = this.interval * 1000;
    console.log(t);
    this.time = setInterval(() => {
      this.loadVehicles();
    }, t);
  }
  /**
   * Update interval to  fetch vehicles
   * @param obj 
   */
  setStep(obj: number) {
    clearInterval(this.interval);
    this.interval = obj;
    this.loadVehicles();
    let t = 0;
    t = this.interval * 1000;
    this.time = setInterval(() => {
      this.loadVehicles();
    }, t);
  }
  /**
   * Update status
   * @param obj 
   */
  updateStatus(obj: string) {
    this.status = obj;
    this.loadVehicles();
  }
  /**
   * Update Owners
   * @param ownerId 
   */
  updateOwners(ownerId: number) {
    let index = this.filteredOwners.indexOf(ownerId);
    if (index < 0) {
      this.filteredOwners.push(ownerId);
    } else {
      this.filteredOwners.splice(index, 1);
    }
    this.loadVehicles();
  }
}
