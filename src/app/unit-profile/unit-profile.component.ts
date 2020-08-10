import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FieldsService } from '../shared/fields.service';
import { pluck } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-unit-profile',
  templateUrl: './unit-profile.component.html',
  styleUrls: ['./unit-profile.component.css']
})
export class UnitProfileComponent implements OnInit {
  formData: any;
  profile$: Observable<any>;
  developerOptions: any;
  projectsOptions: any;
  landsoptions: any;
  unitsTypesOptions: any;
  unitsUsageTypesOptions: any;
  minDate:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private fieldsService: FieldsService
  ) { }

  ngOnInit(): void {
    this.minDate = new Date();
    this.loadDeveloperOptions();
    this.loadProjectsOptions();
    this.loadLandsoptions();
    this.loadUnitsTypesOptions();
    this.loadunitsUsageTypesOptions();

    this.profile$ = this.route.data.pipe(pluck('profile'));
    this.profile$.subscribe((profile: any) => {
      if (profile && profile.id) {
        this.formData = profile as any;
      } else {
        this.formData = { };
      }
    });
  }

  saveData(formData: any) {
    let fd = new FormData();
    fd.append('unit', JSON.stringify(formData));
    this.http.post('https://wfe.ajm.re/AjmanLandProperty/index.php/units/create', fd)
      .subscribe((data: any) => {
       if (data.status == 'success') {
        this.toastr.success(data.message, 'Success');
        if (data.data.id)
          this.router.navigate(['unit/profile', data.data.id, 'edit']);
      } else {
        this.toastr.error(JSON.stringify(data.message), 'Error')
      }
    }, (error) => {
      this.toastr.error('Something went Wrong', 'Error')
    })
  }

  loadDeveloperOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/lookups/developers`)
    .subscribe((data) => {
      this.developerOptions = data;
    })
  }

  loadProjectsOptions() {
    // this.fieldsService.getUrl(`https://localhost:3000/projects`)
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/lookups/projects`)
    .subscribe((data) => {
      this.projectsOptions = data;
    })
  }

  loadLandsoptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/lookups/lands`)
    .subscribe((data) => {
      this.landsoptions = data;
    })
  }

  loadUnitsTypesOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/lookups/unitsTypes`)
    .subscribe((data) => {
      this.unitsTypesOptions = data;
    })
  }

  loadunitsUsageTypesOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/lookups/unitsUsageTypes`)
    .subscribe((data) => {
      this.unitsUsageTypesOptions = data;
    })
  }

  getAttachments() {
    return this.formData.profileImage ? [this.formData.profileImage] : [];
  }

  isCustomerDisabled() {
    return this.formData.customerCategoryId && (this.formData.customerCategoryId.includes('1') || this.formData.customerCategoryId.includes(1));
  }

  isValid() {
    return (this.formData.isDead ? true : (!!this.formData.emiratesId || !!this.formData.passportNumber || !!this.formData.otherId))
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

  prepareSitePlanField() {
    return {
      fieldID: "sitePlan",
      fieldType: "image",
      required: false,
      fieldName: {
        "ar": "site Plan",
        "en": "site Plan"
      }
    }
  }

  isRequired() {
    return !this.formData.isDead;
  }

  formatDate(name: any) {
    this.formData[name] = this.fieldsService.formatDate(this.formData, name);
  }

  isUnitVilla() {
    return this.formData.unitTypeId && (!this.formData.unitTypeId.includes('2') || !this.formData.unitTypeId.includes(2))
  }

  calculateJointActualArea() {
    // should automatically calculated = Meter Total Actual Area - Meter Net Actual Area
    this.formData.meterJointActualArea = _.toInteger(this.formData.meterTotalActualArea) - _.toInteger(this.formData.meterNetActualArea)
  }

  calculateJointSoldArea() {
    // should automatically calculated = Meter Total Sold Area - Meter Net Sold Area
    this.formData.meterJointSoldArea = _.toInteger(this.formData.meterTotalSoldArea) - _.toInteger(this.formData.meterNetSoldArea)
  }
}
