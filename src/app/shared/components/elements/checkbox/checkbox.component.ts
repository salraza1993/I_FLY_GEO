import { Component, input, model, booleanAttribute } from '@angular/core';
import { COMMON_IMPORTS } from '../../../helpers/common-imports'; // adjust if needed

@Component({
  selector: 'app-checkbox, checkbox',
  standalone: true,
  imports: [COMMON_IMPORTS],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css',
  host: {
    'class': 'checkbox-wrapper',
    '[class.checked]': 'checked()',
    '[class.container]': 'container()',
  }
})
export class CheckboxComponent {
  readonly elementName = input.required<string>();
  readonly elementId = input.required<string>();
  readonly container = input<boolean, boolean>(false, {transform: booleanAttribute})
  // value which is two-way binded
  checked = model<boolean>(false);

  label = input<string | null>(null);
  description = input<string>('');
  disabled = input<boolean, boolean | string>(false, { transform: booleanAttribute });

  public onChange(event: Event) {
    if (this.disabled()) return;
    const checked = (event.target as HTMLInputElement).checked;
    this.checked.set(checked);
  }
  public toggleCheckbox() {
    if (this.disabled()) return;
    this.checked.update(current => !current);
  }
}
