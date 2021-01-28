import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isLogin = false;
    loadSyncIcon = false;

    constructor(
        private authService: AuthService
    ) {
        this.isLogin = this.authService.checkUserLoggedIn();
        this.authService.authStatus.subscribe((message) => {
            if (message === 'login' || message === 'logout') {
                this.isLogin = this.authService.checkUserLoggedIn();
            }
        });
    }

    ngOnInit(): void { }

    logout() {
        this.authService.logout();
        this.isLogin = this.authService.checkUserLoggedIn();
    }

    syncWithEasyCollab() {
        this.loadSyncIcon = true;
        this.authService.syncEasyCollab().toPromise().then(res => {
            if (res && (res[`errorMessage`] === null)) {
                this.loadSyncIcon = false;
                window.location.reload();
                Swal.fire({
                    text: 'Sync Successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                }).then();
            } else if (res && (res[`errorMessage`] !== null)) {
                this.loadSyncIcon = false;
                Swal.fire({
                    text: res[`errorMessage`],
                    icon: 'error',
                    confirmButtonText: 'Ok',
                }).then();
            }
        }).catch(err => {
            this.loadSyncIcon = false;
            if (err) {
                Swal.fire({
                    text: err[`error`][`errorMessage`],
                    icon: 'error',
                    confirmButtonText: 'Ok',
                }).then();
            }
        });
    }
}
