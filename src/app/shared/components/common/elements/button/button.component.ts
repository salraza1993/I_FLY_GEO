import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ButtonComponent {
  @Input() public buttonTemplate : boolean = false;
  @Input() public buttonText : string = 'Click Me';
  @Input() public type : string = 'button';
  @Input() public path : string | undefined = undefined;
  @Input() public classes: string = '';
  @Input() public size: string = 'inherit';
  @Input() public color: string = 'inherit';
  @Input() public hover: string = 'inherit';
  @Input() public shadow: boolean = false;
  
  @Input() public iconOnly : boolean = false;
  @Input() public iconType : string = 'solid';
  @Input() public iconClass : string = 'arrow-right';
  
  @Input() public iconBefore : boolean = false;
  @Input() public iconBeforeType : string = 'solid';
  @Input() public iconBeforeName : string = 'arrow-left';  
  
  @Input() public iconAfter : boolean = false;
  @Input() public iconAfterName : string = 'arrow-right';
  @Input() public iconAfterType : string = 'solid';

}
