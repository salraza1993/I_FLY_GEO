import { DateTime, Duration } from 'luxon';

export class DateUtils {

  // Format standard date
  static formatDate(date: string | number | Date, format: string = 'yyyy-MM-dd'): string {
    const dt = DateTime.fromJSDate(new Date(date));
    return dt.isValid ? dt.toFormat(format) : '';
  }

  // Format ISO 8601 duration like PT3H25M
  static formatDuration(isoDuration: string): string {
    const dur = Duration.fromISO(isoDuration);
    if (!dur.isValid) return '';

    const hours = Math.floor(dur.as('hours'));
    const minutes = dur.minutes;
    const seconds = dur.seconds;

    return `${hours}h ${minutes}m${seconds ? ` ${Math.floor(seconds)}s` : ''}`.trim();
  }

  // Relative time
  static fromNow(date: string | number | Date): string {
    const dt = DateTime.fromJSDate(new Date(date));
    return dt.isValid ? dt.toRelative() || '' : '';
  }

  // Total duration in minutes
  static durationInMinutes(isoDuration: string): number {
    const dur = Duration.fromISO(isoDuration);
    return dur.isValid ? dur.as('minutes') : 0;
  }
}
