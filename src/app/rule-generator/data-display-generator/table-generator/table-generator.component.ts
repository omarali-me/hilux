import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-table-generator',
  templateUrl: './table-generator.component.html',
  styleUrls: ['./table-generator.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class TableGeneratorComponent implements OnInit {

  @Input() formData: any;

  @Input() key: any;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  nonsort() {
    return 0
  }

}

// "displayData": [{
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
//         }
// }],