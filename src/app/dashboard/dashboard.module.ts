import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewUpdatesComponent } from './view-updates/view-updates.component';
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
        NgbTooltipModule,
        NgbPaginationModule,
        NgbAccordionModule,
        NgxPermissionsModule.forChild()
    ]
})
export class DashboardModule { }
