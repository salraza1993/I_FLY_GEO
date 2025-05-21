import { booleanAttribute, Component, computed, input, model } from '@angular/core';

@Component({
  selector: 'radio',
  imports: [],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.css',
  host: {
    'class': 'radio-wrapper'
  }
})
export class RadioComponent {
  readonly elementName = input.required<string>();
  readonly elementId = input.required<string>();
  readonly value = input.required<string>();
  selectedValue = model<string>();
  label = input<string | null>(null);
  description = input<string>('');
  disabled = input<boolean, boolean | string>(false, {
    transform: booleanAttribute
  });

  isChecked = computed(() => this.selectedValue() === this.value());

  public onChange(event: Event) {
    if (this.disabled()) return;
    this.selectedValue.set(this.value());
  }

  public selectRadio() {
    if (this.disabled()) return;
    this.selectedValue.set(this.value());
  }
}
