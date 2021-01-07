import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { DashboardService } from '../service/dashboard.service';

@Component({
    selector: 'app-projects-googlesheet',
    templateUrl: './projects-googlesheet.component.html',
    styleUrls: ['./projects-googlesheet.component.css'],
    providers: [NgbModalConfig, NgbModal]
})
export class ProjectsGooglesheetComponent implements OnInit {

    projectsDetails = [];
    projectDropdown = [];
    googleLinkForm: FormGroup;
    submitted = false;
    backendError;
    isEditLink = false;
    selectedProjectForEdit = {};

    constructor(
        private dashboardService: DashboardService,
        private config: NgbModalConfig,
        private modalService: NgbModal,
        private formBuilder: FormBuilder,
    ) {
        this.config.backdrop = 'static';
        this.config.keyboard = false;
    }

    ngOnInit(): void {
        this.getProjectData();
        this.initFormGroup();
    }

    getProjectData() {
        this.dashboardService.getProject().toPromise().then(res => {
            if (res && res[`data`]) {
                this.projectsDetails = res[`data`];
                res[`data`].forEach(project => {
                    if (!project[`googleSpreadSheetUrl`]) {
                        this.projectDropdown.push(project);
                    }
                });
            }
        }).catch(err => {
            this.projectsDetails = [];
        });
    }

    initFormGroup() {
        this.googleLinkForm = this.formBuilder.group({
            projectId: new FormControl(null, [Validators.required]),
            googleSpreadsheetUrl: new FormControl('', [Validators.required]),
        });
    }

    changeProjectValue() {
        console.log('change dropdown');
    }

    addEditGooleLink(projectId) {
        if (projectId) {
            this.isEditLink = true;
            this.selectedProjectForEdit = this.projectsDetails.find((item) => Number(item.projectId) === Number(projectId));
            if (this.selectedProjectForEdit) {
                this.setGoogleFormValue(this.selectedProjectForEdit);
            }
        } else {
            this.googleLinkForm.reset();
        }
    }

    setGoogleFormValue(response) {
        if (response) {
            this.googleLinkForm.setValue({
                projectId: response[`projectId`],
                googleSpreadsheetUrl: response[`googleSpreadSheetUrl`]
            });
        }
    }

    open(content) {
        this.submitted = false;
        this.backendError = '';
        this.modalService.open(content);
    }

    closePopup() {
        this.googleLinkForm.reset();
        this.isEditLink = false;
    }

    openSheet(url) {
        if (url) {
            window.open(url, '_blank');
        } else {
            window.open('https://docs.google.com/spreadsheets/d/17K4TQag54D5ucTD1LV_dLn7eu7FtlIZJtusk19eRlPs/' +
                'edit?ts=5ff5533e#gid=804801340', '_blank');
        }
    }

    onSubmit() {
        this.submitted = true;
        if (!this.googleLinkForm.valid) {
            return;
        }
        this.backendError = '';
        const fromValue = this.googleLinkForm.value;
        fromValue[`projectId`] = Number(fromValue[`projectId`]);
        this.dashboardService.saveGoogleLink(fromValue, fromValue[`projectId`]).toPromise().then(res => {

            this.modalService.dismissAll();
            this.googleLinkForm.reset();
            this.submitted = false;
            let messageText = 'Link saved successfully';

            if (this.isEditLink) {
                messageText = 'Link updated successfully';
            }
            Swal.fire({
                text: messageText,
                icon: 'success',
                confirmButtonText: 'Ok',
            }).then();

            this.projectDropdown = [];
            this.getProjectData();
            this.isEditLink = false;
        }).catch(err => {
            if (err && err.error) {
                this.backendError = err.error[`errorMessage`];
            }
        });


    }

}
