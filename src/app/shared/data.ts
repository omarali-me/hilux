export const RESPONSE_DATA = {
    "displayData": [{
      "image":{"caption":"customer Signature", "src":"https://i.picsum.photos/id/1002/4312/2868.jpg"},
      "image-gallery":
              [
                  {"caption":"page 1 of contract", "src":"https://i.picsum.photos/id/1003/1181/1772.jpg"},
                  {"caption":"page 2 of contract", "src":"https://i.picsum.photos/id/1016/3844/2563.jpg"},
                  {"caption":"page 3 of contract", "src":"https://i.picsum.photos/id/1018/3914/2935.jpg"},
                  {"caption":"page 1 of contract", "src":"https://i.picsum.photos/id/1024/1920/1280.jpg"},
                  {"caption":"page 2 of contract", "src":"https://i.picsum.photos/id/102/4320/3240.jpg"},
                  {"caption":"page 3 of contract", "src":"https://i.picsum.photos/id/100/2500/1656.jpg"}
              ],
      "pdf":{"caption":"passport copy","src":"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
      "pdf-gallery":
              [
                  {"caption":"page 1 of power of attorney", "src":"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
                  {"caption":"page 2 of power of attorney", "src":"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
                  {"caption":"page 3 of power of attorney", "src":"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
                  {"caption":"page 4 of power of attorney", "src":"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
              ],
      "table": 
              {
                "title":"List of Previous Mortgages",
                "thead":
                    [
                        {"ar":"arabic title of column 1", "en":"english title of column 1"},
                        {"ar":"arabic title of column 2", "en":"english title of column 2"},
                        {"ar":"arabic title of column 3", "en":"english title of column 3"}
                    ],
                "tbody":
                    [
                        [{"ar":"arabic title of column 1", "en":"english title of column 1"},
                        {"ar":"arabic title of column 2", "en":"english title of column 2"},
                        {"ar":"arabic title of column 3", "en":"english title of column 3"}], // row 1's data .. entityName can be CustomerTable, or MortgageTable etc.. this would be used so that if there is a mouse-over action and we want to display 'more' of that entity's data points... you'd call an ajax with the name of the entity and its ID value to get back more data
                        [{"ar":"arabic title of column 1", "en":"english title of column 1"},
                        {"ar":"arabic title of column 2", "en":"english title of column 2"},
                        {"ar":"arabic title of column 3", "en":"english title of column 3"}],
                        [{"ar":"arabic title of column 1", "en":"english title of column 1"},
                        {"ar":"arabic title of column 2", "en":"english title of column 2"},
                        {"ar":"arabic title of column 3", "en":"english title of column 3"}],
                        [{"ar":"arabic title of column 1", "en":"english title of column 1"},
                        {"ar":"arabic title of column 2", "en":"english title of column 2"},
                        {"ar":"arabic title of column 3", "en":"english title of column 3"}]
                    ]
            },
            "field-data": { "label":{"ar":"arabic field label","en":"english field label"},
                            "value": {"ar":"arabic field value to display", "en":"english field value to display"}},
            "field-group":
              {
                  "fieldGroupName":{"ar":"summary of invoice arabic title","en":"summary of invoice"},
                  "fields":        
                  [
                      {"label":{"ar":"arabic label","en":"english label"},"value":{"ar":"arabic value", "en":"english value"}},
                      {"label":{"ar":"arabic label","en":"english label"},"value":{"ar":"arabic value", "en":"english value"}},
                      {"label":{"ar":"arabic label","en":"english label"},"value":{"ar":"arabic value", "en":"english value"}}
                  ]
              }
    }],
    "fields": [
      {
        "fieldID": "unitNumber",
        "fieldType": "autocomplete",
        "required": "true",
        "fieldName": {
          "ar": "رقم الوحدة العقارية",
          "en": "Real Estate Unit Number"
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
          "apiParams":["projectname"],
          "sourceDetails": "https://ajm.re/fikra/index.php/it/getDeveloperProjects"
        }
      },
      {
        "fieldID": "testing",
        "fieldType": "entitySelect",
        "required": "true",
        "fieldName": {
        "ar": "البريد الالكتروني",
        "en": "testing"
        },
        "placeholder": {
        "ar": "",
        "en": "select testing"
        },
        "errorMsg": {
        "ar": "",
        "en": "Select one"
        },
        "auxInfo": {
        "acceptedFileTypes": "",
        "minLength": "",
        "maxLength": "",
        "type": "",
        "source": "list",
        "sourceDetails": [
            {
                "entityID": "1234",
                "rowFields": {
                "LandID": "1234",
                "LandArea": "500 m2",
                "LandLocation": "Ajman City Center"
                }
            },
            {
                "entityID": "125",
                "rowFields": {
                "LandID": "125",
                "LandArea": "1500 m2",
                "LandLocation": "Ajman Townsquare"
                }
            },
            {
                "entityID": "126",
                "rowFields": {
                "LandID": "1236",
                "LandArea": "5400 m2",
                "LandLocation": "Plaza Mall Area"
                }
            }
            ]
        }
    },
      {
        "fieldID": "email",
        "fieldType": "text",
        "required": "false",
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
        "required": "false",
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
        "required": "false",
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
        "fieldType": "checkbox",
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
        "required": "false",
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
        "required": "false",
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
        "required": "false",
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
        "required": "false",
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
        "row": "row0",
        "rowFields": [
          {
            "fieldID": "testing",
            "fieldWidth": "twelve"
          }
        ]
      },
      {
        "row": "row1",
        "allowMultiple": "true",
        "rowFields": [
          {
            "fieldID": "email",
            "fieldWidth": "six"
          },
          {
            "fieldID": "projectName",
            "fieldWidth": "six"
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