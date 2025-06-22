import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthCarouselComponent } from '@auth/_components/auth-carousel/auth-carousel.component';
import { slideIn } from '@animations/slide.animations';
import { ResponsiveClassDirective } from '@directives/responsive-class.directive';
import { BodyClassModifierService } from '@sharedServices/body-modifier.service';
import { BasicSettingOnAuthComponent } from '@auth/_components/basic-setting-on-auth/basic-setting-on-auth.component';

@Component({
  selector: 'auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
  host: {
    '[class.auth-layout]': 'true',
  },
  imports: [AuthCarouselComponent, CommonModule, ResponsiveClassDirective, BasicSettingOnAuthComponent],
  animations: [slideIn]
})
export class AuthLayoutComponent implements OnInit {
  private bodyClassService = inject(BodyClassModifierService);
  ngOnInit() {
    this.bodyClassService.removeBodyClass('default-page')
    this.bodyClassService.addClassToBody('auth-page')
  }
}
