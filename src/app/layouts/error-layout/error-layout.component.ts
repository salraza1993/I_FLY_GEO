import { Component } from '@angular/core';
import { BodyClassModifierService } from '../../shared/services/body-modifier.service';

@Component({
  selector: 'error-layout',
  imports: [],
  template: `
    <div class="error-page-wrapper"><ng-content /></div>
  `,
  styleUrl: './error-layout.component.css',
  host: {
    '[class.error-page-layout]': 'true'
  }
})
export class ErrorLayoutComponent {
  constructor(private bodyClassService: BodyClassModifierService) {}
  ngOnInit():void {
    this.bodyClassService.removeBodyClasses(['auth-page', 'default-page'])
    this.bodyClassService.addClassToBody('error-page')
  }
}
