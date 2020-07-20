import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  formData: any;
  profileId: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.profileId = this.route.data.pipe(pluck('profileId'));
    this.profileId.subscribe((profileId) => {
      // let fd = new FormData();
      // fd.append('data', JSON.stringify({ profileId: _.toInteger(service)}));
      this.http.get(`http://localhost:3000/customer`, { params: { profileId }})
        .subscribe((data: any) =>{
          // if (data.status == 'success') {
            // this.toastr.success(data.message, 'Success')
            this.formData = data;
          // } else {
          //   this.toastr.error(data.message, 'Error')
          // }
        })
    })
  }

  saveData(formData: any) {
    console.log('here data is ', formData);
  }
}
