import { Component }  from  '@angular/core'
import {  AuthService } from './auth.service';

@Component({
    templateUrl: 'app/auth/logout.html'
    // styleUrls: ['app/auth/auth.css']
})
export class LogoutComponent{
  logoutConfig = { }

    constructor(private authService: AuthService) {
        console.log('LogoutComponent constructor called');
    }

    logout(){
        console.log('LogoutComponent.logout called');
        window.localStorage.removeItem('TID');
    }

}
