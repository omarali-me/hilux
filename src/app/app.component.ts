import { Component, OnInit } from '@angular/core';
import bsCustomFileInput from 'bs-custom-file-input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'hilux';

  ngOnInit() {
    bsCustomFileInput.init()
  }
}
