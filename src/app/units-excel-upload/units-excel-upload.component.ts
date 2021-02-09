import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { FieldsService } from '../shared/fields.service';
import { LookupsService } from '../shared/lookups.service';
import * as _ from 'lodash';

interface SearchParams {
  query?: string;
  filter?: string;
}

@Component({
  selector: 'app-units-excel-upload',
  templateUrl: './units-excel-upload.component.html',
  styleUrls: ['./units-excel-upload.component.css']
})
export class UnitsExcelUploadComponent implements OnInit {
  formData: any = {};
  filterData: any = { meterTotalSoldArea: '', registrationStatus: '', unitNumber: ''};
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
  landDataOptionsLoading = false;
  landSearchInput$ = new Subject<string>();
  unitsOptions: any;
  response: any;
  minDate:any;
  uploadedFile: any;
  registrationTypeOptions: any;
  unitNumberOptions: any;
  meterTotalSoldAreaOptions: any;

  @ViewChild('controlLabel') controlLabel: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fieldsService: FieldsService,
    private http: HttpClient,
    private toastr: ToastrService,
    private lookupsService: LookupsService
  ) { }

  ngOnInit(): void {
    this.loadRegistrationTypes();
  }

  uploadExcel(formData: any) {
    let fd = new FormData();
    fd.append('upload', this.uploadedFile);

    this.http.post(`${environment.apiHost}/AjmanLandProperty/index.php/excel/createUnitsByExcel`, fd)
      .subscribe(async (data: any) => {
        if (data.status == 'success') {
          this.response = data.data;
          this.resetUploadControl();
          await this.prepareUnitNumberOptions(this.response);
          await this.prepareMeterTotalSoldAreaOptions(this.response);
        } else {
          this.formErrors = data.data;
          this.toastr.error(JSON.stringify(data.message), 'Error');
        }
      }, (error) => {
        this.toastr.error('Something went Wrong', 'Error');
        this.router.navigate(['error']);
      });
  }

  async updateControlLabel(event: any) {
    const files = Array.from(event.target.files);
    this.controlLabel.nativeElement.innerText = files.map((t:any) => t.name).join(', ').slice(0, 75);
    this.uploadedFile = files[0];
  }

  resetUploadControl() {
    this.formErrors = {}
    this.controlLabel.nativeElement.innerText = 'choose file';
  }

  loadRegistrationTypes() {
    let options  = [{
      key: "",
      value: { en: 'All', ar: 'All' }
    }]

    this.lookupsService.loadRegistrationTypes()
      .subscribe((data) => {
        this.registrationTypeOptions = _.union(options, data);
      })
  }

  prepareUnitNumberOptions(response: any) {
    let options  = [{
      key: "",
      value: { en: 'All', ar: 'All' }
    }]

    let preparedOptions = this.prepareOptions(response.units, 'unitNumber')

    this.unitNumberOptions = _.union(options, preparedOptions);
  }

  prepareMeterTotalSoldAreaOptions(response: any) {
    let options  = [{
      key: "",
      value: { en: 'All', ar: 'All' }
    }]

    let preparedOptions = this.prepareOptions(response.units, 'meterTotalSoldArea')
    this.meterTotalSoldAreaOptions = _.union(options, preparedOptions);
  }

  filterResponse() {
    let results = this.response && this.response.units;

    if (this.filterData.meterTotalSoldArea != '') {
      results = results.filter( r => r.meterTotalSoldArea == this.filterData.meterTotalSoldArea )
    }

    if (this.filterData.unitNumber != '') {
      results = results.filter( r => r.unitNumber == this.filterData.unitNumber )
    }

    if (this.filterData.registrationStatus != '') {
      results = results.filter( r => r.registrationStatus == this.filterData.registrationStatus )
    }

    return results;
  }

  prepareOptions(iteratee: any[], fieldName: string) {
    let options = []
    iteratee.forEach((item)=> {
      options.push({
        key: item[fieldName],
        value: { en: item[fieldName], ar: item[fieldName] }
      })
    })

    return options;
  }
}
