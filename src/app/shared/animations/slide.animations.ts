import { trigger, transition, style, animate } from '@angular/animations';

const animateDurationWhenIn = '1s';
const animateDurationWhenOut = '0.5s';
export const slideIn = trigger('slideIn', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate(`${animateDurationWhenIn} ease-in-out`, style({ transform: 'translateX(0%)', opacity: 1 }))
  ])
]);
export const slideInLeft = trigger('slideInLeft', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate(`${animateDurationWhenIn} ease-in-out`, style({ transform: 'translateX(0%)', opacity: 1 }))
  ])
]);

export const slideOut = trigger('slideOut', [
  transition(':leave', [
    animate(`${animateDurationWhenOut} ease-in'`, style({ transform: 'translateX(-100%)', opacity: 0 }))
  ])
]);
export const slideOutLeft = trigger('slideOutLeft', [
  transition(':leave', [
    style({ transform: 'translateX(100%)', opacity: 1 }),
    animate(`${animateDurationWhenOut} ease-in`, style({ transform: 'translateX(10%)', opacity: 0 }))
  ])
]);
