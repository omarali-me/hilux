import { Component, OnInit } from '@angular/core';
import { Subscription, concat, of, Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldsService } from '../shared/fields.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';

interface SearchParams {
  query?: string;
  filter?: string;
}

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  formData: any = {};
  formErrors: any = {};
  currentSearchParams: SearchParams = {};
  paramsSubscription = new Subscription();
  results = [];
  developerOptions: Observable<any>;
  projectsOptions: Observable<any>;
  landsOptions: Observable<any>;
  oldLandsOptions: Observable<any>;
  developerDataOptionsLoading = false;
  developerSearchInput$ = new Subject<string>();
  projectsSearchInput$ = new Subject<string>();
  projectDataOptionsLoading = false;
  landDataOptionsLoading = false;
  landSearchInput$ = new Subject<string>();
  oldLandDataOptionsLoading = false;
  oldLandSearchInput$ = new Subject<string>();
  unitsOptions: any;
  ownersOptions: any;
  response: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fieldsService: FieldsService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadDeveloperOptions();
    this.loadProjectsOptions();
    this.loadLandsoptions();
    this.loadOldLandsoptions();
    // this.paramsSubscription = this.route.queryParams
    //   .subscribe(params => this.search(params));
  }

  searchData(formData: any) {
    let fd = new FormData();
    fd.append('data', JSON.stringify(formData));

    this.http.post(`https://wfe.ajm.re/AjmanLandProperty/index.php/properties/search`, fd)
      .subscribe((data: any) => {
        if (data.status == 'success') {
          this.response = data.data;
        } else {
          this.formErrors = data.data;
          this.toastr.error(JSON.stringify(data.message), 'Error')
        }
    }, (error) => {
      this.toastr.error('Something went Wrong', 'Error')
      this.router.navigate(['error'])
    })
  }

  loadUnitsOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/lookups/units`, { projectId: this.formData.projectId })
    .subscribe((data) => {
      this.unitsOptions = data;
    })
  }

  loadOwnersOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/lookups/owners`)
    .subscribe((data) => {
      this.ownersOptions = data;
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
    this.landsOptions = concat(
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

  loadOldLandsoptions() {
    this.oldLandsOptions = concat(
      of([]), // default items
      this.landSearchInput$.pipe(
          distinctUntilChanged(),
          tap(() => this.oldLandDataOptionsLoading = true),
          switchMap(term => {
            return this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/lookups/oldLands`, { term } ).pipe(
              catchError(() => of([])), // empty list on error
              tap(() => this.oldLandDataOptionsLoading = false)
          )})
      )
    );
  }

  isLandResponse() {
    return this.response && (this.response.type == 1 || this.response.type == '1')
  }

  isUnitResponse() {
    return this.response && (this.response.type == 2 || this.response.type == '2')
  }

  isOwnerResponse() {
    return this.response && (this.response.type == 3 || this.response.type == '3')
  }

  isSearchByOwner() {
    return !!this.formData.type && (this.formData.type == '3' && !!this.formData.owner)
  }

  isSearchByOwnerId() {
    return !!this.formData.type && (this.formData.type == '3' && !!this.formData.ownerId)
  }

  isSearchByLand() {
    return !!this.formData.type && (this.formData.type == '1' && !!this.formData.landId)
  }

  isSearchByOldLandId() {
    return !!this.formData.type && (this.formData.type == '1' && !!this.formData.oldLandId)
  }

  isSearchByUnit() {
    return (this.formData.type == '2')
  }

  isNotSearchTypeUnit() {
    return !!this.formData.type && (['1', '3'].includes(this.formData.type) || [1, 3].includes(this.formData.type))
  }

  isNotSearchTypeLand() {
    return !!this.formData.type && (['2', '3'].includes(this.formData.type) || [2, 3].includes(this.formData.type))
  }

  isNotSearchTypeOwner() {
    return !!this.formData.type && (['2', '1'].includes(this.formData.type) || [2, 1].includes(this.formData.type))
  }

  setSearchType(field_name: string, event: any) {
    var val = event.target.value.trim();
    if (val != '') {
      if (['developerId', 'projectId', 'unitId'].includes(field_name)) {
        this.formData.type = '2'
      } else if (['landId', 'oldLandId'].includes(field_name)) {
        this.formData.type = '1'
      } else {
        this.formData.type = '3'
      }
    } else {
      this.formData.type = null;
    }
  }
}
