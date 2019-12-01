import {
  Input,
  Output,
  OnChanges,
  Component,
  EventEmitter,
} from '@angular/core';

import { Baggage } from '../../models/baggage.interface';
import { Passenger } from '../../models/passenger.interface';

@Component({
  selector: 'passenger-form',
  styleUrls: ['passenger-form.component.scss'],
  template: `
    <form #form="ngForm" novalidate (ngSubmit)="handleSubmit(form.value, form.valid)">
        {{ detail | json }}
        <div>
            Passenger name:
            <input
                required
                type="text"
                name="fullName"
                #fullName="ngModel"
                [ngModel]="detail.fullName"
            >
            <span *ngIf="fullName.errors?.required && fullName.dirty" class="error">
                fullName is required
            </span>
        </div>
        <div>
            Passenger ID:
            <input
                name="id"
                required
                type="text"
                #id="ngModel"
                [ngModel]="detail.id"
            >
            <span *ngIf="id.errors?.required && id.touched" class="error">
                ID is required
            </span>
        </div>
        <div>
            <label for="checkedIn">
                <input
                    type="checkbox"
                    id="checkedIn"
                    name="checkedIn"
                    [ngModel]="detail.checkedIn"
                    (ngModelChange)="toggleCheckin($event)"
                >
            </label>
        </div>
        <div *ngIf="form.value.checkedIn">
            Check in Date:
            <input type="number" name="checkInDate" [ngModel]="detail.checkInDate">
        </div>
        <div>
            Luggage:
            <select name="baggage" [ngModel]="detail.baggage">
                <option
                  [value]="item.key"
                  *ngFor="let item of baggage"
                  [selected]="item.key === detail.baggage"
                >
                    {{ item.value }}
                </option>
            </select>
        </div>
        <button type="submit" [disabled]="form.invalid">
            Update passenger
        </button>
        <pre>
            {{ form.value | json }}
        </pre>
    </form>
  `,
})
export class PassengerFormComponent implements OnChanges {
  @Input()
  detail: Passenger;

  @Output()
  update: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  baggage: Baggage[] = [
    { key: 'none', value: 'No Baggage' },
    { key: 'hand-only', value: 'Hand Baggage' },
    { key: 'hold-only', value: 'Hold Baggage' },
    { key: 'hand-hold', value: 'Hand and Hold Baggage' },
  ];

  ngOnChanges(changes) {
    if (changes.detail) {
      this.detail = { ...changes.detail.currentValue }
    }
  };

  toggleCheckin = (checkedIn: boolean) => {
    if (checkedIn) {
      this.detail.checkInDate = Date.now();
    }
  };

  handleSubmit = (passenger: Passenger, valid: boolean) => {
    if (valid) {
      this.update.emit(passenger);
    }
  };
}
