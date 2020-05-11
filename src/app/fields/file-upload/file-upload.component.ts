import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Field } from '../fields';
import { FieldsService } from 'src/app/shared/fields.service';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FileUploadComponent implements OnInit {

  @Input() field: Field;

  @Input() customClass: string;

  @Input() formData: any;

  @Input() index: any = 0;
  
  @ViewChild('labelImport') labelImport: ElementRef;
  constructor(private service: FieldsService) { }

  ngOnInit(): void {
  }

  getFieldModelName(field: Field) {
    return this.service.getModelName(field.fieldID, this.formData);
  }

  updateControlLabel(event: any) {
    const files = Array.from(event.target.files);
    this.labelImport.nativeElement.innerText = files.map((t:any) => t.name).join(', ');
  }
}
