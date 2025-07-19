import { Component } from '@angular/core';
import { COMMON_IMPORTS } from '../../../../../shared/helpers/common-imports';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-top-performed-users, top-performed-users',
  imports: [COMMON_IMPORTS],
  templateUrl: './top-performed-users.component.html',
  styleUrl: './top-performed-users.component.css'
})
export class TopPerformedUsersComponent {
  rows = [
    { name: 'John Doe', age: 28, city: 'New York' },
    { name: 'Jane Smith', age: 34, city: 'London' },
    { name: 'Samuel Green', age: 45, city: 'Sydney' }
  ];

  columns = [
    { prop: 'name', name: 'Name' },
    { prop: 'age', name: 'Age' },
    { prop: 'city', name: 'City' }
  ];
}
