import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, input, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { easepick } from '@easepick/bundle';
import { getDatePickerSetup } from '@sharedHelpers/flight-search.helper';


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
  inputSelectedValue = signal<string | null>(null)
  getDate = model<Date | null>(null);
  public inputId = input("input-id");

  ngAfterViewInit(): void {
    const datePickerElement = document.getElementById(this.inputId());
    const endDatePickerElement = document.getElementById('arrival-date-picker')!;
    if (datePickerElement)
    new easepick.create({
      element: datePickerElement,
      grid: 2,
      calendars: 2,
      format: 'DD/MM/YYYY',
      RangePlugin: {
        elementEnd: endDatePickerElement
      },
      // plugins: [
      //   "RangePlugin"
      // ],
      css: [
        'https://cdn.jsdelivr.net/npm/@easepick/core@1.2.1/dist/index.css',
        '/assets/scss/customize_sample.css'
      ],
      setup: (picker) => getDatePickerSetup(picker),
    });
    
  }
}
