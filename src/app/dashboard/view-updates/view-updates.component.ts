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
    apiCalled = false;
    userName = '';

    groupByOptions = [
        'Project',
        'User'
    ];

    pageSizeOptions = [2, 5, 10, 15, 20, 25, 50, 100];

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
            groupBy: new FormControl('Project')
        });
        this.userName = localStorage.getItem('userName') || '';
    }

    ngOnInit(): void {
        this.fillProjectDropdown();
        this.getTaskDetail();
    }

    get f() { return this.viewUpdateForm.controls; }

    fillProjectDropdown() {
        this.dashboardService.getProject().toPromise().then(res => {
            this.projectsList = res[`data`];
        }).catch(err => {
            this.projectsList = [];
            if (err[`error`] && err[`error`][`status`] === 401) {
                this.authService.logout();
                this.router.navigate(['/']);
            }
        });
    }

    getTaskDetail() {
        const selectedFilter = this.f.groupBy.value;
        const projectId = this.f.projectId.value;
        const userId = this.f.userId.value;
        this.apiCalled = false;
        this.dashboardService.getTaskdetail(projectId, userId, selectedFilter).toPromise().then(res => {
            if (res && res[`data`][`groupedList`]) {
                this.apiCalled = true;
                this.dailyUpdateDetail = res[`data`][`groupedList`];
            }
        }).catch(err => {
            if (err[`error`] && err[`error`][`status`] === 401) {
                this.authService.logout();
                this.router.navigate(['/']);
            }
        });
    }

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

    onChangeProject() {
        const selectedProject = this.f[`projectId`][`value`];
        if (selectedProject) {
            this.dashboardService.getUserByProjects(selectedProject).toPromise().then(users => {
                if (users && users[`data`]) {
                    this.f[`userId`].setValue('');
                    this.employeeList = users[`data`];
                }
                this.getTaskDetail();
            }).catch(err => {
                if (err[`error`] && err[`error`][`status`] === 401) {
                    this.authService.logout();
                    this.router.navigate(['/']);
                }
            });
        } else {
            this.getTaskDetail();
        }
    }
}
