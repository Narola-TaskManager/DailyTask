import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareModule } from './share/share.module';
import { AuthenticationGuard } from './core/guard/authentication.guard';
import { NgxPermissionsModule } from 'ngx-permissions';
import { LayoutModule } from './layout/layout.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CoreModule,
        NgbModule,
        LayoutModule,
        ShareModule,
        NgxPermissionsModule.forRoot()
    ],
    providers: [
        AuthenticationGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
