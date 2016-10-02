import { Component, OnInit }  from  '@angular/core'
import {  AuthService } from './auth.service';
import { Auth } from './auth.model'


@Component({
    templateUrl: 'app/auth/auth.html'
    // styleUrls: ['app/auth/auth.css']
})
export class AuthComponent implements OnInit {
    auth: Auth = new Auth();

    constructor(private authService: AuthService) {
        console.log('AuthComponent constructor called')
    }

    ngOnInit() {
    }

    login(via) {
        this.authService.login(via)
            .subscribe(
            data => {
                console.log("LoginComponent.login on success: " + JSON.stringify(data))
                window.location.href = data.toString();
            },
            error => {
                this.auth.errMsg = error.error_description;
                console.log("LoginComponent.login on error: " + JSON.stringify(error))
            }
            )
    }
}
