import { booleanAttribute, Component, input } from '@angular/core';

@Component({
  selector: 'block-spacer',
  imports: [],
  templateUrl: './block-spacer.component.html',
  styleUrl: './block-spacer.component.css',
  host: {
    'class': 'block-spacer',
    '[style.--spacer-margin-y-start]': 'setMarginStart',
    '[style.--spacer-margin-y-end]': 'setMarginEnd',
  }
})
export class BlockSpacerComponent {
  public title = input<string | null>(null);
  public noLine = input(false, { transform: booleanAttribute });
  public marginStart = input(1);
  public marginEnd = input(1);

  protected get setMarginStart(): string {
    return `${this.marginStart()}rem`;
  }
  protected get setMarginEnd(): string {
    return `${this.marginStart()}rem`;
  }
}
