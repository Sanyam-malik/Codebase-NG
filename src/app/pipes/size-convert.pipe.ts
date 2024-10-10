import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sizeConvert',
  standalone: true
})
export class SizeConvertPipe implements PipeTransform {
    transform(value: number): string {
        if (!value || value < 0) {
          return 'Invalid size';
        }
    
        // Define the storage units and their corresponding thresholds
        const units = [
          { unit: 'bytes', factor: 1 },
          { unit: 'KB', factor: 1024 },
          { unit: 'MB', factor: 1024 * 1024 },
          { unit: 'GB', factor: 1024 * 1024 * 1024 },
          { unit: 'TB', factor: 1024 * 1024 * 1024 * 1024 }
        ];
    
        // Automatically select the most appropriate unit
        let result = value;
        let selectedUnit = 'bytes';
    
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
