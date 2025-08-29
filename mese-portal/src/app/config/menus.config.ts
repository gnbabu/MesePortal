// config/menus.config.ts

import { IMenu } from '../core/models/core.models';

export const ALL_MENUS: IMenu[] = [
  // Public menus
  {
    id: 'home',
    label: 'Home',
    icon: 'house',
    iconClass: '',
    route: '/home',
    order: 1,
    isPublic: true,
  },
  {
    id: 'about',
    label: 'About',
    icon: 'info-circle',
    route: '/about',
    iconClass: '',
    order: 2,
    isPublic: true,
  },
  {
    id: 'login',
    label: 'Login',
    icon: 'box-arrow-in-right',
    iconClass: '',
    route: '/login',
    order: 3,
    isPublic: true,
  },

  // Protected menus
  {
    id: 'dashboard',
    iconClass: '',
    label: 'Dashboard',
    icon: 'speedometer',
    route: '/dashboard',
    order: 4,
  },
  {
    id: 'profile',
    label: 'My Profile',
    iconClass: '',
    icon: 'person',

    route: '/profile',
    order: 5,
  },
  {
    id: 'users',
    label: 'User Management',
    icon: 'people',
    iconClass: '',
    route: '/users',
    order: 6,
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'bar-chart',
    iconClass: '',
    route: '/reports',
    order: 7,
  },
];
