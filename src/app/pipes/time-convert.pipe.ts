import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeConvert',
  standalone: true
})
export class TimeConvertPipe implements PipeTransform {
    transform(value: number): string {
        if (!value || value < 0) {
          return 'Invalid time';
        }

        // Define the time units and their corresponding thresholds
        const units = [
          { unit: 'ms', factor: 1 },
          { unit: 's', factor: 1000 },
          { unit: 'm', factor: 1000 * 60 },
          { unit: 'h', factor: 1000 * 60 * 60 },
          { unit: 'd', factor: 1000 * 60 * 60 * 24 }
        ];

        // Automatically select the most appropriate unit
        let result = value;
        let selectedUnit = 'ms';

        for (let i = units.length - 1; i >= 0; i--) {
          if (value >= units[i].factor) {
            result = value / units[i].factor;
            selectedUnit = units[i].unit;
            break;
          }
        }

        return `${result.toFixed(2)} ${selectedUnit}`;
    }
}
