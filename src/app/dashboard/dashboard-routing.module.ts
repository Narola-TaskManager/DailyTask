import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../core/guard/authentication.guard';
import { HomeComponent } from './home/home.component';
import { ViewUpdatesComponent } from './view-updates/view-updates.component';


const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: 'dashboard',
        component: HomeComponent,
        canActivate: [AuthenticationGuard],
    },
    {
        path: 'updates',
        component: ViewUpdatesComponent,
        canActivate: [AuthenticationGuard],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
