import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    NgbAccordionModule, NgbPaginationModule,
    NgbTooltipModule, NgbDatepickerModule,
    NgbModalModule, NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
import { ViewUpdatesComponent } from './view-updates/view-updates.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AddTaskComponent } from './add-task/add-task.component';
import { ProjectsGooglesheetComponent } from './projects-googlesheet/projects-googlesheet.component';


@NgModule({
    declarations: [
        ViewUpdatesComponent,
        AddTaskComponent,
        ProjectsGooglesheetComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbTooltipModule,
        NgbPaginationModule,
        NgbDatepickerModule,
        NgbAccordionModule,
        NgbModalModule,
        NgbTypeaheadModule,
        NgxPermissionsModule.forChild()
    ]
})
export class DashboardModule { }
