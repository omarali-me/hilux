import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FieldsService } from '../shared/fields.service';
import { Observable, Subject } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-land-profile',
  templateUrl: './land-profile.component.html',
  styleUrls: ['./land-profile.component.css']
})
export class LandProfileComponent implements OnInit {
  formData: any = { buildingDetails: {}, buildingFinishes: {} };
  formErrors: any = {};
  profile$: Observable<any>;
  sectorsOptions: any;
  sectionsOptions: any;
  streetsNamesOptions: any;
  streetsTypesOptions: any;
  mainUsageTypesOptions: any;
  subUsageTypesOptions: any;
  citiesOptions: any;
  dataOptionsLoading = false;
  propertyTypesOptions: any;
  searchInput$ = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private fieldsService: FieldsService
  ) { }

  ngOnInit(): void {
    this.loadSectorsOptions();
    this.loadSectionsOptions();
    this.loadStreetNamesOptions();
    this.loadStreetTypesOptions();
    this.loadMainUsageTypesOptions();
    this.loadSubUsageTypesOptions();
    this.loadCitiesOptions();
    this.loadPropertyTypesOptions();
    
    this.profile$ = this.route.data.pipe(pluck('profile'));
    this.profile$.subscribe((profile: any) => {
      if (profile && profile.id) {
        this.formData = profile as any;
      } else {
        this.formData = { buildingDetails: {}, buildingFinishes: {} };
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
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/streetstypes`)
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

  loadPropertyTypesOptions() {
    this.fieldsService.getUrl(`https://wfe.ajm.re/AjmanLandProperty/index.php/Lookups/landsTypes`)
    .subscribe((data) => {
      this.propertyTypesOptions = data;
    })
  }

  isShoporShoppingMall() {
    return (this.formData.typeId == '12' || this.formData.typeId == 12) && this.isCompleted()
  }

  isNotVacantLand() {
    return (!['1', '2'].includes(this.formData.typeId))
  }

  isWarehouse() {
    return (this.formData.typeId == '16' || this.formData.typeId == 16) && this.isCompleted()
  }

  isLabourerHousing() {
    return (this.formData.typeId == '7' || this.formData.typeId == 7) && this.isCompleted()
  }

  isLeased() {
    return !!this.formData.buildingDetails && this.formData.buildingDetails.propertyLeased;
  }

  isCompleted() {
    return this.formData.buildingDetails && (this.formData.buildingDetails.completionRate == 100 || this.formData.buildingDetails.completionRate == '100')
  }

  prepareSectorImage() {
    return {
      fieldID: "sectorImageUrl",
      fieldType: "fileupload",
      required: false,
      fieldName: {
        "ar": "Sector Image",
        "en": "Sector Image"
      }
    }
  }

  prepareDistrictImage() {
    return {
      fieldID: "districtImageUrl",
      fieldType: "fileupload",
      required: false,
      fieldName: {
        "ar": "District Image",
        "en": "District Image"
      }
    }
  }

  prepareParcelImage() {
    return {
      fieldID: "parcelImageUrl",
      fieldType: "fileupload",
      required: false,
      fieldName: {
        "ar": "Parcel Image",
        "en": "Parcel Image"
      }
    }
  }
}
