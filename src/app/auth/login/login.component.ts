import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from '../service/auth.service';
import { EC_ROLES } from '../../share/constants';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    backendError;
    submitted = false;
    disabledBtn = false;
    userIds = [57, 76, 109, 71];

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private permissionsService: NgxPermissionsService
    ) { }

    ngOnInit(): void {
        this.initFormGroup();
        const isLoggedIn = this.authService.checkUserLoggedIn();
        if (isLoggedIn) {
            this.router.navigate(['/dashboard']);
        } else {
            this.router.navigate(['/']);
        }
    }

    initFormGroup() {
        this.loginForm = this.formBuilder.group({
            username: new FormControl('', [
                Validators.required,
                Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
            ]),
            password: new FormControl('', Validators.compose([Validators.required]))
        });
    }

    get f() { return this.loginForm.controls; }

    onSubmit(isFormValid) {
        this.submitted = true;

        if (!isFormValid) {
            return;
        }
        this.disabledBtn = true;
        this.authService.login(this.loginForm.value).toPromise().then(res => {
            if (res && res[`data`]) {
                const loginRes = res[`data`];
                this.authService.setToken(loginRes.token);
                localStorage.setItem('userName', loginRes.userFullName);
                let permissionsArr = [];
                if (EC_ROLES.ADMIN.indexOf(loginRes.roleId.trim()) > -1) {
                    permissionsArr = ['ROLE_ADMIN'];
                    localStorage.setItem('userrole', JSON.stringify(permissionsArr));
                    this.permissionsService.loadPermissions(permissionsArr);
                    this.router.navigate(['/updates']);
                } else {
                    permissionsArr = ['ROLE_USER'];
                    localStorage.setItem('userrole', JSON.stringify(permissionsArr));
                    this.permissionsService.loadPermissions(permissionsArr);
                    this.router.navigate(['/dashboard']);
                }
            }
        }).catch(err => {
            this.disabledBtn = false;
            if (err && err.error && err.error.errorMessage) {
                this.backendError = err.error.errorMessage;
            }
        });
    }

}
