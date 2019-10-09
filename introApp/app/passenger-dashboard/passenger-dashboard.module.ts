import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PassengerDashboardComponent } from "./containers/passenger-dashboard/passenger-dashboard.component";
import {
  PassengerDetailComponent,
  PassengerCountComponent,
} from './components';

@NgModule({
  imports: [CommonModule],
  exports: [PassengerDashboardComponent],
  declarations: [
    PassengerCountComponent,
    PassengerDetailComponent,
    PassengerDashboardComponent,
  ],
})
export class PassengerDashboardModule{}
