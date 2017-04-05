import {
  AfterViewInit, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { SliderOptionInterface } from '../interfaces/options.interface';
import { BrowserSpecificPrefixesInterface } from '../interfaces/browser-specific-prefixes.interface';
//noinspection TsLint
import { Subscription } from 'rxjs';
import { NavigationItemInterface } from '../interfaces/navigation-item.interface';

export declare class SliderContainerComponent implements AfterViewInit, OnDestroy {

  sliderOptions: SliderOptionInterface;

  beforeInit: EventEmitter<void>;
  afterInit: EventEmitter<void>;
  beforeSlide: EventEmitter<void>;
  afterSlide: EventEmitter<void>;
  next: EventEmitter<void>;
  prev: EventEmitter<void>;

  container: ElementRef;
  frame: ElementRef;
  sliderList: ElementRef;

  navigation: boolean;
  navigationItems: NavigationItemInterface[];
  sliderActive: boolean;
  deactivateNext: string;
  deactivatePrev: string;
  touchCursor: boolean;

  private _sliderElements: any[];
  private _sliderImageSources: string[][];
  private _currentIndex: number;
  private _concatenatedSliderOptions: SliderOptionInterface;
  private _browserPrefixes: BrowserSpecificPrefixesInterface;
  private _itemsWidth: number;
  private _sliderFrameWidth: number;
  private _resizeSubscription: Subscription;
  private _afterSlideSubscription: Subscription;
  private _lockIndex: boolean;


  ngAfterViewInit(): void;
  ngOnDestroy(): void;
  onClickNext(): void;
  onClickPrev(): void;
  onSwipe(action: string): void;
  onClickNavigationItem(index: number): void;
  setNavigationItemToActive(index: number): void;
  initSlider(): void;
  togglePrevButtonClass(deactivate: boolean): void;
  toggleNextButtonClass(deactivate: boolean): void;
  slideItemToCurrentIndex(): void;
  slideItem(direction: string): void;
  buildContainer(): void;
  prepareForInfinityLoop(): void;
  prepareAutoSwitchOff(): void;
  prepareForAutoPlay(): void;
  prepareForNavigation(): void;
  translate(duration: number, offset?: number): void;
  resize(): void;
  prepareForLazyLoading(node?: any, nodeIndex?: number): void;
  loadImage(): void;
  setElementToLoading(): void;
  setElementToLoaded(): void;
  setElementToError(): void;
  setLoadedImage(src: string, index: number, node: any, nodeIndex: number): void;
  setItemToActive(): void;
  getBrowserSpecificPrefixes(): BrowserSpecificPrefixesInterface;
}
