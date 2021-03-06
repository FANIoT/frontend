import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublicGuard, ProtectedGuard } from 'ngx-auth';

// User Login / Register Pages
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

// Dashboard Pages
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { ThingNewComponent } from './pages/thing-new/thing-new.component';
import { ProjectNewComponent } from './pages/project-new/project-new.component';
import { ProjectChartComponent } from './pages/project-chart/project-chart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { ThingDetailComponent } from './pages/thing-detail/thing-detail.component';
import { ThingChartComponent } from './pages/thing-chart/thing-chart.component';

const routes: Routes = [
  { // by default client is redirected to login page.
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ PublicGuard ],
    data: { title: 'Login' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [ PublicGuard ],
    data: { title: 'Register' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ ProtectedGuard ],
    data: { title: 'Dashboard' }
  },
  {
    path: 'weather',
    component: WeatherComponent,
    canActivate: [ ProtectedGuard ],
    data: { title: 'Weather' }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ ProtectedGuard ],
    data: { title: 'Profile' }
  },
  {
    path: 'projects',
    canActivate: [ ProtectedGuard ],
    data: { title: 'Projects' },
    children: [
      {
        path: '',
        component: ProjectsComponent,
        data: { title: '' }, // override parent title
      },
      {
        path: 'new',
        component: ProjectNewComponent,
        data: { title: 'Project Creation' },
      },
      {
        path: ':id',
        data: { title: 'Project Detail' },
        children: [
          {
            path: '',
            component: ProjectDetailComponent,
            data: { title: '' }, // override parent title
          },
          {
            path: 'chart',
            component: ProjectChartComponent,
            data: { title: 'Project Chart' },
          },
          {
            path: 'things',
            data: { title: '-' }, // override parent title, dash indicates that this route exists only in url.
            children: [
              {
                path: 'new',
                component: ThingNewComponent,
                data: { title: 'Thing Creation' },
              },
              {
                path: ':tid',
                data: { title: 'Thing Detail' },
                children: [
                  {
                    path: '',
                    component: ThingDetailComponent,
                    data: { title: '' }, // override parent title
                  },
                  {
                    path: 'chart',
                    component: ThingChartComponent,
                    data: { title: 'Thing Chart' },
                  }
                ],
              }
            ],
          },
        ],
      }
    ],
  },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(routes, config) ],
  exports: [ RouterModule ],
  declarations: []
})


export class AppRoutingModule { }
