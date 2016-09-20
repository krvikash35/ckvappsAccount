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
    isLoggedIn: boolean = false;
    redirectUrl: String = "";
    errorMsg: String = ""

    constructor(private http: Http) { }

    login(via): Observable<String> {
        console.log("called AuthService.login with " + via)
        let params: URLSearchParams = new URLSearchParams();
        params.set('via', via);
       

        return this.http.get('/login', {search: params})
                        .map( res => res.json().data )
                        .catch( err => Observable.throw( err.json().data ) )                   
    }


    private extractData(res: Response) {        
        let body = res.json();
        console.log( "AuthService.login on success: " +body )
        return body.data || {}
    }

    private handleError(error: any) {
        console.log( "AuthService.login on error: " + error.message )       
        return Observable.throw(error);
    }


    logout(): void {
        this.isLoggedIn = false;
    }
}
