import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { register as registerSwiperElements } from 'swiper/element/bundle';
import { ViewportService } from './app/core/services/viewport.service';


bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
// .then((appRef) => {
//   const viewportService = appRef.injector.get(ViewportService);
//   viewportService.updateBodyClass();
// })
// Registering Swiper Slider
registerSwiperElements();
