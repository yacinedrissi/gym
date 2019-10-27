import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { GymComponent } from './gym.component';
import { GymRoutingModule } from './gym-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    GymRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    SharedModule
  ],
  declarations: [GymComponent]
})
export class GymModule {


  
 }
