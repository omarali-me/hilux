export const RESPONSE_DATA = {
    // "displayData": [{
    //   "image":{"caption":"customer Signature", "src":"https://i.picsum.photos/id/1002/4312/2868.jpg"},
    //   "image-gallery":
    //           [
    //               {"caption":"page 1 of contract", "src":"https://i.picsum.photos/id/1003/1181/1772.jpg"},
    //               {"caption":"page 2 of contract", "src":"https://i.picsum.photos/id/1016/3844/2563.jpg"},
    //               {"caption":"page 3 of contract", "src":"https://i.picsum.photos/id/1018/3914/2935.jpg"},
    //               {"caption":"page 1 of contract", "src":"https://i.picsum.photos/id/1024/1920/1280.jpg"},
    //               {"caption":"page 2 of contract", "src":"https://i.picsum.photos/id/102/4320/3240.jpg"},
    //               {"caption":"page 3 of contract", "src":"https://i.picsum.photos/id/100/2500/1656.jpg"}
    //           ],
    //   "pdf":{"caption":"passport copy","src":"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
    //   "pdf-gallery":
    //           [
    //               {"caption":"page 1 of power of attorney", "src":"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
    //               {"caption":"page 2 of power of attorney", "src":"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
    //               {"caption":"page 3 of power of attorney", "src":"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
    //               {"caption":"page 4 of power of attorney", "src":"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
    //           ],
    //   "table": 
    //           {
    //             "title":"List of Previous Mortgages",
    //             "thead":
    //                 [
    //                     {"ar":"arabic title of column 1", "en":"english title of column 1"},
    //                     {"ar":"arabic title of column 2", "en":"english title of column 2"},
    //                     {"ar":"arabic title of column 3", "en":"english title of column 3"}
    //                 ],
    //             "tbody":
    //                 [
    //                     [{"ar":"arabic title of column 1", "en":"english title of column 1"},
    //                     {"ar":"arabic title of column 2", "en":"english title of column 2"},
    //                     {"ar":"arabic title of column 3", "en":"english title of column 3"}], // row 1's data .. entityName can be CustomerTable, or MortgageTable etc.. this would be used so that if there is a mouse-over action and we want to display 'more' of that entity's data points... you'd call an ajax with the name of the entity and its ID value to get back more data
    //                     [{"ar":"arabic title of column 1", "en":"english title of column 1"},
    //                     {"ar":"arabic title of column 2", "en":"english title of column 2"},
    //                     {"ar":"arabic title of column 3", "en":"english title of column 3"}],
    //                     [{"ar":"arabic title of column 1", "en":"english title of column 1"},
    //                     {"ar":"arabic title of column 2", "en":"english title of column 2"},
    //                     {"ar":"arabic title of column 3", "en":"english title of column 3"}],
    //                     [{"ar":"arabic title of column 1", "en":"english title of column 1"},
    //                     {"ar":"arabic title of column 2", "en":"english title of column 2"},
    //                     {"ar":"arabic title of column 3", "en":"english title of column 3"}]
    //                 ]
    //         },
    //         "field-data": { "label":{"ar":"arabic field label","en":"english field label"},
    //                         "value": {"ar":"arabic field value to display", "en":"english field value to display"}},
    //         "field-group":
    //           {
    //               "fieldGroupName":{"ar":"summary of invoice arabic title","en":"summary of invoice"},
    //               "fields":        
    //               [
    //                   {"label":{"ar":"arabic label","en":"english label"},"value":{"ar":"arabic value", "en":"english value"}},
    //                   {"label":{"ar":"arabic label","en":"english label"},"value":{"ar":"arabic value", "en":"english value"}},
    //                   {"label":{"ar":"arabic label","en":"english label"},"value":{"ar":"arabic value", "en":"english value"}}
    //               ]
    //           }
    // }],
    "fields": [
      {
        "fieldID": "projectCompletionDate",
        "fieldType": "currency",
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
          "type": "date",
          "source": "api",
          "sourceDetails": "it/getAllEmployees"
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
        "fieldType": "dropdown",
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
          "sourceDetails": "https://ajm.re/fikra/index.php/it/getDeveloperProjects"
        }
      }
    ],
    "fieldOrder": [
      {
        "row": "row0",
        "rowFields": [
          {
            "fieldID": "projectCompletionDate",
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

export const MENU_DATA = {
  "1":{
    "serviceCategoryName":{
      "ar":"root",
      "en":"root"
    },
    "services":{
      "1":{
        "ar":"testService",
        "en":"testService"
      }
    }
  },
  "3":{
    "serviceCategoryName":{
      "ar":"\u0627\u0644\u0627\u0641\u0627\u062f\u0627\u062a",
      "en":"Testimonies"
    },
    "services":{
      "37":{
        "ar":"\u0627\u0635\u062f\u0627\u0631 \u0634\u0647\u0627\u062f\u0629 \u0644\u0645\u0646 \u064a\u0647\u0645\u0647 \u0627\u0644\u0623\u0645\u0631",
        "en":"Issuance of a `To Whomsoever It May Concern` certificate"
      },
      "38":{
        "ar":"\u0635\u0648\u0631\u0629 \u0637\u0628\u0642 \u0627\u0644\u0623\u0635\u0644",
        "en":"Identical copy of the original"
      }
    }
  },
  "4":{
    "serviceCategoryName":{
      "ar":"\u0627\u0644\u062a\u062d\u0648\u0637",
      "en":"Hedge Services"
    },
    "services":{
      "45":{
        "ar":"\u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u062a\u062d\u0648\u0637 \u0641\u064a \u0627\u0644\u0633\u062c\u0644 ( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Cancellation of security (Complementary)"
      },
      "46":{
        "ar":"\u0627\u0644\u062a\u062d\u0648\u0637",
        "en":"Security"
      }
    }
  },
  "5":{
    "serviceCategoryName":{
      "ar":"\u0627\u0644\u062a\u0631\u0627\u062e\u064a\u0635 \u0627\u0644\u0639\u0642\u0627\u0631\u064a\u0629",
      "en":"Real estate permits"
    },
    "services":{
      "48":{
        "ar":"\u0627\u0635\u062f\u0627\u0631 \u0628\u062f\u0644 \u062a\u0627\u0644\u0641 \u0623\u0648 \u0641\u0627\u0642\u062f \u0628\u0637\u0627\u0642\u0629 \u0645\u0632\u0627\u0648\u0644\u0629 \u0646\u0634\u0627\u0637 \u0639\u0642\u0627\u0631\u064a ( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Issuance of a replacement of a damaged or lost real estate activities practicing card (Complementary)"
      },
      "49":{
        "ar":"\u0627\u0635\u062f\u0627\u0631 \u0628\u0637\u0627\u0642\u0629 \u0645\u0632\u0627\u0648\u0644\u0629 \u0646\u0634\u0627\u0637 \u0639\u0642\u0627\u0631\u064a",
        "en":"Issuance of a real estate activity practice card"
      },
      "50":{
        "ar":"\u0627\u0635\u062f\u0627\u0631 \u0634\u0647\u0627\u062f\u0629 \u0642\u064a\u062f \u0645\u0637\u0648\u0631 \u0639\u0642\u0627\u0631\u064a",
        "en":"Issuance of a real estate developer registration certificate"
      },
      "51":{
        "ar":"\u0627\u0635\u062f\u0627\u0631 \u0634\u0647\u0627\u062f\u0629 \u0642\u064a\u062f \u0645\u0643\u062a\u0628 \u0639\u0642\u0627\u0631\u064a",
        "en":"Issuance of a real estate office registration certificate"
      },
      "52":{
        "ar":"\u0627\u0644\u063a\u0627\u0621 \u0628\u0637\u0627\u0642\u0629 \u0645\u0632\u0627\u0648\u0644\u0629 \u0646\u0634\u0627\u0637 \u0639\u0642\u0627\u0631\u064a ( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Cancellation of a real estate activity practice card (Complementary)"
      },
      "53":{
        "ar":"\u062a\u062c\u062f\u064a\u062f \u0634\u0647\u0627\u062f\u0629 \u0642\u064a\u062f ( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Renewal of registration certificate (Complementary)"
      },
      "54":{
        "ar":"\u062a\u062c\u062f\u064a\u062f \u0628\u0637\u0627\u0642\u0629 \u0645\u0632\u0627\u0648\u0644\u0629 \u0646\u0634\u0627\u0637 \u0639\u0642\u0627\u0631\u064a ( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Renewal of a real estate activity practice card (Complementary)"
      },
      "55":{
        "ar":"\u062a\u062d\u062f\u064a\u062b \u0634\u0647\u0627\u062f\u0629 \u0642\u064a\u062f ( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Updating of registration certificate (Complementary)"
      },
      "56":{
        "ar":"\u062a\u0635\u062f\u064a\u0642 \u0639\u0642\u062f \u0627\u0644\u0625\u062f\u0627\u0631\u0629 \u0644\u0644\u0645\u0643\u062a\u0628 \u0627\u0644\u0639\u0642\u0627\u0631\u064a",
        "en":"Attestation of management contract of the Real estate office (Complementary)"
      },
      "58":{
        "ar":"\u062a\u0635\u0631\u064a\u062d \u0625\u0639\u0644\u0627\u0646 \u0639\u0642\u0627\u0631\u064a \/ \u0628\u0627\u0642\u0629 \u0627\u0644\u0627\u0639\u0644\u0627\u0646\u0627\u062a \u0627\u0644\u0639\u0642\u0627\u0631\u064a\u0629",
        "en":"Real Estate advertisement permission \/ Real Estate advertisements plan"
      }
    }
  },
  "6":{
    "serviceCategoryName":{
      "ar":"\u0627\u0644\u062a\u0633\u062c\u064a\u0644 \u0648\u0627\u0644\u062a\u0645\u0644\u064a\u0643",
      "en":"Registration and Ownership"
    },
    "services":{
      "25":{
        "ar":"\u0625\u0635\u062f\u0627\u0631 \u0628\u062f\u0644 \u0641\u0627\u0642\u062f \/ \u0628\u062f\u0644 \u062a\u0627\u0644\u0641 \u0644\u0634\u0647\u0627\u062f\u0629 \/ \u0633\u0646\u062f \u0645\u0644\u0643\u064a\u0629 \/ \u0639\u0642\u062f \u0631\u0647\u0646 (\u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Issuance of a replacement of a lost\/damaged certificate\/title deed\/mortgage contract (Complementary)"
      },
      "26":{
        "ar":"\u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u0645\u0628\u062f\u0626\u0649 \u0644\u0644\u0648\u062d\u062f\u0629 \u0627\u0644\u0639\u0642\u0627\u0631\u064a\u0629 ( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Cancellation of the tentative registration of the real estate unit (Complementary)"
      },
      "27":{
        "ar":"\u062a\u062d\u062f\u064a\u062b \u0628\u064a\u0627\u0646\u0627\u062a \u0633\u0646\u062f \u0645\u0644\u0643\u064a\u0629 \/ \u0634\u0647\u0627\u062f\u0629 \u0645\u0644\u0643\u064a\u0629 ( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Updating of information of Title Deed \/ Ownership Certificate (Complementary)"
      },
      "28":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0625\u0644\u063a\u0627\u0621 \u0633\u0646\u062f \u0645\u0644\u0643\u064a\u0629 ( \u062a\u0643\u0645\u064a\u0644\u064a\u0647)",
        "en":"Registration of cancellation of title deed (Complementary)"
      },
      "29":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u062a\u0628\u062f\u064a\u0644 \u0633\u0646\u062f \u0645\u0644\u0643\u064a\u0629 ( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Registration of exchange of title deed (Complementary)"
      },
      "30":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u062f\u0645\u062c \u0623\u0648 \u0641\u0631\u0632 \u0644\u0639\u0642\u0627\u0631 \u0644\u0630\u0627\u062a \u0627\u0644\u0645\u0627\u0644\u0643",
        "en":"Registration of merging or allotment of a real estate to the same owner"
      },
      "31":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0639\u0642\u0627\u0631 \u0623\u0648 \u0648\u062d\u062f\u0629 \u0639\u0642\u0627\u0631\u064a\u0629 \u0628\u0627\u0644\u062a\u0639\u0648\u064a\u0636",
        "en":"Registration of a real estate or a real estate unit by way of compensation"
      },
      "32":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0639\u0642\u0627\u0631 \u0628\u0625\u0641\u0631\u0627\u0632\u0647 \u0628\u064a\u0646 \u0627\u0644\u0645\u0644\u0627\u0643",
        "en":"Registration of a real estate by distributing it between owners"
      },
      "33":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0639\u0642\u0627\u0631 \u062c\u062f\u064a\u062f",
        "en":"Registration of a new real estate"
      },
      "34":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0645\u0628\u062f\u0626\u0649 \u0644\u0628\u064a\u0639 \u0648\u062d\u062f\u0629 \u0639\u0642\u0627\u0631\u064a\u0629",
        "en":"Tentative registration of sale of a real estate unit"
      },
      "35":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0646\u0647\u0627\u0626\u0649 \u0644\u0628\u064a\u0639 \u0648\u062d\u062f\u0629 \u0639\u0642\u0627\u0631\u064a\u0629",
        "en":"Final registration of sale of a real estate unit"
      },
      "36":{
        "ar":"\u062a\u0645\u0644\u064a\u0643 \u0639\u0642\u0627\u0631 \u0628\u0627\u0644\u0634\u0631\u0627\u0621 \u0644\u0630\u0627\u062a \u0627\u0644\u0645\u0627\u0644\u0643",
        "en":"Owning of a real estate by way of purchasing to the same owner"
      }
    }
  },
  "7":{
    "serviceCategoryName":{
      "ar":"\u0627\u0644\u062a\u0635\u0631\u0641\u0627\u062a",
      "en":"Transactions"
    },
    "services":{
      "2":{
        "ar":"\u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u0642\u0633\u0645\u0629 \u0628\u064a\u0646 \u0627\u0644\u0634\u0631\u0643\u0627\u0621 ( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"The cancelling of a distribution between partners (Complementary)"
      },
      "3":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0628\u0627\u0644\u062a\u062e\u0627\u0631\u062c",
        "en":"Registration by way of exit."
      },
      "4":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0628\u0627\u0644\u0648\u0631\u0627\u062b\u0629",
        "en":"Registration by inheritance."
      },
      "5":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0625\u0644\u063a\u0627\u0621 \/ \u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0647\u0628\u0629 ( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Registration of the cancellation\/modification of the grant (Complementary)"
      },
      "6":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u0648\u0642\u0641 \u0627\u0644\u0630\u0631\u064a (\u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Registration of the cancellation of the descendant endowment (Complementary)"
      },
      "7":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0625\u0644\u063a\u0627\u0621\/ \u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0648\u0635\u064a\u0629 ( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Registration of the cancellation\/modification of the will (Complementary)"
      },
      "8":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0625\u0646\u0647\u0627\u0621 \u0625\u064a\u062c\u0627\u0631 \u0637\u0648\u064a\u0644 \u0627\u0644\u0645\u062f\u0629 ( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Registration of termination of a long term lease (Complementary)"
      },
      "9":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0625\u0646\u0647\u0627\u0621 \u062d\u0642 \u0627\u0646\u062a\u0641\u0627\u0639 \/ \u0645\u0633\u0627\u0637\u062d\u0629 ( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Registration of termination of right for benefit \/ right for `Mosataha` (Complementary)"
      },
      "10":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0625\u0646\u0647\u0627\u0621 \u0639\u0642\u062f \u0625\u064a\u062c\u0627\u0631 \u064a\u0646\u062a\u0647\u064a \u0628\u0627\u0644\u062a\u0645\u0644\u0643 ( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Registration of termination of lease contract ending with ownership (Complementary)"
      },
      "11":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0625\u064a\u062c\u0627\u0631 \u0637\u0648\u064a\u0644 \u0627\u0644\u0645\u062f\u0629",
        "en":"Registration of a long term lease"
      },
      "12":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0625\u064a\u062c\u0627\u0631 \u064a\u0646\u062a\u0647\u064a \u0628\u0627\u0644\u062a\u0645\u0644\u0643",
        "en":"Registration of lease ending with ownershi"
      },
      "13":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0628\u0627\u0644\u0645\u0628\u0627\u062f\u0644\u0629",
        "en":"Registration by way of exchange"
      },
      "14":null,
      "15":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u062a\u0639\u062f\u064a\u0644 \u0623\u0648 \u062a\u062d\u0648\u064a\u0644 \u062d\u0642 \u0627\u0646\u062a\u0641\u0627\u0639 \/ \u0645\u0633\u0627\u0637\u062d\u0629 ( \u062a\u0643\u0645\u064a\u0644\u064a\u0647)",
        "en":"Registration of amendment or transfer of right for benefit \/ right for `Mosataha` (Complementary)"
      },
      "16":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u062a\u0639\u062f\u064a\u0644 \u0625\u064a\u062c\u0627\u0631 \u0637\u0648\u064a\u0644 \u0627\u0644\u0645\u062f\u0629 ( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Registration of amendment of a long term lease (Complementary)"
      },
      "17":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u062a\u0639\u062f\u064a\u0644 \u0648\u0642\u0641 \u062e\u064a\u0631\u064a\/ \u0630\u0631\u064a ( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Registration of amendment of charity \/ descendant endowment (Complementary)"
      },
      "18":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u062a\u0639\u062f\u064a\u0644\/\u062a\u062d\u0648\u064a\u0644 \u0625\u064a\u062c\u0627\u0631 \u064a\u0646\u062a\u0647\u064a \u0628\u0627\u0644\u062a\u0645\u0644\u0643 ( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":" Registration of amendment\/transfer of lease ending with ownership (Complementary)"
      },
      "19":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u062d\u0642 \u0625\u0646\u062a\u0641\u0627\u0639 \/ \u0645\u0633\u0627\u0637\u062d\u0629",
        "en":"Registration of right to benefit \/ `Mosataha`"
      },
      "20":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0639\u0642\u0627\u0631 \/ \u0648 \u062d\u062f\u0629 \u0639\u0642\u0627\u0631\u064a\u0629 \u0628\u0627\u0644\u0642\u0633\u0645\u0629 \u0628\u064a\u0646 \u0627\u0644\u0634\u0631\u0643\u0627\u0621",
        "en":"Registration of a real estate or a real estate unit by distribution between partners"
      },
      "21":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0639\u0642\u0627\u0631 \u0623\u0648 \u0648\u062d\u062f\u0629 \u0639\u0642\u0627\u0631\u064a\u0629 \u0628\u0627\u0644\u0647\u0628\u0629",
        "en":"Registration of a Real Estate\/ Real Estate unit by way of grant"
      },
      "22":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0639\u0642\u0627\u0631 \u0623\u0648 \u0648\u062d\u062f\u0629 \u0639\u0642\u0627\u0631\u064a\u0629 \u0628\u0627\u0644\u0648\u0635\u064a\u0629",
        "en":"Registration of a Real Estate\/ Real Estate unit by way of a will"
      },
      "23":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0648\u0642\u0641 \u062e\u064a\u0631\u064a\/ \u0630\u0631\u064a",
        "en":"Registration of charity \/ descendant endowment"
      },
      "24":{
        "ar":"\u0646\u0642\u0644 \u0645\u0644\u0643\u064a\u0629 \u0645\u0646 \u0645\u0627\u0644\u0643 \u0627\u0644\u0645\u0624\u0633\u0633\u0629 \u0627\u0644\u0641\u0631\u062f\u064a\u0629 \u0623\u0648 \u0627\u0644\u0634\u0631\u0643\u0629 \u0648\u0628\u0627\u0644\u0639\u0643\u0633",
        "en":"transfer of ownership from the owner of the individual establishment or the company and vice-versa"
      }
    }
  },
  "8":{
    "serviceCategoryName":{
      "ar":"\u0627\u0644\u062a\u0641\u062a\u064a\u0634",
      "en":"Inspection"
    },
    "services":{
      "57":{
        "ar":"\u062f\u0641\u0639 \u0627\u0644\u0645\u062e\u0627\u0644\u0641\u0627\u062a",
        "en":"payment of fines of violations"
      }
    }
  },
  "9":{
    "serviceCategoryName":{
      "ar":"\u0627\u0644\u062a\u0642\u0627\u0631\u064a\u0631 \u0627\u0644\u0647\u0646\u062f\u0633\u064a\u0629 \u0648\u0627\u0644\u0645\u0633\u062d \u0627\u0644\u0639\u0642\u0627\u0631\u064a",
      "en":"Engineering reports and real estate survey"
    },
    "services":{
      "64":{
        "ar":"\u0625\u0635\u062f\u0627\u0631 \u062a\u0642\u0631\u064a\u0631 \u0647\u0646\u062f\u0633\u064a",
        "en":"Issuance of an engineering report "
      },
      "65":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0625\u0633\u062a\u0634\u0627\u0631\u064a \u0647\u0646\u062f\u0633\u064a \u0645\u062a\u062e\u0635\u0635",
        "en":"Registration of specialized engineering consultnant"
      }
    }
  },
  "10":{
    "serviceCategoryName":{
      "ar":"\u0627\u0644\u062a\u0642\u064a\u064a\u0645 \u0627\u0644\u0639\u0642\u0627\u0631\u064a",
      "en":"Real estate valuation"
    },
    "services":{
      "47":{
        "ar":"\u0627\u0644\u062a\u0642\u064a\u064a\u0645 \u0627\u0644\u0639\u0642\u0627\u0631\u064a",
        "en":"Real estate valuation"
      }
    }
  },
  "11":{
    "serviceCategoryName":{
      "ar":"\u0627\u0644\u0631\u0647\u0646",
      "en":"Mortgage"
    },
    "services":{
      "39":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u0631\u0647\u0646",
        "en":"Mortgage registration"
      },
      "40":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u062a\u062d\u0648\u064a\u0644 \u0627\u0644\u0631\u0647\u0646 ( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Registration of mortgage transfer (Complementary)"
      },
      "41":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u062a\u062d\u0648\u064a\u0644 \u0627\u0644\u0631\u0647\u0646 \u0628\u064a\u0646 \u062c\u0647\u0627\u062a \u0627\u0644\u062a\u0645\u0648\u064a\u0644( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Registration of mortgage amendment by transferring between financers (Complementary)"
      },
      "42":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0631\u0647\u0646 (\u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Registration of amendment of mortgage (Complementary)"
      },
      "43":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0631\u0647\u0646 \u0645\u0646 \u0645\u0627\u0644\u0643 \u0625\u0644\u0649 \u0623\u062e\u0631 \u062f\u0648\u0646 \u0627\u0644\u0645\u0633\u0627\u0633 \u0628\u0627\u0644\u0631\u0647\u0646 ( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Registration of amendment of mortgage from an owner to another without prejudice to the mortgage (Complementary)"
      },
      "44":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0641\u0643 \u0627\u0644\u0631\u0647\u0646 ( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Registration of Release fo mortgage (Complementary)"
      }
    }
  },
  "12":{
    "serviceCategoryName":{
      "ar":"\u0627\u0644\u0645\u0634\u0631\u0648\u0639\u0627\u062a \u0627\u0644\u0639\u0642\u0627\u0631\u064a\u0629",
      "en":"Real estate projects"
    },
    "services":{
      "60":{
        "ar":"\u062a\u0639\u062f\u064a\u0644 \u0628\u064a\u0627\u0646\u0627\u062a \u0645\u0634\u0631\u0648\u0639( \u062a\u0643\u0645\u064a\u0644\u064a\u0629)",
        "en":"Modify project data (Complementary)"
      },
      "61":{
        "ar":"\u0642\u064a\u062f \u0645\u0634\u0631\u0648\u0639 \u0639\u0642\u0627\u0631\u064a",
        "en":"Real estate project registration"
      }
    }
  },
  "13":{
    "serviceCategoryName":{
      "ar":"\u0627\u0644\u0646\u0632\u0627\u0639\u0627\u062a \u0627\u0644\u0639\u0642\u0627\u0631\u064a\u0629",
      "en":"Real estate complaints"
    },
    "services":{
      "59":{
        "ar":"\u0637\u0644\u0628 \u0641\u0636 \u0646\u0632\u0627\u0639 \u0639\u0642\u0627\u0631\u064a",
        "en":"Application for resolution of a real estate dispute"
      }
    }
  },
  "14":{
    "serviceCategoryName":{
      "ar":"\u062d\u0633\u0627\u0628\u0627\u062a \u0627\u0644\u0636\u0645\u0627\u0646",
      "en":"Escrow accounts"
    },
    "services":{
      "62":{
        "ar":"\u062a\u0633\u062c\u064a\u0644 \u0645\u062f\u0642\u0642 \u0645\u0627\u0644\u064a \u0644\u0645\u0634\u0631\u0648\u0639 \u0639\u0642\u0627\u0631\u064a",
        "en":"Registration of a financial auditor for a real estate project"
      },
      "63":{
        "ar":"\u0637\u0644\u0628 \u0625\u0639\u062a\u0645\u0627\u062f \u0623\u0645\u064a\u0646 \u062d\u0633\u0627\u0628",
        "en":"Accreditation of Escrow accounts"
      }
    }
  }
}