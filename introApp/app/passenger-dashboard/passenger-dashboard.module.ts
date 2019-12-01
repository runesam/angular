import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";

import { PassengerDashboardComponent } from "./containers/passenger-dashboard/passenger-dashboard.component";
import {
  PassengerDetailComponent,
  PassengerCountComponent,
} from './components';

import { PassengerDashboardService } from './passenger-dashboard.service';

@NgModule({
  imports: [CommonModule, HttpModule],
  exports: [
    PassengerCountComponent,
    PassengerDetailComponent,
    PassengerDashboardComponent,
  ],
  declarations: [
    PassengerCountComponent,
    PassengerDetailComponent,
    PassengerDashboardComponent,
  ],
  providers: [PassengerDashboardService],
})
export class PassengerDashboardModule{}
