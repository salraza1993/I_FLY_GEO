import { CommonModule, NgIf } from '@angular/common';
import { booleanAttribute, Component, input } from '@angular/core';

@Component({
  selector: 'app-content-card, content-card',
  imports: [CommonModule, NgIf],
  templateUrl: './content-card.component.html',
  styleUrl: './content-card.component.css',
  host: {
    'class': 'content-card-wrapper'
  }
})
export class ContentCardComponent {
  cardTitle = input<string | null>(null);
  isHeader = input(false, { transform: booleanAttribute });
  isFooter = input(false, { transform: booleanAttribute });

  hasCardHeader = input(false, { transform: booleanAttribute });
  hasCardHeaderStartBlock = input(false, { transform: booleanAttribute });
  hasCardHeaderEndBlock = input(false, { transform: booleanAttribute });

  hasCardFooter = input(false, { transform: booleanAttribute });
  hasCardFooterStartBlock = input(false, { transform: booleanAttribute });
  hasCardFooterEndBlock = input(false, { transform: booleanAttribute });
}
