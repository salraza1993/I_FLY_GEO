import { trigger, transition, style, animate } from '@angular/animations';

export const slideIn = trigger('slideIn', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('1s ease-in-out', style({ transform: 'translateX(0%)', opacity: 1 }))
  ])
]);
export const slideInLeft = trigger('slideInLeft', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('1s ease-in-out', style({ transform: 'translateX(0%)', opacity: 1 }))
  ])
]);

export const slideOut = trigger('slideOut', [
  transition(':leave', [
    animate('0.5s ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
  ])
]);
export const slideOutLeft = trigger('slideOutLeft', [
  transition(':leave', [
    style({ transform: 'translateX(100%)', opacity: 1 }),
    animate('0.5s ease-in', style({ transform: 'translateX(10%)', opacity: 0 }))
  ])
]);
