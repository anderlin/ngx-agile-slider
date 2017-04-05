import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'carousel-item',
  template: `
    <li>
      <ng-content></ng-content>
    </li>
  `,
  encapsulation: ViewEncapsulation.None
})
export class CarouselItemComponent {

}
