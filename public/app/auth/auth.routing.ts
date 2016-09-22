import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component'
import { AuthGaurd } from './auth-gaurd.service'

const authRoute: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: AuthComponent, canActivate:  [AuthGaurd] }
]

export const authRouting: ModuleWithProviders = RouterModule.forChild(authRoute);
