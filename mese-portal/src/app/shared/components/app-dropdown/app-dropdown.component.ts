import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app-dropdown.component.html',
  styleUrls: ['./app-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppDropdownComponent),
      multi: true,
    },
  ],
})
export class AppDropdownComponent implements ControlValueAccessor {
  @Input() options: any[] = [];
  @Input() placeholder: string = 'Select...';
  @Input() valueAccessor: string = 'id'; // property name for value
  @Input() textAccessor: string = 'name'; // property name for display text
  @Output() selectionChange = new EventEmitter<any>();

  selectedValue: any = null; // renamed from 'value'
  isDisabled = false;

  // ControlValueAccessor callbacks
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onSelectChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedValue = val;
    this.onChange(val);
    this.onTouched();
    this.selectionChange.emit(val);
  }

  getOptionValue(option: any) {
    return option[this.valueAccessor];
  }

  getOptionText(option: any) {
    return option[this.textAccessor];
  }
}
