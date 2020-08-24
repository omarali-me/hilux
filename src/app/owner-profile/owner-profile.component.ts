import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-owner-profile',
  templateUrl: './owner-profile.component.html',
  styleUrls: []
})
export class OwnerProfileComponent implements OnInit {
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
