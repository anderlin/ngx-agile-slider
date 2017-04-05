import {
  Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation
} from '@angular/core';

import * as _ from 'lodash';

import { CarouselOptionInterface } from '../interfaces/options.interface';
import { BrowserSpecificPrefixesInterface } from '../interfaces/browser-specific-prefixes.interface';
import { PositionInterface } from '../interfaces/position.interface';

declare const global: any;

const DEFAULT_CAROUSEL_OPTIONS: CarouselOptionInterface = {
  itemsAmount: 1,
  duration: 300,
  rewindDuration: 600,

  easeFunction: 'ease',

  rewindActive: false,
  infiniteLoopActive: false,

  classCarouselFrame: 'js_frame',
  classCarouselContainer: 'js_slides',
  classPrevButton: 'js_prev',
  classNextButton: 'js_next',
  classActiveItem: 'active',

  enableMouseEvents: false,
};

const SLIDE_DIRECTION_NEXT = 'NEXT';
const SLIDE_DIRECTION_PREV = 'PREV';

/**
 * This component represents a carousel container which contains the main functionality.
 */
@Component({
  selector: 'carousel-container',
  styleUrls: ['carousel-container.component.css'],
  template: `    
    <div #carouselContainer class="carousel-container slider simple">
      <div #carouselFrame class="carousel-frame frame">
        <ul #carouselList class="slides">
          <ng-content></ng-content>
        </ul>
      </div>
      
      <span class="carousel-prev-button prev" (click)="onClickPrev()">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5">
            <g>
              <path fill="#2E435A" d="M302.67 90.877l55.77 55.508L254.575 250.75 358.44 355.116l-55.77 55.506L143.56 250.75z"/>
            </g>
          </svg>
      </span>

      <span class="carousel-next-button next" (click)="onClickNext()">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5">
          <g>
            <path fill="#2E435A" d="M199.33 410.622l-55.77-55.508L247.425 250.75 143.56 146.384l55.77-55.507L358.44 250.75z"/>
          </g>
        </svg>
      </span>
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class CarouselContainerComponent implements OnInit, OnDestroy {

  /* inputs */
  @Input() carouselOptions: CarouselOptionInterface;

  /* outputs */
  @Output() beforeInit: EventEmitter<void> = new EventEmitter<void>();
  @Output() afterInit: EventEmitter<void> = new EventEmitter<void>();
  @Output() beforeSlide: EventEmitter<void> = new EventEmitter<void>();
  @Output() afterSlide: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();
  @Output() prev: EventEmitter<void> = new EventEmitter<void>();

  /* view childs */
  @ViewChild('carouselContainer') container: ElementRef;
  @ViewChild('carouselFrame') frame: ElementRef;
  @ViewChild('carouselList') carouselList: ElementRef;

  /* class variables */
  private _items: any[];

  private _currentIndex = 0;
  private _position: PositionInterface;
  private _concatenatedCarouselOptions: CarouselOptionInterface;
  private _browserPrefixes: BrowserSpecificPrefixesInterface;
  private _itemsWidth: number;
  private _carouselFrameWidth: number;


  /**
   * This function is called on view initialization.
   */
  public ngOnInit() {
    this._browserPrefixes = this.getBrowserSpecificPrefixes();
    this._items = this.carouselList.nativeElement.children;
    this.initCarousel();
  }

  /**
   * This function is called on view destroyment.
   */
  public ngOnDestroy() {

  }

  public onClickNext() {
    this.next.emit();
    this.slideItem(SLIDE_DIRECTION_NEXT);
  }

  public onClickPrev() {
    this.prev.emit();
    this.slideItem(SLIDE_DIRECTION_PREV);
  }

  /**
   * Initializes the carousel and fires the events.
   */
  private initCarousel() {
    this.beforeInit.emit();

    this._concatenatedCarouselOptions = Object.assign({}, this.carouselOptions, DEFAULT_CAROUSEL_OPTIONS);
    this._position = {x: this.container.nativeElement.offsetLeft, y: this.container.nativeElement.offsetTop};

    this.buildContainer();
    this.setItemToActive();

    this.afterInit.emit();
  }

  /**
   *
   * @param direction
   */
  private slideItem(direction: string) {
    const offset = Math.round(this._itemsWidth - this._carouselFrameWidth);
    this._currentIndex = direction === SLIDE_DIRECTION_NEXT ? this._currentIndex + 1 : this._currentIndex - 1;

    this.beforeSlide.emit();

    this.translate();
    this.setItemToActive();

    this.afterSlide.emit();

  }

  /**
   *
   */
  private buildContainer() {
    this._itemsWidth = this.container.nativeElement.getBoundingClientRect().width || this.container.nativeElement.offsetWidth;
    this._carouselFrameWidth = this.frame.nativeElement.getBoundingClientRect().width || this.frame.nativeElement.offsetWidth;

    if (this._itemsWidth === this._carouselFrameWidth) {

      this._itemsWidth = _.reduce(this._items, (prevValue, item: any) => {
        return prevValue + item.getBoundingClientRect().width || item.offsetWidth;
      }, 0);
    }

    this.translate();
  }

  /**
   *
   */
  private translate() {
    const translateValue: number = this._items[this._currentIndex].offsetLeft * -1;
    this._position.x = translateValue;

    this.frame
      .nativeElement
      .children[0]
      .style[this._browserPrefixes.transitionPrefix + 'TimingFunction'] = this._concatenatedCarouselOptions.easeFunction;

    this.frame
      .nativeElement
      .children[0]
      .style[this._browserPrefixes.transitionPrefix + 'Duration'] = this._concatenatedCarouselOptions.duration + 'ms';

    if (this._browserPrefixes.translate3dAvailable) {
      this.frame
        .nativeElement
        .children[0]
        .style[this._browserPrefixes.transformPrefix] = 'translate3d(' + translateValue + 'px, 0, 0)';
    } else {
      this.frame
        .nativeElement
        .children[0]
        .style[this._browserPrefixes.transformPrefix] = 'translate(' + translateValue + 'px, 0, 0)';
    }
  }

  /**
   * Makes the item under the current index from the list active.
   */
  private setItemToActive() {
    const activeClass = this._concatenatedCarouselOptions.classActiveItem;
    _.forEach(this._items, (item: any) => {
      if (item.children[0].classList.contains(activeClass)) {
        item.children[0].classList.remove(activeClass);
      }
    });

    this._items[this._currentIndex].children[0].classList.add(activeClass);
  }

  /**
   * Return browser specific prefixes.
   * @returns {BrowserSpecificPrefixesInterface}
   */
  private getBrowserSpecificPrefixes(): BrowserSpecificPrefixesInterface {
    let transformPrefix: string;
    let transitionPrefix: string;
    let transitionEndPrefix: string;
    let translate3dAvailable: boolean;

    const availableStyle: any = this.container.nativeElement.style;

    if (availableStyle['webkitTransition'] === '') {
      transitionEndPrefix = 'webkitTransitionEnd';
      transitionPrefix = 'webkitTransition';
    }

    if (availableStyle['transition'] === '') {
      transitionEndPrefix = 'transitionend';
      transitionPrefix = 'transition';
    }

    if (availableStyle['webkitTransform'] === '') {
      transformPrefix = 'webkitTransform';
    }

    if (availableStyle['msTransform'] === '') {
      transformPrefix = 'msTransform';
    }

    if (availableStyle['transform'] === '') {
      transformPrefix = 'transform';
    }


    availableStyle[transformPrefix] = 'translate3d(0, 0, 0)';
    translate3dAvailable = !!global.getComputedStyle(this.container.nativeElement).getPropertyValue(transformPrefix);

    return {transformPrefix, transitionPrefix, transitionEndPrefix, translate3dAvailable};
  }
}
