import { GenerateUniqueId } from '@/shared/helpers/uniqueIdGenerator';
import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggle-switch, toggle-switch',
  imports: [CommonModule, FormsModule],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.css',
  host: {
    'class': 'custom-switch',
  },
})
export class ToggleSwitchComponent {
  private uid = GenerateUniqueId(4)
  type = input('salman');
  size = input();
  label = input();
  typeClass = `switch-color--${this.type()}`
  toggleValue = model<boolean>(false);
  switcherName = input(`switcherName-${this.uid}`);
  switcherId = input(`switcherId-${this.uid}`);

  // add condtions if required
  switchHandler(event: Event) {}
}
