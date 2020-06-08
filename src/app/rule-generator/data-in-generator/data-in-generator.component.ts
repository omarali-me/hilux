import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { isArray } from 'util';
import * as _ from 'lodash';
import { PageResponse } from 'src/app/fields/page_response';

@Component({
  selector: 'app-data-in-generator',
  templateUrl: './data-in-generator.component.html',
  styleUrls: ['./data-in-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class DataInGeneratorComponent implements OnInit {
  @Input() formData: any;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit () {
    this.changeDetector.detectChanges();
  }
}