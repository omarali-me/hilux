import { NgModule } from '@angular/core';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './authentication.service';

@NgModule({
  imports: [],
  providers: [AuthenticationService],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule {}
