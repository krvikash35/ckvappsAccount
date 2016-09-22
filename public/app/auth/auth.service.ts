import {  Injectable  } from  '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Http, Response, URLSearchParams } from '@angular/http';

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
    authStep: number;
    constructor(private http: Http){   

     }

    isLoggedIn() {        
        return true;
    }

    saveUserToknen(userToken){
        window.localStorage.setItem("TID", userToken);
    }
    getUserToken(){
        return window.localStorage.getItem("TID");
    }

    login(idProvider: string): Observable<String> {
        console.log("entered AuthService.login with " + idProvider)
        let params: URLSearchParams = new URLSearchParams();
        params.set('via', idProvider);
        params.set('continue', this.redirectUrl)

        return this.http.get('/api/login', { search: params })
            .map(res => res.json().data)
            .catch(err => Observable.throw(err.json().data))
    }
}
