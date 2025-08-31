import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  inject,
  computed,
} from '@angular/core';
import { I18nStore } from '../../../core/store/i18n.store';

@Directive({
  selector: '[appText]',
  standalone: true,
})
export class AppTextDirective implements OnInit, OnChanges {
  @Input('appText') key!: string;
  @Input('appTextArgs') args?: Record<string, any>;
  @Input('appTextCapitalize') capitalize = false;

  private el = inject(ElementRef) as ElementRef<HTMLElement>;
  private i18n = inject(I18nStore);

  ngOnInit() {
    this.updateText(); // initial render
    computed(() => this.updateText()); // reactive on language change
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['key'] || changes['args']) this.updateText();
  }

  private updateText() {
    if (!this.key) return;

    let translated = this.i18n.getMessage(this.key, this.args, this.key);

    if (this.capitalize) {
      translated = translated.charAt(0).toUpperCase() + translated.slice(1);
    }

    (this.el.nativeElement as HTMLElement).innerText = translated;
  }
}
