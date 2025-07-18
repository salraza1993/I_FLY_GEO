import { NgModalService } from '@/shared/services/ng-modal.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

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
  private readonly modalService = inject(NgModalService);

  onClose() {
    console.log('clicked')
    this.modalService.close('filter-modal')
  }
}
