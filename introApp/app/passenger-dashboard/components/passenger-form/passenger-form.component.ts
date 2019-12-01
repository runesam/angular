import {
  Input,
  Output,
  OnChanges,
  Component,
  EventEmitter,
} from '@angular/core';

import { Passenger } from '../../models/passenger.interface';

@Component({
  selector: 'passenger-form',
  styleUrls: ['passenger-form.component.scss'],
  template: `
    <form #form="ngForm" novalidate>
        {{ detail | json }}
    </form>
  `,
})
export class PassengerFormComponent implements OnChanges {
  @Input()
  detail: Passenger;

  @Output()
  edit: EventEmitter<any> = new EventEmitter();

  @Output()
  remove: EventEmitter<any> = new EventEmitter();

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
}
