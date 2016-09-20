import { Component, OnInit }  from  '@angular/core'

import {  AuthService } from './auth.service';

@Component({
    templateUrl: 'app/auth/login.html',
    styleUrls: ['app/auth/auth.css']
})
export class LoginComponent implements OnInit {
    private isLoggedIn: boolean;
    public errMsg = null;

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {

    }

    login(via) {
        this.authService.login(via)            
            .subscribe(
            data => {
                console.log( "LoginComponent.login on success: " + JSON.stringify( data ) )
                window.location.href = data.toString();
            },
            error => {
                this.errMsg = error.description;
                console.log( "LoginComponent.login on error: " + JSON.stringify( error ) )                
            }
            )
    }
}
