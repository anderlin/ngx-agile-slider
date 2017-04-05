/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { CarouselContainerComponent } from './carousel-container.component';
import { BrowserSpecificPrefixesInterface } from '../interfaces/browser-specific-prefixes.interface';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CarouselContainerComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the carousel component', async(() => {
    const fixture = TestBed.createComponent(CarouselContainerComponent);
    const carousel: CarouselContainerComponent = fixture.debugElement.componentInstance;
    expect(carousel).toBeTruthy();
  }));

  it('should detect available browser prefixes', async(() => {
    const fixture = TestBed.createComponent(CarouselContainerComponent);
    const carousel: CarouselContainerComponent = fixture.debugElement.componentInstance;

    const prefixes: BrowserSpecificPrefixesInterface = carousel.getBrowserSpecificPrefixes();

    expect(prefixes).toBeTruthy();
    expect(prefixes.transformPrefix).not.toEqual('');
    expect(prefixes.transformPrefix).not.toEqual('');
    expect(prefixes.transformPrefix).not.toEqual('');
    expect(prefixes.translate3dAvailable).not.toBeUndefined();
  }));

});
