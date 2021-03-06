import {
  Input,
  Output,
  OnChanges,
  Component,
  EventEmitter,
} from '@angular/core';

import { Passenger } from '../../models/passenger.interface';

@Component({
  selector: 'passenger-detail',
  styleUrls: ['passenger-detail.component.scss'],
  template: `
    <div>
      <span class="status" [class.checked-in]="detail.checkedIn"></span>
      <div *ngIf="editing">
        <input
          #name
          type="text"
          [value]="detail.fullName"
          (input)="onNameChange(name.value)"
        >
      </div>
      <div *ngIf="!editing">
        {{detail.fullName}}
      </div>
      <div class="date">
        check in date:
        {{detail.checkInDate ? (detail.checkInDate | date: 'MMMM dd, yyyy') : 'Not checked in'}}
      </div>
      <button (click)="toggleEdit()">{{editing ? 'Save' : 'Edit'}}</button>
      <button (click)="onRemove()">Remove</button>
      <button (click)="goToPassenger()">View</button>
    </div>
  `,
})
export class PassengerDetailComponent implements OnChanges {
  @Input()
  detail: Passenger;

  @Output()
  edit: EventEmitter<Passenger> = new EventEmitter();

  @Output()
  remove: EventEmitter<Passenger> = new EventEmitter();

  @Output()
  view: EventEmitter<Passenger> = new EventEmitter();

  editing: boolean = false;

  ngOnChanges(changes) {
    if (changes.detail) {
      this.detail = { ...changes.detail.currentValue }
    }
  }

  onNameChange = (fullName: string) => {
    this.detail.fullName = fullName;
  };

  toggleEdit = () => {
    if (this.editing) {
      this.edit.emit(this.detail);
    }
    this.editing = !this.editing;
  };

  onRemove = () => {
    this.remove.emit(this.detail);
  };

  goToPassenger = () => {
    this.view.emit(this.detail);
  };
}
