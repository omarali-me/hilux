import { Component, OnInit } from '@angular/core';
import { FieldsService } from 'src/app/shared/fields.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any;
  constructor(private fieldsService: FieldsService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.fieldsService.getUrl('http://localhost:3000/notifications').subscribe(data => {
      this.notifications = data;
    })

    // TODO:: HANDLE ERROR CASE AND DON"T MAKE ANY REQUEST AFTER IT
    setTimeout(() => { this.loadNotifications() }, 30 * 1000);
  }

  getStatusClass(notification: any) {
    switch (notification.status.toLowerCase()) {
      case 'pending':
        return 'text-warning';
      case 'completed':
        return 'text-success';
      case 'rejected':
        return 'text-danger';
      default:
        return 'text-info';
    }
  }
}
