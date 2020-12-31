import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
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
                only: [57, 76, 109, 71],
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
                except: [57, 76, 109, 71],
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
