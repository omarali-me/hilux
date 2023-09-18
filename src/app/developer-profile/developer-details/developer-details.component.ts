import { Component, OnInit } from '@angular/core';
import { Observable, Subject, concat, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FieldsService } from '../../shared/fields.service';
import { pluck, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LookupsService } from 'src/app/shared/lookups.service';

@Component({
  selector: 'app-developer-details',
  templateUrl: './developer-details.component.html',
  styleUrls: ['./developer-details.component.css']
})
export class DeveloperDetailsComponent implements OnInit {
  formData: any = {};
  searchData: any = {};
  profile$: Observable<any>;
  companyOptions: any;
  developerTypeOptions: any;
  emiratesOptions: any;
  licenseNumberCompanyOptions: any;
  licenseTypeOptions: any;
  licenseIssuerOptions: any;
  ownerOptions: Observable<any>;
  companyTypeOptions: any;
  minDate:any;
  dataOptionsLoading = false;
  searchInput$ = new Subject<string>();
  companyOptionsLoading = false;
  licenseNumberOptionsLoading = false;
  companySearchInput$ = new Subject<string>();
  licenseSearchInput$ = new Subject<string>();
  formErrors: any = {};
  companyDetails: any = { owners: [{}] };
  developerNameOptions: Observable<any>;
  searchDeveloperNameInput$ = new Subject<string>();
  developerNameOptionsLoading = false;
  searchCompanyBy: any;

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
    this.loadEmiratesOptions();
    this.loadLicenseTypeOptions();
    this.loadOwnerOptions();
    this.loadCompanyTypeOptions();
    this.loadLicenseIssuerOptions();
    this.loadCompanyOptions();
    this.loadCompanyOptionsByLicenseNumber();
    this.loadDeveloperNameOptions();

    this.profile$ = this.route.data.pipe(pluck('profile'));
    this.profile$.subscribe((profile: any) => {
      if (profile && profile.id) {
        this.formData = profile as any;
        this.getCompanyProfile(profile.companyId)
      } else {
        this.formData = { owners: [{}] };
      }
    });

    this.developerTypeOptions = [{
      key: "1",
      value: { en: 'Master Project', ar: 'مشروع رئيسي' }
    },
    {
      key: "0",
      value: { en: 'Sub Project', ar: 'مشروع فرعي' }
    }];
  }

  updateData(formData: any) {
    let fd = new FormData();
    let preparedData = this.prepareDeveloperName(formData);
    fd.append('developer', JSON.stringify(preparedData));
    this.http.post(`${environment.apiHost}/AjmanLandProperty/index.php/developers/update/${formData.id}`, fd)
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

  loadEmiratesOptions() {
    this.lookupsService.loadEmiratesOptions()
    .subscribe((data) => {
      this.emiratesOptions = data;
    })
  }

  loadLicenseTypeOptions() {
    this.lookupsService.loadLicenseTypeOptions()
    .subscribe((data) => {
      this.licenseTypeOptions = data;
    })
  }

  loadLicenseIssuerOptions() {
    this.lookupsService.loadLicenseIssuerOptions()
    .subscribe((data) => {
      this.licenseIssuerOptions = data;
    })
  }

  loadOwnerOptions() {
    this.ownerOptions = concat(
      of([]), // default items
      this.searchInput$.pipe(
          distinctUntilChanged(),
          tap(() => this.dataOptionsLoading = true),
          switchMap(term => {
            return this.lookupsService.loadOwners({ term }).pipe(
              catchError(() => of([])), // empty list on error
              tap(() => this.dataOptionsLoading = false)
          )})
      )
    );
  }

  loadCompanyTypeOptions() {
    this.lookupsService.loadCompanyTypeOptions()
    .subscribe((data) => {
      this.companyTypeOptions = data;
    })
  }

  loadCompanyOptions() {
    this.companyOptions = concat(
      of([]), // default items
      this.companySearchInput$.pipe(
          distinctUntilChanged(),
          tap(() => this.companyOptionsLoading = true),
          switchMap(term => {
            return this.lookupsService.loadCompanies({ term }).pipe(
              catchError(() => of([])), // empty list on error
              tap(() => this.companyOptionsLoading = false)
          )})
      )
    );
  }

  loadCompanyOptionsByLicenseNumber() {
    this.licenseNumberCompanyOptions = concat(
      of([]), // default items
      this.licenseSearchInput$.pipe(
          distinctUntilChanged(),
          tap(() => this.licenseNumberOptionsLoading = true),
          switchMap(licenseNumber => {
            return this.lookupsService.loadCompanies({ licenseNumber }).pipe(
              catchError(() => of([])), // empty list on error
              tap(() => this.licenseNumberOptionsLoading = false)
          )})
      )
    );
  }

  isNotGovernmentInstitute () {
    return this.companyDetails.companyType && !(["3", "4", "5"].includes(this.companyDetails.companyType) || [3, 4, 5].includes(this.companyDetails.companyType))
  }

  isNotGovernmentAndIndividualInstitute () {
    return this.companyDetails.companyType && !(["2", "3", "4", "5"].includes(this.companyDetails.companyType) || [2, 3, 4, 5].includes(this.companyDetails.companyType))
  }

  isGovernmentOrg () {
    return this.companyDetails.companyType && (["3"].includes(this.companyDetails.companyType) || [3].includes(this.companyDetails.companyType))
  }

  formatDate(name: any) {
    this.companyDetails[name] = this.fieldsService.formatDate(this.companyDetails, name);
  }

  formatDevelopersDate(name: any) {
    this.formData[name] = this.fieldsService.formatDate(this.formData, name);
  }

  getOwnersData() {
    return this.companyDetails.owners ? this.companyDetails.owners : (this.companyDetails.owners = [{}]);
  }

  getName(row: string, index: string) {
    return this.fieldsService.getFieldName('owner', row, index);
  }

  prepareEstablishmentContractFileField() {
    return {
      fieldID: "establishmentContractFile",
      fieldType: "fileupload",
      required: true,
      fieldName: {
        "ar": "establishmentContractFile",
        "en": "establishmentContractFile"
      }
    }
  }

  async prepareOwnerValueOptions(profile: any) {
    for(let owner of (profile.owners || [])) {
      await setTimeout(() => {
        this.lookupsService.loadOwners({ id: owner.ownerId })
        .subscribe((option)=> {
          this.searchInput$.next(option.value && option.value.ar);
        })
      },
      100)
    }
  }

  getCompanyDetails(event: any, field_name: any) {
    if (event && event.key) {
      // get Company Details for Id
      this.getCompanyProfile(event.key, field_name);
    } else {
      // reset company Details
      this.companyDetails = { owners: [{}] }
    }
  }

  getCompanyProfile(company_id: any, field_name: any = 'companyName') {
    let url = '';
    if (field_name == 'companyName') {
      url = `${environment.apiHost}/AjmanLandProperty/index.php/Lookups/companies/companyId/${company_id}`;
    } else {
      url = `${environment.apiHost}/AjmanLandProperty/index.php/Lookups/companies/licenseNumberObj/${company_id}`;
    }
    this.fieldsService.getUrl(url)
      .subscribe(async (profile) => {
        if (profile !== {}) {
          await this.prepareOwnerValueOptions(profile);
          this.companyDetails = profile
        } else {
          this.companyDetails = { owners: [{}] }
        }
      }, (error) => {
        this.toastr.error('Something went Wrong While fetching Company Details', 'Error')
        this.router.navigate(['error'])
      })
  }

  setSearchby(field_name: any, event: any) {
    let val = event.target.value.trim();
    if (val != '') {
      this.searchCompanyBy = field_name;
    } else {
      this.searchCompanyBy = undefined;
    }
  }

  isNotSearchBy(field_name: any) {
    return this.searchCompanyBy && (this.searchCompanyBy != field_name);
  }

  calculateExpiryDate(event: any) {
    let date = new Date(event.value);
    date.setFullYear(date.getFullYear() + 1);
    this.formData.registrationExpiryDate = date;
  }

  prepareDeveloperName(formData: any) {
    formData["nameAr"] = this.companyDetails.nameAr;
    formData["nameEn"] = this.companyDetails.nameEn;
    formData["companyDetails"] = this.companyDetails;
    return formData;
  }

  searchResourceData(data: any) {
    if (!!data.term) {
      this.router.navigate(['developer/profile/', data.term, 'edit'])
      .then(() => {
        window.location.reload();
      });
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
}
