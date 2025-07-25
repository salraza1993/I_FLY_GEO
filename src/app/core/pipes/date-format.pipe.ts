import { Pipe, PipeTransform } from '@angular/core';
import { DateTime, Duration } from 'luxon';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(
    value: string | Date | null | undefined,
    type: string = 'date',
    format?: string | null
  ): string {
    if (!value) return '';

    try {
      // Handle different input types for dates
      let luxonObj: DateTime | null = null;
      if (typeof value === 'string' && type.toLowerCase() !== 'duration') {
        // Try ISO format first, then fallback to other formats
        luxonObj = DateTime.fromISO(value);
        if (!luxonObj.isValid) {
          luxonObj = DateTime.fromJSDate(new Date(value));
        }
      } else if (value instanceof Date) {
        luxonObj = DateTime.fromJSDate(value);
      }

      // Predefined format shortcuts
      switch (type.toLowerCase()) {
        case 'duration': {
          if (typeof value === 'string' && value.startsWith('PT')) {
            const duration = Duration.fromISO(value);
            if (duration.isValid) {
              switch (format?.toLowerCase()) {
                case 'hours':
                  return Math.floor(duration.as('hours')).toString();
                case 'minutes':
                  return Math.floor(duration.as('minutes')).toString();
                case 'seconds':
                  return Math.floor(duration.as('seconds')).toString();
                case 'hm':
                  return `${Math.floor(duration.as('hours'))}h ${duration.minutes}m`;
                case 'hms':
                  const totalHours = Math.floor(duration.as('hours'));
                  return `${totalHours}h ${duration.minutes}m ${duration.seconds}s`;
                default:
                  // Default HH:mm format
                  const hours = Math.floor(duration.as('hours'));
                  const minutes = duration.minutes;
                  return `${hours.toString().padStart(2, '0')} h : ${minutes.toString().padStart(2, '0')} m`;
              }
            }
          }
          return '';
        }
        case 'date':
          if (!luxonObj || !luxonObj.isValid) return '';
          return luxonObj.toFormat(format || 'dd-MM-yyyy');
        case 'time':
          if (!luxonObj || !luxonObj.isValid) return '';
          return luxonObj.toFormat(format || 'HH:mm');
        case 'timeseconds':
          if (!luxonObj || !luxonObj.isValid) return '';
          return luxonObj.toFormat(format || 'HH:mm:ss');
        case 'datetime':
          if (!luxonObj || !luxonObj.isValid) return '';
          return luxonObj.toFormat(format || 'dd-MM-yyyy, HH:mm');
        case 'short':
          if (!luxonObj || !luxonObj.isValid) return '';
          return luxonObj.toFormat(format || 'dd MMM yyyy');
        case 'long':
          if (!luxonObj || !luxonObj.isValid) return '';
          return luxonObj.toFormat('dd MMMM yyyy');
        case 'iso':
          if (!luxonObj || !luxonObj.isValid) return '';
          return luxonObj.toISO() || '';
        case 'relative':
          if (!luxonObj || !luxonObj.isValid) return '';
          return luxonObj.toRelative() || '';
        case 'relativeshort':
          if (!luxonObj || !luxonObj.isValid) return '';
          return luxonObj.toRelative({ style: 'short' }) || '';
        case 'relativenarrow':
          if (!luxonObj || !luxonObj.isValid) return '';
          return luxonObj.toRelative({ style: 'narrow' }) || '';
        case 'relativefrom':
          if (!luxonObj || !luxonObj.isValid) return '';
          return luxonObj.toRelativeCalendar() || luxonObj.toRelative() || '';
        case 'preset':
          if (!luxonObj || !luxonObj.isValid) return '';
          // For Luxon presets like DATE_MED, DATE_SHORT, etc.
          return luxonObj.toLocaleString(format ? (DateTime as any)[format] : DateTime.DATE_MED);
        case 'ago': {
          if (!luxonObj || !luxonObj.isValid) return '';
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
        }
        case 'fromnow': {
          if (!luxonObj || !luxonObj.isValid) return '';
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
        }
        case 'smart': {
          if (!luxonObj || !luxonObj.isValid) return '';
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
        }
        case 'weekday':
          if (!luxonObj || !luxonObj.isValid) return '';
          return luxonObj.toFormat('cccc');
        case 'month':
          if (!luxonObj || !luxonObj.isValid) return '';
          return luxonObj.toFormat('MMMM');
        case 'year':
          if (!luxonObj || !luxonObj.isValid) return '';
          return luxonObj.toFormat('yyyy');
        case 'daymonth':
          if (!luxonObj || !luxonObj.isValid) return '';
          return luxonObj.toFormat('dd MMM');
        case 'timeampm':
          if (!luxonObj || !luxonObj.isValid) return '';
          return luxonObj.toFormat('h:mm a');
        default:
          if (!luxonObj || !luxonObj.isValid) return '';
          // If it's not a predefined format, use it as a custom Luxon format
          return luxonObj.toFormat(format || 'dd / MM / yyyy');
      }
    } catch (error) {
      console.error('DateFormatPipe: Error formatting date:', error);
      return '';
    }
  }
}
