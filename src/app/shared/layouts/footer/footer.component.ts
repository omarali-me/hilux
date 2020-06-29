import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  userloggedIn: boolean = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    // this.userloggedIn = this.authenticationService.isLoggedIn();
  }

}
