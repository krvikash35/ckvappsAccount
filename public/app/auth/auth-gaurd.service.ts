import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGaurd implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('AuthGaurd#canActivate called');
        let redirectUrl = route.queryParams['continue'] || "http://localhost:8082/logout"
        let userToken = route.queryParams['token'];
        let isLoggedIn: Observable<boolean>;
        return isLoggedIn = new Observable(observer => {
            if (userToken && redirectUrl) {
                console.log('AuthGaurd.canActivate false, got token and redirectUrl from server:', userToken, redirectUrl)
                this.authService.saveUserToken(userToken);
                window.location.href = redirectUrl;
                observer.next(true);
                observer.complete();
                return
            }
            this.authService.isLoggedIn().subscribe(onLoggedIn, onNotLoggedIn);
            function onLoggedIn() {
                console.log('AuthGaurd.canActivate onLoggedIn: ')
                window.location.href = redirectUrl
                observer.next(false);
                observer.complete();
                return
            }
            function onNotLoggedIn() {
                console.log('AuthGaurd.canActivate onNotLoggedIn:')
                observer.next(true);
                observer.complete();
                return
            }
        })
    }

}
