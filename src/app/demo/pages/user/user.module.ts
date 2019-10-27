import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
   FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [UserComponent]
})
export class UserModule {


  
 }
