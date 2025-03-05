import { Component } from '@angular/core';
// import { HeaderComponent } from '../../shared/components/common/header/header.component';
// import { AsideComponent } from '../../shared/components/common/aside/aside.component';

@Component({
  selector: 'default-layout',
  // imports: [HeaderComponent, AsideComponent],
  template: `<ng-content />`,
  styleUrl: './default-layout.component.css',
  host: {
    class: 'app-default-layout'
  }
})
export class DefaultLayoutComponent {}
