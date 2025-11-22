import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'workout-list',
    loadComponent: () => import('./pages/workout-list/workout-list.page').then( m => m.WorkoutListPage)
  },
 
  {
    path: 'progress',
    loadComponent: () => import('./pages/progress/progress.page').then( m => m.ProgressPage)
  },
  {
    path:  'workout-detail/:uid',
    loadComponent: () => import('./pages/workout-detail/workout-detail.page').then( m => m.WorkoutDetailPage)
  },
  {
    path: 'qoutes',
    loadComponent: () => import('./pages/qoutes/qoutes.page').then( m => m.QoutesPage)
  },
];
