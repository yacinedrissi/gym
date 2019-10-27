import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import {SharedModule} from '../../../theme/shared/shared.module';
import { DefaultComponent } from './default.component';
import {NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    DefaultRoutingModule,
    SharedModule,
    NgbTabsetModule
  ],
  declarations: [DefaultComponent]
})
export class DefaultModule { }
