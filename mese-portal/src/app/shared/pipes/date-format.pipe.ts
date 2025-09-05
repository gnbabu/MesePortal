// moment-date.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import moment, { Moment } from 'moment';

@Pipe({
  name: 'dateFormat',
  standalone: true,
  pure: true,
})
export class DateFormatPipe implements PipeTransform {
  transform(
    value: Date | string | number | null | undefined,
    format: string = 'LL',
    timezone?: string
  ): string | null {
    debugger;
    if (value == null) return null;

    let m: Moment;

    if (timezone && (moment as any).tz) {
      // if using moment-timezone
      m = (moment as any).tz(value, timezone);
    } else {
      m = moment(value);
    }

    return m.isValid() ? m.format(format) : null;
  }
}
