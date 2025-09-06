import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  Output,
  ViewChild,
  forwardRef,
  AfterViewInit,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import moment from 'moment';
// @ts-ignore
import Datepicker from 'vanillajs-datepicker/Datepicker';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app-datepicker.component.html',
  styleUrls: ['./app-datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppDatepickerComponent),
      multi: true,
    },
  ],
})
export class AppDatepickerComponent
  implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor
{
  @Input() format: string = 'YYYY-MM-DD';
  @Input() placeholder: string = 'Select date';
  @Input() minDate?: string;
  @Input() maxDate?: string;
  @Input() name?: string;

  @Output() dateChange = new EventEmitter<string>();

  @ViewChild('inputEl', { static: true })
  inputEl!: ElementRef<HTMLInputElement>;
  @ViewChild('iconEl', { static: true }) iconEl!: ElementRef<HTMLSpanElement>;

  private datepicker!: Datepicker;
  private _value: string | null = null;

  onChange: any = () => {};
  onTouched: any = () => {};

  get value() {
    return this._value;
  }

  set value(val: string | null) {
    this._value = val;
    this.onChange(val);
    if (val !== null) this.dateChange.emit(val);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const options: any = {
      autohide: true,
      format: 'yyyy-mm-dd',
      // do NOT set default today
      todayHighlight: true,
    };

    if (this.minDate) options.minDate = this.minDate;
    if (this.maxDate) options.maxDate = this.maxDate;

    this.datepicker = new Datepicker(this.inputEl.nativeElement, options);

    // Set input to current value if exists
    this.inputEl.nativeElement.value = this._value || '';

    // Listen to date changes
    this.inputEl.nativeElement.addEventListener('changeDate', (event: any) => {
      const selected = event.detail.date;
      if (selected) {
        const formatted = moment(selected).format(this.format);
        this.value = formatted;
        this.inputEl.nativeElement.value = formatted;
      }
    });

    // Calendar icon click
    this.iconEl.nativeElement.addEventListener('click', () => {
      this.inputEl.nativeElement.focus();
      this.datepicker.show();
    });

    // Prevent auto-setting today's date when input blurred without selection
    this.inputEl.nativeElement.addEventListener('blur', () => {
      if (!this._value) {
        this.inputEl.nativeElement.value = '';
      }
    });
  }

  clearDate() {
    this.value = null;
    if (this.inputEl) {
      this.inputEl.nativeElement.value = '';
    }
    if (this.datepicker) {
      this.datepicker.setDate(null); // clear internal state
    }
  }

  writeValue(val: any): void {
    this._value = val ? moment(val).format(this.format) : null;
    if (this.inputEl) this.inputEl.nativeElement.value = this._value || '';
    if (this.datepicker) {
      this.datepicker.setDate(this._value ? new Date(this._value) : null);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.inputEl) this.inputEl.nativeElement.disabled = isDisabled;
  }

  ngOnDestroy(): void {
    if (this.datepicker) this.datepicker.destroy();
  }
}
