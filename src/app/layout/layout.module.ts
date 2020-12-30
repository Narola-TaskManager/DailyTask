import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        NgbTooltipModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ]
})
export class LayoutModule { }
