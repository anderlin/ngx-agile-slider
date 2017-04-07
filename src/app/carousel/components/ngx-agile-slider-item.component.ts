import { AfterViewInit, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';

/**
 * This component represents the slide item.
 */
@Component({
  moduleId: module.id,
  selector: 'ngx-agile-slider-item',
  template: `
    <li #sliderItem class="ngx-agile-slider-item variablewidth">
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
   * Called after the view was initialized. Adds the additional classes
   */
  public ngAfterViewInit() {
    if (this.additionalClasses) {
      for (let i = 0; i < this.additionalClasses.length; i++) {
        this.sliderItem.nativeElement.classList.add(this.additionalClasses[i]);
      }
    }
  }
}
