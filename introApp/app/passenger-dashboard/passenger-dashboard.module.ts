import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

import { PassengerViewerComponent } from './containers/passenger-viewer/passenger-viewer.component';
import { PassengerDashboardComponent } from './containers/passenger-dashboard/passenger-dashboard.component';

import {
  PassengerFormComponent,
  PassengerCountComponent,
  PassengerDetailComponent,
} from './components';

import { PassengerDashboardService } from './passenger-dashboard.service';

const routes: Routes = [
  {
    path: 'passengers',
    children: [
      { path: '', component: PassengerDashboardComponent },
      { path: ':id', component: PassengerViewerComponent },
    ]
  },
];

@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
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
