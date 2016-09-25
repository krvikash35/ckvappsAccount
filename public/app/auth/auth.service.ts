import {  Injectable  } from  '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class AuthService {
    redirectUrl: string;
    constructor(private http: Http) {
        console.log('authService constructor called')

    }

    isLoggedIn(): Observable<boolean> {
        console.log('AuthService.isLoggedIn called')
        let headers = new Headers();
        headers.append('authorization', 'Bearer ' + window.localStorage.getItem('TID'))
        return this.http
            .get('/api/isloggedin', { headers: headers })
            .map(resExtractor)
            .catch(errorHandler)
        function resExtractor(res) {
            console.log('AuthService.login got server response: ', res.json().data)
            return res.json().data
        }
        function errorHandler(err) {
            console.log('AuthService.login got server error: ', err.json().data)
            return Observable.throw(err.json().data)
        }
    }

    saveUserToken(userToken) {
        console.log('AuthService.saveUserToken called with ', userToken)
        window.localStorage.setItem("TID", userToken);
    }
    getUserToken() {
        console.log('AuthService.getUserToken called with ')
        return window.localStorage.getItem("TID");
    }

    login(idProvider: string): Observable<String> {
        console.log("AuthService.login called with: ", idProvider)
        let params: URLSearchParams = new URLSearchParams();
        params.set('via', idProvider);
        params.set('continue', this.redirectUrl)

        return this.http.get('/api/login', { search: params })
            .map(resExtractor)
            .catch(errorHandler)

        function resExtractor(res) {
            console.log('AuthService.login got server response: ', res.json().data)
            return res.json().data
        }
        function errorHandler(err) {
            console.log('AuthService.login got server error: ', err.json().data)
            return Observable.throw(err.json().data)
        }
    }
}
