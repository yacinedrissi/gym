import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionComponent } from './permission.component';
import { PermissionRoutingModule } from './permission-routing.module';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  imports: [
    MaterialModule,
    //BrowserAnimationsModule,
    CommonModule,
    PermissionRoutingModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule 

    //SharedModule
  ],
  declarations: [PermissionComponent]
})
export class PermissionModule { }
