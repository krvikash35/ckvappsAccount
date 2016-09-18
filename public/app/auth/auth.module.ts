import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { LoginComponent }  from './login.component'
import { AuthService }  from './auth.service'
import { authRouting } from './auth.routing';

import { HttpModule } from '@angular/http';


@NgModule({
    imports: [CommonModule, authRouting, HttpModule],
    declarations: [LoginComponent],
    providers: [AuthService],
})
export class AuthModule {

}
