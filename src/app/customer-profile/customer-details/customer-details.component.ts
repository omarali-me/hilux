import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FieldsService } from '../../shared/fields.service';
import { pluck } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';
import { LookupsService } from 'src/app/shared/lookups.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  formData: any;
  profile$: Observable<any>;
  contactPerferencesOptions: any;
  timeToContactOptions: any;
  nationalitiesOptions: any;
  customerCategoryOptions: any;
  customerTypesOptions: any;
  emiratesOptions: any;
  otherIdTypesOptions: any;
  disabilityTypesOptions: any;
  booleanOptions: any;
  genderOptions: any;
  minDate:any;
  formErrors:any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private fieldsService: FieldsService,
    private lookupsService: LookupsService
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
    this.loadDisablilityTypesOptions();

    this.booleanOptions = [{
      key: 1,
      value: { en: 'Yes', ar: 'نعم' }
    },
    {
      key: 0,
      value: { en: 'No', ar: 'لا' }
    }]

    this.genderOptions = [{
      key: 'M',
      value: { en: 'Male', ar: 'ذكر' }
    },
    {
      key: 'F',
      value: { en: 'Female', ar: 'أنثى' }
    }]

    this.profile$ = this.route.data.pipe(pluck('profile'));
    this.profile$.subscribe((profile: any) => {
      if (profile && profile.id) {
        this.formData = this.prepareProfile(profile) as any;
      } else {
        this.formData = { hasTrx: 0 };
      }
    });
  }

  updateData(formData: any) {
    let fd = new FormData();
    fd.append('customer', JSON.stringify(formData));
    this.http.post(`${environment.apiHost}/AjmanLandProperty/index.php/customers/update/${formData.id}`, fd)
      .subscribe((data: any) => {
        if (data.status == 'success') {
          this.formData = this.prepareProfile(data.data);
          this.toastr.success(data.message, 'Success');
        } else {
          this.formErrors = data.data;
          this.toastr.error(JSON.stringify(data.message), 'Error')
        }
    }, (error) => {
      this.toastr.error('Something went Wrong', 'Error')
      this.router.navigate(['error'])
    })
  }

  loadContactPerferencesOptions() {
    this.lookupsService.loadContactPerferencesOptions()
    .subscribe((data) => {
      this.contactPerferencesOptions = data;
    })
  }

  loadTimeToContactOptions() {
    this.lookupsService.loadTimeToContactOptions()
    .subscribe((data) => {
      this.timeToContactOptions = data;
    })
  }

  loadNationalitiesOptions() {
    this.lookupsService.loadNationalitiesOptions()
    .subscribe((data) => {
      this.nationalitiesOptions = data;
    })
  }

  loadCustomerCategoryOptions() {
    this.lookupsService.loadCustomerCategoryOptions()
    .subscribe((data) => {
      this.customerCategoryOptions = data;
    })
  }

  loadCustomerTypesOptions() {
    this.lookupsService.loadCustomerTypesOptions()
    .subscribe((data) => {
      this.customerTypesOptions = data;
    })
  }

  loadEmiratesOptions() {
    this.lookupsService.loadEmiratesOptions()
    .subscribe((data) => {
      this.emiratesOptions = data;
    })
  }

  loadOtherIdTypesOptions() {
    this.lookupsService.loadOtherIdTypesOptions()
    .subscribe((data) => {
      this.otherIdTypesOptions = data;
    })
  }

  loadDisablilityTypesOptions() {
    this.lookupsService.loadDisablilityTypesOptions()
    .subscribe((data) => {
      this.disabilityTypesOptions = data;
    })
  }
  getAttachments() {
    return this.formData.profileImage ? [this.formData.profileImage] : [];
  }

  isCustomerDisabled() {
    return (this.formData.customerCategoryId == '1' || this.formData.customerCategoryId == 1);
  }

  isValid() {
    return (this.formData.isDead ? true : (!!this.formData.emiratesId || !!this.formData.passportNumber || !!this.formData.otherId))
  }

  getSignatureAttachments() {
    return this.formData.signature ? [this.formData.signature] : [];
  }

  hasTaxNumber() {
    return (this.formData.hasTrx == 1 || this.formData.hasTrx == '1');
  }

  isRequired() {
    return !this.formData.isDead;
  }

  isOneOrOtherNameRequired(fieldName: string) {
    if (this.formData.isDead) {
      if (fieldName == 'nameAr') {
        return !this.formData.nameAr && !this.formData.nameEn
      } else {
        return !this.formData.nameEn && !this.formData.nameAr
      }
    } else {
      return true;
    }
  }

  prepareProfile(profile) {
    profile.hasTrx = _.toInteger(profile.hasTrx);
    // profile.customerCategoryId = _.split(profile.customerCategoryId, ',')
    return profile
  }

  formatDate(name: any) {
    this.formData[name] = this.fieldsService.formatDate(this.formData, name);
  }
}
