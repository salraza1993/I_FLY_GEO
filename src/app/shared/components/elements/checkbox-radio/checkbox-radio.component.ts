import { booleanAttribute, Component, computed, EventEmitter, input, model, output, signal } from '@angular/core';
import { COMMON_IMPORTS } from '../../../helpers/common-imports';
import { CommonModule } from '@angular/common';

export type CheckboxType = 'checkbox' | 'radio';

@Component({
  selector: 'checkbox-radio',
  imports: [COMMON_IMPORTS, CommonModule],
  templateUrl: './checkbox-radio.component.html',
  styleUrl: './checkbox-radio.component.css',
  host: {
    'class': 'input-wrapper',
    '[class.checkbox]': 'type() === "checkbox"',
    '[class.radio]': 'type() === "radio"'
  }
})
export class CheckboxRadioComponent {
  // Configuration
  type = input<'checkbox' | 'radio'>('checkbox');
  elementName = input.required<string>();
  elementId = input.required<string>();
  value = input<string>('');

  // State - both models for two-way binding
  checked = model<boolean>(false); // For checkboxes
  selectedValue = model<string>(); // For radio buttons

  // Options
  label = input<string | null>(null);
  description = input<string>('');
  disabled = input<boolean, boolean | string>(false, {
    transform: booleanAttribute
  });

  // Computed properties
  isCheckbox = computed(() => this.type() === 'checkbox');
  isRadio = computed(() => this.type() === 'radio');
  isChecked = computed(() => {
    return this.isCheckbox()
      ? this.checked()
      : this.selectedValue() === this.value();
  });

  onChange(event: Event) {
    if (this.disabled()) return;
    const checked = (event.target as HTMLInputElement).checked;

    if (this.isCheckbox()) {
      this.checked.set(checked);
    } else if (checked) {
      this.selectedValue.set(this.value());
    }
  }

  toggle() {
    if (this.disabled()) return;

    if (this.isCheckbox()) {
      this.checked.update(current => !current);
    } else {
      this.selectedValue.set(this.value());
    }
   }
}

// Sample to used in parent
// termsAccepted = signal(false);
// // For radio group
// paymentMethod = signal('');