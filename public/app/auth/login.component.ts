import { Component, OnInit }  from  '@angular/core'

import {  AuthService } from './auth.service';

@Component({
    template: `
    <button>Login Google</button>
  `
})
export class LoginComponent implements OnInit {
    private isLoggedIn: boolean;

    constructor(
        private service: AuthService
    ) { }

    ngOnInit() {

    }
}
