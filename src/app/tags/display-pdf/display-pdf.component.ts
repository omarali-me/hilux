import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-pdf',
  templateUrl: './display-pdf.component.html',
  styleUrls: ['./display-pdf.component.css']
})
export class DisplayPdfComponent implements OnInit {

  @Input() data: any;

  @Input() customClass: string;

  constructor() { }

  ngOnInit(): void {
  }

}
