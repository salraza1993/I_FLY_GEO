import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthCarouselComponent } from '../../auth/components/auth-carousel/auth-carousel.component';
import { slideIn } from '../../shared/animations/slide.animations';
import { ResponsiveClassDirective } from '../../core/directives/responsive-class.directive';

@Component({
  selector: 'auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
  host: {
    '[class.auth-layout]': 'true',
  },
  imports: [AuthCarouselComponent, CommonModule, ResponsiveClassDirective],
  animations: [slideIn]
})
export class AuthLayoutComponent {}
