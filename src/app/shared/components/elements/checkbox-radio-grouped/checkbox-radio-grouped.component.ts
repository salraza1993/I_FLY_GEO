import { Component, computed, input, model } from '@angular/core';
export type GroupType = 'checkbox' | 'radio';


interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'checkbox-radio-grouped',
  imports: [],
  templateUrl: './checkbox-radio-grouped.component.html',
  styleUrl: './checkbox-radio-grouped.component.css',
  host: {
    'class': 'checkbox-radio-group-wrapper'
  }
})
export class CheckboxRadioGroupedComponent {
  groupType = input<'checkbox' | 'radio'>('radio');
  groupName = input.required<string>();
  options = input.required<Option[]>();

  // Separated models for checkbox (array) and radio (string)
  checkboxModel = model<string[]>([]);
  radioModel = model<string>('');

  isChecked(value: string): boolean {
    if (this.groupType() === 'checkbox') {
      return this.checkboxModel().includes(value);
    }
    return this.radioModel() === value;
  }

  onCheckboxChange(value: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const current = [...this.checkboxModel()];

    if (checked) {
      if (!current.includes(value)) {
        current.push(value);
      }
    } else {
      const index = current.indexOf(value);
      if (index > -1) {
        current.splice(index, 1);
      }
    }

    this.checkboxModel.set(current);
  }

  // Computed property to expose the correct model based on type
  get model() {
    return this.groupType() === 'checkbox'
      ? this.checkboxModel
      : this.radioModel;
  }
}


// ============== [ Sample to be used in parent ] ============== //
// hobbyOptions = signal([
//   { value: 'reading', label: 'Reading' },
//   { value: 'sports', label: 'Sports' },
//   { value: 'music', label: 'Music' }
// ]);

// genderOptions = signal([
//   { value: 'male', label: 'Male' },
//   { value: 'female', label: 'Female' },
//   { value: 'other', label: 'Other' }
// ]);

// selectedHobbies = signal<string[]>([]);
// selectedGender = signal<string>('');
