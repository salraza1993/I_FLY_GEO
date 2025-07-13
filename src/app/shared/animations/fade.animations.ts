import { trigger, transition, style, animate } from '@angular/animations';

const animateDuration = '0.5s';
export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(`${animateDuration} ease-in`, style({ opacity: 1 }))
  ])
]);

export const fadeOut = trigger('fadeOut', [
  transition(':leave', [
    animate(`${animateDuration} ease-out`, style({ opacity: 0 }))
  ])
]);

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [ // fadeIn
    style({ opacity: 0 }),
    animate(`${animateDuration} ease-in`, style({ opacity: 1 }))
  ]),
  transition(':leave', [ // fadeOut
    animate(`${animateDuration} ease-out`, style({ opacity: 0 }))
  ])
])
