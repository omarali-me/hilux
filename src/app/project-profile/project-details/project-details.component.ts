import { Component, OnInit } from '@angular/core';
import { Observable, concat, of, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FieldsService } from 'src/app/shared/fields.service';
import { pluck, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  formData: any;
  formErrors:any = {};
  profile$: Observable<any>;
  developerOptions: Observable<any>;
  landsoptions: any;
  projectsOptions: Observable<any>;
  projectsTypesOptions: any;
  projectsRegistrationTypesOptions: any;
  minDate:any;
  developerDataOptionsLoading = false;
  developerSearchInput$ = new Subject<string>();
  projectsSearchInput$ = new Subject<string>();
  projectDataOptionsLoading = false;
  landDataOptionsLoading = false;
  landSearchInput$ = new Subject<string>();
  isMainOptions: any;
  projectUsageTypesOptions: any;
  contractorsOptions: any;
  consultantsOptions: any;
  accountTrusteesOptions: any;
  projectStatusOptions: any;

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
    this.loadLandsoptions();
    this.loadProjectsOptions();
    this.loadProjectsTypesOptions();
    this.loadProjectsRegistrationTypesOptions();
    this.loadProjectUsageTypesOptions();
    this.loadContractorsOptions();
    this.loadConsultantsOptions();
    this.loadAccountTrusteesOptions();
    this.loadProjectStatusOptions();

    this.isMainOptions = [{
      key: 1,
      value: { en: 'Master Project', ar: 'مشروع رئيسي' }
    },
    {
      key: 0,
      value: { en: 'Sub Project', ar: 'مشروع فرعي' }
    }];

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
    fd.append('project', JSON.stringify(formData));
    this.http.post(`https://wfe.ajm.re/AjmanLandProperty/index.php/projects/update/${formData.id}`, fd)
      .subscribe((data: any) => {
        if (data.status == 'success') {
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

  loadDeveloperOptions() {
    this.developerOptions = concat(
      of([]), // default items
      this.developerSearchInput$.pipe(
          distinctUntilChanged(),
          tap(() => this.developerDataOptionsLoading = true),
          switchMap(term => {
            return this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/lookups/developers`, { term } ).pipe(
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
            return this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/lookups/projects`, { term, developerId: this.formData.developerId } ).pipe(
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
            return this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/lookups/lands`, { term } ).pipe(
              catchError(() => of([])), // empty list on error
              tap(() => this.landDataOptionsLoading = false)
          )})
      )
    );
  }

  loadProjectsTypesOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/lookups/projectstypes`)
    .subscribe((data) => {
      this.projectsTypesOptions = data;
    })
  }

  loadProjectStatusOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/lookups/projectsStatuses`)
    .subscribe((data) => {
      this.projectStatusOptions = data;
    })
  }

  loadProjectsRegistrationTypesOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/lookups/projectsRegistrationTypes`)
    .subscribe((data) => {
      this.projectsRegistrationTypesOptions = data;
    })
  }

  loadProjectUsageTypesOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/lookups/projectsUsageTypes`)
    .subscribe((data) => {
      this.projectUsageTypesOptions = data;
    })
  }

  loadContractorsOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/projetcsContractors`)
    .subscribe((data) => {
      this.contractorsOptions = data;
    })
  }

  loadConsultantsOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/projetcsConsultants`)
    .subscribe((data) => {
      this.consultantsOptions = data;
    })
  }

  loadAccountTrusteesOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/projetcsAccountTrusteeBanks`)
    .subscribe((data) => {
      this.accountTrusteesOptions = data;
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

  isRequired() {
    return !this.formData.isDead;
  }

  formatDate(name: any) {
    this.formData[name] = this.fieldsService.formatDate(this.formData, name);
  }

  isNotMain() {
    return ((this.formData.isMain == '0') || (this.formData.isMain == 0));
  }

  calculateJointSoldArea() {
    // should automatically calculated = Meter Total Sold Area - Meter Net Sold Area
    const meterTotalSoldArea = this.formData.meterTotalArea || null;
    const meterNetSoldArea = this.formData.meterNetArea || null
    this.formData.meterJointArea = _.toNumber(meterTotalSoldArea) - _.toNumber(meterNetSoldArea)
  }

  prepareProjectValueOptions(profile: any) {
    if(!!profile.mainProjectId) {
      this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/lookups/projects`, { id: profile.mainProjectId })
      .subscribe((option)=> {
        this.projectsSearchInput$.next(option.value && option.value.ar);
      })
    }
  }

  prepareDeveloperValueOptions(profile: any) {
    if(!!profile.developerId) {
      this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/lookups/developers`, { id: profile.developerId })
      .subscribe((option)=> {
        this.developerSearchInput$.next(option.value && option.value.ar);
      })
    }
  }

  prepareLandValueOptions(profile: any) {
    if(!!profile.landId) {
      this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/lookups/lands`, { id: profile.landId })
      .subscribe((option)=> {
        this.landSearchInput$.next(option.value && option.value.ar);
      })
    }
  }

  setProjectCompletionPercentage() {
    if (this.isProjectCompleted()) {
      this.formData.projectCompletionpercentage = '100';
    }
  }

  isProjectCompleted() {
    return this.formData.projectStatusId && (this.formData.projectStatusId.includes('9') || this.formData.projectStatusId.includes(9));
  }
}
