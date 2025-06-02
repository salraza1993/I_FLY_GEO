import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-button, custom-button, button, button[customButton], [role="button"], button[role="submit"]',
  imports: [CommonModule],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.css',
  host: {
    'class': 'button',
    'aria-label': 'button',
    '[attr.role]': 'button',
    '[attr.index]': '0',
  }
})
export class CustomButtonComponent {
  public buttonType = input('button', { alias: 'type'});
  public allowTemplate = input(false, { transform: booleanAttribute });
  public title = input<string>();
  public iconBefore = input<string>();
  public iconAfter = input<string>();
}
