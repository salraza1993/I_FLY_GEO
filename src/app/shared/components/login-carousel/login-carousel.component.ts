import { Component } from '@angular/core';

@Component({
  selector: 'login-carousel',
  imports: [],
  templateUrl: './login-carousel.component.html',
  styleUrl: './login-carousel.component.scss',
  host: {
    '[class.carousel-wrapper]': 'true'
  }
})
export class LoginCarouselComponent {

}
