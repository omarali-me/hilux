import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { pluck } from 'rxjs/operators';
import { FieldsService } from '../shared/fields.service';
import { NgxGalleryOptions, NgxGalleryAnimation, NgxGalleryImage } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  formData: any;
  profileId: Observable<any>;
  contactPerferencesOptions: any;
  timeToContactOptions: any;
  nationalitiesOptions: any;
  customerCategoryOptions: any;
  customerTypesOptions: any;
  emiratesOptions: any;
  otherIdTypesOptions: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService,
    private fieldsService: FieldsService
  ) { }

  ngOnInit(): void {
    this.loadContactPerferencesOptions();
    this.loadTimeToContactOptions();
    this.loadNationalitiesOptions();
    this.loadCustomerCategoryOptions();
    this.loadCustomerTypesOptions();
    this.loadEmiratesOptions();
    this.loadOtherIdTypesOptions();

    this.profileId = this.route.data.pipe(pluck('profileId'));
    this.profileId.subscribe((profileId) => {
      // let fd = new FormData();
      // fd.append('data', JSON.stringify({ profileId: _.toInteger(service)}));
      this.http.get(`http://localhost:3000/customer`, { params: { profileId }})
        .subscribe((data: any) =>{
          // if (data.status == 'success') {
            // this.toastr.success(data.message, 'Success')
            this.formData = data;
            // this.galleryImages = CustomerProfileComponent.prepareGalleryImages([data.profileImage]);
          // } else {
          //   this.toastr.error(data.message, 'Error')
          // }
        })
    })
    // this.galleryOptions = this.prepareGalleryOptions(1);
  }

  saveData(formData: any) {
    console.log('here data is ', formData);
  }

  loadContactPerferencesOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/contactPreferencesTypes`)
    .subscribe((data) => {
      this.contactPerferencesOptions = data;
    })
  }

  loadTimeToContactOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/timeToContactPreferences`)
    .subscribe((data) => {
      this.timeToContactOptions = data;
    })
  }

  loadNationalitiesOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/nationalities`)
    .subscribe((data) => {
      this.nationalitiesOptions = data;
    })
  }

  loadCustomerCategoryOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/customersCategories`)
    .subscribe((data) => {
      this.customerCategoryOptions = data;
    })
  }

  loadCustomerTypesOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/customerTypes`)
    .subscribe((data) => {
      this.customerTypesOptions = data;
    })
  }

  loadEmiratesOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/emirates`)
    .subscribe((data) => {
      this.emiratesOptions = data;
    })
  }

  loadOtherIdTypesOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/otherIdTypes`)
    .subscribe((data) => {
      this.otherIdTypesOptions = data;
    })
  }

  getAttachments() {
    return this.formData.profileImage ? [this.formData.profileImage] : ['assets/images/user4-128x128.jpg'];
  }
}
