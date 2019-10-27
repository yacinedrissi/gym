import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewMemberComponent } from './view-member.component';
import { ViewMembreRoutingModule } from './view-member-routing.module';
@NgModule({
  imports: [
    MaterialModule,
    //BrowserAnimationsModule,
    CommonModule,
    ViewMembreRoutingModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule ,
    SharedModule,
    NgbTabsetModule
    //SharedModule
  ],
  declarations: [ViewMemberComponent]
})
export class ViewMembresModule { }
