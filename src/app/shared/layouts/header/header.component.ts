import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userloggedIn: boolean = false;
  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.userloggedIn = this.authenticationService.isLoggedIn();
  }

  logout() {
    this.authenticationService.signout();
    this.router.navigate(['/login']);
  }
}
