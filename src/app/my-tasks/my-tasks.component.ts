import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FieldsService } from '../shared/fields.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {  response$: Observable<any>;

  constructor(
    private fieldsService: FieldsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.response$ = this.fieldsService.getUrl('https://wfe.ajm.re/AjmanLandProperty/index.php/applications/myTasks');
  }

  getItemText(field: any, key: any) {
    return ((field[key] && JSON.parse(field[key])).ar || '');
  }

  getTimeAvailable(item: any) {
    if (item.stepDetails.status == 'completed') {
      return (item.stepDetails.latestUserIDTimeStamp || item.stepDetails.timeStampInEffect);
    } else {
      return item.stepDetails.timeStampInEffect
    }
  }

  getStatusClass(item: any) {
    switch (item.stepDetails.status.toLowerCase()) {
      case 'pending':
        return 'text-danger';
      case 'completed':
        return 'text-success';
      case 'locked':
        return 'text-warning';
      default:
        return 'text-info';
    }
  }

  performActionPerStatus(item: any) {
    if (item.stepDetails.status.toLowerCase() == 'pending') {
      this.router.navigate(['/notifications', item.stepDetails.applicationWorkflowStepID])
    }
  }

  getStepDetails(item: any) {
    return JSON.parse(item.applicationDetails.stepsExecuted);
  }
}
