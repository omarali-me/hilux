import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';
import { DecimalPipe, CurrencyPipe } from '@angular/common';

@Directive({
  selector: '[appNumbersformatter]'
})
export class NumbersformatterDirective {
  @Input("precision") decimals: number = 0;
  currencyChars = new RegExp('[,]', 'g'); // we're going to remove commas and dots

  constructor(public el: ElementRef, public renderer: Renderer2, private decimalPipe: DecimalPipe) {}

  ngOnInit() {
    this.run(this.el.nativeElement.value);
  }

  private check(value: string) {
    if (this.decimals <= 0) {
      return String(value).match(new RegExp(/^\d+$/));
    } else {
      var regExpString =
        "^\\s*((\\d+(\\.\\d{0," +
        this.decimals +
        "})?)|((\\d*(\\.\\d{1," +
        this.decimals +
        "}))))\\s*$";
      return String(value).match(new RegExp(regExpString));
    }
  }

  private run(oldValue) {
    setTimeout(() => {
      oldValue = String(oldValue).replace(this.currencyChars, '');
      let currentValue: string = String(this.el.nativeElement.value).replace(this.currencyChars, '');
      if (currentValue !== '' && !this.check(currentValue)) {
        this.el.nativeElement.value = this.decimalPipe.transform(oldValue, `1.0-${this.decimals}`);
      } else {
        this.el.nativeElement.value = this.addCommas(currentValue);
      }
    });
  }

  private addCommas(nStr) {
    nStr += '';
    var comma = /,/g;
    nStr = nStr.replace(comma,'');
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }

  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    this.run(this.el.nativeElement.value);
  }

  @HostListener("paste", ["$event"])
  onPaste(event: ClipboardEvent) {
    this.run(this.el.nativeElement.value);
  }

}
