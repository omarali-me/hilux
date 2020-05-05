import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';
import { RowField } from '../fields/field_order';
import { FieldsService } from '../shared/fields.service';

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
          "fieldWidth": "six"
        },
        {
          "fieldID": "paymentPla",
          "fieldWidth": "six"
        }
      ]
    },
    {
      "row": "row3",
      "rowFields": [
        {
          "fieldID": "propertyType",
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

}
