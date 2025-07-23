import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string | Date | null | undefined, format: string = 'date'): string {
    if (!value) return '';

    try {
      // Handle different input types
      let luxonObj: DateTime;

      if (typeof value === 'string') {
        // Try ISO format first, then fallback to other formats
        luxonObj = DateTime.fromISO(value);
        if (!luxonObj.isValid) {
          luxonObj = DateTime.fromJSDate(new Date(value));
        }
      } else if (value instanceof Date) {
        luxonObj = DateTime.fromJSDate(value);
      } else {
        return '';
      }

      if (!luxonObj.isValid) {
        console.warn('DateFormatPipe: Invalid date provided:', value);
        return '';
      }

      // Predefined format shortcuts
      switch (format.toLowerCase()) {
        case 'date':
          return luxonObj.toFormat('dd-MM-yyyy');
        case 'time':
          return luxonObj.toFormat('HH:mm');
        case 'datetime':
          return luxonObj.toFormat('dd-MM-yyyy, HH:mm');
        case 'short':
          return luxonObj.toFormat('dd MMM yyyy');
        case 'long':
          return luxonObj.toFormat('dd MMMM yyyy');
        case 'iso':
          return luxonObj.toISO() || '';
        case 'relative':
          return luxonObj.toRelative() || '';
        case 'relativeshort':
          return luxonObj.toRelative({ style: 'short' }) || '';
        case 'relativenarrow':
          return luxonObj.toRelative({ style: 'narrow' }) || '';
        case 'relativefrom':
          // Relative from now (e.g., "5 minutes ago", "in 2 hours")
          return luxonObj.toRelativeCalendar() || luxonObj.toRelative() || '';
        case 'ago':
          // Custom "ago" format for past dates
          const now = DateTime.now();
          const diff = now.diff(luxonObj, ['years', 'months', 'days', 'hours', 'minutes', 'seconds']).toObject();

          if (diff.years && diff.years >= 1) {
            return `${Math.floor(diff.years)} year${Math.floor(diff.years) > 1 ? 's' : ''} ago`;
          } else if (diff.months && diff.months >= 1) {
            return `${Math.floor(diff.months)} month${Math.floor(diff.months) > 1 ? 's' : ''} ago`;
          } else if (diff.days && diff.days >= 1) {
            return `${Math.floor(diff.days)} day${Math.floor(diff.days) > 1 ? 's' : ''} ago`;
          } else if (diff.hours && diff.hours >= 1) {
            return `${Math.floor(diff.hours)} hour${Math.floor(diff.hours) > 1 ? 's' : ''} ago`;
          } else if (diff.minutes && diff.minutes >= 1) {
            return `${Math.floor(diff.minutes)} minute${Math.floor(diff.minutes) > 1 ? 's' : ''} ago`;
          } else {
            return 'just now';
          }
        case 'fromnow':
          // Custom "from now" format for future dates
          const nowTime = DateTime.now();
          const diffFromNow = luxonObj.diff(nowTime, ['years', 'months', 'days', 'hours', 'minutes', 'seconds']).toObject();

          if (diffFromNow.years && diffFromNow.years >= 1) {
            return `in ${Math.floor(diffFromNow.years)} year${Math.floor(diffFromNow.years) > 1 ? 's' : ''}`;
          } else if (diffFromNow.months && diffFromNow.months >= 1) {
            return `in ${Math.floor(diffFromNow.months)} month${Math.floor(diffFromNow.months) > 1 ? 's' : ''}`;
          } else if (diffFromNow.days && diffFromNow.days >= 1) {
            return `in ${Math.floor(diffFromNow.days)} day${Math.floor(diffFromNow.days) > 1 ? 's' : ''}`;
          } else if (diffFromNow.hours && diffFromNow.hours >= 1) {
            return `in ${Math.floor(diffFromNow.hours)} hour${Math.floor(diffFromNow.hours) > 1 ? 's' : ''}`;
          } else if (diffFromNow.minutes && diffFromNow.minutes >= 1) {
            return `in ${Math.floor(diffFromNow.minutes)} minute${Math.floor(diffFromNow.minutes) > 1 ? 's' : ''}`;
          } else {
            return 'now';
          }
        case 'smart':
          // Smart relative time - shows different formats based on time difference
          const smartNow = DateTime.now();
          const smartDiff = smartNow.diff(luxonObj, ['days']).days;

          if (Math.abs(smartDiff) < 1) {
            // Less than a day - show relative time
            return luxonObj.toRelative() || '';
          } else if (Math.abs(smartDiff) < 7) {
            // Less than a week - show day and time
            return luxonObj.toFormat('cccc, HH:mm');
          } else if (Math.abs(smartDiff) < 365) {
            // Less than a year - show date without year
            return luxonObj.toFormat('dd MMM, HH:mm');
          } else {
            // More than a year - show full date
            return luxonObj.toFormat('dd MMM yyyy');
          }
        case 'weekday':
          return luxonObj.toFormat('cccc');
        case 'month':
          return luxonObj.toFormat('MMMM');
        case 'year':
          return luxonObj.toFormat('yyyy');
        case 'daymonth':
          return luxonObj.toFormat('dd MMM');
        case 'timeampm':
          return luxonObj.toFormat('h:mm a');
        default:
          // If it's not a predefined format, use it as a custom Luxon format
          return luxonObj.toFormat(format);
      }
    } catch (error) {
      console.error('DateFormatPipe: Error formatting date:', error);
      return '';
    }
  }
}
