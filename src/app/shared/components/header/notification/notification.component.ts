import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'notification',
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  notificationCount = signal<number>(3);

  ngOnInit() {}
}
