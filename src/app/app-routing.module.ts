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


const routes: Routes = [
  { path: '',  component: HomePageComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'signup',  component: SignupComponent },
  { path: 'custom_page',  component: CustomPageComponent },
  { path: 'my_tasks',  component: MyTasksComponent },
  { path: 'rule_generator',  component: RuleGeneratorComponent },
  { path: 'service/:serviceId', component: ServicePageComponent, resolve: { serviceId: ServiceIdResolver}},
  { path: 'notifications/:stepId', component: NotificationPageComponent, resolve: { stepId: StepIdResolver}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [StepIdResolver, ServiceIdResolver]
})
export class AppRoutingModule { }
