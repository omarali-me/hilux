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
import { ProfileIdResolver } from './profileId.resolver';


const routes: Routes = [
  { path: '',  component: HomePageComponent, canActivate: [AuthenticationGuard] },
  { path: 'login',  component: LoginComponent },
  // { path: 'signup',  component: SignupComponent },
  { path: 'custom_page',  component: CustomPageComponent, canActivate: [AuthenticationGuard] },
  { path: 'my_tasks',  component: MyTasksComponent, canActivate: [AuthenticationGuard] },
  { path: 'rule_generator',  component: RuleGeneratorComponent, canActivate: [AuthenticationGuard] },
  { path: 'service/:serviceId', component: ServicePageComponent, resolve: { serviceId: ServiceIdResolver} , canActivate: [AuthenticationGuard]},
  { path: 'notifications/:stepId', component: NotificationPageComponent, resolve: { stepId: StepIdResolver}, canActivate: [AuthenticationGuard]},
  { path: 'profile/:profileId', component: CustomerProfileComponent, resolve: { profileId: ProfileIdResolver}, canActivate: [AuthenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [StepIdResolver, ServiceIdResolver, ProfileIdResolver]
})
export class AppRoutingModule { }
