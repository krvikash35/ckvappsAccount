import { Component, OnInit }  from  '@angular/core'
import {  AuthService } from './shared/auth.service';
import { Auth } from './shared/auth.model'

@Component({
    templateUrl: 'app/auth/auth.html',
    styleUrls: ['app/auth/auth.css'],
    providers: [AuthService]
})
export class AuthComponent implements OnInit {
    auth: Auth = new Auth();

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {
        let isLoggedIn = this.authService.isLoggedIn();
        if (isLoggedIn) {
            this.auth.isLoggedIn = true;
        } else {
            this.auth.isLoggedIn = false;
        }

    }

    login(via) {
        this.authService.login(via)
            .subscribe(
            data => {
                console.log("LoginComponent.login on success: " + JSON.stringify(data))
                window.location.href = data.toString();
            },
            error => {
                this.auth.errMsg = error.description;
                console.log("LoginComponent.login on error: " + JSON.stringify(error))
            }
            )
    }
}
