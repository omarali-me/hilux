import { NgModule } from '@angular/core';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { AuthenticationService } from './authentication.service';
import { FieldsService } from './fields.service';
import { FormsModule } from '@angular/forms';
import { NumbersOnlyDirective } from './numbers-only.directive';
import { NumbersformatterDirective } from './numbersformatter.directive';

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  providers: [AuthenticationService, FieldsService, DecimalPipe, CurrencyPipe],
  declarations: [
    HeaderComponent,
    FooterComponent,
    NumbersOnlyDirective,
    NumbersformatterDirective,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NumbersOnlyDirective,
    NumbersformatterDirective
  ]
})
export class SharedModule {}
