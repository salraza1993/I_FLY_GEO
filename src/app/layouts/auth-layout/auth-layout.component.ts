import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthCarouselComponent } from '../../auth/components/auth-carousel/auth-carousel.component';

@Component({
  selector: 'auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
  host: {
    '[class.auth-layout]': 'true'
  },
  imports: [AuthCarouselComponent, CommonModule]
})
export class AuthLayoutComponent {}
