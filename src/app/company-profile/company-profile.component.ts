import { Component, OnInit } from '@angular/core';
import { Observable, concat, of, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FieldsService } from '../shared/fields.service';
import { pluck, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';
import { LookupsService } from '../shared/lookups.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  formData: any = {};
  profile$: Observable<any>;
  emiratesOptions: any;
  licenseTypeOptions: any;
  licenseIssuerOptions: any;
  ownerOptions: Observable<any>;
  companyTypeOptions: any;
  minDate:any;
  dataOptionsLoading = false;
  searchInput$ = new Subject<string>();
  formErrors: any = {};

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

    this.profile$ = this.route.data.pipe(pluck('profile'));
    this.profile$.subscribe((profile: any) => {
      if (profile && profile.id) {
        this.formData = profile as any;
      } else {
        this.formData = { owners: [{}] };
      }
    });
  }

  saveData(formData: any) {
    let fd = new FormData();
    fd.append('company', JSON.stringify(formData));
    this.http.post(`${environment.apiHost}/AjmanLandProperty/index.php/companies/create`, fd)
      .subscribe((data: any) => {
       if (data.status == 'success') {
        this.toastr.success(data.message, 'Success');
        if (data.data.id)
          this.router.navigate(['company/profile', data.data.id, 'edit']);
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

  isNotGovernmentInstitute () {
    return this.formData.companyType && !(["3", "4", "5"].includes(this.formData.companyType) || [3, 4, 5].includes(this.formData.companyType))
  }

  isNotGovernmentAndIndividualInstitute () {
    return this.formData.companyType && !(["2", "3", "4", "5"].includes(this.formData.companyType) || [2, 3, 4, 5].includes(this.formData.companyType))
  }

  isGovernmentOrg () {
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
    _.remove(this.formData.owners, function(resource, i) {
        return index === i;
    });
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
      },
      auxInfo: {
        multiple: true
      }
    }
  }
}
