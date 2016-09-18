import {  Injectable  } from  '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Http, Response, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;
    redirectUrl: String = "";
    errorMsg: String = ""

    constructor(private http: Http) { }

    login(via): Observable<String> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('via', via);
        return this.http.get('/login', { search: params })
            .map(this.extractData)
            .catch(this.handleError)
    }


    private extractData(res: Response) {
        let body = res.json();
        return body.data || {}
    }

    private handleError(error: any) {
        console.error(error.message); // log to console instead
        return Observable.throw(error.message);
    }


    logout(): void {
        this.isLoggedIn = false;
    }
}
