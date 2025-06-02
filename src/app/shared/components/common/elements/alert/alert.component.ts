import { Component, Input, OnInit, ViewEncapsulation, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent implements OnInit {
  @Input() public showDismissibleIcon: boolean = false;
  @Input() public content: string = 'Alert Content!';
  @Input() public type: string = 'success';
  @Input() public size: string = 'regular';
  @Input() public classes: string = '';
  @Input() public alertHeaderClass: string = '';
  @Input() public alertBodyClass: string = '';
  @Input() public alertFooterClass: string = '';
  @Input() public template: boolean = false;
  @Input() public paddingXStart: number | string = 0.5;
  @Input() public paddingXEnd: number | string = 0.5;
  @Input() public paddingYStart: number | string = 0.25;
  @Input() public paddingYEnd: number | string = 0.25;

  private _isDismissible: boolean = true;
  readonly isDismissibleChange = output<boolean>();
  readonly onAlertClose = output<any>();

  @Input() public dismissOnTimeout: number | undefined;
  readonly dismissOnTimeoutChange = output<number | undefined>();

  @Input()
  get isDismissible(): boolean {
    return this._isDismissible;
  }
  set isDismissible(value: boolean) {
    this._isDismissible = value;
    this.showDismissibleIcon = value;
    this.isDismissibleChange.emit(value);

  }



  private setStyles(): void {
    this.paddingXStart = String(this.paddingXStart).includes('rem' || 'px') ? this.paddingXStart : `${this.paddingXStart}rem`;
    this.paddingXEnd = String(this.paddingXEnd).includes('rem' || 'px') ? this.paddingXEnd : `${this.paddingXEnd}rem`;
    this.paddingYStart = String(this.paddingYStart).includes('rem' || 'px') ? this.paddingYStart : `${this.paddingYStart}rem`;
    this.paddingYEnd = String(this.paddingYEnd).includes('rem' || 'px') ? this.paddingYEnd : `${this.paddingYEnd}rem`;
  }

  private initiateCounter() {
    const intervalId = setInterval(() => {
      if (this.dismissOnTimeout !== undefined && this.dismissOnTimeout > 0) {
        this.dismissOnTimeout--;
        if (this.dismissOnTimeout === 0) {
          console.log('salman: ', this.dismissOnTimeout)
          this.isDismissibleChange.emit(false)
        }
        this.dismissOnTimeoutChange.emit(this.dismissOnTimeout);
      } else {
        clearInterval(intervalId);
        this.dismissOnTimeout = undefined; // Reset counter when it reaches 0
      }
    }, 1000);
  }

  ngOnInit(): void {
    this.setStyles();
    this.initiateCounter();    
  }

  closeAlert() {
    this._isDismissible = false;
    this.dismissOnTimeout = 0;
    this.isDismissibleChange.emit(this._isDismissible);

    // send values according to the requirements
    this.onAlertClose.emit(this._isDismissible);
  }  
}
