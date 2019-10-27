import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'button',
        loadChildren: './basic-button/basic-button.module#BasicButtonModule'
      },
      {
        path: 'badges',
        loadChildren: './basic-badge/basic-badge.module#BasicBadgeModule'
      },
      {
        path: 'breadcrumb-paging',
        loadChildren: './breadcrumb-paging/breadcrumb-paging.module#BreadcrumbPagingModule'
      },
      {
        path: 'collapse',
        loadChildren: './basic-collapse/basic-collapse.module#BasicCollapseModule'
      },
      {
        path: 'tabs-pills',
        loadChildren: './basic-tabs-pills/basic-tabs-pills.module#BasicTabsPillsModule'
      },
      {
        path: 'typography',
        loadChildren: './basic-typography/basic-typography.module#BasicTypographyModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiBasicRoutingModule { }
