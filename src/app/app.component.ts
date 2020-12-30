import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {

    title = 'Daily-Task-manager';
    role;

    constructor(
        private permissionsService: NgxPermissionsService
    ) {
        const role = JSON.parse(window.localStorage.getItem('userrole'));
        if (role) {
            this.permissionsService.loadPermissions(role);
        }
        if (!localStorage.getItem('userName')) {
            localStorage.clear();
        }
    }
}
