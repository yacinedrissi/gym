import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembresComponent } from './membres.component';

const routes: Routes = [
  {
    path: '',
    component: MembresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembresRoutingModule { }
