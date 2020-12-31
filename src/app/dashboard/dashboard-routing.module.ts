import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../core/guard/authentication.guard';
import { HomeComponent } from './home/home.component';
import { ViewUpdatesComponent } from './view-updates/view-updates.component';


const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: 'dashboard',
        component: HomeComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: 'ROLE_USER',
                redirectTo: '/updates'
            }
        }
    },
    {
        path: 'updates',
        component: ViewUpdatesComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: 'ROLE_ADMIN',
                redirectTo: '/dashboard'
            }
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
