import { Component, OnInit }  from  '@angular/core'

import {  AuthService } from './auth.service';

@Component({
    template: `
    <div class="google-signin">
      <div class="google-icon">G</div>
      <div class="google-text">SIGN IN WITH GOOGLE</div>
    </div>


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
