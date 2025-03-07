import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'aside-bar',
  imports: [RouterModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  asideMenus = signal([
    { title: 'Dashboard', icon: 'grid', path: '/dashboard' },
    { title: 'Search', icon: 'magnifying-glass', path: '/search' },
    { title: 'Bookings', icon: 'calendar', path: '/bookings' },
    { title: 'Reports', icon: 'chart-pie', path: '/reports' },
  ]);
}
