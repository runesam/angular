import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Passenger } from '../../models/passenger.interface';
import { PassengerDashboardService } from '../../passenger-dashboard.service';

@Component({
  selector: 'passenger-dashboard',
  styleUrls: ['passenger-dashboard.component.scss'],
  template: `
    <div>
      <passenger-count [items]="passengers"></passenger-count>
      <passenger-detail
        [detail]="passenger"
        (view)="handleView($event)"
        (edit)="handleEdit($event)"
        (remove)="handleRemove($event)"
        *ngFor="let passenger of passengers"
      ></passenger-detail>
    </div>
  `
})
export class PassengerDashboardComponent implements OnInit {
  private passengers: Passenger[];
  private navigationResult: any;

  constructor(
    private router: Router,
    private passengerService: PassengerDashboardService
  ) {}

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
    this.passengerService.updatePassenger(event)
      .subscribe((data: Passenger) => {
        this.passengers = this.passengers.map((passenger: Passenger): Passenger => {
          if (passenger.id === event.id) {
            passenger = data;
          }
          return passenger;
        });
      });
  };

  handleView = ({ id }: Passenger) => {
    this.router.navigate(['/passengers', id])
      .then(res => this.navigationResult = res);
  };
}
