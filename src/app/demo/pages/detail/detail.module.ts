import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DetailComponent } from './detail.component';
import { DetailRoutingModule } from './detail-routing.module';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    DetailRoutingModule,
    FormsModule,
    DataTablesModule,
    SharedModule,
    NgbTabsetModule
  ],
  declarations: [DetailComponent]
})
export class DetailModule {


  
 }
