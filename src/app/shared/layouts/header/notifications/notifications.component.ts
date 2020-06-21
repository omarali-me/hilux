import { Component, OnInit } from '@angular/core';
import { FieldsService } from 'src/app/shared/fields.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any;

  constructor(
    private fieldsService: FieldsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.fieldsService.getUrl('http://192.168.5.113/AjmanLandProperty/index.php/applications/myTasks')
      .subscribe(data => {
        this.notifications = data.filter(d => d.stepDetails.status.toLowerCase() === 'pending');
      })

    // TODO:: HANDLE ERROR CASE AND DON"T MAKE ANY REQUEST AFTER IT
    setTimeout(() => { this.loadNotifications() }, 2 * 60 * 1000);
  }

  getStatusClass(notification: any) {
    switch (notification.stepDetails.status.toLowerCase()) {
      case 'locked':
        return 'text-warning';
      case 'completed':
        return 'text-success';
      case 'pending':
        return 'text-danger';
      default:
        return 'text-info';
    }
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

  performActionPerStatus(item: any) {
    if (item.stepDetails.status.toLowerCase() == 'pending') {
      this.router.navigate(['/notifications', item.stepDetails.applicationWorkflowStepID])
    }
  }

  getNotificationText(notification: any) {
    return `${notification.stepDetails.applicationWorkflowStepID}, ${notification.applicationDetails.applicationID}`;
  }
}
