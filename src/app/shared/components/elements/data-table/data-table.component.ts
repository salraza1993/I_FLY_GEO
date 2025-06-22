import {
  Component,
  input,
  output,
  signal,
  computed,
  booleanAttribute,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ColumnMode, NgxDatatableModule, TableColumn } from '@swimlane/ngx-datatable';

type DataTableColumn = {
  key: string;
  label: string;
};

@Component({
  selector: 'data-table, app-data-table',
  standalone: true,
  imports: [FormsModule, NgxDatatableModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'data-table-wrapper',
  },
})
export class DataTableComponent {
  public readonly headerEnabled = input(true, { transform: booleanAttribute})
  public tHeadHeight = input<number | string | 'auto'>(40);
  public dataLimit = input<number>(15)
  public tFootHeight = input<number>(50);
  public tRowHeight = input<number | 'auto'>('auto');
  rows = [
    {
      "name": "Ethel Price",
      "gender": "female",
      "company": "Johnson, Johnson and Partners, LLC CMP DDC",
      "age": 22
    },
    {
      "name": "Claudine Neal",
      "gender": "female",
      "company": "Sealoud",
      "age": 55
    },
    {
      "name": "Beryl Rice",
      "gender": "female",
      "company": "Velity",
      "age": 67
    },
    {
      "name": "Wilder Gonzales",
      "gender": "male",
      "company": "Geekko"
    },
    {
      "name": "Georgina Schultz",
      "gender": "female",
      "company": "Suretech"
    },
    {
      "name": "Ethel Price",
      "gender": "female",
      "company": "Johnson, Johnson and Partners, LLC CMP DDC",
      "age": 22
    },
    {
      "name": "Claudine Neal",
      "gender": "female",
      "company": "Sealoud",
      "age": 55
    },
    {
      "name": "Beryl Rice",
      "gender": "female",
      "company": "Velity",
      "age": 67
    },
    {
      "name": "Wilder Gonzales",
      "gender": "male",
      "company": "Geekko"
    },
    {
      "name": "Georgina Schultz",
      "gender": "female",
      "company": "Suretech"
    },
    {
      "name": "Ethel Price",
      "gender": "female",
      "company": "Johnson, Johnson and Partners, LLC CMP DDC",
      "age": 22
    },
    {
      "name": "Claudine Neal",
      "gender": "female",
      "company": "Sealoud",
      "age": 55
    },
    {
      "name": "Beryl Rice",
      "gender": "female",
      "company": "Velity",
      "age": 67
    },
    {
      "name": "Wilder Gonzales",
      "gender": "male",
      "company": "Geekko"
    },
    {
      "name": "Georgina Schultz",
      "gender": "female",
      "company": "Suretech"
    },
    {
      "name": "Ethel Price",
      "gender": "female",
      "company": "Johnson, Johnson and Partners, LLC CMP DDC",
      "age": 22
    },
    {
      "name": "Claudine Neal",
      "gender": "female",
      "company": "Sealoud",
      "age": 55
    },
    {
      "name": "Beryl Rice",
      "gender": "female",
      "company": "Velity",
      "age": 67
    },
    {
      "name": "Wilder Gonzales",
      "gender": "male",
      "company": "Geekko"
    },
    {
      "name": "Georgina Schultz",
      "gender": "female",
      "company": "Suretech"
    },
  ];
  temp = this.rows;

  ColumnMode = ColumnMode;

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
}
