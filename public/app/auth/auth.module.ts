import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { AuthComponent }  from './auth.component'
import { LogoutComponent }  from './logout.component'
import { authRouting } from './auth.routing';
import { HttpModule } from '@angular/http';
import { AuthGaurd } from './auth-gaurd.service';
import { AuthService } from './auth.service'



@NgModule({
    imports: [CommonModule, authRouting, HttpModule],
    declarations: [AuthComponent, LogoutComponent],
    providers: [ AuthGaurd, AuthService]
})
export class AuthModule {

}
