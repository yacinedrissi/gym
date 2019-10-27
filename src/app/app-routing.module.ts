import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/signin',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './demo/dashboard/dashboard.module#DashboardModule',
        canActivate:[AuthGuard]
      },
      {
        path: 'basic',
        loadChildren: './demo/ui-elements/ui-basic/ui-basic.module#UiBasicModule'
      },
      {
        path: 'forms',
        loadChildren: './demo/pages/form-elements/form-elements.module#FormElementsModule'
      },
      {
        path: 'role',
        loadChildren: './demo/pages/role/role.module#RoleModule',
        canActivate:[AuthGuard],
        data : {roles : ['SUPER_ADMIN']}
      },
      {
        path: 'membres',
        loadChildren: './demo/pages/membres/membres.module#MembresModule',
        canActivate:[AuthGuard]
      },
      {
        path: 'detail',
        loadChildren: './demo/pages/detail/detail.module#DetailModule',
        canActivate:[AuthGuard]
      },
      {
        path: 'view-member',
        loadChildren: './demo/pages/view-member/view-membre.module#ViewMembresModule',
        canActivate:[AuthGuard]
      },
      {
        path: 'subscription',
        loadChildren: './demo/pages/subscription/subscription.module#SubscriptionModule',
        canActivate:[AuthGuard]
      },
      {
        path: 'forbidden',
        loadChildren: './demo/pages/forbidden/forbidden.module#ForbiddenModule',
        canActivate:[AuthGuard]
      },
      {
        path: 'permission',
        loadChildren: './demo/pages/permission/permission.module#PermissionModule',
        canActivate:[AuthGuard],
        data : {roles : ['SUPER_ADMIN']}
      },
      {
        path: 'user',
        loadChildren: './demo/pages/user/user.module#UserModule',
        canActivate:[AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: './demo/pages/profile/profile.module#ProfileModule',
        canActivate:[AuthGuard]
      },
      {
        path: 'gym',
        loadChildren: './demo/pages/gym/gym.module#GymModule',
        canActivate:[AuthGuard]
      },
      {
        path: 'tables',
        loadChildren: './demo/pages/tables/tables.module#TablesModule'
      },
      {
        path: 'charts',
        loadChildren: './demo/pages/core-chart/core-chart.module#CoreChartModule'
      },
      {
        path: 'sample-page',
        loadChildren: './demo/extra/sample-page/sample-page.module#SamplePageModule'
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './demo/pages/authentication/authentication.module#AuthenticationModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
