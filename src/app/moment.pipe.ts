import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;
  // }

  transform(date, format) {
    return moment(date).format(format);
  }

}
