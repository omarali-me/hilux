import { Component, OnInit } from '@angular/core';
import { Observable, concat, of, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FieldsService } from '../../shared/fields.service';
import { pluck, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { environment } from '../../../environments/environment';
import { LookupsService } from '../../shared/lookups.service';

@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.css']
})
export class UnitDetailsComponent implements OnInit {
  formData: any = {};
  searchData: any = {};
  formErrors: any = {};
  profile$: Observable<any>;
  developerOptions: Observable<any>;
  projectsOptions: Observable<any>;
  landsoptions: any;
  unitsTypesOptions: any;
  unitsUsageTypesOptions: any;
  minDate:any;
  developerDataOptionsLoading = false;
  developerSearchInput$ = new Subject<string>();
  projectsSearchInput$ = new Subject<string>();
  projectDataOptionsLoading = false;
  landDataOptionsLoading = false;
  landSearchInput$ = new Subject<string>();
  developerNameOptions: Observable<any>;
  projectNameOptions: Observable<any>;
  unitNumberOptions: any;
  searchDeveloperNameInput$ = new Subject<string>();
  searchProjectNameInput$ = new Subject<string>();
  developerNameOptionsLoading = false;
  projectNameOptionsLoading =  false;

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
    this.loadDeveloperOptions();
    this.loadProjectsOptions();
    // this.loadLandsoptions();
    this.loadUnitsTypesOptions();
    this.loadunitsUsageTypesOptions();
    this.loadDeveloperNameOptions();
    this.loadProjectNameOptions();
    this.loadUnitNumberOptions();

    this.profile$ = this.route.data.pipe(pluck('profile'));
    this.profile$.subscribe(async (profile: any) => {
      if (profile && profile.id) {
        await this.prepareProjectValueOptions(profile);
        await this.prepareDeveloperValueOptions(profile);
        await this.prepareLandValueOptions(profile);
        this.formData = profile as any;
      } else {
        this.formData = { };
      }
    });
  }

  updateData(formData: any) {
    let fd = new FormData();
    if (formData.sitePLAN && formData.sitePLAN.length) {
      formData.sitePlan = formData.sitePLAN[0];
      delete formData.sitePLAN;
    }
    fd.append('unit', JSON.stringify(formData));
    this.http.post(`${environment.apiHost}/AjmanLandProperty/index.php/units/update/${formData.id}`, fd)
      .subscribe((data: any) => {
        if (data.status == 'success') {
          this.toastr.success(data.message, 'Success');
          setTimeout(() => {
            this.router.navigate(['unit/profile/' + formData.id + '/view'])
            .then(() => {
              window.location.reload();
            });
          }, 500);
        } else {
          this.formErrors = data.data;
          this.toastr.error(JSON.stringify(data.message), 'Error')
        }
    }, (error) => {
      this.toastr.error('Something went Wrong', 'Error')
      this.router.navigate(['error'])
    })
  }
   prepareGalleryField() {
    return {
      fieldID: "sitePLAN",
      fieldType: "fileupload",
      // required: this.flagUpload,
      fieldName: {
        "ar": "sitePLAN",
        "en": "sitePLAN"
      },
      auxInfo: {
        multiple: false
      }
    }
  }


  loadDeveloperOptions() {
    this.developerOptions = concat(
      of([]), // default items
      this.developerSearchInput$.pipe(
          distinctUntilChanged(),
          tap(() => this.developerDataOptionsLoading = true),
          switchMap(term => {
            return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/lookups/developers`, { term } ).pipe(
              catchError(() => of([])), // empty list on error
              tap(() => this.developerDataOptionsLoading = false)
          )})
      )
    );
  }

  loadProjectsOptions() {
    this.projectsOptions = concat(
      of([]), // default items
      this.projectsSearchInput$.pipe(
          distinctUntilChanged(),
          tap(() => this.projectDataOptionsLoading = true),
          switchMap(term => {
            return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/lookups/projects`, { term, developerId: this.formData.developerId } ).pipe(
              catchError(() => of([])), // empty list on error
              tap(() => this.projectDataOptionsLoading = false)
          )})
      )
    );
  }

  loadLandsoptions() {
    this.landsoptions = concat(
      of([]), // default items
      this.landSearchInput$.pipe(
          distinctUntilChanged(),
          tap(() => this.landDataOptionsLoading = true),
          switchMap(term => {
            return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/lookups/lands`, { term } ).pipe(
              catchError(() => of([])), // empty list on error
              tap(() => this.landDataOptionsLoading = false)
          )})
      )
    );
  }

  loadUnitsTypesOptions() {
    this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/lookups/unitsTypes`)
    .subscribe((data) => {
      this.unitsTypesOptions = data;
    })
  }

  loadunitsUsageTypesOptions() {
    this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/lookups/ListOfUnitsUses`)
    .subscribe((data) => {
      this.unitsUsageTypesOptions = data;
    })
  }

  getAttachments() {
    return !!this.formData.sitePlan ? [this.formData.sitePlan] : [];
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
      fieldType: "fileupload",
      required: false,
      fieldName: {
        "ar": "image",
        "en": "image"
      },
      auxInfo: {
        multiple: false
      }
    }
  }

  prepareSitePlanField() {
    return {
      fieldID: "sitePlan",
      fieldType: "fileupload",
      required: false,
      fieldName: {
        "ar": "site Plan",
        "en": "site Plan"
      },
      auxInfo: {
        multiple: false
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
    const meterTotalActualArea = this.formData.meterTotalActualArea || null;
    const meterNetActualArea = this.formData.meterNetActualArea || null;
    this.formData.meterJointActualArea = _.toNumber(meterTotalActualArea) - _.toNumber(meterNetActualArea);
  }

  calculateJointSoldArea() {
    // should automatically calculated = Meter Total Sold Area - Meter Net Sold Area
    const meterTotalSoldArea = this.formData.meterTotalSoldArea || null;
    const meterNetSoldArea = this.formData.meterNetSoldArea || null;
    this.formData.meterJointSoldArea = _.toNumber(meterTotalSoldArea) - _.toNumber(meterNetSoldArea)
  }

  prepareProjectValueOptions(profile: any) {
    if(!!profile.projectId) {
      this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/lookups/projects`, { id: profile.projectId })
      .subscribe((option)=> {
        this.projectsSearchInput$.next(option.value && option.value.ar);
      })
    }
  }

  prepareDeveloperValueOptions(profile: any) {
    if(!!profile.developerId) {
      this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/lookups/developers`, { id: profile.developerId })
      .subscribe((option)=> {
        this.developerSearchInput$.next(option.value && option.value.ar);
      })
    }
  }

  prepareLandValueOptions(profile: any) {
    if(!!profile.landId) {
      this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/lookups/lands`, { id: profile.landId })
      .subscribe((option)=> {
        this.landSearchInput$.next(option.value && option.value.ar);
      })
    }
  }
  isSearchFormValid() {
    return  !this.searchData.developerNameSearch && !this.searchData.projectNameSearch && !this.searchData.searchUnitNumber;
  }

  searchResourceData(data: any) {
    if (!!data.searchUnitNumber) {
      this.router.navigate(['unit/profile/', data.searchUnitNumber, 'edit'])
      .then(() => {
        window.location.reload();
      });
      this.searchData.searchDeveloperId =null;
      this.searchData.searchProjectId =null;
      this.searchData.searchUnitNumber =null;
    }
  }

  loadDeveloperNameOptions() {
    this.developerNameOptions = concat(
      of([]), // default items
      this.searchDeveloperNameInput$.pipe(
          distinctUntilChanged(),
          tap(() => this.developerNameOptionsLoading = true),
          switchMap(term => {
            return this.lookupsService.loadDevelopers({ term }).pipe(
              catchError(() => of([])), // empty list on error
              tap(() => this.developerNameOptionsLoading = false)
          )})
      )
    );
  }

  loadProjectNameOptions() {
    this.projectNameOptions = concat(
      of([]), // default items
      this.searchProjectNameInput$.pipe(
          distinctUntilChanged(),
          tap(() => this.projectNameOptionsLoading = true),
          switchMap(term => {
            return this.lookupsService.loadProjects({ term, developerId: this.searchData.searchDeveloperId }).pipe(
              catchError(() => of([])), // empty list on error
              tap(() => this.projectNameOptionsLoading = false)
          )})
      )
    );
  }

  loadUnitNumberOptions() {
    this.lookupsService.loadUnitsByUnitIDOptions({ projectId: this.searchData.searchProjectId })
      .subscribe((data) => {
        this.unitNumberOptions = data;
      })
  }

  resetSearchProject() {
    this.searchData.searchProjectId = null;
    this.resetUnitNumber();
  }

  resetUnitNumber() {
    this.searchData.searchUnitNumber = null;
  }

}
