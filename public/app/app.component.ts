import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'my-app',
    template: `
      <h1>ckvapps</h1>
      <router-outlet></router-outlet>

      `
})
export class AppComponent {
    constructor(
        private router: Router
    ) { }


}
