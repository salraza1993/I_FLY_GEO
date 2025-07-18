import { Component } from '@angular/core';
import { ColorPaletteComponent } from "./color-palette/color-palette.component";

@Component({
  selector: 'app-static-elements',
  imports: [ColorPaletteComponent],
  templateUrl: './static-elements.component.html',
  styleUrl: './static-elements.component.css',
  host: {
    'class': 'static-elements-wrapper'
  }
})
export class StaticElementsComponent {

}
