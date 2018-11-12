// Core Modules
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GravatarModule } from 'ngx-gravatar';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { AgmCoreModule } from '@agm/core';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TimeagoModule } from 'ngx-timeago';

// Global Configurations
import * as global from './globals';

// Main Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule, BackendService } from './shared';

// Page Components
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { ThingNewComponent } from './pages/thing-new/thing-new.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { WeatherComponent } from './pages/weather/weather.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BreadcrumbComponent,

    // pages
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    ThingNewComponent,
    ProfileComponent,
    SidePanelComponent,
    WeatherComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AuthenticationModule,
    NgbModule,
    GravatarModule,
    TimeagoModule.forRoot(),
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG}),
    AgmCoreModule.forRoot({ apiKey: '' }),
    SimpleNotificationsModule.forRoot({
      timeOut: 3000,
    }),
  ],
  providers: [ Title, BackendService ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) { // set page tite based on `title` data of current route
        const title = 'I1820 | ' + this.route.snapshot.firstChild.data['title'];
        this.titleService.setTitle(title);
      }
    });
  }
}
