import { applyCalenderWrapperStyles } from '@/shared/helpers/easeCalenderWrapperStyles';
import { CommonModule } from '@angular/common';
import { AfterViewInit, booleanAttribute, Component, effect, ElementRef, input, model, OnDestroy, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTime, easepick, LockPlugin, RangePlugin } from '@easepick/bundle';

export type DateFormatType = DateTime;
export type EasepickDateType = Date | { start: DateTime, end: DateTime, date?: DateTime } | null;
@Component({
  selector: 'app-datepicker, datepicker',
  imports: [CommonModule, FormsModule],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
  host: {
    'class': 'datepicker-wrapper',
    '[attr.data-z-index]': 'datePicker?.isShown() ? 10 : 1'
  }
})
export class DatepickerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('easepick') easepick!: ElementRef<HTMLElement>;
  private datePicker!: any | {};
  private pickerConfig = signal<any>({});
  // Inputs
  public datepickerId = input<string>('datepicker-id');
  public calenders = input<number>(2);
  public grids = input<number>(2);
  public minDate = input<Date | string | null>(null);
  public maxDate = input<Date | string | null>(null);
  public enableRangeSelection = input(false, { transform: booleanAttribute });
  public enableLockPlugin = input(false, { transform: booleanAttribute });
  public format = input<string>('DD/MM/YYYY');
  public alignment = input<string[]>(['y-start', 'x-end']);
  
  public getDate = model<EasepickDateType>(null);

  private alinmentChange = effect(() => {
    const alignments = this.alignment(); // tracks changes
    const el = document.getElementById(this.datepickerId());
    if (el) {
      applyCalenderWrapperStyles(alignments, this.datepickerId());
    }
  });
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeDatepicker();
      this.alinmentChange;
    }, 1000);    
  }

  private initializeDatepicker() {
    const plugins: any[] = [];
    const pluginConfig: any = {};

    if (this.enableRangeSelection()) {
      plugins.push(RangePlugin);
      pluginConfig.RangePlugin = { repick: false, tooltip: true };
    }

    if (this.enableLockPlugin()) {
      plugins.push(LockPlugin);
      pluginConfig.LockPlugin = {
        minDate: this.minDate() ? new DateTime(this.minDate()) : undefined,
        maxDate: this.maxDate() ? new DateTime(this.maxDate()) : undefined,
      };
    }
    this.pickerConfig.set({
      grid: this.grids(),
      calendars: this.calenders(),
      inline: false,
      format: this.format(),
      autoApply: true,
      zIndex: 10,
      css: [
        'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css',
        '/assets/styles/common/easepick_customized.css',
      ],
      plugins,
      ...pluginConfig,
    })
    this.datePicker = new easepick.create({
      element: document.getElementById(this.datepickerId()) as HTMLElement,
      setup: (datePicker: easepick.Core) => this.calendearCustomSetup(datePicker),
      ...this.pickerConfig()
    });
    // styling wrapper
    applyCalenderWrapperStyles(this.alignment(), this.datepickerId());
  }

  private calendearCustomSetup(picker: easepick.Core):void {
    picker.on('select', (e: any) => {
      this.datePicker = picker; // a reference for datePicker
      const { end, start, date } = e.detail;
      if (start && end) {
        this.getDate.set({ start: start.format(this.format), end: end.format(this.format) });
      } else if (start) {
        this.getDate.set( start.format(this.format));
      } else {
        this.getDate.set(date.format(this.format));
      }
    });
  }
  
  // Public methods
  public setDateRange(start: Date | string, end: Date | string): void {
    this.datePicker?.setDateRange(start, end);
  }

  public setStartDate(start: Date | string): void {
    this.datePicker?.setStartDate(start);
  }

  public setEndDate(end: Date | string): void {
    this.datePicker?.setEndDate(end);
  }

  public getStartDate(): Date | null {
    return this.datePicker?.getStartDate()?.toJSDate() || null;
  }

  public getEndDate(): Date | null {
    return this.datePicker?.getEndDate()?.toJSDate() || null;
  }
  ngOnDestroy():void {
    if(this.datePicker && !this.datePicker.isShown()) 
      this.datePicker.distroy()
  }
}
