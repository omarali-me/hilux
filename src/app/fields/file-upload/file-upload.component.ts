import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Field } from '../fields';
import { FieldsService } from 'src/app/shared/fields.service';
import { ControlContainer, NgForm } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FileUploadComponent implements OnInit {
  uploads: any = [];

  @Input() field: Field;

  @Input() customClass: string;

  @Input() formData: any;

  @Input() row: any;

  @Input() index: any = 0;

  @Input() fullFormData: any;
  
  @Input() formErrors: any;

  @Input() defaultValues: any;

  @ViewChild('labelImport') labelImport: ElementRef;
  @ViewChild('progressBar') progressBar: ElementRef;
  @ViewChild('progressBarWrapper') progressBarWrapper: ElementRef;
  constructor(
    private service: FieldsService,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getDefaultValue(this.field.fieldID);
  }

  getFieldModelName(field: Field) {
    return this.service.getModelName(field.fieldID, this.formData);
  }

  async updateControlLabel(event: any) {
    this.progressBarWrapper.nativeElement.classList.remove('d-none')
    const files = Array.from(event.target.files);
    this.labelImport.nativeElement.innerText = files.map((t:any) => t.name).join(', ').slice(0, 75);
    const values = await this.uploadFiles(files);
    setTimeout(()=> {
      this.progressBarWrapper.nativeElement.classList.add('d-none')
    }, 2000);
  }

  getText(field: any, key: string) {
    return  this.service.getText(field, key);
  }

  showErrors(field_name: any) {
    return this.service.showErrors(field_name, this.formErrors);
  }

  getErrors(field_name: any) {
    return this.service.getErrors(field_name, this.formErrors);
  }

  getName(field_name) {
    return this.service.getFieldName(field_name, this.row, this.index)
  }

  getDefaultValue(field_name: any) {
    const values = this.service.getDefaultValue(field_name, this.defaultValues, (this.index || 0));
    this.formData[this.field.fieldID] = values ? values : undefined;
    this.uploads = values ? values : [];
  }

  async uploadFiles(files: any[]) {
    const fieldId = this.field.fieldID;
    let percentage = 0;
    for (let i = 0; i < files.length; i++) {
      percentage = 100/(files.length - i);
      await this.uploadFile(files[i], fieldId, percentage);
    }
  }

  private async uploadFile(file: any, fieldId: any, percentage: any) {
    let form = new FormData();
    let values = (this.formData[fieldId] || [])
    form.append(`${fieldId}`, file);
    return this.http.post<any>(`https://wfe.ajm.re/ajaxupload.php`, form).subscribe((data: any) => {
        if (data.status == 'success') {
          // Add value to formData
          values.push(data.data[fieldId]);
          this.setValues(values, fieldId);
          this.progressBar.nativeElement.style.width = `${percentage}%`;
        } else {
          this.appendIfValid(data.data, fieldId);
          // this.toastr.error(data.message, 'Error');
          this.progressBar.nativeElement.style.width = `${percentage}%`;
        }
      }, (error) => {
        console.log('error', error)
        this.progressBar.nativeElement.style.width = `${percentage}%`;
      })
  }

  private appendIfValid(data: any, fieldId: string) {
    let values = (this.formData[fieldId] || [])
    let regexp = /^http/;
    _.forEach(data, function(v, k) {
      if ((k == fieldId) && regexp.test(v))
        values.push(v);
    })
    this.setValues(values, fieldId);
  }

  private setValues(values: any [], fieldId: string) {
    if (values.length > 0) {
      this.formData[fieldId] = values;
    } else {
      this.formData[fieldId] = undefined;
    }
  }

  removeFile(index: any) {
    if (this.formData[this.field.fieldID]) {
      _.remove(this.formData[this.field.fieldID], function(resource, i) {
          return index === i;
      });

      if (this.formData[this.field.fieldID] && (this.formData[this.field.fieldID].length  == 0)) {
        this.formData[this.field.fieldID] = undefined;
      }
    }
  }

  notImage(item: any) {
    const ext = item.split('.');
    const index = ext.length;
    return ['pdf', 'ods', 'csv', 'xlsx', 'xls', 'ppt', 'pptx', 'doc', 'docx'].includes(ext[index - 1]);
  }

  getIconClass(item: any) {
    const ext = item.split('.');
    const index = ext.length;

    switch (ext[index -1]) {
      case 'pdf':
        return 'file-pdf';
      case 'ods':
      case 'xlsx':
      case 'xls':
        return 'file-excel';
      case 'doc':
      case 'docx':
          return 'file-word';
      case 'ppt':
      case 'pptx':
        return 'file-powerpoint';
      case 'csv':
        return 'file-alt';
      default:
        return 'file';
    }
  }
  
  isRequired() {
    return this.service.isRequired(this.field.required);
  }
}
