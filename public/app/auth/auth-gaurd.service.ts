import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service'

@Injectable()
export class AuthGaurd implements CanActivate{
	constructor(private authService: AuthService, private router: Router){

	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
		console.log('AuthGaurd#canActivate called');
		let redirectUrl = route.queryParams['continue'] || "http://localhost:8080"
		let userToken = route.queryParams['token']
		
		if(userToken && redirectUrl){
			this.authService.saveUserToknen(userToken);
			window.location.href=redirectUrl;
			return false;
		}
		if(this.authService.isLoggedIn()){
			window.location.href = redirectUrl
			return false;
		}else{
			this.authService.redirectUrl = redirectUrl;
			return true;
		}
	}
	
}
