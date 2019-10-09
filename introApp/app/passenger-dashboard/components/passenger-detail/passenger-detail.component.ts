import { Component, Input } from '@angular/core';

import { Passenger } from '../../models/passenger.interface';

@Component({
  selector: 'passenger-detail',
  styleUrls: ['passenger-detail.component.scss'],
  template: `
    <div>
      <span class="status" [class.checked-in]="detail.checkedIn"></span>
      {{detail.fullName}}
      <div class="date">
        check in date:
        {{detail.checkInDate ? (detail.checkInDate | date: 'MMMM dd, yyyy') : 'Not checked in' }}
      </div>
      <div class="children">
        Children: {{detail.children?.length || 0}}
      </div>
    </div>
  `,
})
export class PassengerDetailComponent {
  @Input()
  detail: Passenger;
}
