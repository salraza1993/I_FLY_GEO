import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { LayoverInfo } from '../../../../../../models/FlightResultCardInterface.interface';

@Component({
  selector: 'app-details-layover, details-layover',
  imports: [CommonModule],
  templateUrl: './details-layover.component.html',
  styleUrl: '../details-sement.component.css'
})
export class DetailsLayoverComponent {
  setlayover = input<LayoverInfo>();

}
