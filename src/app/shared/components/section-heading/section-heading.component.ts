import { CommonModule, Location, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'section-heading',
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './section-heading.component.html',
  styleUrl: './section-heading.component.css',
  host: {
    'class': 'section-heading-wrapper'
  }
})
export class SectionHeadingComponent {
  public contentScopeEnd = input(false);
  public backButton = input(false);
  public buttonPath = input('');
  public title = input<string[]>(['Section', 'Heading']);
  public description = input<string[]>([]);
  constructor(private _location: Location) { }
  public goBackHandler(): void {
    this._location.back();
  }
}
