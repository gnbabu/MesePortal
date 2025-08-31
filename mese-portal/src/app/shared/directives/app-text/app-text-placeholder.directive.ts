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
  selector: '[appTextPlaceholder]',
  standalone: true,
})
export class AppTextPlaceholderDirective implements OnInit, OnChanges {
  @Input('appTextPlaceholder') key!: string;
  @Input('appTextPlaceholderArgs') args?: Record<string, any>;
  @Input('appTextPlaceholderCapitalize') capitalize = false;

  private el = inject(ElementRef) as ElementRef<
    HTMLInputElement | HTMLTextAreaElement
  >;
  private i18n = inject(I18nStore);

  ngOnInit() {
    this.updatePlaceholder(); // initial render
    computed(() => this.updatePlaceholder()); // reactive on language change
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['key'] || changes['args']) this.updatePlaceholder();
  }

  private updatePlaceholder() {
    if (!this.key) return;

    let translated = this.i18n.getMessage(this.key, this.args, this.key);

    if (this.capitalize) {
      translated = translated.charAt(0).toUpperCase() + translated.slice(1);
    }

    this.el.nativeElement.placeholder = translated;
  }
}
