import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';

import { AuthModule } from './auth/auth.module';
import { routing }    from './app.routing';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

@NgModule({
    imports: [BrowserModule, AuthModule, routing],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
    // providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})

export class AppModule { }
