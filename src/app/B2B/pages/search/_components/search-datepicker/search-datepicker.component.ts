import { applyCalenderWrapperStyles } from '@/shared/helpers/easeCalenderWrapperStyles';
import { CommonModule } from '@angular/common';
import { AfterViewInit, booleanAttribute, Component, effect, ElementRef, input, model, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTime, easepick, LockPlugin, RangePlugin } from '@easepick/bundle';
// import {  } from '@easepick/datetime';


@Component({
  selector: 'app-search-datepicker, search-datepicker',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-datepicker.component.html',
  styleUrls: ['./search-datepicker.component.css', './../../styles/search-common-styles.css'],
  host: {
    'class': 'search-datepicker-wrapper',
    '[class.roundtrip]': 'isRoundtrip()',
  }
})
export class SearchDatepickerComponent implements AfterViewInit {
  @ViewChild('easepick') easepick: any;
  @ViewChild('easepickWrapper') easepickWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('startDateElement') startDateElement!: ElementRef<HTMLInputElement>;
  @ViewChild('endDateElement') endDateElement!: ElementRef<HTMLInputElement>;
  isDatePickerActive = signal(false);
  protected datePicker!: any;
  readonly dateStartFrom: DateTime = new DateTime(new Date());
  readonly dateEndsTo: DateTime = new DateTime(new Date());
  readonly alignment: string[] = ['y-start', 'x-start'];
  readonly format: string = 'DD/MM/YYYY';
  public getDate = model<unknown | null>(null);
  public isRoundtrip = input(true, { transform: booleanAttribute});
  private plugins = signal<any>([LockPlugin]);
  private pluginConfig = signal<any>({
    LockPlugin: {
      minDate: this.dateStartFrom,
      maxDate: this.dateEndsTo.setMonth(this.dateStartFrom.getMonth() + 11)
    },
  });

  ngOnInit() {
    this.isDatePickerActive.update(prev => prev = this.datePicker?.isShown())
  }
  // just example
  showDatePicker(value: boolean){
    if(value) this.datePicker?.show()
    if(!value) this.datePicker?.hide()
  }
  private calendarCustomSetup(picker: easepick.Core): void {
    picker.on('select', (e: any) => {
      this.datePicker = picker; // a reference for datePicker
      const { start, end, date } = e.detail;
      if (this.isRoundtrip() && start && end) {
        this.getDate.set({
          onwardDate: start.format(this.format),
          returnDate: end.format(this.format),
        });
      } else {
        this.getDate.set({
          onwardDate: date.format(this.format),
        });
      }
    });
  }

  private initializeCalender(): void {
    const startDateElement = document.getElementById('startDate') as HTMLInputElement;
    const endDateElement = document.getElementById('endDate') as HTMLInputElement;
    if (this.isRoundtrip() && !this.plugins().includes(RangePlugin)) {
      this.plugins.update(prev => [...prev, RangePlugin]);
      this.pluginConfig.update(prev => ({
        ...prev,
        RangePlugin: {
          elementEnd: endDateElement,
          repick: true,
          tooltip: true
        }
      }));
    }
    let calendarConfig: any = {
      element: startDateElement,
      css: [
        'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
        '/assets/styles/common/customize_sample.css',
      ],
      zIndex: 10,
      calendars: 2,
      grid: 2,
      format: this.format,
      plugins: this.plugins(),
      ...this.pluginConfig(),
      setup: (picker: easepick.Core) => this.calendarCustomSetup(picker),
    };
    if (this.datePicker && Object.keys(this.datePicker).length > 0) {
      this.datePicker.destroy();
    }
    this.datePicker = new easepick.create(calendarConfig);
    applyCalenderWrapperStyles();
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => this.initializeCalender(), 1000);
  }
}
