import { Component, OnInit } from '@angular/core';
import { Observable, concat, of, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FieldsService } from '../../shared/fields.service';
import { pluck, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  formData: any = {};
  formErrors: any = {};
  profile$: Observable<any>;
  emiratesOptions: any;
  licenseTypeOptions: any;
  licenseIssuerOptions: any;
  ownerOptions: Observable<any>;
  companyTypeOptions: any;
  minDate:any;
  dataOptionsLoading = false;
  searchInput$ = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private fieldsService: FieldsService
  ) { }

  ngOnInit(): void {
    this.minDate = new Date();
    this.loadEmiratesOptions();
    this.loadLicenseTypeOptions();
    this.loadOwnerOptions();
    this.loadCompanyTypeOptions();
    this.loadLicenseIssuerOptions();

    this.profile$ = this.route.data.pipe(pluck('profile'));
    this.profile$.subscribe(async(profile: any) => {
      if (profile && profile.id) {
        await this.prepareOwnerValueOptions(profile);
        this.formData = profile as any;
      } else {
        this.formData = { owners: [{}] };
      }
    });
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
    this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/emirates`)
    .subscribe((data) => {
      this.emiratesOptions = data;
    })
  }

  loadLicenseTypeOptions() {
    this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/licensesTypes`)
    .subscribe((data) => {
      this.licenseTypeOptions = data;
    })
  }

  loadOwnerOptions() {
    this.ownerOptions = concat(
      of([]), // default items
      this.searchInput$.pipe(
          distinctUntilChanged(),
          tap(() => this.dataOptionsLoading = true),
          switchMap(term => {
            return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/owners`, { term } ).pipe(
              catchError(() => of([])), // empty list on error
              tap(() => this.dataOptionsLoading = false)
          )})
      )
    );
  }

  loadCompanyTypeOptions() {
    this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/companiesTypes`)
    .subscribe((data) => {
      this.companyTypeOptions = data;
    })
  }

  loadLicenseIssuerOptions() {
    this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/companiesLicensesIssuers`)
    .subscribe((data) => {
      this.licenseIssuerOptions = data;
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

  // notValidTotal() {
  //   if (this.isNotGovernmentAndIndividualInstitute()) {
  //     let shares = this.formData.owners && this.formData.owners.map(o => _.toNumber(o.share));
  //     let shareTotal = 0.00;
  //     shares.forEach(share => shareTotal = shareTotal + share);
  //     return (shareTotal != 100.00 || shareTotal != 100);
  //   } else {
  //     return false;
  //   }
  // }

  async prepareOwnerValueOptions(profile: any) {
    for(let owner of (profile.owners || [])) {
      await setTimeout(() => {
        this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/owners`, { id: owner.ownerId })
        .subscribe((option)=> {
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
}
