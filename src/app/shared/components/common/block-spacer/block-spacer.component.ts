import { Component, input } from '@angular/core';

@Component({
  selector: 'block-spacer',
  imports: [],
  templateUrl: './block-spacer.component.html',
  styleUrl: './block-spacer.component.css',
  host: {
    'class': 'block-spacer'
  }
})
export class BlockSpacerComponent {
  title = input<string | null>(null);
  noLine = input(true)
}
