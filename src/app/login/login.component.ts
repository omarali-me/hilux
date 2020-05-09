import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';
import { RowField } from '../fields/field_order';
import { FieldsService } from '../shared/fields.service';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

const RESPONSE_DATA = {
  "fields": [
    {
      "fieldID": "email",
      "fieldType": "text",
      "required": "true",
      "fieldName": {
        "ar": "البريد الالكتروني",
        "en": "Email"
      },
      "placeholder": {
        "ar": "",
        "en": "Enter Email"
      },
      "errorMsg": {
        "ar": "",
        "en": "Enter Valid Email"
      },
      "auxInfo": {
        "acceptedFileTypes": "",
        "minLength": "",
        "maxLength": "",
        "type": "",
        "source": "",
        "sourceDetails": ""
      }
    },
    {
      "fieldID": "password",
      "fieldType": "password",
      "required": "true",
      "fieldName": {
        "ar": "البريد الالكتروني",
        "en": "Password"
      },
      "placeholder": {
        "ar": "",
        "en": "Enter Password"
      },
      "errorMsg": {
        "ar": "",
        "en": "Enter Valid Password"
      },
      "auxInfo": {
        "acceptedFileTypes": "",
        "minLength": "8",
        "maxLength": "10",
        "type": "",
        "source": "",
        "sourceDetails": ""
      }
    },
    {
      "fieldID": "paymentPla",
      "fieldType": "fileupload",
      "required": "true",
      "fieldName": {
        "ar": "خطة الدفع",
        "en": "Payment Plan"
      },
      "placeholder": {
        "ar": "",
        "en": ""
      },
      "errorMsg": {
        "ar": "",
        "en": ""
      },
      "auxInfo": {
        "acceptedFileTypes": "application/pdf,.xlsx,.ods",
        "minLength": "",
        "maxLength": "",
        "type": "Date",
        "source": "api",
        "sourceDetails": "it/getAllEmployees"
      }
    },
    {
      "fieldID": "propertyType",
      "fieldType": "radio",
      "required": "true",
      "fieldName": {
        "ar": "نوع العقار",
        "en": "Property Type"
      },
      "placeholder": {
        "ar": "",
        "en": ""
      },
      "errorMsg": {
        "ar": "",
        "en": ""
      },
      "auxInfo": {
        "acceptedFileTypes": "",
        "minLength": "",
        "maxLength": "",
        "type": "Date",
        "source": "list",
        "sourceDetails": [
          {
            "key": "commercial",
            "value": {
              "ar": "تجاري",
              "en": "Commercial"
            }
          },
          {
            "key": "residential",
            "value": {
              "ar": "سكني",
              "en": "Residential"
            }
          }
        ]
      }
    },
    {
      "fieldID": "projectCompletionDate",
      "fieldType": "datetime",
      "required": "true",
      "fieldName": {
        "ar": "تاريخ إنجاز المشروع",
        "en": "Project completion date"
      },
      "placeholder": {
        "ar": "",
        "en": ""
      },
      "errorMsg": {
        "ar": "",
        "en": ""
      },
      "auxInfo": {
        "acceptedFileTypes": "",
        "minLength": "",
        "maxLength": "",
        "type": "Date",
        "source": "api",
        "sourceDetails": "it/getAllEmployees"
      }
    },
    {
      "fieldID": "terms",
      "fieldType": "textarea",
      "required": "true",
      "fieldName": {
        "ar": "الشروط الخاصة بين الاطراف",
        "en": "Terms & Conditions"
      },
      "placeholder": {
        "ar": "",
        "en": ""
      },
      "errorMsg": {
        "ar": "",
        "en": "Terms & Conditions error"
      },
      "auxInfo": {
        "acceptedFileTypes": "",
        "minLength": "",
        "maxLength": "",
        "type": "Date",
        "source": "api",
        "sourceDetails": "it/getAllEmployees"
      }
    },
    {
      "fieldID": "emiratesIDNumber",
      "fieldType": "number",
      "required": "true",
      "fieldName": {
        "ar": "رقم الهوية",
        "en": "Emirates ID #"
      },
      "placeholder": {
        "ar": "",
        "en": "Enter number please"
      },
      "errorMsg": {
        "ar": "",
        "en": ""
      },
      "auxInfo": {
        "acceptedFileTypes": "",
        "minLength": "",
        "maxLength": "",
        "type": "Date",
        "source": "api",
        "sourceDetails": "it/getAllEmployees"
      }
    },
    {
      "fieldID": "projectName",
      "fieldType": "dropdown",
      "required": "true",
      "fieldName": {
        "ar": "اسم المشروع الرئيسي / البرج",
        "en": "Project Name"
      },
      "placeholder": {
        "ar": "",
        "en": "testing plaveolder"
      },
      "errorMsg": {
        "ar": "",
        "en": ""
      },
      "auxInfo": {
        "acceptedFileTypes": "",
        "minLength": "",
        "maxLength": "",
        "type": "Date",
        "source": "api",
        "sourceDetails": "localhost/fikra/index.php/it/getDeveloperProjects"
      }
    }
  ],
  "fieldOrder": [
    {
      "row": "row1",
      "allowMultiple": "true",
      "rowFields": [
        {
          "fieldID": "email",
          "fieldWidth": "twelve"
        }
      ]
    },
    {
      "row": "row2",
      "allowMultiple": "true",
      "rowFields": [
        {
          "fieldID": "password",
          "fieldWidth": "twelve"
        }
      ]
    },
    {
      "row": "row3",
      "rowFields": [
        {
          "fieldID": "paymentPla",
          "fieldWidth": "twelve"
        }
      ]
    },
    {
      "row": "row4",
      "rowFields": [
        {
          "fieldID": "propertyType",
          "fieldWidth": "twelve"
        }
      ]
    },
    {
      "row": "row6",
      "rowFields": [
        {
          "fieldID": "terms",
          "fieldWidth": "twelve"
        }
      ]
    },
    {
      "row": "row7",
      "rowFields": [
        {
          "fieldID": "emiratesIDNumber",
          "fieldWidth": "twelve"
        }
      ]
    },
    {
      "row": "row8",
      "rowFields": [
        {
          "fieldID": "projectName",
          "fieldWidth": "twelve"
        }
      ]
    }
  ]
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  response: any;
  formData: any = {};

  @ViewChild('app-field') field;
  @ViewChild('rowReference') rowReference: ElementRef;
  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private fieldsService: FieldsService
    ) { }

  ngOnInit(): void {
    this.response = RESPONSE_DATA;
  }

  login(formData: any) {
    console.log('formData received is', formData);
    this.authenticationService.signin();
    this.router.navigate(['/']);
  }

  logout() {
    this.authenticationService.signout();
  };

  getClass(classname: string, field: RowField) {
    return classname + this.fieldsService.getFieldWidth(field.fieldWidth)
  }

  getFormDatafor(row: any, index?: any) {
    if (row.allowMultiple) {
      this.formData[row.row] ? this.formData[row.row] : (this.formData[row.row] = [{}])
    } else {
      this.formData[row.row] ? this.formData[row.row] : (this.formData[row.row] = {})
    }
    return this.formData[row.row];
  }

  addRow(row, index) {
    console.log('add row', row);
    this.formData[row.row].push({});
  }

  getrowId(row: any) {
    return `${row.row}`;
  }

  getsubrowId(subRow) {
    // return `${subRow.row}`;
  }

  deleteRow(row, index) {
    _.remove(this.formData[row.row], function(resource, i) {
        return index === i;
    });
  }
}
