import { Component } from '@angular/core';
// import { HeaderComponent } from '../../shared/components/common/header/header.component';
// import { AsideComponent } from '../../shared/components/common/aside/aside.component';

@Component({
  selector: 'default-layout',
  // imports: [HeaderComponent, AsideComponent],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
  host: {
    class: 'app-default-layout'
  }
})
export class DefaultLayoutComponent {}
