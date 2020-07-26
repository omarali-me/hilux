import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { pluck } from 'rxjs/operators';
import { FieldsService } from '../shared/fields.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  formData: any;
  profile$: Observable<any>;
  contactPerferencesOptions: any;
  timeToContactOptions: any;
  nationalitiesOptions: any;
  customerCategoryOptions: any;
  customerTypesOptions: any;
  emiratesOptions: any;
  otherIdTypesOptions: any;
  booleanOptions: any;
  genderOptions: any;
  minDate:any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService,
    private fieldsService: FieldsService
  ) { }

  ngOnInit(): void {
    this.minDate = new Date();
    this.loadContactPerferencesOptions();
    this.loadTimeToContactOptions();
    this.loadNationalitiesOptions();
    this.loadCustomerCategoryOptions();
    this.loadCustomerTypesOptions();
    this.loadEmiratesOptions();
    this.loadOtherIdTypesOptions();
    this.booleanOptions = [{
      key: '1',
      value: { en: 'Yes', ar: 'نعم' }
    },
    {
      key: '0',
      value: { en: 'No', ar: 'لا' }
    }]

    this.genderOptions = [{
      key: 'M',
      value: { en: 'Male', ar: 'Male' }
    },
    {
      key: 'F',
      value: { en: 'Female', ar: 'Female' }
    }]

    this.profile$ = this.route.data.pipe(pluck('profile'));
    this.profile$.subscribe((profile: any) => {
      if (profile && profile.id) {
        this.formData = profile as any;
      } else {
        this.formData = { hasTaxNumber: '0' };
      }
    });
  }

  saveData(formData: any) {
    let fd = new FormData();
    fd.append('customer', JSON.stringify(formData));
    this.http.post('https://wfe.ajm.re/AjmanLandProperty/index.php/customers/create', fd)
      .subscribe((data: any) => {
        this.formData = data;
        this.toastr.success('Customer Created Successfully!.', 'Success')
    }, (error) => {
      this.toastr.error('Something went Wrong', 'Error')
    })
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
    return this.formData.profileImage ? [this.formData.profileImage] : [];
  }

  isCustomerDisabled() {
    return this.formData.customerCategoryId == 'handicapped';
  }

  isValid() {
    return (!!this.formData.emiratesId || !!this.formData.passportNumber || !!this.formData.otherId)
  }

  getSignatureAttachments() {
    return this.formData.signature ? [this.formData.signature] : [];
  }

  prepareImageField() {
    return {
      fieldID: "image",
      fieldType: "image",
      required: false,
      fieldName: {
        "ar": "image",
        "en": "image"
      }
    }
  }

  prepareSignatureField() {
    return {
      fieldID: "signature",
      fieldType: "signature",
      required: false,
      fieldName: {
        "ar": "signature",
        "en": "signature"
      }
    }
  }
}
