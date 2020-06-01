import { Component, OnInit } from '@angular/core';
import { NOTIFICATIONS } from 'src/app/shared/data';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any;
  constructor() { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    console.log('I am loaded');
    this.notifications = NOTIFICATIONS;

    // TODO:: HANDLE ERROR CASE AND DON"T MAKE ANY REQUEST AFTER IT
    setTimeout(() => { this.loadNotifications() }, 5 * 1000);
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
