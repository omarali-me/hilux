import { Component, OnInit } from '@angular/core';
import { Observable, concat, of, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FieldsService } from '../../shared/fields.service';
import { pluck, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { environment } from '../../../environments/environment';
import { LookupsService } from 'src/app/shared/lookups.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.css']
})
export class CompanyViewComponent implements OnInit {
  formData: any = {};
  searchData: any = {};
  formErrors: any = {};
  profile$: Observable<any>;
  emiratesOptions: any;
  licenseTypeOptions: any;
  licenseIssuerOptions: any;
  ownerOptions: Observable<any>;
  companyNameOptions: Observable<any>;
  companyLicenseNumberOptions: Observable<any>;
  companyTypeOptions: any;
  minDate: any;
  dataOptionsLoading = false;
  companyNameOptionsLoading = false;
  companyLicenseNumberOptionsLoading = false;
  searchInput$ = new Subject<string>();
  searchCompanyNameInput$ = new Subject<string>();
  searchCompanyLicenseNumberInput$ = new Subject<string>();
  searchby: any;
  establishmentContractDmsId:any;
  // pdfPath = require("../../../assets/images/pdf.png");
  photoPath :any;

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
    this.loadCompanyNameOptions();
    this.loadCompanyLicenseNumberOptions();
    this.establishmentContractDmsId =[];
    // this.pdfPath = 
    // this.photoPath = require("../../../assets/images/photo.png");
    this.profile$ = this.route.data.pipe(pluck('profile'));
    this.profile$.subscribe(async (profile: any) => {
      if (profile && profile.id) {
        await this.prepareOwnerValueOptions(profile);
        this.formData = profile as any;
        // let establishmentContractDmsId =this.formData.establishmentContractDmsId;
        if (this.formData.establishmentContractDmsId.length > 0) {
          for (let index = 0; index < this.formData.establishmentContractDmsId.length; index++) {
            let parts = this.formData.establishmentContractDmsId[index].split('.');
            let ex =parts[parts.length - 1];
            let obj =this.formData.establishmentContractDmsId[index]
            this.establishmentContractDmsId.push(obj);
            if ((index + 1) == this.formData.establishmentContractDmsId.length) {
            }
          }
        }
        
      } else {
        this.formData = { owners: [{}] };
      }
    });
  }
  editFun() {
    this.router.navigate(['company/profile/', this.formData.id, 'edit']);

  }
  updateData(formData: any) {
    let fd = new FormData();
    fd.append('company', JSON.stringify(formData));
    this.http.post(`${environment.apiHost}/AjmanLandProperty/index.php/companies/update/${formData.id}`, fd)
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

  async loadOwnerOptions() {
    // this.ownerOptions = concat(
    //   of([]), // default items
    //   this.searchInput$.pipe(
    //       distinctUntilChanged(),
    //       tap(() => this.dataOptionsLoading = true),
    //       switchMap(term => {
    //         return this.lookupsService.loadOwners3({ term }).pipe(
    //           catchError(() => of([])), // empty list on error
    //           tap(() => this.dataOptionsLoading = false)
    //       )})
    //   )
    // );
    // let vals = [];
    // await this.searchInput$.subscribe(val => vals.push(val));
    await this.searchInput$.subscribe(val => {
      // vals.push(val);
      this.LoadOptionsData(val);
    });
  }
  async LoadOptionsData(term) {
    await setTimeout(() => {
      this.lookupsService.loadOwners3({ term })
        .subscribe((option) => {
          // this.loadOwnerOptions(owner.ownerId)
          let obj = option;
          this.ownerOptions = concat(
            of([]), // default items
            [obj]
          );
        })
    },
      500);
  }


  loadCompanyTypeOptions() {
    this.lookupsService.loadCompanyTypeOptions()
      .subscribe((data) => {
        this.companyTypeOptions = data;
      })
  }

  loadLicenseIssuerOptions() {
    this.lookupsService.loadLicenseIssuerOptions()
      .subscribe((data) => {
        this.licenseIssuerOptions = data;
      })
  }

  isNotGovernmentInstitute() {
    return this.formData.companyType && !(["3", "4", "5"].includes(this.formData.companyType) || [3, 4, 5].includes(this.formData.companyType))
  }

  isNotGovernmentAndIndividualInstitute() {
    return this.formData.companyType && !(["2", "3", "4", "5"].includes(this.formData.companyType) || [2, 3, 4, 5].includes(this.formData.companyType))
  }

  isGovernmentOrg() {
    return this.formData.companyType && (["3"].includes(this.formData.companyType) || [3].includes(this.formData.companyType))
  }

  formatDate(name: any) {
    this.formData[name] = this.fieldsService.formatDate(this.formData, name);
  }

  getOwnersData() {
    return this.formData.owners ? this.formData.owners : (this.formData.owners = [{}]);
  }

  addRow() {
    this.formData.owners.push({});
  }

  deleteRow(index) {
    _.remove(this.formData.owners, function (resource, i) {
      return index === i;
    });
  }

  getName(row: string, index: string) {
    return this.fieldsService.getFieldName('owner', row, index);
  }

  async prepareOwnerValueOptions(profile: any) {
    for (let owner of (profile.owners || [])) {
      await setTimeout(() => {
        this.lookupsService.loadOwners3({ id: owner.ownerId })
          .subscribe((option) => {
            this.searchInput$.next(option.value && option.value.ar);
          })
      },
        100)
    }
  }

  prepareEstablishmentContractFileField() {
    return {
      fieldID: "establishmentContractFile",
      fieldType: "fileupload",
      required: true,
      fieldName: {
        "ar": "establishmentContractFile",
        "en": "establishmentContractFile"
      },
      auxInfo: {
        multiple: true
      }
    }
  }

  setSearchType(field_name: any, event: any) {
    var val = event.target.value.trim();
    this.setSearchByandTypeValues(val, field_name)
  }

  setSearchByandTypeValues(val: any, field_name: any) {
    if (val != '') {
      this.searchby = field_name;
    } else {
      this.searchby = null;
      this.resetSearch(field_name);
    }
  }

  resetSearch(field_name: any) {
    switch (field_name) {
      case 'licenseNumber':
        this.searchCompanyLicenseNumberInput$.next(null);
        break;
      case 'term':
        this.searchCompanyNameInput$.next(null);
        break;
    }
  }

  isSearchBy(name: any) {
    return this.searchby == name;
  }

  checkTypeAndValues(field_name: string) {
    let val = this.searchData[field_name] && this.searchData[field_name].trim();
    val = (val == undefined ? '' : val);
    if (!this.isSearchBy(field_name) && (val == '')) {
      this.setSearchByandTypeValues(val, field_name);
    } else if (this.isSearchBy(field_name)) {
      if (this.isEmpty(field_name)) {
        this.setSearchByandTypeValues(val, null);
      }
    }
  }

  isEmpty(field_name: any) {
    return (this.searchData[field_name] == undefined)
  }

  searchResourceData(data: any) {
    let value = !!data.term ? data.term : data.licenseNumber;
    this.router.navigate(['company/profile/', value, 'view'])
    .then(() => {
      window.location.reload();
    });
    this.searchData.term = null;
  }

  loadCompanyNameOptions() {
    this.companyNameOptions = concat(
      of([]), // default items
      this.searchCompanyNameInput$.pipe(
        distinctUntilChanged(),
        tap(() => this.companyNameOptionsLoading = true),
        switchMap(term => {
          return this.lookupsService.loadCompanies({ term }).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => this.companyNameOptionsLoading = false)
          )
        })
      )
    );
  }

  loadCompanyLicenseNumberOptions() {
    this.companyLicenseNumberOptions = concat(
      of([]), // default items
      this.searchCompanyLicenseNumberInput$.pipe(
        distinctUntilChanged(),
        tap(() => this.companyLicenseNumberOptionsLoading = true),
        switchMap(licenseNumber => {
          return this.lookupsService.loadCompanies({ licenseNumber }).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => this.companyLicenseNumberOptionsLoading = false)
          )
        })
      )
    );
  }

  isSearchFormValid() {
    return !this.searchData.term && !this.searchData.licenseNumber
  }

}
