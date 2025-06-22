import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SwiperContainer } from 'swiper/element/bundle';

@Component({
  selector: 'auth-carousel',
  imports: [],
  templateUrl: './auth-carousel.component.html',
  styleUrl: './auth-carousel.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    '[class.carousel-wrapper]': 'true'
  }
})
export class AuthCarouselComponent {

}
