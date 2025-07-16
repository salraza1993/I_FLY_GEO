import { NgModalService } from '@/shared/services/ng-modal.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';

@Component({
  selector: 'app-ng-modal, ng-modal, modal',
  imports: [CommonModule, NgComponentOutlet],
  templateUrl: './ng-modal.component.html',
  styleUrl: './ng-modal.component.css',
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.3s ease', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-200%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [animate('200ms ease-in', style({ transform: 'translateY(-200%)', opacity: 0 }))])
    ])
  ],
  host: {
    'class': 'ng-modal-host',
    '[class]': "`${modalService.getCurrentModalId()}-host`",
    '[attr.id]': "`${modalService.getCurrentModalId()}-host`"
  }
})
export class NgModalComponent {
  heading = input<string>('Salman')
  classes = input<'no-gap' | string>();
  modalService = inject(NgModalService);

  getAnimationParams(modal: any) {
    // this.modalService.open
    return {
      value: modal.isOpen,
      params: {
        animation: modal.config.animation || 'fade',
        position: modal.config.position || 'center'
      }
    };
  }
}


