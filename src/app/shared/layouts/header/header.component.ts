import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userloggedIn: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.authenticationService.isLoggedIn().subscribe((data) => {
      this.userloggedIn = data;
    })
  }

  logout() {
    this.authenticationService.signout().subscribe((data) => {
      if (data.status == 'success') {
        this.toastr.success('Successfully Logged out', 'Success')
        this.router.navigate(['/login']);
      } else {
        this.toastr.error(data.message, 'Error')
      }
    })
  }
}
