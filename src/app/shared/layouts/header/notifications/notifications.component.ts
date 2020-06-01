import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    console.log('I am loaded');
    this.notifications = this.http.get('http://localhost:3000/notifications');

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
