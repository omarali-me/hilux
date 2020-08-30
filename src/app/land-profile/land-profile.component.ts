import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FieldsService } from '../shared/fields.service';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-land-profile',
  templateUrl: './land-profile.component.html',
  styleUrls: ['./land-profile.component.css']
})
export class LandProfileComponent implements OnInit {
  formData: any = {};
  formErrors: any = {};
  profile$: Observable<any>;
  sectorsOptions: any;
  sectionsOptions: any;
  streetsNamesOptions: any;
  streetsTypesOptions: any;
  mainUsageTypesOptions: any;
  subUsageTypesOptions: any;
  citiesOptions: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private fieldsService: FieldsService
  ) { }

  ngOnInit(): void {
    this.profile$ = this.route.data.pipe(pluck('profile'));
    this.profile$.subscribe((profile: any) => {
      if (profile && profile.id) {
        this.formData = profile as any;
      } else {
        this.formData = { };
      }
    });
  }

  saveData(formData: any) {
    let fd = new FormData();
    fd.append('land', JSON.stringify(formData));
    this.http.post('https://wfe.ajm.re/AjmanLandProperty/index.php/lands/create', fd)
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

  loadSectorsOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/sectors`)
    .subscribe((data) => {
      this.sectorsOptions = data;
    })
  }

  loadSectionsOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/sections`)
    .subscribe((data) => {
      this.sectionsOptions = data;
    })
  }

  loadStreetNamesOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/streetsnames`)
    .subscribe((data) => {
      this.streetsNamesOptions = data;
    })
  }

  loadStreetTypesOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/streetsnames`)
    .subscribe((data) => {
      this.streetsTypesOptions = data;
    })
  }

  loadMainUsageTypesOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/mainUsageTypes`)
    .subscribe((data) => {
      this.mainUsageTypesOptions = data;
    })
  }

  loadSubUsageTypesOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/subUsageTypes`)
    .subscribe((data) => {
      this.subUsageTypesOptions = data;
    })
  }

  loadCitiesOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/cities`)
    .subscribe((data) => {
      this.citiesOptions = data;
    })
  }

  // isShoporShoppingMall() {
  //   return  true && completionRate == 100
  // }

  // isNotVavantLand() {
  //   return 
  // }

  // isWarehouse() {
  //   return true && completionRate == 100
  // }

  // isLabourerHouseing() {
  //   return true && completionRate == 100
  // }

  // isLeased () {
  //   return
  // }

}
