import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-properties',
  templateUrl: './properties-profile.component.html',
  styleUrls: []
})
export class PropertiesProfileComponent implements OnInit {
  formData: any = {};
  profile$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.profile$ = this.route.data.pipe(pluck('profile'));
    this.profile$.subscribe((profile: any) => {
      if (profile && profile.id) {
        this.router.navigate([(profile.type && profile.type.toLowerCase()), 'profile', profile.id, 'edit'])
      } else {
        this.toastr.error('Something went Wrong', 'Error')
        this.router.navigate(['error'])
      }
    });
  }
}
