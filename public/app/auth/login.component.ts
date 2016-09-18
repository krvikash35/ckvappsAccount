import { Component, OnInit }  from  '@angular/core'

import {  AuthService } from './auth.service';

@Component({
    templateUrl: 'app/auth/login.html',
    styleUrls: ['app/auth/auth.css']
})
export class LoginComponent implements OnInit {
    private isLoggedIn: boolean;

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {

    }

    login(via) {
        this.authService.login(via)
            .subscribe(
            data => {
                console.log(data)
                window.location.href = data;
            },
            error => {
                console.log(error)
            }
            )
    }
}
