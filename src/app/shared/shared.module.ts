import { NgModule } from '@angular/core';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { CommonModule, CurrencyPipe, DecimalPipe, DatePipe } from '@angular/common';
import { AuthenticationService } from './authentication.service';
import { FieldsService } from './fields.service';
import { FormsModule } from '@angular/forms';
import { NumbersOnlyDirective } from './numbers-only.directive';
import { NumbersformatterDirective } from './numbersformatter.directive';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotificationsComponent } from './layouts/header/notifications/notifications.component';
import { TimeAgoPipe } from './time-ago.pipe';
import { RouterModule } from '@angular/router';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import { MediaGalleryComponent } from './media-gallery/media-gallery.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    NgxGalleryModule,
  ],
  providers: [AuthenticationService, FieldsService, DecimalPipe, CurrencyPipe, TimeAgoPipe, DatePipe],
  declarations: [
    HeaderComponent,
    FooterComponent,
    NumbersOnlyDirective,
    NumbersformatterDirective,
    SidebarComponent,
    NotificationsComponent,
    TimeAgoPipe,
    MediaGalleryComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NumbersOnlyDirective,
    NumbersformatterDirective,
    SidebarComponent,
    MediaGalleryComponent
  ]
})
export class SharedModule {}
