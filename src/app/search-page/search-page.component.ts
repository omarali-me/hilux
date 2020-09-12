import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldsService } from '../shared/fields.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

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

  
  currentSearchParams: SearchParams = {};

  paramsSubscription = new Subscription();
  results = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fieldsService: FieldsService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.queryParams
      .subscribe(params => this.search(params));
  }

  search(params: SearchParams) {
    this.reset();
    this.currentSearchParams = params;
    this.loadPage();
  }

  reset() {
    this.results = [];
    this.currentSearchParams = {};
  }

  loadPage() {
    const query = Object.assign(
      this.currentSearchParams
    );

    let fd = new FormData();
    fd.append('data', JSON.stringify(query));

    this.http.get(`http://localhost:3000/search`, { params: query })
      .subscribe((data: any) => {
        if (data.status == 'success') {
        } else {
          // this.formErrors = data.data;
          this.toastr.error(JSON.stringify(data.message), 'Error')
        }
    }, (error) => {
      this.toastr.error('Something went Wrong', 'Error')
      this.router.navigate(['error'])
    })
  }
}
