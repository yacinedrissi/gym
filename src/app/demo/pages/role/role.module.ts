import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../theme/shared/shared.module';
import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    RoleRoutingModule,
    FormsModule,
    DataTablesModule
  ],
  declarations: [RoleComponent]
})
export class RoleModule {


  
 }
