import { Component, OnInit } from '@angular/core';
import { Subscription, concat, of, Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldsService } from '../shared/fields.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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
  ownersSearchInput$ = new Subject<string>();
  ownersOptionsLoading = false;
  unitsOptions: any;
  ownersOptions: Observable<any>;
  response: any;

  searchby: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fieldsService: FieldsService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadUnitsOptions();
    this.loadOwnersOptions();
    this.loadDeveloperOptions();
    this.loadProjectsOptions();
    this.loadLandsoptions();
    this.loadOldLandsoptions();

    // this.paramsSubscription = this.route.queryParams
    //   .subscribe(params => this.search(params));
  }

  searchData(formData: any) {
    let prepapedData = this.prepareFormData(formData)
    let fd = new FormData();
    fd.append('data', JSON.stringify(prepapedData));

    this.http.post(`${environment.apiHost}/AjmanLandProperty/index.php/properties/search`, fd)
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
    this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/lookups/units`, { projectId: this.formData.projectId })
    .subscribe((data) => {
      this.unitsOptions = data;
    })
  }

  loadOwnersOptions() {
    this.ownersOptions = concat(
      of([]), // default items
      this.ownersSearchInput$.pipe(
          distinctUntilChanged(),
          tap(() => this.ownersOptionsLoading = true),
          switchMap(term => {
            return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/lookups/owners`, { term } ).pipe(
              catchError(() => of([])), // empty list on error
              tap(() => this.ownersOptionsLoading = false)
          )})
      )
    );
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
    this.landsOptions = concat(
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

  loadOldLandsoptions() {
    this.oldLandsOptions = concat(
      of([]), // default items
      this.oldLandSearchInput$.pipe(
          distinctUntilChanged(),
          tap(() => this.oldLandDataOptionsLoading = true),
          switchMap(term => {
            return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/lookups/oldLands`, { term } ).pipe(
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
    this.setSearchByandTypeValues(val, field_name)
  }

  setSearchByandTypeValues(val: any, field_name: any) {
    if (val != '') {
      this.searchby = field_name;
      if (['developerId', 'projectId', 'unitId'].includes(field_name)) {
        this.formData.type = '2'
      } else if (['landId', 'oldLandId'].includes(field_name)) {
        this.formData.type = '1'
      } else {
        this.formData.type = '3'
      }
    } else {
      this.formData.type = null;
      this.searchby = null;
      this.resetSearch(field_name);
    }
  }

  isNotSearchBy(field_name: string) {
    return !!this.searchby && (this.searchby != field_name);
  }

  prepareFormData(formData: any) {
    switch (this.searchby) {
      case 'unitId':
      case 'projectId':
      case 'developerId':
        this.formData.value = this.formData.unitId
        break;
      case 'landId':
        this.formData.value = this.formData.landId
        break;
      case 'oldLandId':
        this.formData.value = this.formData.oldLandId
        break;
      case 'owner':
        this.formData.value = this.formData.owner
        break;
      case 'ownerId':
        this.formData.value = this.formData.ownerId
        break;
      default:
        this.formData.value = null;
    }

    return formData
  }

  checkTypeAndValues(field_name: string) {
    let val = this.formData[field_name] && this.formData[field_name].trim();
    val = (val == undefined ? '' : val);
    if (!this.isSearchByUnit() && (val == '')) {
      this.setSearchByandTypeValues(val, field_name);
    } else if (this.isSearchByUnit()) {
      //check all are empty then reset types
      if (this.isEmpty('developerId') && this.isEmpty('projectId') && this.isEmpty('unitId')) {
        this.setSearchByandTypeValues(val, null);
      }
    }
  }

  resetProjectAndUnit() {
    this.formData.projectId = null;
    this.resetUnit();
  }

  resetUnit() {
    this.formData.unitId = null;
  }

  isEmpty(field_name: string) {
    return this.isSearchByUnit() && (this.formData[field_name] == undefined)
  }

  getOwnerClass(item: any) {
    return (item.deed.status == '1') ? 'bg-seagreen' : 'bg-light-red'
  }

  getfirstLand(deeds: any) {
    return deeds.length > 0 ? deeds[0].land : {}
  }

  getfirstUnit(deeds: any) {
    return deeds.length > 0 ? deeds[0].unitData : {}
  }

  getfirstOwner(deeds: any) {
    return deeds.length > 0 ? deeds[0].deedDetails[0] : {}
  }

  getOwnerHeader(item: any) {
    return `نوع الملكية: ${ this.getFieldNameorId(item.childDeed, 'ownershipType') }, Created At: ${item.deed?.createdAt}, طريقة انتقال الملكية: ${item.childDeed?.transferServiceNameAr}`
  }

  getUnitOwnerHeader(item: any) {
    return `نوع الملكية: ${item.childDeed?.deedTypeNameAr}, Created At: ${item.deed?.createdAt}, طريقة انتقال الملكية: ${item.childDeed?.transferServiceNameAr}`
  }

  getCurrentOwnedLands(deeds: any) {
    return this.filterLandsWithStatus(deeds, '1');
  }

  getPreviouslyOwnedLands(deeds: any) {
    return this.filterLandsWithStatus(deeds, '0');
  }

  getCurrentOwnedUnits(deeds: any) {
    return this.filterUnitsWithStatus(deeds, '1');
  }

  getPreviouslyOwnedUnits(deeds: any) {
    return this.filterUnitsWithStatus(deeds, '0');
  }

  filterLandsWithStatus(deeds: any, status: any) {
    return deeds.filter(d => d.land && d.deed?.status == status);
  }

  filterUnitsWithStatus(deeds: any, status: any) {
    return deeds.filter(d => d.unitData && d.deed?.status == status);
  }

  getItemShare(deed: any) {
    return (deed.deedDetails[0] && deed.deedDetails[0].details?.share);
  }

  getFieldNameorId(item: any, field_name: any) {
    return item && (item[`${field_name}NameAr`] || item[`${field_name}Id`])
  }

  getNationalityName(item: any, field_name: any) {
    return item && (item[`${field_name}NameAr`] || item[`${field_name}`])
  }

  resetSearch(field_name: any) {
    switch (field_name) {
      case 'projectId':
        this.projectsSearchInput$.next(null);
        break;
      case 'developerId':
        this.developerSearchInput$.next(null);
        break;
      case 'landId':
        this.landSearchInput$.next(null);
        break;
      case 'oldLandId':
        this.oldLandSearchInput$.next(null);
        break;
      case 'owner':
        this.ownersSearchInput$.next(null);
        break;
    }
  }
}
