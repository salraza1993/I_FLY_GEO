import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-modal, filter-modal',
  imports: [CommonModule],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.css',
  host: {
    'class': 'filter-modal-wrapper'
  }
})
export class FilterModalComponent {

}
