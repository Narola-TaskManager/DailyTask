import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewUpdatesComponent } from './view-updates/view-updates.component';
import { ShareModule } from '../share/share.module';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
    declarations: [
        HomeComponent,
        ViewUpdatesComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        ShareModule,
        NgxPermissionsModule.forChild()
    ]
})
export class DashboardModule { }
