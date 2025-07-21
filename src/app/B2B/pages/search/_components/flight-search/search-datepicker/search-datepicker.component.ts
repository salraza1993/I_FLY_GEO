import { applyCalenderWrapperStyles } from '@/shared/helpers/easeCalenderWrapperStyles';
import { CommonModule } from '@angular/common';
import { AfterViewInit, booleanAttribute, Component, computed, effect, ElementRef, input, model, OnDestroy, output, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTime, easepick, KbdPlugin, LockPlugin, RangePlugin } from '@easepick/bundle';
// import {  } from '@easepick/datetime';

export type SearchDateType = { onwardDate: string; returnDate?: string } | null;
@Component({
  selector: 'app-search-datepicker, search-datepicker',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-datepicker.component.html',
  styleUrls: ['./search-datepicker.component.css'],
  host: {
    'class': 'search-datepicker-wrapper',
    '[class.roundtrip]': 'isRoundtrip()',
    '[class.error]': 'errorMessage()',
    '[attr.data-z-index]': 'datePicker?.isShown() ? 10 : 1'
  }
})
export class SearchDatepickerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('easepick', { static: false }) easepick: any;
  @ViewChild('easepickWrapper', { static: false }) easepickWrapper!: ElementRef<HTMLDivElement>;
  datepickerParentId = signal('origin-destination-calendar')
  protected datePicker!: any;
  readonly dateStartFrom: DateTime = new DateTime(new Date());
  readonly dateEndsTo: DateTime = new DateTime(new Date());
  readonly alignment: string[] = ['y-start', 'x-start'];
  readonly format: string = 'YYYY-MM-DD';

  public showCalendar = model<boolean>(false);
  public focusNext = output<string>();
  isDatePickerActive = signal<boolean>(false);

  public touched = signal<boolean>(false);
  public hasError = model<boolean>(false);

  public errorMessage = computed<string | false | null>(() => {
    if (!this.touched()) return null;
    const date = this.getDate();
    if (this.isRoundtrip() && (!date || !date.onwardDate || !date.returnDate)) {
      return 'Please select a departure and return date';
    } else if (!date || !date.onwardDate) {
      return 'Please select a departure date';
    } else {
      return false;
    }
  });

  public getDate = model<SearchDateType>(null);
  public isRoundtrip = input(false, { transform: booleanAttribute});

  private plugins = signal<any>([LockPlugin]);
  private pluginConfig = signal<any>({
    LockPlugin: {
      minDate: this.dateStartFrom,
      maxDate: this.dateEndsTo.setMonth(this.dateStartFrom.getMonth() + 11)
    },
  });

  constructor() {
    effect(() => {
      if (this.showCalendar()) {
        this.showDatePickerHandler(true);
      }
      queueMicrotask(() => this.showCalendar.set(false));
    })
  }

  public showDatePickerHandler(value: boolean){
    if (value) {
      this.datePicker?.show();
    } else {
      this.datePicker?.hide();
      this.touched.set(true);
      this.validateDate();
    }
    this.isDatePickerActive.set(this.datePicker?.isShown())
  }

  private calendarCustomSetup(picker: easepick.Core): void {
    picker.on('select', (e: any) => {
      this.datePicker = picker;
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
      this.validateDate();
      if (!this.isRoundtrip() || (start && end)) {
        this.focusNext.emit('passengers');
      }
    });
    picker.on('hide', () => {
      this.touched.set(true);
      this.validateDate();
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
          repick: false,
          tooltip: true
        }
      }));
    }
    let calendarConfig: any = {
      element: startDateElement,
      css: [
        'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
        '/assets/styles/common/easepick_customized.css',
      ],
      autoApply: true,
      zIndex: 10,
      darkMode: true,
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
    this.datePicker?.clear();
    this.datePicker = new easepick.create(calendarConfig);
    applyCalenderWrapperStyles(this.alignment, this.datepickerParentId());
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initializeCalender(), 1000);
  }

  public onBlur(): void {
    this.touched.set(true);
    this.validateDate();
    this.showDatePickerHandler(false);
  }

  private validateDate(): void {
    const date = this.getDate();
    const hasError =
      !date || !date.onwardDate || (this.isRoundtrip() && !date.returnDate);
    this.hasError.set(hasError);
  }
  ngOnDestroy(): void {
    // this.datePicker.destroy();
  }
}
