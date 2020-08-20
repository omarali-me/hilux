import { Component, OnInit } from '@angular/core';
import { Observable, concat, of, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FieldsService } from '../../shared/fields.service';
import { pluck, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  formData: any = {};
  profile$: Observable<any>;
  emiratesOptions: any;
  licenseTypeOptions: any;
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

    this.profile$ = this.route.data.pipe(pluck('profile'));
    this.profile$.subscribe((profile: any) => {
      if (profile && profile.id) {
        this.formData = profile as any;
      } else {
        this.formData = { };
      }
    });
  }

  updateData(formData: any) {
    let fd = new FormData();
    fd.append('company', JSON.stringify(formData));
    this.http.post(`https://wfe.ajm.re/AjmanLandProperty/index.php/companies/update/${formData.id}`, fd)
      .subscribe((data: any) => {
        if (data.status == 'success') {
          this.toastr.success(data.message, 'Success');
        } else {
          this.toastr.error(JSON.stringify(data.message), 'Error')
        }
    }, (error) => {
      this.toastr.error('Something went Wrong', 'Error')
      this.router.navigate(['error'])
    })
  }

  loadEmiratesOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/emirates`)
    .subscribe((data) => {
      this.emiratesOptions = data;
    })
  }

  loadLicenseTypeOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/licensesTypes`)
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
            return this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/owners`, { term } ).pipe(
              catchError(() => of([])), // empty list on error
              tap(() => this.dataOptionsLoading = false)
          )})
      )
    );
  }

  loadCompanyTypeOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/companiesTypes`)
    .subscribe((data) => {
      this.companyTypeOptions = data;
    })
  }

  isNotGovernmentInstitute () {
    return true
  }

  isGovernmentOrg () {
    return false
  }

  formatDate(name: any) {
    this.formData[name] = this.fieldsService.formatDate(this.formData, name);
  }

}
