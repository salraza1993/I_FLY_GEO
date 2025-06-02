import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-table-pagination',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './table-pagination.component.html',
  styleUrl: './table-pagination.component.scss'
})
export class TablePaginationComponent {
  @Input() public totalRecords: number = 100;
  @Input() public selectedFrom: number = 1;
  @Input() public selectedTo: number = 20;
}
