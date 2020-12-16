import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../service/dashboard.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    taskForm: FormGroup;
    submitted = false;
    backendError;
    projectList = [];
    taskStatus = [
        { statusId: 1, statusTitle: 'COMPLETED' },
        { statusId: 2, statusTitle: 'INPROGRESS' },
        { statusId: 3, statusTitle: 'REMAINING' }
    ];
    isControlsVisible = false;
    isBtnDissabled = false;
    isNewtaskDissabled = false;
    projectwiseTaskList = [];
    disableEod = true;

    constructor(
        private dashboardService: DashboardService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.initFormGroup();
        this.getProjectList();
        this.getTaskList();
    }

    initFormGroup() {
        this.taskForm = this.formBuilder.group({
            isEodUpdate: new FormControl(false),
            taskList: this.formBuilder.array([]),
        });
    }

    addNewControlWithValue(controlValue: any = {}) {
        return this.formBuilder.group({
            projectId: new FormControl(controlValue.projectId || null, Validators.compose([Validators.required])),
            taskMasterId: new FormControl(controlValue.taskMasterId || null, Validators.compose([Validators.required])),
            taskDesc: new FormControl(controlValue.taskDesc || '', Validators.compose([Validators.required])),
            estHr: new FormControl(controlValue.estHr || null, Validators.compose([
                Validators.required,
                Validators.pattern(/^\s*(?=.*[1-9])\d{1,2}(?:\.\d{1,2})?\s*$/)])),
            taskId: new FormControl(controlValue.taskId || null),
            actualHr: new FormControl(controlValue.actualHr || null),
            status: new FormControl(controlValue.status || null),
            isTrackerUsed: new FormControl(controlValue.isTrackerUsed || false),
        });
    }

    // Bind projct dropdown
    getProjectList() {
        this.dashboardService.getProjects().toPromise().then(res => {
            if (res && res[`data`]) {
                this.projectList = res[`data`];
            }
        }).catch(err => {
            this.projectList = [];
        });
    }

    // bind task dropdown
    getTaskByProjectId(selectedValue) {
        const taskList = this.projectList.find((item) => item.projectId == selectedValue);
        return taskList ? taskList.taskMasters : [];
    }

    // get all saved task on page load
    getTaskList() {
        this.dashboardService.getAllSaveTask().toPromise().then(res => {

            if (res && res[`data`] && res[`data`][`taskList`].length > 0) {
                this.disableEod = false;
                const taskList = res[`data`][`taskList`];
                taskList.forEach(element => {
                    if (element[`isEodUpdate`]) {
                        this.isControlsVisible = true;
                        this.taskForm.patchValue({
                            isEodUpdate: true
                        });
                        this.isNewtaskDissabled = true;
                        this.isBtnDissabled = true;
                        this.disableEod = true;
                    }
                    this.projectDetail.push(this.addNewControlWithValue(element));
                });
            } else {
                this.addNewTaskBlogs();
            }
        }).catch(err => {
            if (err[`error`] && err[`error`][`status`] === 401) {
                this.authService.logout();
                this.router.navigate(['/']);
            }
        });
    }

    // Add new task
    addNewTaskBlogs() {
        this.submitted = false;
        this.isBtnDissabled = false;
        this.projectDetail.push(this.addNewControlWithValue());
    }

    get projectDetail(): FormArray {
        return this.taskForm.get('taskList') as FormArray;
    }

    showHideControls(events) {
        this.isControlsVisible = events.target[`checked`];
        const groupItems = this.projectDetail.controls;

        if (this.isControlsVisible) {
            this.isBtnDissabled = false;
            groupItems.forEach((element) => {
                const actualHr = element[`controls`][`actualHr`];
                const status = element[`controls`][`status`];

                actualHr.setValidators([Validators.pattern(/^\s*\d{1,2}(?:\.\d{1,2})?\s*$/)]);
                actualHr.updateValueAndValidity();

                status.setValidators([Validators.required]);
                status.updateValueAndValidity();
            });
        } else {
            groupItems.forEach((element) => {
                const actualHr = element[`controls`][`actualHr`];
                const status = element[`controls`][`status`];

                actualHr.clearValidators();
                actualHr.updateValueAndValidity();

                status.clearValidators();
                status.updateValueAndValidity();
            });
        }
    }

    get f() { return this.taskForm.controls.taskList; }

    onSubmit(isFormValid) {
        this.submitted = true;

        if (!isFormValid) {
            return;
        }
        this.dashboardService.saveTask(this.taskForm.value).toPromise().then(res => {

            if (res && res[`data`]) {
                (this.projectDetail).clear();
                const taskList = res[`data`][`taskList`];
                this.disableEod = false;
                taskList.forEach((element) => {
                    setTimeout(() => {
                        this.projectDetail.push(this.addNewControlWithValue(element));
                    }, 100);
                });
            }

            this.isBtnDissabled = true;
            if (this.isControlsVisible) {
                this.isNewtaskDissabled = true;
                this.disableEod = true;
                Swal.fire({
                    text: 'Your EOD update has been succussfully sent.',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                }).then();
            } else {
                Swal.fire({
                    text: 'Successfully Added/Updated',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                }).then();
            }
        }).catch(err => {
            if (err && err.error) {
                this.backendError = err.error[`errorMessage`];
            }
            if (err[`error`] && err[`error`][`status`] === 401) {
                this.authService.logout();
                this.router.navigate(['/']);
            }
        });
    }

    trackByIndex(index) {
        return index;
    }

}
