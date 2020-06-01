import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.css']
})

export class CustomPageComponent implements OnInit {
  response: any;

  constructor(private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.response = this.http.get('http://localhost:3000/custom_page');
  }

}
