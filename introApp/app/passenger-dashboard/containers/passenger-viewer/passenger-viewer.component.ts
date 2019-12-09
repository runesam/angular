import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import { Passenger } from '../../models/passenger.interface';
import { PassengerDashboardService } from '../../passenger-dashboard.service';
import "rxjs/add/operator/switchMap";

@Component({
  selector: 'passenger-viewer',
  styleUrls: ['passenger-viewer.component.scss'],
  template: `
    <div>
        <button (click)="goBack()">
            &lsaquo; Go back
        </button>
        <passenger-form
            [detail]="passenger"
            (update)="onUpdatePassenger($event)"
        ></passenger-form>
    </div>
  `,
})
export class PassengerViewerComponent implements OnInit {
  passenger: Passenger;
  navigationResult: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private passengerService: PassengerDashboardService
  ) {}

  ngOnInit() {
    this.route.params
      .switchMap(({ id }) => this.passengerService.getPassenger(id))
      .subscribe((data: Passenger) => {
        this.passenger = data;
      });
  }

  onUpdatePassenger(passenger: Passenger) {
    this.passengerService
      .updatePassenger(passenger)
      .subscribe((data: Passenger) => {
        this.passenger = data;
      });
  }

  goBack() {
    this.router.navigate(['/passengers'])
      .then(res => this.navigationResult = res);
  }
}
