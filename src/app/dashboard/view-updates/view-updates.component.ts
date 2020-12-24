import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
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

    dataList1 = [
        {
            pname: "Giftzzle",
            numbers: [
                {
                    userName: 'Riya',
                    Task: 'Login',
                    Description: 'qq',
                    Esthr: '5',
                    Acthr: '7',
                    Status: 'Done',
                    Tracker: 'true'
                },
                {
                    userName: 'Uday',
                    Task: 'User profile',
                    Description: 'qq',
                    Esthr: '4',
                    Acthr: '2',
                    Status: 'In-progress',
                    Tracker: 'true'
                },
                {
                    userName: 'ABC',
                    Task: 'Dashboard',
                    Description: 'qq',
                    Esthr: '7',
                    Acthr: '5',
                    Status: 'Done',
                    Tracker: 'true'
                }
            ]
        },
        {
            pname: "Daily Task",
            numbers: [
                {
                    userName: 'Prashant',
                    Task: 'View update',
                    Description: 'qq',
                    Esthr: '5',
                    Acthr: '2',
                    Status: 'Done',
                    Tracker: 'true'
                },
                {
                    userName: 'Riya',
                    Task: 'Auth guard',
                    Description: 'qq',
                    Esthr: '1',
                    Acthr: '2',
                    Status: 'In-Progress',
                    Tracker: 'true'
                },
                {
                    userName: 'Shweta',
                    Task: 'Logout',
                    Description: 'qq',
                    Esthr: '1',
                    Acthr: '4',
                    Status: 'Done',
                    Tracker: 'true'
                }
            ]
        }
    ];

    constructor(
        private formBuilder: FormBuilder,
        private dashboardService: DashboardService,
        private authService: AuthService,
        private router: Router
    ) {
        this.viewUpdateForm = this.formBuilder.group({
            projectId: new FormControl('0'),
            userId: new FormControl('0'),
            itemsPerPage: new FormControl(2),
            currentPage: new FormControl(1),
            filterBy: new FormControl('ProjectWise')
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
        }).catch(err => {
            if (err[`error`] && err[`error`][`status`] === 401) {
                this.authService.logout();
                this.router.navigate(['/']);
            }
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
            }).catch(err => {
                if (err[`error`] && err[`error`][`status`] === 401) {
                    this.authService.logout();
                    this.router.navigate(['/']);
                }
            });
            this.getTaskDetail(selectedProject, 0);
        } else {
            this.getTaskDetail(0, 0);
        }
    }

    onChangeEmployee(filterValue) {
        if (filterValue === 'UserWise') {
            this.f[`filterBy`].setValue('UserWise');
        } else {
            this.f[`filterBy`].setValue('ProjectWise');
        }
        const selectedProject = this.f[`projectId`][`value`];
        const selectedUser = this.f[`userId`][`value`];
        if (selectedProject === '') {
            this.getTaskDetail(0, selectedUser);
        } else {
            this.getTaskDetail(selectedProject, selectedUser);
        }
    }

    getTaskDetail(projectId, userId) {
        const selectedFilter = this.f[`filterBy`][`value`];
        this.dashboardService.getTaskdetail(projectId, userId, selectedFilter).toPromise().then(res => {

            if (selectedFilter === 'UserWise') {
                if (res && res[`data`][`userTaskList`]) {
                    this.dailyUpdateDetail = res[`data`][`userTaskList`];
                }
            } else {
                if (res && res[`data`][`projectList`]) {
                    this.dailyUpdateDetail = res[`data`][`projectList`];
                }
            }
            console.log("res...", this.dailyUpdateDetail);
        }).catch(err => {
            if (err[`error`] && err[`error`][`status`] === 401) {
                this.authService.logout();
                this.router.navigate(['/']);
            }
        });
    }

}


















