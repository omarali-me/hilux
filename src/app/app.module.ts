import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { InputFieldComponent } from './fields/input-field/input-field.component';
import { SelectFieldComponent } from './fields/select-field/select-field.component';
import { TextAreaFieldComponent } from './fields/text-area-field/text-area-field.component';
import { AutocompleteFieldComponent } from './fields/autocomplete-field/autocomplete-field.component';
import { DateFieldComponent } from './fields/date-field/date-field.component';
import { NumberFieldComponent } from './fields/number-field/number-field.component';
import { LabelComponent } from './tags/label/label.component';
import { HeadingComponent } from './tags/heading/heading.component';
import { FieldComponent } from './fields/field/field.component';
import { FileUploadComponent } from './fields/file-upload/file-upload.component';
import { RadioButtonFieldComponent } from './fields/radio-button-field/radio-button-field.component';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { CurrencyFieldComponent } from './fields/currency-field/currency-field.component';
import { CheckboxFieldComponent } from './fields/checkbox-field/checkbox-field.component';
import { EntitySelectComponent } from './fields/entity-select/entity-select.component';
import { StepSelectComponent } from './fields/step-select/step-select.component';
import { DisplayFieldsComponent } from './tags/display-fields/display-fields.component';
import { DisplayImageComponent } from './tags/display-image/display-image.component';
import { DisplayImageGroupComponent } from './tags/display-image-group/display-image-group.component';
import { DisplayPdfComponent } from './tags/display-pdf/display-pdf.component';
import { DisplayPdfGalleryComponent } from './tags/display-pdf-gallery/display-pdf-gallery.component';
import { DisplayTableComponent } from './tags/display-table/display-table.component';
import { DisplayFieldDataComponent } from './tags/display-field-data/display-field-data.component';
import { DisplayFieldGroupComponent } from './tags/display-field-group/display-field-group.component';
import { CustomPageComponent } from './custom-page/custom-page.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    SignupComponent,
    InputFieldComponent,
    SelectFieldComponent,
    TextAreaFieldComponent,
    AutocompleteFieldComponent,
    DateFieldComponent,
    NumberFieldComponent,
    LabelComponent,
    HeadingComponent,
    FieldComponent,
    FileUploadComponent,
    RadioButtonFieldComponent,
    CurrencyFieldComponent,
    CheckboxFieldComponent,
    EntitySelectComponent,
    StepSelectComponent,
    DisplayFieldsComponent,
    DisplayImageComponent,
    DisplayImageGroupComponent,
    DisplayPdfComponent,
    DisplayPdfGalleryComponent,
    DisplayTableComponent,
    DisplayFieldDataComponent,
    DisplayFieldGroupComponent,
    CustomPageComponent,
    FormComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    NgSelectModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [{provide: OWL_DATE_TIME_LOCALE, useValue: 'ar'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
