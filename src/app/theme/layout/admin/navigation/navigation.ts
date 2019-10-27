import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from 'src/app/demo/pages/authentication/auth-signin/login.service';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems: any = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard/default',
        icon: 'feather icon-home',
        classes: 'nav-item'
      }
    ]
  },
  {
    id: 'role',
    title: 'Manage Roles',
    type: 'item',
    url: '/role',
    icon: 'feather icon-link-2',
    classes: 'nav-item',
  },
  {
    id: 'permission',
    title: 'Manage Permissions',
    type: 'item',
    url: '/permission',
    icon: 'feather  icon-link-2',
    classes: 'nav-item'
  },
  /* {
    id: 'profile',
    title: 'Profile',
    type: 'item',
    url: '/profile',
    icon: 'feather  icon-user',
    classes: 'nav-item'
  }, */
  {
    id: 'user',
    title: 'Users',
    type: 'item',
    url: '/user',
    icon: 'feather  icon-users',
    classes: 'nav-item'
  },
  {
    id: 'gym',
    title: 'Manage Gym',
    type: 'item',
    url: '/gym',
    icon: 'feather  icon-shield',
    classes: 'nav-item'
  },
 

  /* {
    id: 'ui-element',
    title: 'UI ELEMENT',
    type: 'group',
    icon: 'icon-ui',
    children: [
      {
        id: 'components',
        title: 'Components',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'button',
            title: 'Button',
            type: 'item',
            url: '/basic/button'
          },
          {
            id: 'badges',
            title: 'Badges',
            type: 'item',
            url: '/basic/badges'
          },
          {
            id: 'breadcrumb-pagination',
            title: 'Breadcrumb & Pagination',
            type: 'item',
            url: '/basic/breadcrumb-paging'
          },
          {
            id: 'collapse',
            title: 'Collapse',
            type: 'item',
            url: '/basic/collapse'
          },
          {
            id: 'tabs-pills',
            title: 'Tabs & Pills',
            type: 'item',
            url: '/basic/tabs-pills'
          },
          {
            id: 'typography',
            title: 'Typography',
            type: 'item',
            url: '/basic/typography'
          }
        ]
      }
    ]
  },
  {
    id: 'forms',
    title: 'Forms & Tables',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'forms-element',
        title: 'Forms Elements',
        type: 'item',
        url: '/forms/basic',
        icon: 'feather icon-file-text',
        classes: 'nav-item'
      },
      {
        id: 'tables',
        title: 'Tables',
        type: 'item',
        url: '/tables/bootstrap',
        icon: 'feather icon-server',
        classes: 'nav-item'
      }
    ]
  },
  {
    id: 'chart-maps',
    title: 'Chart',
    type: 'group',
    icon: 'icon-charts',
    children: [
      {
        id: 'charts',
        title: 'Charts',
        type: 'item',
        url: '/charts/morris',
        icon: 'feather icon-pie-chart',
        classes: 'nav-item'
      }
    ]
  },
  {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    icon: 'icon-pages',
    children: [
      {
        id: 'auth',
        title: 'Authentication',
        type: 'collapse',
        icon: 'feather icon-lock',
        children: [
          {
            id: 'signup',
            title: 'Signup',
            type: 'item',
            url: '/auth/signup',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'signin',
            title: 'Signin',
            type: 'item',
            url: '/auth/signin',
            target: true,
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        icon: 'feather icon-sidebar',
        classes: 'nav-item'
      },
      {
        id: 'disabled-menu',
        title: 'Disabled Menu',
        type: 'item',
        url: 'javascript:',
        classes: 'nav-item disabled',
        icon: 'feather icon-power',
        external: true
      },
      {
        id: 'byu-now',
        title: 'Buy Now',
        type: 'item',
        url: 'https://codedthemes.com/',
        classes: 'nav-item',
        icon: 'feather icon-users',
        external: true,
        target: true
      }
    ]
  } */
];

@Injectable()
export class NavigationItem {
  constructor(public loginServ: LoginService) {


  }
  get() {

    if (this.loginServ.roleMatch(["SUPER_ADMIN"]) == false) {
     console.log(this.loginServ.roleMatch(["SUPER_ADMIN"]));
     
      NavigationItems[1].hidden = true
      NavigationItems[2].hidden = true
      NavigationItems[3].hidden = true
    }
    return NavigationItems;


  }

}
