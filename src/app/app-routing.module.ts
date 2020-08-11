import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CustomPageComponent } from './custom-page/custom-page.component';
import { RuleGeneratorComponent } from './rule-generator/rule-generator.component';
import { ServiceIdResolver } from './service-id.resolver';
import { ServicePageComponent } from './service-page/service-page.component';
import { StepIdResolver } from './stepId.resolver';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { AuthenticationGuard } from './authentication.guard';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { ProjectProfileComponent } from './project-profile/project-profile.component';
import { UnitProfileComponent } from './unit-profile/unit-profile.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { CustomerProfileResolver } from './customer-profile.resolver';
import { CustomerDetailsComponent } from './customer-profile/customer-details/customer-details.component';
import { ProjectProfileResolver } from './shared/project-profile.resolver';
import { UnitProfileResolver } from './shared/unit-profile.resolver';
import { CompanyProfileResolver } from './shared/company-profile.resolver';
import { UnitDetailsComponent } from './unit-profile/unit-details/unit-details.component';
import { ProjectDetailsComponent } from './project-profile/project-details/project-details.component';
import { ErrorPageComponent } from './error-page/error-page.component';


const routes: Routes = [
  { path: '',  component: HomePageComponent, canActivate: [AuthenticationGuard] },
  { path: 'login',  component: LoginComponent },
  // { path: 'signup',  component: SignupComponent },
  { path: 'error',  component: ErrorPageComponent },
  { path: 'custom_page',  component: CustomPageComponent, canActivate: [AuthenticationGuard] },
  { path: 'my_tasks',  component: MyTasksComponent, canActivate: [AuthenticationGuard] },
  { path: 'rule_generator',  component: RuleGeneratorComponent, canActivate: [AuthenticationGuard] },
  { path: 'service/:serviceId', component: ServicePageComponent, resolve: { serviceId: ServiceIdResolver} , canActivate: [AuthenticationGuard]},
  { path: 'notifications/:stepId', component: NotificationPageComponent, resolve: { stepId: StepIdResolver}, canActivate: [AuthenticationGuard]},
  { path: 'customer/new', component: CustomerProfileComponent, resolve: { profile: CustomerProfileResolver}, canActivate: [AuthenticationGuard] },
  { path: 'customer/profile/:profileId', component: CustomerProfileComponent,
    resolve: { profile: CustomerProfileResolver},
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', redirectTo: 'edit', pathMatch: 'full' },
      { path: 'edit', component: CustomerDetailsComponent }
    ]
  },
  { path: 'project/new', component: ProjectProfileComponent, resolve: { profile: ProjectProfileResolver}, canActivate: [AuthenticationGuard] },
  { path: 'project/profile/:profileId', component: ProjectProfileComponent,
    resolve: { profile: ProjectProfileResolver}, canActivate: [AuthenticationGuard],
    children: [
      { path: '', redirectTo: 'edit', pathMatch: 'full' },
      { path: 'edit', component: ProjectDetailsComponent }
    ]
  },
  { path: 'unit/new', component: UnitProfileComponent, resolve: { profile: UnitProfileResolver}, canActivate: [AuthenticationGuard] },
  { path: 'unit/profile/:profileId', component: UnitProfileComponent,
    resolve: { profile: UnitProfileResolver},
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', redirectTo: 'edit', pathMatch: 'full' },
      { path: 'edit', component: UnitDetailsComponent }
    ]
  },
  { path: 'company/new', component: CompanyProfileComponent, resolve: { profile: CompanyProfileResolver} },
  { path: 'company/profile/:profileId', component: CompanyProfileComponent,
    resolve: { profile: CompanyProfileResolver},
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', redirectTo: 'edit', pathMatch: 'full' },
      { path: 'edit', component: CustomerDetailsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule],
  providers: [StepIdResolver, ServiceIdResolver, CustomerProfileResolver, ProjectProfileResolver, UnitProfileResolver, CompanyProfileResolver]
})
export class AppRoutingModule { }
