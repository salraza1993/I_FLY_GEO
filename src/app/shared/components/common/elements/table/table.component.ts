import { Component, Input, ViewEncapsulation, output } from '@angular/core';
import { CommonModule, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { ClickOutsideDirective } from 'src/app/core/directives/click-outside.directive';
// import { DropDownAnimation, SlideInLeft } from '../../animations/animations';
// import { SwitchToggleComponent } from '../form-elements/switch-toggle/switch-toggle.component';
// import { StatusButtonComponent } from '../status-button/status-button.component';
// import { DateFormatPipe } from 'src/app/core/pipes/dateFormat.pipe';
// import { TooltipDirective } from 'src/app/core/directives/tooltip.directive';

@Component({
  selector: 'app-table, custom-table, table[appTable], [role="table"], [role="grid"]',
  standalone: true,
  imports: [
    CommonModule,
    LowerCasePipe,
    TitleCasePipe,
    UpperCasePipe,
    RouterModule,
    // DateFormatPipe,
    // ClickOutsideDirective,
    // SwitchToggleComponent,
    // StatusButtonComponent,
    // TooltipDirective
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  encapsulation: ViewEncapsulation.None,
  // animations: [DropDownAnimation, SlideInLeft]
})
export class TableComponent {
  switchState1: boolean = false;
  tablePlaceholder: any[] = [{
    columns: [
      { key: 'id', label: 'Heading' },
      { key: 'label', label: 'label' },
      { key: 'status', label: 'Status', type: 'button' },
      { key: 'actions', label: '' },
    ],
    body: [
      {
        id: { value: 'PT14202373540', path: '' },
        label: 'Deb Dalai',
        status: 'failed',
        actions: [
          { label: 'edit' },
          { label: 'delete' },
          { label: 'info', path: '' },
        ]
      },
      {
        id: { value: 'PT14202373540', path: '' },
        label: 'Deb Dalai',
        status: 'failed',
        actions: [
          { label: 'edit' },
          { label: 'delete' },
          { label: 'info', path: '' },
        ]
      },
      {
        id: { value: 'PT14202373540', path: '' },
        label: 'Deb Dalai',
        status: 'failed',
        actions: [
          { label: 'edit' },
          { label: 'delete' },
          { label: 'info', path: '' },
        ]
      },
    ]
  }];

  selectedRowIndex: number | null = null;
  showActionsButtons: boolean = false;

  @Input() setTableData: any[] = this.tablePlaceholder;
  @Input() size: string = 'regular';
  @Input() wrapperClass: string = '';
  @Input() columnClasses: string = '';

  readonly getDeleteButtonTriggered = output<any>();

  showActionsButtonsHandler(index: number): void {
    if (this.selectedRowIndex !== index) {
      this.showActionsButtons = false;
    }
    this.selectedRowIndex = index;
    this.showActionsButtons = !this.showActionsButtons;
  }
  hideActionsButtonsHandler():void {
    this.selectedRowIndex = null;
    this.showActionsButtons = false;
  }
  deleteButtonHandler(itemId: string | number | null): void { 
    this.getDeleteButtonTriggered.emit(itemId);
  }
}
