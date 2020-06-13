import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { isArray } from 'util';
import * as _ from 'lodash';

@Component({
  selector: 'app-display-keys-generator',
  templateUrl: './display-keys-generator.component.html',
  styleUrls: ['./display-keys-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class DisplayKeysGeneratorComponent implements OnInit {
  dataType: string = 'field-data';
  dataOptions: any = [
                  {id: 'image', name: 'Image'},
                  {id: 'image-gallery', name: 'Image Gallery'},
                  {id: 'pdf', name: 'Pdf'},
                  {id: 'pdf-gallery', name: 'Pdf Gallery'},
                  {id: 'table', name: 'Table'},
                  {id: 'field-data', name: 'Field Data'},
                  {id: 'field-group', name: 'Field Group'},
                ]

  @Input() formData: any;
  @Input() key: any;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  addRow() {
    // if (this.formData[this.key].value) {
    //   if (!this.isEnumerator(this.formData[this.key].value)) {
    //     this.formData[this.key].value = [this.formData[this.key].value];
    //   }
  
    //   this.formData[this.key].value.push(this.blankDisplayData());
    // } else {
    //   this.formData[this.key].value = this.blankDisplayData();
    // }
    if (this.formData[this.key]) {
      this.formData[this.key] = Object.assign({}, this.formData[this.key], this.blankDisplayData());
      console.log('here in fields', this.formData[this.key]);
    }
  }

  deleteRow(index) {
    _.remove(this.formData[this.key], function(resource, i) {
        return index === i;
    });

    if (this.isEnumerator(this.formData[this.key]) && this.formData[this.key]?.length == 1) {
      this.formData[this.key] = this.formData[this.key][0];
    }
  }

  ngAfterViewInit () {
    this.changeDetector.detectChanges();
  }

  blankDisplayData() {
    let data = {};
    if (this.dataType == 'image') {
      data[this.dataType] = { };
    } else if (this.dataType == 'image-gallery') {
      data[this.dataType] = { };
    } else if (this.dataType == 'pdf') {
      data[this.dataType] = { };
    } else if (this.dataType == 'pdf-gallery') {
      data[this.dataType] = { };
    } else if (this.dataType == 'table') {
      data[this.dataType] = { thead: {}, tbody: {}};
    } else if (this.dataType == 'field-data') {
      data[this.dataType] = { label: {}, value: {}};
    } else if (this.dataType == 'field-group') {
      data[this.dataType] = { fieldGroupName: {}, fields: {}};
    } else {
      data[this.dataType] = { };
    }

    return data;
  }

  isEnumerator(data: any) {
    return isArray(data);
  }

  deleteItemRow(deletekey) {
    _.unset(this.formData[this.key].value, deletekey);
  }
}

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
//               {"caption":"page 4 of power of attorney", "src":"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"}
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
//                     {"ar":"arabic title of column 3", "en":"english title of column 3"}],
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