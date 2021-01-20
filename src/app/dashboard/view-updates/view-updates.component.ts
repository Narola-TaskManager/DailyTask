import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbDateStruct, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { DashboardService } from '../service/dashboard.service';
import { ManageDateService } from '../service/manage-date.service';

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
    minDate: NgbDateStruct;
    maxDate: NgbDateStruct;
    groupByOptions = [
        'Project',
        'User'
    ];
    pageSizeOptions = [2, 5, 10, 15, 20, 25, 50, 100];
    showHistory = false;
    dateFilterError = '';
    searchProject;
    @ViewChild('instance') instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    formatter = (x) => x;

    constructor(
        private formBuilder: FormBuilder,
        private dashboardService: DashboardService,
        private manageDate: ManageDateService
    ) {
        this.userName = localStorage.getItem('userName') || '';
        this.minDate = this.manageDate.setMinDate();
        this.maxDate = this.manageDate.setMaxDate();

        this.viewUpdateForm = this.formBuilder.group({
            projectId: new FormControl(),
            projectName: new FormControl(),
            userId: new FormControl('0'),
            itemsPerPage: new FormControl(5),
            currentPage: new FormControl(1),
            groupBy: new FormControl('User'),
            fromDate: new FormControl(this.maxDate),
            toDate: new FormControl(this.maxDate)
        });

    }

    ngOnInit(): void {
        this.fillProjectDropdown();
        this.getTaskDetail();
    }

    get f() { return this.viewUpdateForm.controls; }

    fillProjectDropdown() {
        this.dashboardService.getProject().toPromise().then(res => {
            this.projectsList = res[`data`];

            this.searchProject = (text$: Observable<string>) => {
                const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
                const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
                const inputFocus$ = this.focus$;

                return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
                    map(term => term === '' ? res[`data`]
                        : res[`data`].filter(
                            v => v.projectName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
                );
            };
        }).catch(err => {
            this.projectsList = [];
        });
    }

    getTaskDetail() {
        this.apiCalled = false;
        this.dashboardService.getTaskdetail(this.viewUpdateForm.value).toPromise().then(res => {
            if (res && res[`data`][`groupedList`]) {
                this.apiCalled = true;
                this.dailyUpdateDetail = res[`data`][`groupedList`];
            }
        }).catch(err => {
            this.dailyUpdateDetail = [];
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

    onChangeProject(event) {
        const selectedProjectId = this.f[`projectId`][`value`];

        this.projectsList.filter((cValue) => {
            if (cValue[`projectName`] === event.item[`projectName`]) {
                this.f[`projectId`].setValue(cValue[`projectId`]);
            }
        });
        if (selectedProjectId) {
            this.dashboardService.getUserByProjects(selectedProjectId).toPromise().then(users => {
                if (users && users[`data`]) {
                    this.f[`userId`].setValue('');
                    this.employeeList = users[`data`];
                }
                this.getTaskDetail();
            }).catch(err => {
                this.employeeList = [];
            });
        } else {
            this.getTaskDetail();
        }
    }

    onChangeDateFilter() {
        this.dateFilterError = '';
        const selectedFromDate = this.manageDate.objectToDate(this.f[`fromDate`].value);
        const selectedToDate = this.manageDate.objectToDate(this.f[`toDate`].value);
        const currentDate = this.manageDate.currentDateInDateFormate(this.maxDate);

        if (selectedFromDate > selectedToDate) {
            this.dateFilterError = 'Please select valid date';
            this.dailyUpdateDetail = [];
        } else {
            this.getTaskDetail();
        }

        if (selectedFromDate !== currentDate && selectedToDate !== currentDate ||
            selectedFromDate !== currentDate && selectedToDate === currentDate) {
            this.showHistory = true;
        }
    }

    selected(event) {
        event.preventDefault();
        this.f.projectName.setValue(event.item[`projectName`]);
    }
}
