import { CommonModule } from '@angular/common';
import { Component, computed, input, model, effect, viewChild, ElementRef, inject, signal } from '@angular/core';
import { BodyClassModifierService } from '@/shared/services/body-modifier.service';

// Animation type enum
export type DialogAnimationType =
  'slide-in--up' | 'slide-in--up-center' | 'slide-in--down' | 'slide-in--down-center' |
  'slide-in--left' | 'slide-in--left-center' | 'slide-in--right' | 'slide-in--right-center' |
  'fade-in' | 'scale-in' | 'none';

@Component({
  selector: 'app-ng-dialog, ng-dialog',
  imports: [CommonModule],
  templateUrl: './ng-dialog.component.html',
  styleUrl: './ng-dialog.component.css',
  host: {
    class: 'ng-dialog-wrapper',
    '[class.active]': 'isDialogActive()',
    '[style.--animation-duration]': "animationDuration() + 'ms'",
    '[attr.data-animation]': 'animationType()',
  },
})
export class NgDialogComponent {
  private readonly bodyClassModifier = inject(BodyClassModifierService);

  // Public inputs
  dialogId = input<string>('default-dialog');
  dialogTitle = input<string>('Dialog Title');
  isDialogActive = model<boolean>(false);
  animationType = input<DialogAnimationType>('scale-in');
  animationDuration = input<number>(400);
  overlayClose = input<boolean>(false);
  hideHeader = input<boolean>(false);

  // Animation state
  dialogVisible = model<boolean>(false);

  // Dialog element reference
  private dialogElementRef = viewChild<ElementRef<HTMLDialogElement>>('dialogElement');
  private dialogElement = computed(() => this.dialogElementRef()?.nativeElement);

  // Effects
  private readonly bodyClassEffect = effect(() => {
    if (this.isDialogActive()) {
      setTimeout(() => {
        this.bodyClassModifier.addClassToBody(['freez', 'modal-actived']);
        this.bodyClassModifier.addClassToRoot(['freez', 'modal-actived']);
      }, this.animationDuration());
    } else {
      setTimeout(() => {
        this.bodyClassModifier.removeBodyClass(['freez', 'modal-actived']);
        this.bodyClassModifier.removeClassToRoot(['freez', 'modal-actived']);
      }, this.animationDuration() * 1.5);
    }
  });

  private readonly dialogEffect = effect(() => {
    if (this.isDialogActive()) {
      this.showDialog();
    } else {
      this.hideDialog();
    }
  });

  // Dialog methods
  private showDialog(): void {
    const dialogEl = this.dialogElement();
    if (dialogEl) {
      dialogEl.showModal();
      this.dialogVisible.set(true);
      this.setupBackdropClickListener(dialogEl);
    }
  }

  private hideDialog(): void {

  }

  private setupBackdropClickListener(dialogEl: HTMLDialogElement): void {
    if (!this.overlayClose()) return;

    const handleBackdropClick = (event: MouseEvent) => {
      const rect = dialogEl.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX && event.clientX <= rect.left + rect.width
      );

      if (!isInDialog) {
        this.closeDialog();
      }
    };

    dialogEl.addEventListener('click', handleBackdropClick);
    dialogEl.setAttribute('data-backdrop-listener', 'true');
  }

  private removeBackdropClickListener(dialogEl: HTMLDialogElement): void {
    if (dialogEl.hasAttribute('data-backdrop-listener')) {
      dialogEl.removeAttribute('data-backdrop-listener');
    }
  }

  // Public methods
  closeDialog(): void {
    this.isDialogActive.set(false);
    const duration = this.animationDuration() * 0.7;
    setTimeout(() => {
      this.dialogVisible.set(false);
      const dialogEl = this.dialogElement();
      if (dialogEl) {
        dialogEl.close();
        this.removeBackdropClickListener(dialogEl);
      }
    }, duration);
  }
}
