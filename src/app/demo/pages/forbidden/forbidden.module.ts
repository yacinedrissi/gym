import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForbiddenRoutingModule } from './forbidden-routing.module';
import { ForbiddenComponent } from './forbidden.component';

@NgModule({
  imports: [
    CommonModule,
    ForbiddenRoutingModule,
    FormsModule
  ],
  declarations: [ForbiddenComponent]
})
export class ForbiddenModule { }
