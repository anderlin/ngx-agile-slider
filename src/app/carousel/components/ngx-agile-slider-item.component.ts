import { AfterViewInit, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';

/**
 * This component represents the slide item.
 */
@Component({
  selector: 'ngx-agile-slider-item',
  template: `
    <li #sliderItem class="ngx-agile-slider-item">
      <ng-content></ng-content>
    </li>
  `,
  encapsulation: ViewEncapsulation.None
})
export class SliderItemComponent implements AfterViewInit {
  /**
   * additional classes for li
   */
  @Input() additionalClasses: string[];

  @ViewChild('sliderItem') sliderItem: ElementRef;

  /**
   * Called after the view was initialized. Adds the additionals classes
   */
  public ngAfterViewInit() {
    if (this.additionalClasses) {
      for (let i = 0; i < this.additionalClasses.length; i++) {
        this.sliderItem.nativeElement.classList.add(this.additionalClasses[i]);
      }
    }
  }
}
