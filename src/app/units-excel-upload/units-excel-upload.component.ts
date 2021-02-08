import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { FieldsService } from '../shared/fields.service';

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

  @ViewChild('controlLabel') controlLabel: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fieldsService: FieldsService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  uploadExcel(formData: any) {
    let fd = new FormData();
    fd.append('upload', this.uploadedFile);

    this.http.post(`${environment.apiHost}/AjmanLandProperty/index.php/excel/createUnitsByExcel`, fd)
      .subscribe((data: any) => {
        if (data.status == 'success') {
          this.response = data.data;
          this.resetUploadControl();
          // this.prepareStatusOptions(this.response);
          // this.prepareUnitNumberOptions(this.response);
          // this.prepareMeterTotalSoldAreaOptions(this.response);
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

}
