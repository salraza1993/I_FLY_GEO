import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '@/shared/components/header/header.component';
import { AsideComponent } from '@/shared/components/aside/aside.component';
import { BodyClassModifierService } from '@sharedServices/body-modifier.service';

@Component({
  selector: 'default-layout',
  imports: [HeaderComponent, AsideComponent],
  template: `
  <main-header></main-header>
  <div class="body-content">
    <ng-content />
  </div>
  <aside-bar></aside-bar>
  `,
  styleUrl: './default-layout.component.css',
  host: {
    class: 'default-layout'
  }
})
export class DefaultLayoutComponent implements OnInit {
  constructor(private bodyClassService: BodyClassModifierService) {}
  
  ngOnInit():void {
    this.bodyClassService.removeBodyClass('auth-page')
    this.bodyClassService.addClassToBody('default-page')
  }

}
