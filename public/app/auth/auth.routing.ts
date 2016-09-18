import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './login.component'

const authRoute: Routes = [
    // { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent }
]

export const authRouting: ModuleWithProviders = RouterModule.forChild(authRoute);
