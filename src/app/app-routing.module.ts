import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CustomPageComponent } from './custom-page/custom-page.component';
import { RuleGeneratorComponent } from './rule-generator/rule-generator.component';


const routes: Routes = [
  { path: '',  component: HomePageComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'signup',  component: SignupComponent },
  { path: 'custom_page',  component: CustomPageComponent },
  { path: 'rule_generator',  component: RuleGeneratorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
