import { Component, OnInit } from "@angular/core";
import { Passenger } from "../../models/passenger.interface";

import { PassengerDashboardService } from '../../passenger-dashboard.service';

@Component({
  selector: 'passenger-dashboard',
  styleUrls: ['passenger-dashboard.component.scss'],
  template: `
    <div>
      <passenger-count [items]="passengers"></passenger-count>
      <passenger-detail
        [detail]="passenger"
        (edit)="handleEdit($event)"
        (remove)="handleRemove($event)"
        *ngFor="let passenger of passengers"
      ></passenger-detail>
    </div>
  `
})
export class PassengerDashboardComponent implements OnInit {
  private passengers: Passenger[];

  constructor(private passengerService: PassengerDashboardService) {}

  ngOnInit() {
    this.passengerService
      .getPassengers()
      .subscribe((data: Passenger[]) => {
        this.passengers = data;
      });
  }

  handleRemove = (event: Passenger) => {
    this.passengerService
      .deletePassengers(event)
      .subscribe((data: Passenger) => {
        this.passengers = this.passengers.filter((passenger: Passenger) => {
          return passenger.id !== data.id;
        });
      });
  };

  handleEdit = (event: Passenger) => {
    this.passengerService.updatePassengers(event)
      .subscribe((data: Passenger) => {
        this.passengers = this.passengers.map((passenger: Passenger): Passenger => {
          if (passenger.id === event.id) {
            passenger = data;
          }
          return passenger;
        });
      });
  };
}
