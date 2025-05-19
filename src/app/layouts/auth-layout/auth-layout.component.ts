import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthCarouselComponent } from '../../auth/components/auth-carousel/auth-carousel.component';
import { slideIn } from '../../shared/animations/slide.animations';
import { ResponsiveClassDirective } from '../../core/directives/responsive-class.directive';
import { BodyClassModifierService } from '../../core/services/body-modifier.service';

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
export class AuthLayoutComponent implements OnInit {
  constructor(private bodyClassService: BodyClassModifierService) {}
  ngOnInit() {
    this.bodyClassService.removeBodyClass('default-page')
    this.bodyClassService.addClassToBody('auth-page')
  }
}
