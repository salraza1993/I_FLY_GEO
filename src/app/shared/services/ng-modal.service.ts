import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  Type,
} from '@angular/core';
import { BodyClassModifierService } from './body-modifier.service';

export interface ModalConfig<T = any> {
  component: Type<T>;
  inputs?: Record<string, any>;
  animation?: 'slideIn' | 'slideUp' | 'fade';
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  overlay?: boolean;
  overlayClose?: boolean;
  props?: any,
}

@Injectable({ providedIn: 'root' })
export class NgModalService {
  private readonly bodyClassModifier = inject(BodyClassModifierService);
  private modals = signal<{ id: string; config: ModalConfig; isOpen: boolean }[]>([]);

  public openModals = computed(() =>
    this.modals().filter((modal) => modal.isOpen)
  );

  public getCurrentModalId = computed(() => {
    const modals = this.openModals();
    return modals.length > 0 ? modals[0].id : 'none';
  });

  public readonly hasOpenModals = computed(() => this.openModals().length > 0);

  private readonly freeScreenIfModalExist = effect(() => {
    if (this.hasOpenModals()){
      this.bodyClassModifier.addClassToBody(['freez', 'modal-actived']);
      this.bodyClassModifier.addClassToRoot(['freez', 'modal-actived']);
    }
    else {
      this.bodyClassModifier.removeBodyClass(['freez', 'modal-actived']);
      this.bodyClassModifier.removeClassToRoot(['freez', 'modal-actived'])
    }
  });

  open<T>(id: string, config: ModalConfig<T>): void {
    if (this.modals().some((m) => m.id === id)) {
      console.log(this.modals().some(m => m.id === id));
      this.modals.update((modals) =>
        modals.map((m) => (m.id === id ? { ...m, config, isOpen: true } : m))
      );
    } else {
      this.modals.update((modals) => [...modals, { id, config, isOpen: true }]);
    }
  }

  close(id: string): void {
    this.modals.update((modals) =>
      modals.map((m) => (m.id === id ? { ...m, isOpen: false } : m))
    );

    // Remove from array after animation completes
    setTimeout(() => {
      this.modals.update((modals) => modals.filter((m) => m.id !== id));
    }, 300);
  }

  closeAll(): void {
    this.modals.update((modals) =>
      modals.map((m) => ({ ...m, isOpen: false }))
    );

    setTimeout(() => {
      this.modals.set([]);
    }, 300);
  }
}
