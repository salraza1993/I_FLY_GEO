import { booleanAttribute, Component, input } from '@angular/core';

@Component({
  selector: 'app-custom-button-link, custom-button-link, a[customButtonLink] a[role="button"]',
  imports: [],
  templateUrl: './custom-button-link.component.html',
  styleUrl: './custom-button-link.component.css',
  host: {
    'class': 'button',
    '[attr.href]': 'href',
    'role': 'link'
  }
})
export class CustomButtonLinkComponent {
  href = input<string>('google.com');
  public buttonType = input('button', { alias: 'type'});
  public allowTemplate = input(false, { transform: booleanAttribute });
  public title = input<string>();
  public iconBefore = input<string>();
  public iconAfter = input<string>();
}
