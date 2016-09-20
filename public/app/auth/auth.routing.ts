import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component'
import { AppComponent } from '../app.component';

const authRoute: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: AuthComponent }
]

export const authRouting: ModuleWithProviders = RouterModule.forChild(authRoute);
