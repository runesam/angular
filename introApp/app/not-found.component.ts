import { Component } from '@angular/core';

@Component({
  selector: 'app-404',
  template: `
    <div>
        404!
        <a routerLink="/">
            Home
        </a>
    </div>
  `
})
export class NotFoundComponent {}
