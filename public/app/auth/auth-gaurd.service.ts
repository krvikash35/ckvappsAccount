import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGaurd implements CanActivate{
	canActivate(){
		console.log('AuthGaurd#canActivate called');
		return true;
	}
}
