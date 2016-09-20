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
    constructor(
        private http: Http
    ) { }

    isLoggedIn() {

        return true;
    }

    login(method): Observable<String> {
        console.log("called AuthService.login with " + method)
        let params: URLSearchParams = new URLSearchParams();
        params.set('via', method);

        return this.http.get('/api/login', { search: params })
            .map(res => res.json().data)
            .catch(err => Observable.throw(err.json().data))
    }
}
