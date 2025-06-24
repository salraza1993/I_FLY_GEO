import { CommonModule } from '@angular/common';
import { AfterViewInit, booleanAttribute, Component, effect, ElementRef, input, model, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { easepick, RangePlugin } from '@easepick/bundle';


@Component({
  selector: 'app-search-datepicker, search-datepicker',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-datepicker.component.html',
  styleUrl: './search-datepicker.component.css',
  host: {
    'class': 'search-datepicker-wrapper'
  }
})
export class SearchDatepickerComponent implements AfterViewInit {
  private customCssPath = '@assets/styles/common/customize_sample.css'
  @ViewChild('startDateElement') startDateElement!: ElementRef<HTMLInputElement>;
  @ViewChild('endDateElement') endDateElement!: ElementRef<HTMLInputElement>;
  public _startDateValue = signal<string | null>(null);
  public _endDateValue = signal<string | null>(null);
  public getDate = model<{} | null>(null);
  public isRoundtrip = input(true, { transform: booleanAttribute});
  private easePickObj: any = {};

  constructor() {
    effect(() => {
      this.getDate.set({
        onwardDate: this._startDateValue(),
        returnDate: this._startDateValue()
      })
    }) 
  }
  
  private setupEasePick(): void {
    const startDateElement = document.getElementById('startDate') as HTMLInputElement;
    const endDateElement = document.getElementById('endDate') as HTMLInputElement;
    let config: any = {
      element: startDateElement,
      css: [
        'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
        './customize_sample.css',
      ],
      zIndex: 10,
      calendars: this.isRoundtrip() ? 2 : 1,
      grid: this.isRoundtrip() ? 2 : 1,
      setup(picker:any) {
        picker.on('select', (e: any) => {
          this.valueChange.emit(e);
          console.log(this.valueChange);
          const { end, start, date } = e.detail;
        });
      },
    };

    if (this.isRoundtrip()) {
      config = {
        ...config,
        RangePlugin: {
          elementEnd: endDateElement,
          repick: true,
        },
        plugins: [RangePlugin],
      };
    }
    if (Object.keys(this.easePickObj).length > 0) {
      this.easePickObj.destroy();
    }
    this.easePickObj = new easepick.create(config);
    this.easePickObj.clear();
  }

  ngOnInit() {
    console.log(this.getDate())
  }
  ngAfterViewInit(): void {
    setTimeout(() => this.setupEasePick(), 1000);
  }

}
