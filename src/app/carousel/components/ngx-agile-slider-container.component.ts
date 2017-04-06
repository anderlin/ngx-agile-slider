import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer, ViewChild,
  ViewEncapsulation
} from '@angular/core';

import * as _ from 'lodash';

import { SliderOptionInterface } from '../interfaces/options.interface';
import { BrowserSpecificPrefixesInterface } from '../interfaces/browser-specific-prefixes.interface';
import { LazyLoaderService } from '../services/lazy-loader.service';

//noinspection TsLint
import { Observable, Subscription } from 'rxjs';
import { NavigationItemInterface } from '../interfaces/navigation-item.interface';

declare const global: any;
declare const window: any;

/**
 * Default settings for the slider.
 *
 * duration: time in millis. Duration for the transformation.
 * autoPlay: activates the autoplay function.
 * autoPlayDirection: PREV or NEXT.
 * autoPlayInterval: interval for autoplay.
 * rewind: activates the rewind function.
 * rewindDuration: duration for the rewind slideback.
 * loop: activate the infinite loop.
 * navigation: activates the dot navigation.
 * autoSwitchOff: disables the slider if all items are visible.
 * swipe: activates the gesture control.
 * lazyLoading: activates image lazy loading.
 * autoHeight: activates auto high.
 * easeFunction: TimingFunction
 * classContainer: container div
 * classFrame: frame div
 * classList: item unsorted list
 * classPrevButton: prev button
 * classNextButton: bext button
 * classDeactivatedButton: disabled button
 * classActiveItem: active item
 * classNavigationFrame: navigation div
 * classNavigationItem: navigation unsorted list
 * classActiveNavigationItem: dots
 *
 */
const DEFAULT_SLIDER_OPTIONS: SliderOptionInterface = {
  duration: 300,

  autoPlay: false,
  autoPlayDirection: 'NEXT',
  autoPlayInterval: 2000,

  rewind: false,
  rewindDuration: 300,

  loop: false,

  navigation: false,

  autoSwitchOff: false,

  swipe: false,

  lazyLoading: false,

  autoHeight: false,

  easeFunction: 'ease',

  classContainer: '',
  classFrame: '',
  classList: '',
  classPrevButton: '',
  classNextButton: '',
  classDeactivatedButton: 'ngx-agile-slider-deactivated-button',
  classActiveItem: 'ngx-agile-slider-active',
  classNavigationFrame: '',
  classNavigationItem: '',
  classActiveNavigationItem: ''
};

const SLIDE_DIRECTION_NEXT = 'NEXT';
const SLIDE_DIRECTION_PREV = 'PREV';
const TOUCH_EVENT = { SWIPE_LEFT: 'swipeleft', SWIPE_RIGHT: 'swiperight' };
const LAZY_LOADING_CLASSES: {[s: string]: string} = {
  loading: 'ngxAgileSliderLoading',
  loaded: 'ngxAgileSliderLoaded',
  error: 'ngxAgileSliderError'
};

/**
 * This component represents a carousel container which contains the main functionality.
 */
@Component({
  moduleId: module.id,
  selector: 'ngx-agile-slider-container',
  styleUrls: ['ngx-agile-slider-container.component.css'],
  templateUrl: 'ngx-agile-slider-container.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SliderContainerComponent implements AfterViewInit, OnDestroy {
  /* inputs */

  /**
   * additional slider options.
   */
  @Input() sliderOptions: SliderOptionInterface;
  /**
   * additional container id.
   */
  @Input() containerId = 'container';

  /* outputs */
  @Output() beforeInit: EventEmitter<void> = new EventEmitter<void>();
  @Output() afterInit: EventEmitter<void> = new EventEmitter<void>();
  @Output() beforeSlide: EventEmitter<void> = new EventEmitter<void>();
  @Output() afterSlide: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();
  @Output() prev: EventEmitter<void> = new EventEmitter<void>();

  /* view children */
  /**
   * div container ref
   */
  @ViewChild('sliderContainer') container: ElementRef;
  /**
   * div frame ref
   */
  @ViewChild('sliderFrame') frame: ElementRef;
  /**
   * div unsorted list ref
   */
  @ViewChild('sliderList') sliderList: ElementRef;

  /* class variables */
  public navigation = false;
  public navigationItems: NavigationItemInterface[];
  public sliderActive = true;
  public deactivateNext: string;
  public deactivatePrev: string;
  public touchCursor = false;
  public currentIndex = 0;

  private _sliderElements: any[] = [];
  private _sliderImageSources: string[][] = [];
  private _concatenatedSliderOptions: SliderOptionInterface;
  private _browserPrefixes: BrowserSpecificPrefixesInterface;
  private _itemsWidth: number;
  private _sliderFrameWidth: number;
  private _resizeSubscription: Subscription;
  private _afterSlideSubscription: Subscription;
  private _lockIndex = false;

  constructor(private _lazyLoaderService: LazyLoaderService, private _renderer: Renderer, private detectChangeRef: ChangeDetectorRef) {}

  /**
   * Called after the view is initialized. Triggers the slider initializing.
   */
  public ngAfterViewInit() {
    this._browserPrefixes = this.getBrowserSpecificPrefixes();
    this._sliderElements = this.sliderList.nativeElement.children;
    this.initSlider();
  }

  public ngOnDestroy() {
    this._resizeSubscription.unsubscribe();
    this._afterSlideSubscription.unsubscribe();
  }


  /**
   * Called after click on the NEXT navigation arrow.
   * Emits an next click event and calls the slide function.
   */
  public onClickNext() {
    this.next.emit();
    this.slideItem(SLIDE_DIRECTION_NEXT);
  }

  /**
   * Called after click on the PREV navigation arrow.
   * Emits an prev click event and calls the slide function.
   */
  public onClickPrev() {
    this.prev.emit();
    this.slideItem(SLIDE_DIRECTION_PREV);
  }

  /**
   * Called after a swipe over the slider container.
   * Triggers the slide function.
   * @param action swipeleft or swiperight
   */
  public onSwipe(action = TOUCH_EVENT.SWIPE_RIGHT) {
    if (this._concatenatedSliderOptions.swipe) {
      if (action === TOUCH_EVENT.SWIPE_RIGHT) {
        this.prev.emit();
        this.slideItem(SLIDE_DIRECTION_PREV);
      } else if (action === TOUCH_EVENT.SWIPE_LEFT) {
        this.next.emit();
        this.slideItem(SLIDE_DIRECTION_NEXT);
      }
    }
  }

  /**
   * Called after a click on the navigation dot.
   * Triggers the slide function.
   * @param index index of the clicked dot
   */
  public onClickNavigationItem(index: number) {
    this.currentIndex = this._concatenatedSliderOptions.loop ? index + 1 : index;
    this.slideItemToCurrentIndex();
    this.setNavigationItemToActive(index);
  }

  /**
   * Highlights the current visible element in the navigation.
   */
  public setNavigationItemToActive(index: number) {
    _.forEach(this.navigationItems, (item: NavigationItemInterface, itemIndex: number) => {
      if (itemIndex === index) {
        item.active = true;
      } else if (item.active) {
        item.active = false;
      }
    });
  }

  /**
   * Initializes the carousel and fires the events.
   */
  public initSlider() {
    this.beforeInit.emit();

    this._concatenatedSliderOptions = Object.assign({}, DEFAULT_SLIDER_OPTIONS, this.sliderOptions);

    /* Infinite loop setup */
    if (this._concatenatedSliderOptions.loop) {
      this.prepareForInfinityLoop();
      this.currentIndex++;
    } else {
      this.togglePrevButtonClass(this._concatenatedSliderOptions.swipe);
    }

    /* Lazy loading setup */
    if (this._concatenatedSliderOptions.lazyLoading) {
      this.prepareForLazyLoading();
    }

    this.buildContainer();
    this.setItemToActive();

    /* AutoPlay setup */
    if (this._concatenatedSliderOptions.autoPlay) {
      this.prepareForAutoPlay();
    }

    /* Navigation setup */
    if (this._concatenatedSliderOptions.navigation) {
      this.prepareForNavigation();
    }

    /* Auto switch off setup */
    if (this._concatenatedSliderOptions.autoSwitchOff) {
      this.prepareAutoSwitchOff();
    }

    /* swipe setup */
    if (this._concatenatedSliderOptions.swipe) {
      this.touchCursor = true;
    }


    this._afterSlideSubscription = this.afterSlide.subscribe(() => {
      /* called after a slide. Sets the navigation to the current index. */
      if (this._concatenatedSliderOptions.navigation) {
        this.setNavigationItemToActive(this._concatenatedSliderOptions.loop ? this.currentIndex - 1 : this.currentIndex);
      }

      if (!this._concatenatedSliderOptions.loop && !this._concatenatedSliderOptions.rewind) {
        if (this.currentIndex === 0) {
          this.togglePrevButtonClass(true);
        } else if (this.currentIndex === this._sliderElements.length - 1) {
          this.toggleNextButtonClass(true);
        } else {
          this.togglePrevButtonClass(false);
          this.toggleNextButtonClass(this._lockIndex);
        }
      }
    });

    this.detectChangeRef.detectChanges();

    this.afterInit.emit();
  }

  /**
   * Calls the slide function and sets the current element to active.
   */
  public slideItemToCurrentIndex() {
    this.beforeSlide.emit();

    this.translate();
    this.setItemToActive();

    this.afterSlide.emit();
  }

  /**
   * Slides the elements.
   * @param direction Slide duration
   */
  public slideItem(direction: string) {
    let tempCurrentIndex: number;

    if (SLIDE_DIRECTION_NEXT === direction && !this._lockIndex) {
      tempCurrentIndex = this.currentIndex + 1;
    } else if (SLIDE_DIRECTION_PREV === direction) {
      tempCurrentIndex = this.currentIndex - 1;
    }

    if (tempCurrentIndex >= 0 && tempCurrentIndex <= this._sliderElements.length - 1) {
      this.currentIndex = tempCurrentIndex;
    } else if (this._concatenatedSliderOptions.rewind) {
      this.currentIndex = 0;
      this.translate(this._concatenatedSliderOptions.rewindDuration);
      this.setItemToActive();
      this.afterSlide.emit();
    }

    this.beforeSlide.emit();

    if (this._concatenatedSliderOptions.loop
      && (this.currentIndex >= this._sliderElements.length - 1 || this.currentIndex <= 0)) {

      this.sliderList.nativeElement
        .addEventListener(this._browserPrefixes.transitionEndPrefix, () => {
          this.sliderList.nativeElement.removeEventListener(this._browserPrefixes.transitionEndPrefix);
          this.currentIndex = (direction === SLIDE_DIRECTION_NEXT) ? 1 : this._sliderElements.length - 2;
          this.translate(0);
          this.setItemToActive();
          this.afterSlide.emit();
        });
    }

    this.translate();
    this.setItemToActive();

    this.afterSlide.emit();
  }

  /**
   * Determines the container and frame sizes
   */
  public buildContainer() {
    this._itemsWidth = this.sliderList.nativeElement.getBoundingClientRect().width || this.sliderList.nativeElement.offsetWidth;
    this._sliderFrameWidth = this.frame.nativeElement.getBoundingClientRect().width || this.frame.nativeElement.offsetWidth;

    /* If the size is equal, calculate the offset width of the elements */
    if (this._itemsWidth === this._sliderFrameWidth) {

      this._itemsWidth = _.reduce(this._sliderElements, (prevValue, item: any) => {
        return prevValue + item.getBoundingClientRect().width || item.offsetWidth;
      }, 0);

    }

    if (this._concatenatedSliderOptions.autoSwitchOff) {
      this.sliderActive = !(this._itemsWidth <= this._sliderFrameWidth);
      this.detectChangeRef.detectChanges();
    }

    this.translate(0);
  }

  /**
   * Prepares the loop
   */
  public prepareForInfinityLoop() {
    // append the first slide element
    this.sliderList.nativeElement
      .appendChild(this._sliderElements[0].cloneNode(true));

    // append the last slide element
    this.sliderList.nativeElement
      .insertBefore(
        this._sliderElements[this._sliderElements.length - 1].cloneNode(true),
        this.sliderList.nativeElement.firstChild
      );

    this._sliderElements = this.sliderList.nativeElement.children;
  }

  /**
   * Prepares the auto switch off
   */
  public prepareAutoSwitchOff() {
    this._resizeSubscription = Observable.fromEvent(window, 'resize').debounceTime(250)
      .subscribe(() => {
        this.buildContainer();
      });
  }

  /**
   * Prepares the auto play
   */
  public prepareForAutoPlay() {
    window.setInterval(() => {
      if (this._concatenatedSliderOptions.autoPlayDirection === SLIDE_DIRECTION_NEXT) {
        this.next.emit();
        this.slideItem(SLIDE_DIRECTION_NEXT);
      } else {
        this.prev.emit();
        this.slideItem(SLIDE_DIRECTION_PREV);
      }
    }, this._concatenatedSliderOptions.autoPlayInterval);
  }

  /**
   * Prepares the navigation
   */
  public prepareForNavigation() {
    this.navigation = true;
    this.navigationItems = [];
    _.forEach(this._sliderElements, (item: any, index: number) => {

      if ((this._concatenatedSliderOptions.loop && (index > 0 && index < this._sliderElements.length - 1))
        || !this._concatenatedSliderOptions.loop) {

        this.navigationItems.push({item: item, active: index === this.currentIndex});
      }

    });

    this.detectChangeRef.detectChanges();
  }

  /**
   * Transforms the elements
   * @param offset Value to transform
   * @param duration Duration of the transformation
   */
  public translate(duration: number = this._concatenatedSliderOptions.duration, offset?: number) {
    let translateValue: number = (offset) ? offset : this._sliderElements[this.currentIndex].offsetLeft * -1;
    const durationValue: number = (duration !== undefined) ? duration : this._concatenatedSliderOptions.duration;
    const maxOffset = Math.round(this._itemsWidth - this._sliderFrameWidth);

    if (!this._concatenatedSliderOptions.loop) {
      translateValue = Math.min(translateValue * -1, maxOffset) * -1;

      this._lockIndex = translateValue === maxOffset * -1;
    }

    this.resize();

    this.sliderList
      .nativeElement
      .style[this._browserPrefixes.transitionPrefix + 'TimingFunction'] = this._concatenatedSliderOptions.easeFunction;

    this.sliderList
      .nativeElement
      .style[this._browserPrefixes.transitionPrefix + 'Duration'] = durationValue + 'ms';

    if (this._browserPrefixes.translate3dAvailable) {
      this.sliderList
        .nativeElement
        .style[this._browserPrefixes.transformPrefix] = 'translate3d(' + translateValue + 'px, 0, 0)';
    } else {
      this.sliderList
        .nativeElement
        .style[this._browserPrefixes.transformPrefix] = 'translate(' + translateValue + 'px, 0, 0)';
    }

    /* load the image if lazyloading active */
    if (this._concatenatedSliderOptions.lazyLoading) {
      this.loadImage();
    }
  }



  /**
   * Prepares for image lazy loading.
   * Search for all images in the elements.
   */
  public prepareForLazyLoading(node?: any, nodeIndex?: number) {
    if (node) {
      _.forEach(node.children, (child: any) => {
        if (child.nodeName === 'IMG') {
          this._sliderImageSources[nodeIndex].push(child.src);
          child.src = '';
          this.prepareForLazyLoading(child, nodeIndex);
        } else {
          this.prepareForLazyLoading(child, nodeIndex);
        }
      });
    } else {
      _.forEach(this._sliderElements, (item: any, index: number) => {
        this._sliderImageSources[index] = [];

        _.forEach(item.children, (child: any) => {
          if (child.nodeName === 'IMG') {
            this._sliderImageSources[index].push(child.src);
            child.src = '';
            this.prepareForLazyLoading(child, index);
          } else {
            this.prepareForLazyLoading(child, index);
          }
        });
      });
    }
  }

  /**
   * Loads the images of current element.
   */
  public loadImage() {
    if (!this._sliderElements[this.currentIndex].classList.contains(LAZY_LOADING_CLASSES['loading'])
        && !this._sliderElements[this.currentIndex].classList.contains(LAZY_LOADING_CLASSES['loaded'])) {

      this.setElementToLoading();
      _.forEach(this._sliderImageSources[this.currentIndex], (src: string, index: number) => {
        this._lazyLoaderService.load(src)
          .then(() => {
            this.setLoadedImage(src, index, this._sliderElements[this.currentIndex]);
            this.setElementToLoaded();
          }, () => {
            this.setElementToError();
          });
      });
    }
  }

  /**
   * Sets the loaded image to the img tag.
   */
  public setLoadedImage(src: string, index: number, node: any, nodeIndex = 0) {
    _.forEach(node.children, (child: any) => {
      if (child.nodeName === 'IMG' && index === nodeIndex) {
        this._renderer.setElementAttribute(child, 'src', src);
      } else {
        this.setLoadedImage(src, index, child, nodeIndex);
      }
    });

  }


  /**
   * Makes the item under the current index from the list active.
   */
  public setItemToActive() {
    const activeClass = this._concatenatedSliderOptions.classActiveItem;
    _.forEach(this._sliderElements, (item: any) => {
      if (item.children[0].classList.contains(activeClass)) {
        item.children[0].classList.remove(activeClass);
      }
    });

    this._sliderElements[this.currentIndex].children[0].classList.add(activeClass);
  }

  /**
   * Marks the element with the loading class
   */
  public setElementToLoading() {
    this._sliderElements[this.currentIndex].classList.add(LAZY_LOADING_CLASSES['loading']);
  }

  /**
   * Marks the element with the loaded class
   */
  public setElementToLoaded() {
    _.forEach(this._sliderElements, (item: any) => {
      if (item.classList.contains(LAZY_LOADING_CLASSES['loading'])) {
        item.classList.remove(LAZY_LOADING_CLASSES['loading']);
      }
    });
    this._sliderElements[this.currentIndex].classList.add(LAZY_LOADING_CLASSES['loaded']);
  }

  /**
   * Marks the element with the error class
   */
  public setElementToError() {
    _.forEach(this._sliderElements, (item: any) => {
      if (item.classList.contains(LAZY_LOADING_CLASSES['loading'])) {
        item.classList.remove(LAZY_LOADING_CLASSES['loading']);
      }
    });
    this._sliderElements[this.currentIndex].classList.add(LAZY_LOADING_CLASSES['error']);
  }

  /**
   * Marks the PREV button with a class if deactivated.
   * @param deactivate true for deactivated false if not
   */
  public togglePrevButtonClass(deactivate: boolean) {
    this.deactivatePrev = deactivate ? this._concatenatedSliderOptions.classDeactivatedButton : '';
  }

  /**
   * Marks the NEXT button with a class if deactivated.
   * @param deactivate true for deactivated false if not
   */
  public toggleNextButtonClass(deactivate: boolean) {
    this.deactivateNext = deactivate ? this._concatenatedSliderOptions.classDeactivatedButton : '';
  }

  /**
   * Sets the frame height to element height.
   */
  public resize() {
    this.frame.nativeElement.style['height'] = this._sliderElements[this.currentIndex].children[0].clientHeight + 'px';
  }

  /**
   * Return browser specific prefixes.
   * @returns {BrowserSpecificPrefixesInterface}
   */
  public getBrowserSpecificPrefixes(): BrowserSpecificPrefixesInterface {
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

    return { transformPrefix, transitionPrefix, transitionEndPrefix, translate3dAvailable };
  }
}
