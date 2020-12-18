import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from '../service/dashboard.service';

@Component({
    selector: 'app-view-updates',
    templateUrl: './view-updates.component.html',
    styleUrls: ['./view-updates.component.css']
})
export class ViewUpdatesComponent implements OnInit {

    currentPage = 1;
    pageSize: number;
    projectsList = [];
    employeeList = [];
    viewUpdateForm: FormGroup;
    paginationReqPayload = {};
    dailyUpdateDetail = [];

    constructor(
        private formBuilder: FormBuilder,
        private dashboardService: DashboardService,
    ) {
        this.viewUpdateForm = this.formBuilder.group({
            projectId: new FormControl(''),
            userId: new FormControl(''),
            itemsPerPage: new FormControl(5),
            currentPage: new FormControl(1)
        });
    }

    ngOnInit(): void {
        this.bindProjectDropdown();
        this.getTaskDetail(0, 0);
    }

    get f() { return this.viewUpdateForm.controls; }

    onPageChange(pageNum: number): void {
        if (pageNum) {
            this.f[`currentPage`].setValue(pageNum);
        } else {
            pageNum = 1;
            this.f[`currentPage`].setValue(1);
        }
        this.pageSize = (this.f[`itemsPerPage`].value * (pageNum - 1));
    }

    changePagesize(): void {
        if (!this.pageSize) {
            this.pageSize = 0;
        }
        const itemsPerPage = this.pageSize + Number(this.f[`itemsPerPage`].value);
        this.f[`itemsPerPage`].setValue(itemsPerPage);
    }

    bindProjectDropdown() {
        this.dashboardService.getProject().toPromise().then(res => {
            this.projectsList = res[`data`];
        });
    }

    onChangeProject() {
        const selectedProject = this.f[`projectId`][`value`];
        if (selectedProject) {
            this.dashboardService.getUserByProjects(selectedProject).toPromise().then(users => {
                if (users && users[`data`]) {
                    this.f[`userId`].setValue('');
                    this.employeeList = users[`data`];
                }
            }).catch(err => { });
            this.getTaskDetail(selectedProject, 0);
        } else {
            this.getTaskDetail(0, 0);
        }
    }

    onChangeEmployee() {
        const selectedProject = this.f[`projectId`][`value`];
        const selectedUser = this.f[`userId`][`value`];
        if (selectedProject === '') {
            this.getTaskDetail(0, selectedUser);
        } else {
            this.getTaskDetail(selectedProject, selectedUser);
        }
    }

    getTaskDetail(projectId, userId) {
        this.dashboardService.getTaskdetail(projectId, userId).toPromise().then(res => {
            if (res && res[`data`][`taskList`]) {
                this.dailyUpdateDetail = res[`data`][`taskList`];
            }
        });
    }

}
