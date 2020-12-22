import { Component, OnInit } from '@angular/core';
import { Subscription, concat, of, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FieldsService } from '../shared/fields.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})


export class HomePageComponent implements OnInit {
  dashboardItems$: Observable<any>;
  formData: any = {};
  formErrors: any = {};
  response: any;


  ownersOptions: Observable<any>;
  ownersSearchInput$ = new Subject<string>();
  ownersOptionsLoading = false;


  //Testing
  people$: Observable<any[]>;
  selectedPeople = [];

source$ = [
  {id: 'hilux', name: 'النظام الداخلي'},
  {id: 'mobile', name: 'موقع الخدمات الإلكترونية'},
  {id: 'web', name: 'تطبيقات الهواتف الذكية'}
];
selectedSource = [];




  constructor(
    private fieldsService: FieldsService,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.people$ = this.fieldsService.getUrl(`https://jsonplaceholder.typicode.com/users`);
    // this.dashboardItems$ = 
    this.searchData();
  }

  // searchData(formData: any) {
  searchData() {
    // let prepapedData = this.prepareFormData(formData)
    let fd = new FormData();
    // fd.append('data', JSON.stringify(prepapedData));
    fd.append('data', '{"userID":["5","8","11"],"departmentID":[],"serviceID":["5"],"serviceCategoryID":[],"dateFrom":"Y-m-d H:i:s","dateTo":"Y-m-d H:i:s","applicationSource":["hilux","web","mobile"]}');

    this.http.post(`${environment.apiHost}/AjmanLandProperty/index.php/Applications/dashboard`, fd)
      .subscribe((data: any) => {
        if (data.status == 'success') {
          this.response = data.data;
          console.log(data.data);

        } else {
          this.formErrors = data.data;
          this.toastr.error(JSON.stringify(data.message), 'Error');
        }
      }, (error) => {
        this.toastr.error('Something went Wrong', 'Error');
        this.router.navigate(['error']);
      });
  }

  prepareFormData(formData: any) {
    this.formData.value = this.formData.userID
    this.formData.value = this.formData.departmentID
    this.formData.value = this.formData.serviceID
    this.formData.value = this.formData.serviceCategoryID
    this.formData.value = this.formData.dateFrom
    this.formData.value = this.formData.dateTo
    this.formData.value = this.formData.applicationSource
    this.formData.value = null;
    return formData
  }


  loadOwnersOptions() {
    this.ownersOptions = concat(
      of([]), // default items
      this.ownersSearchInput$.pipe(
        distinctUntilChanged(),
        tap(() => this.ownersOptionsLoading = true),
        switchMap(term => {
          return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/lookups/owners`, { term }).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => this.ownersOptionsLoading = false)
          )
        })
      )
    );
  }

  

}
