import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.html'
})

export class AppComponent {
    constructor(
        private router: Router
    ) { }
}
