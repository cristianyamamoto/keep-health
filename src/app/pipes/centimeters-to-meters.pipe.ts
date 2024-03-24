import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'centimetersToMeters',
  standalone: true
})
export class CentimetersToMetersPipe implements PipeTransform {

  transform(value: number | undefined): unknown {
    return value? value/100 : 0;
  }

}
