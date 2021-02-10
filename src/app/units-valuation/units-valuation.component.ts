import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable, Subject, concat, of } from 'rxjs';
import { distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FieldsService } from '../shared/fields.service';
import * as _ from 'lodash';
import { LookupsService } from '../shared/lookups.service';

interface SearchParams {
  query?: string;
  filter?: string;
}

@Component({
  selector: 'app-units-valuation',
  templateUrl: './units-valuation.component.html',
  styleUrls: ['./units-valuation.component.css']
})
export class UnitsValuationComponent implements OnInit {
  formData: any = {};
  addBlockData: any = {};
  updateBlockData: any = {};
  removeBlockData: any = {};
  formErrors: any = {};
  currentSearchParams: SearchParams = {};
  paramsSubscription = new Subscription();
  results = [];
  developerOptions: Observable<any>;
  projectsOptions: Observable<any>;
  developerDataOptionsLoading = false;
  developerSearchInput$ = new Subject<string>();
  projectsSearchInput$ = new Subject<string>();
  projectDataOptionsLoading = false;
  unitsOptions: any;
  unitTypesOptions: any;
  ownersOptions: Observable<any>;
  response: any;
  searchby: any;
  hideAttachmentsControl;
  minDate: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fieldsService: FieldsService,
    private http: HttpClient,
    private toastr: ToastrService,
    private ngxSmartModalService: NgxSmartModalService,
    private lookupsService: LookupsService
  ) { }

  ngOnInit(): void {
    this.minDate = new Date();
    this.toggleControl(false);
    this.loadUnitsOptions();
    this.loadDeveloperOptions();
    this.loadProjectsOptions();
    this.loadUnitTypesOptions()

    this.route.queryParams.subscribe(async (params) => {
      if (!_.isEqual(params, {})) {
        this.formData.propertyId = params.propertyId;
        await this.searchData(this.formData);
      }
    });
  }

  searchData(formData: any) {
    this.http.get(`${environment.apiHost}/AjmanLandProperty/index.php/blockages/getByPropertyId/${this.getPropertyId(formData)}`)
      .subscribe((data: any) => {
        if (data.status == 'success') {
          this.response = data.data;
        } else {
          this.formErrors = data.data;
          this.toastr.error(JSON.stringify(data.message), 'Error');
        }
      }, (error) => {
        this.toastr.error('Something went Wrong', 'Error');
        this.router.navigate(['error']);
      });
  }

  loadUnitsOptions() {
    this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/units`, { projectId: this.formData.projectId })
      .subscribe((data) => {
        this.unitsOptions = data;
      })
  }

  loadUnitTypesOptions() {
    this.lookupsService.loadUnitsTypesOptions()
      .subscribe((data) => {
        this.unitTypesOptions = data;
      })
  }

  loadDeveloperOptions() {
    this.developerOptions = concat(
      of([]), // default items
      this.developerSearchInput$.pipe(
        distinctUntilChanged(),
        tap(() => this.developerDataOptionsLoading = true),
        switchMap(term => {
          return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/developers`, { term }).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => this.developerDataOptionsLoading = false)
          )
        })
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
          return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/projects`, { term, developerId: this.formData.developerId }).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => this.projectDataOptionsLoading = false)
          )
        })
      )
    );
  }

  isLandResponse() {
    return this.response && (this.response.type == 1 || this.response.type == '1')
  }

  isUnitResponse() {
    return this.response && (this.response.type == 2 || this.response.type == '2')
  }

  isSearchByUnit() {
    return (this.formData.type == '2')
  }

  isNotSearchTypeUnit() {
    return !!this.formData.type && (['1'].includes(this.formData.type) || [1].includes(this.formData.type))
  }

  isNotSearchTypeLand() {
    return !!this.formData.type && (['2'].includes(this.formData.type) || [2].includes(this.formData.type))
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

  getfirstLand(response: any) {
    return response.length > 0 ? response[0].land : {}
  }

  getFirstResponse(response: any) {
    return response.length > 0 ? response[0] : {}
  }

  getfirstUnit(deeds: any) {
    return deeds.length > 0 ? deeds[0].unitData : {}
  }

  getfirst(deeds: any) {
    return deeds.length > 0 ? deeds[0].deedDetails[0] : {}
  }

  getCurrentOwnedBlocks(blockages: any) {
    return this.filterBlocksWithStatus(blockages, '1');
  }

  getPreviouslyOwnedBlocks(blockages: any) {
    return this.filterBlocksWithStatus(blockages, '0');
  }

  getCurrentOwnedUnits(blockages: any) {
    return this.filterUnitsWithStatus(blockages, '1');
  }

  getPreviouslyOwnedUnits(blockages: any) {
    return this.filterUnitsWithStatus(blockages, '0');
  }

  filterBlocksWithStatus(blockages: any, status: any) {
    return blockages.filter(d => d.status == status);
  }

  filterUnitsWithStatus(deeds: any, status: any) {
    return deeds.filter(d => d.unitData && d.deed?.status == status);
  }

  getFieldNameorId(item: any, field_name: any) {
    return item && (item[`${field_name}NameAr`] || item[`${field_name}Id`])
  }

  getNationalityName(item: any, field_name: any) {
    return item && (item[`${field_name}NameAr`] || item[`${field_name}`])
  }

  getAttachments(attachments: any[]) {
    return !!attachments && attachments.map((a, i) => ({
      name: `attachment ${i + 1}`,
      link: a
    }))
  }

  getCreatesAtModifiedAt(block: any) {
    return `${block.createdAt} \n ${block.modifiedAt}`
  }

  getCreatesByModifiedBy(block: any) {
    return `${block.createdByNameAr} \n ${block.modifiedByNameAr}`
  }

  resetSearch(field_name: any) {
    switch (field_name) {
      case 'projectId':
        this.projectsSearchInput$.next(null);
        break;
      case 'developerId':
        this.developerSearchInput$.next(null);
        break;
    }
  }

  async editBlockage(blockage: any) {
    await this.openUpdateBlockModal(blockage);
  }

  getProjectName(response: any) {
    const firstResponse = this.getFirstResponse(response);
    return !!firstResponse && firstResponse?.unit?.projectNameAr;
  }

  getUnitNumber(response: any) {
    const firstResponse = this.getFirstResponse(response);
    return !!firstResponse && firstResponse?.unit?.unitNumber;
  }

  getDeveloperName(response: any) {
    const firstResponse = this.getFirstResponse(response);
    return !!firstResponse && firstResponse?.unit?.developerNameAr;
  }

  prepareProjectValueOptions(params: any) {
    if(!!params.projectId) {
      this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/projects`, { id: params.projectId })
      .subscribe((option)=> {
        this.projectsSearchInput$.next(option.value && option.value.en);
      })
    }
  }

  prepareDeveloperValueOptions(params: any) {
    if(!!params.developerId) {
      this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/developers`, { id: params.developerId })
      .subscribe((option)=> {
        this.developerSearchInput$.next(option.value && option.value.en);
      })
    }
  }


  prepareUnitValueOptions(params: any) {
    if(!!params.unitId) {
      this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/units`, { id: params.unitId })
      .subscribe((option)=> {
      })
    }
  }

  getPropertyId(formData: any) {
    if (formData.type == '1') {
      return formData.landId || formData.oldLandId;
    } else if (formData.type == '2') {
      return formData.unitId;
    } else {
      return formData.propertyId;
    }
  }

  isLandBlockage(response: any) {
    const firstLand = this.getfirstLand(response);
    return  !!firstLand && !!firstLand.landId;
  }

  openAddBlockModal() {
    this.toggleControl(false);
    this.setPropertyId(this.addBlockData);
    this.ngxSmartModalService.getModal('addBlockModal').open();
  }

  async openUpdateBlockModal(blockage: any) {
    this.toggleControl(false);
    this.getBlockage(blockage.id)
      .subscribe(async (data: any) => {
        if (data.status == 'success') {
          this.updateBlockData = data.data
          this.updateBlockData.attachments = undefined;
        } else {
          this.formErrors = data.data;
          this.toastr.error(JSON.stringify(data.message), 'Error')
        }
    }, (error) => {
      this.toastr.error('Something went Wrong', 'Error')
      this.router.navigate(['error'])
    })
    this.ngxSmartModalService.getModal('updateBlockModal').open();
  }

  addNewBlock(formData: any) {
    let fd = new FormData();
    fd.append('data', JSON.stringify(formData));

    this.http.post(`${environment.apiHost}/AjmanLandProperty/index.php/blockages/create`, fd)
      .subscribe((data: any) => {
        if (data.status == 'success') {
          this.ngxSmartModalService.closeLatestModal();
          this.searchData(formData);
          this.addBlockData = {};
        } else {
          this.formErrors = data.data;
          this.toastr.error(JSON.stringify(data.message), 'Error')
        }
    }, (error) => {
      this.toastr.error('Something went Wrong', 'Error')
      this.router.navigate(['error'])
    })
  }

  prepareAttachments() {
    return {
      fieldID: "attachments",
      fieldType: "fileupload",
      required: true,
      fieldName: {
        "ar": "attachments",
        "en": "attachments"
      },
      auxInfo: {
        multiple: true
      }
    }
  }

  prepareUpdateAttachments() {
    return {
      fieldID: "attachments",
      fieldType: "fileupload",
      required: false,
      fieldName: {
        "ar": "attachments",
        "en": "attachments"
      },
      auxInfo: {
        multiple: true
      }
    }
  }

  setPropertyId(data: any) {
    const firstResponse = this.getFirstResponse(this.response);
    data.propertyId = firstResponse && (firstResponse.propertyId || (firstResponse.land && firstResponse.land.propertyId) || this.getPropertyId(this.formData));
  }

  resetAddBlockModal() {
    this.addBlockData = {};
    this.toggleControl(true);
  }

  resetUpdateBlockModal() {
    this.updateBlockData = {};
    this.toggleControl(true);
  }

  resetRemoveBlockModal() {
    this.removeBlockData = {};
    this.toggleControl(true);
  }

  updateBlock(formData: any) {
    let fd = new FormData();
    fd.append('data', JSON.stringify(formData));

    this.http.post(`${environment.apiHost}/AjmanLandProperty/index.php/blockages/update/${formData.id}`, fd)
      .subscribe((data: any) => {
        if (data.status == 'success') {
          this.ngxSmartModalService.closeLatestModal();
          this.searchData(formData);
          this.addBlockData = {};
        } else {
          this.formErrors = data.data;
          this.toastr.error(JSON.stringify(data.message), 'Error')
        }
    }, (error) => {
      this.toastr.error('Something went Wrong', 'Error')
      this.router.navigate(['error'])
    })
  }

  removeBlock(formData: any) {
    let fd = new FormData();
    fd.append('data', JSON.stringify(formData));

    this.http.post(`${environment.apiHost}/AjmanLandProperty/index.php/blockages/deactivate/${formData.id}`, fd)
      .subscribe((data: any) => {
        if (data.status == 'success') {
          this.ngxSmartModalService.closeLatestModal();
          this.searchData(formData);
          this.addBlockData = {};
        } else {
          this.formErrors = data.data;
          this.toastr.error(JSON.stringify(data.message), 'Error')
        }
    }, (error) => {
      this.toastr.error('Something went Wrong', 'Error')
      this.router.navigate(['error'])
    })
  }

  getBlockage(blockageId: any) {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/blockages/get/${blockageId}`);
  }

  toggleControl(value?: boolean) {
    this.hideAttachmentsControl = (!!value ? value : !this.hideAttachmentsControl)
    return this.hideAttachmentsControl;
  }
}
