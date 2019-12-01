import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PassengerViewerComponent } from './containers/passenger-viewer/passenger-viewer.component';
import { PassengerDashboardComponent } from './containers/passenger-dashboard/passenger-dashboard.component';

import {
  PassengerFormComponent,
  PassengerCountComponent,
  PassengerDetailComponent,
} from './components';

import { PassengerDashboardService } from './passenger-dashboard.service';

@NgModule({
  imports: [CommonModule, HttpModule, FormsModule],
  exports: [
    PassengerFormComponent,
    PassengerCountComponent,
    PassengerDetailComponent,
    PassengerViewerComponent,
    PassengerDashboardComponent,
  ],
  declarations: [
    PassengerFormComponent,
    PassengerCountComponent,
    PassengerDetailComponent,
    PassengerViewerComponent,
    PassengerDashboardComponent,
  ],
  providers: [PassengerDashboardService],
})
export class PassengerDashboardModule{}
