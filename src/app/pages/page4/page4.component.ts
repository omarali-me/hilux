import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FieldsService } from '../../shared/fields.service';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, pluck, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LookupsService } from '../../shared/lookups.service';

@Component({
  // selector: 'app-land-details',
  templateUrl: './page4.component.html',
  styleUrls: ['./page4.component.css']
})
export class PageFourComponent implements OnInit {
 
  constructor(
   
  ) { }

  ngOnInit(): void {
    
  }
 
}
