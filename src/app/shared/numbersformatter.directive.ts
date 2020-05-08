import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';
import { DecimalPipe, CurrencyPipe } from '@angular/common';

@Directive({
  selector: '[appNumbersformatter]'
})
export class NumbersformatterDirective {
  @Input("precision") decimals: number = 0;
  currencyChars = new RegExp('[,]', 'g'); // we're going to remove commas and dots

  constructor(public el: ElementRef, public renderer: Renderer2, private decimalPipe: DecimalPipe, private currencyPipe: CurrencyPipe) {}

  ngOnInit() {
    this.format(this.el.nativeElement.value); // format any initial values
  }

  @HostListener('input', ["$event.target.value"]) onInput(e: string) {
    this.format(e);
  };

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    event.preventDefault();
    this.format(event.clipboardData.getData('text/plain'));
  }

  format(val:string) {
    // 1. test for non-number characters and replace/remove them
    const numberFormat = String(val).replace(this.currencyChars, '');
    // console.log(numberFormat); // raw number

    // 2. format the number (add commas)
    console.log('value here is ', numberFormat);

    if (numberFormat.match(new RegExp('\.$'))) {
      console.log('end with decimal')
    }
    const usd = this.decimalPipe.transform(numberFormat, `1.0-${this.decimals}`);
    
    console.log('value here is ', usd);
    // 3. replace the input value with formatted numbers
    this.renderer.setProperty(this.el.nativeElement, 'value', usd);
  }

}
