import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appStrike]'
})
export class StrikeDirective {

  constructor(private element : ElementRef) {
    console.log(element.nativeElement);
    element.nativeElement.style.textDecoration = "line-through";

   }

}
