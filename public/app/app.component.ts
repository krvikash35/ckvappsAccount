import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'my-app',
    template: `
      <h1>My First Angular 2 App</h1>
      <router-outlet></router-outlet>

      `
})
export class AppComponent {
    constructor(
        private router: Router
    ) { }



}
