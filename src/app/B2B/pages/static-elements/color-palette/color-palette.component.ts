import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-color-palette',
  imports: [],
  templateUrl: './color-palette.component.html',
  styleUrl: './color-palette.component.css'
})
export class ColorPaletteComponent {
  primaryGrid = signal<any>([]);
  dangerGrid = signal<any>([]);
  successGrid = signal<any>([]);
  infoGrid = signal<any>([]);
  warningGrid = signal<any>([]);
  purpleGrid = signal<any>([]);
  yellowGrid = signal<any>([]);
  accentGrid = signal<any>([]);
  secondaryGrid = signal<any>([]);

  constructor() {
    this.primaryGrid.set(this.generateGrid('primary', 100, 5));
    this.dangerGrid.set(this.generateGrid('danger'));
    this.successGrid.set(this.generateGrid('success'));
    this.infoGrid.set(this.generateGrid('info'));
    this.warningGrid.set(this.generateGrid('warning'));
    this.purpleGrid.set(this.generateGrid('purple'));
    this.yellowGrid.set(this.generateGrid('yellow'));
    this.accentGrid.set(this.generateGrid('accent'));
    this.secondaryGrid.set(this.generateGrid('secondary'));
  }

  generateGrid(type:string, arrayLength: number = 100, minusValue: number = 10)  {
    let innerTextValue = arrayLength;
    const array = [];
    while (innerTextValue >= minusValue) {
      array.unshift({type: type, label: innerTextValue})
      innerTextValue -= minusValue;
    }
    return array;
  }
}
