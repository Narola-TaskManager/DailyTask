import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    submitted = false;
    backendError;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.initFormGroup();
    }

    initFormGroup() {
        this.loginForm = this.formBuilder.group({
            username: new FormControl('', Validators.compose([
                Validators.required,
                Validators.email
            ])),
            password: new FormControl('', Validators.compose([Validators.required]))
        });
    }

    get f() { return this.loginForm.controls; }

    onSubmit(isFormValid) {
        this.submitted = true;

        if (!isFormValid) {
            return;
        }
        this.authService.login(this.loginForm.value).toPromise().then(res => {
            if (res && res[`data`]) {
                this.authService.setToken(res[`data`]);
                this.router.navigate(['/dashboard']);
            }
        }).catch(err => {
            if (err && err.error && err.error.errorMessage) {
                this.backendError = err.error.errorMessage;
            }
        });
    }

}
