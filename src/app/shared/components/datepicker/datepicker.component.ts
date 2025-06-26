import { CommonModule } from '@angular/common';
import { AfterViewInit, booleanAttribute, Component, effect, input, model, Signal, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTime, easepick, LockPlugin, RangePlugin } from '@easepick/bundle';

export type DateFormatType = DateTime;
@Component({
  selector: 'app-datepicker, datepicker',
  imports: [CommonModule, FormsModule],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.css',
  host: {
    'class': 'datepicker-wrapper'
  }
})
export class DatepickerComponent implements AfterViewInit {
  // ref: https://stackblitz.com/edit/angular-jdv9a2-vgxyc1br?file=app%2Feasepick%2Feasepick.component.ts,app%2Feasepick%2Feasepick.component.html
  @ViewChild('easepick') easepick: any;
  private picker!: any | {};
  private pickerConfig = signal<any>({});

  // Inputs
  public datepickerId = input<string>('datepicker-id');
  public calenders = input<number>(2);
  public grids = input<number>(2);
  public minDate = input<Date | string | null>(null);
  public maxDate = input<Date | string | null>(null);
  public enableRangeSelection = input(false, {transform: booleanAttribute});
  public enableLockPlugin = input(false, {transform: booleanAttribute});
  public format = input<string>('DD/MM/YYYY');
  public alignment = input<string[]>(['y-start', 'x-start']);

  // Models
  public selectedDate = model<Date | { start: Date; end: Date } | null>(null);
  constructor() {
    // effect(() => {
    //   console.log('helll: ', this.selectedDate)
    // });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initializeDatepicker(), 1000);    
  }

  private initializeDatepicker() {
    const plugins: any[] = [];
    const pluginConfig: any = {};

    if (this.enableRangeSelection()) {
      plugins.push(RangePlugin);
      pluginConfig.RangePlugin = { repick: true, tooltip: true };
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
      css: [
        'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css',
        'https://cdn.jsdelivr.net/npm/@easepick/range-plugin@1.2.1/dist/index.css',
        '/assets/styles/common/customize_sample.css',
      ],
      plugins,
      ...pluginConfig,
    })
    this.picker = new easepick.create({
      element: document.getElementById(this.datepickerId()) as HTMLElement,
      setup: (picker: easepick.Core) => this.calendearCustomSetup(picker),
      ...this.pickerConfig()
    });
    this.applyWrapperStyles();
  }
  private calendearCustomSetup(picker: easepick.Core):void {
    picker.on('select', (e: any) => {
      const { end, start, date } = e.detail;
      if (start && end) {
        this.selectedDate.set({ start, end });
      } else if (start) {
        this.selectedDate.set(  start);
      } else {
        this.selectedDate.set(date);
      }
    });
  }
  private applyWrapperStyles() {
    setTimeout(() => {
      const wrapper = document.querySelector('.easepick-wrapper') as HTMLElement;
      if (wrapper) {
        const shadowRoot = wrapper.shadowRoot;
        const calendarContainer = shadowRoot?.querySelector('.container') as HTMLElement;
        wrapper.classList.add(`easepick-custom-wrapper`);
        this.alignment().forEach((className: string) => {
          wrapper.classList.add(className);
          calendarContainer?.classList.add(className);
        });

        Object.assign(wrapper.style, {
          zIndex: '9999',
          borderRadius: 'var(--border-radius)',
          position: 'absolute',
          pointerEvents: 'none',
          insetBlockStart: 'var(--calendar-inset-block-start, initial)',
          insetBlockEnd: 'var(--calendar-inset-block-end, initial)',
          insetInlineStart: 'var(--calendar-inset-inline-start, initial)',
          insetInlineEnd: 'var(--calendar-inset-inline-end, initial)',
        });
      }
    }, 0);
  }

  // Public methods
  public setDateRange(start: Date | string, end: Date | string): void {
    this.picker?.setDateRange(start, end);
  }

  public setStartDate(start: Date | string): void {
    this.picker?.setStartDate(start);
  }

  public setEndDate(end: Date | string): void {
    this.picker?.setEndDate(end);
  }

  public getStartDate(): Date | null {
    return this.picker?.getStartDate()?.toJSDate() || null;
  }

  public getEndDate(): Date | null {
    return this.picker?.getEndDate()?.toJSDate() || null;
  }
}
