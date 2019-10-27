import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { MaterialModule } from 'src/app/material.module';
import { MembresComponent } from './membres.component';
import { MembresRoutingModule } from './membres-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    MaterialModule,
    //BrowserAnimationsModule,
    CommonModule,
    MembresRoutingModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule ,
    SharedModule,
    NgbTabsetModule
    //SharedModule
  ],
  declarations: [MembresComponent]
})
export class MembresModule { }
