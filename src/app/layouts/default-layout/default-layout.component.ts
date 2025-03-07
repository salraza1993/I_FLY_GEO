import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/common/header/header.component';
import { AsideComponent } from '../../shared/components/common/aside/aside.component';

@Component({
  selector: 'default-layout',
  imports: [HeaderComponent, AsideComponent],
  template: `
  <main-header></main-header>
  <ng-content />
  <aside-bar></aside-bar>
  `,
  styleUrl: './default-layout.component.css',
  host: {
    class: 'default-layout'
  }
})
export class DefaultLayoutComponent {}
