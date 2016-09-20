import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { AuthComponent }  from './auth.component'
import { authRouting } from './auth.routing';
import { HttpModule } from '@angular/http';


@NgModule({
    imports: [CommonModule, authRouting, HttpModule],
    declarations: [AuthComponent]
})
export class AuthModule {

}
