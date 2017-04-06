/* tslint:disable:no-unused-variable */

import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { Component, Injectable, Input } from '@angular/core';
import { SliderOptionInterface } from '../interfaces/options.interface';
import { CommonModule } from '@angular/common';
import { NgxAgileSliderModule } from '../ngx-agile-slider.module';
import { BrowserSpecificPrefixesInterface } from '../interfaces/browser-specific-prefixes.interface';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      CommonModule,
      NgxAgileSliderModule
    ],
    declarations: [
      TestComponent
    ]
  });
};

describe('@Component: SliderContainerComponent', () => {

  beforeEach(testModuleConfig);

  it('should create the slider component', async(() => {

    TestBed.compileComponents()
      .then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        const container = fixture.debugElement.children[0].componentInstance;

        expect(container).toBeTruthy();

      });

  }));

  it('should create the list for the slider', async(() => {

    TestBed.compileComponents()
      .then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        const containerDOMEl = fixture.debugElement.children[0].nativeElement;

        expect(containerDOMEl.querySelectorAll('li').length).toEqual(7);
      });

  }));

  it('should activate the arrow navigation', async(() => {

    TestBed.compileComponents()
      .then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        const containerDOMEl = fixture.debugElement.children[0].nativeElement;

        expect(containerDOMEl.querySelectorAll('span').length).toEqual(2);
      });

  }));

  it('should set the first item to active', async(() => {

    TestBed.compileComponents()
      .then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        const containerDOMEl = fixture.debugElement.children[0].nativeElement;

        expect(containerDOMEl.querySelectorAll('li')[0].classList.contains('active')).toBeTruthy();
      });

  }));

  it('should detect available BROWSER PREFIXES', async(() => {

    TestBed.compileComponents()
      .then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        const container = fixture.debugElement.children[0].componentInstance;
        const prefixes: BrowserSpecificPrefixesInterface = container.getBrowserSpecificPrefixes();

        expect(prefixes).toBeTruthy();
        expect(prefixes.transformPrefix).not.toEqual('');
        expect(prefixes.transformPrefix).not.toEqual('');
        expect(prefixes.transformPrefix).not.toEqual('');
        expect(prefixes.translate3dAvailable).not.toBeUndefined();

      });

  }));

  it('should slide with DEFAULT settings', async(() => {

    TestBed.compileComponents()
      .then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const containerDOMEl = fixture.debugElement.children[0].nativeElement;

        expect(containerDOMEl.querySelectorAll('li')[0].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.next').click();
        expect(containerDOMEl.querySelectorAll('li')[1].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.next').click();
        expect(containerDOMEl.querySelectorAll('li')[2].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.next').click();
        expect(containerDOMEl.querySelectorAll('li')[3].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.next').click();
        expect(containerDOMEl.querySelectorAll('li')[4].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.next').click();
        expect(containerDOMEl.querySelectorAll('li')[5].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.next').click();
        expect(containerDOMEl.querySelectorAll('li')[6].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.next').click();
        expect(containerDOMEl.querySelectorAll('li')[6].classList.contains('active')).toBeTruthy();

        expect(containerDOMEl.querySelectorAll('li')[6].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.prev').click();
        expect(containerDOMEl.querySelectorAll('li')[5].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.prev').click();
        expect(containerDOMEl.querySelectorAll('li')[4].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.prev').click();
        expect(containerDOMEl.querySelectorAll('li')[3].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.prev').click();
        expect(containerDOMEl.querySelectorAll('li')[2].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.prev').click();
        expect(containerDOMEl.querySelectorAll('li')[1].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.prev').click();
        expect(containerDOMEl.querySelectorAll('li')[0].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.prev').click();
        expect(containerDOMEl.querySelectorAll('li')[0].classList.contains('active')).toBeTruthy();
      });

  }));

  it('should slide with INFINITE LOOP setting. NEXT', async(() => {

    TestBed.compileComponents()
      .then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.debugElement.componentInstance.options.loop = true;
        fixture.detectChanges();

        const container = fixture.debugElement.children[0].componentInstance;
        const containerDOMEl = fixture.debugElement.children[0].nativeElement;

        expect(containerDOMEl.querySelectorAll('li').length).toEqual(9);

        expect(container.currentIndex).toEqual(1);
        expect(containerDOMEl.querySelectorAll('li')[1].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.next').click();

        expect(container.currentIndex).toEqual(2);
        expect(containerDOMEl.querySelectorAll('li')[2].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.next').click();

        expect(container.currentIndex).toEqual(3);
        expect(containerDOMEl.querySelectorAll('li')[3].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.next').click();

        expect(container.currentIndex).toEqual(4);
        expect(containerDOMEl.querySelectorAll('li')[4].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.next').click();

        expect(container.currentIndex).toEqual(5);
        expect(containerDOMEl.querySelectorAll('li')[5].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.next').click();

        expect(container.currentIndex).toEqual(6);
        expect(containerDOMEl.querySelectorAll('li')[6].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.next').click();

        expect(container.currentIndex).toEqual(7);
        expect(containerDOMEl.querySelectorAll('li')[7].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.next').click();

        expect(container.currentIndex).toEqual(8);
        expect(containerDOMEl.querySelectorAll('li')[8].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.next').click();

        setTimeout(() => {
          expect(container.currentIndex).toEqual(1);
          expect(containerDOMEl.querySelectorAll('li')[1].classList.contains('active')).toBeTruthy();
        }, 1000);

      });

  }));

  it('should slide with INFINITE LOOP setting. PREV', async(() => {

    TestBed.compileComponents()
      .then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.debugElement.componentInstance.options.loop = true;
        fixture.detectChanges();

        const container = fixture.debugElement.children[0].componentInstance;
        const containerDOMEl = fixture.debugElement.children[0].nativeElement;

        expect(containerDOMEl.querySelectorAll('li').length).toEqual(9);

        expect(containerDOMEl.querySelectorAll('li')[1].classList.contains('active')).toBeTruthy();
        containerDOMEl.querySelector('.prev').click();

        setTimeout(() => {
          expect(container.currentIndex).toEqual(7);
          expect(containerDOMEl.querySelectorAll('li')[7].classList.contains('active')).toBeTruthy();
          containerDOMEl.querySelector('.prev').click();

          expect(container.currentIndex).toEqual(6);
          expect(containerDOMEl.querySelectorAll('li')[6].classList.contains('active')).toBeTruthy();
          containerDOMEl.querySelector('.prev').click();

          expect(container.currentIndex).toEqual(5);
          expect(containerDOMEl.querySelectorAll('li')[5].classList.contains('active')).toBeTruthy();
          containerDOMEl.querySelector('.prev').click();

          expect(container.currentIndex).toEqual(4);
          expect(containerDOMEl.querySelectorAll('li')[4].classList.contains('active')).toBeTruthy();
          containerDOMEl.querySelector('.prev').click();

          expect(container.currentIndex).toEqual(3);
          expect(containerDOMEl.querySelectorAll('li')[3].classList.contains('active')).toBeTruthy();
          containerDOMEl.querySelector('.prev').click();

          expect(container.currentIndex).toEqual(2);
          expect(containerDOMEl.querySelectorAll('li')[2].classList.contains('active')).toBeTruthy();
          containerDOMEl.querySelector('.prev').click();

          expect(container.currentIndex).toEqual(1);
          expect(containerDOMEl.querySelectorAll('li')[1].classList.contains('active')).toBeTruthy();
        }, 1000);
      });

  }));

  it('should slide with AUTO PLAY setting. NEXT', (done: any) => {
    TestBed.compileComponents()
      .then(() => {
        jasmine.clock().install();
        const fixture = TestBed.createComponent(TestComponent);
        fixture.debugElement.componentInstance.options.autoPlay = true;
        fixture.detectChanges();

        const containerDOMEl = fixture.debugElement.children[0].nativeElement;

        expect(containerDOMEl.querySelectorAll('li').length).toEqual(7);

        expect(containerDOMEl.querySelectorAll('li')[0].classList.contains('active')).toBeTruthy();

        jasmine.clock().tick(11);
        expect(containerDOMEl.querySelectorAll('li')[1].classList.contains('active')).toBeTruthy();

        jasmine.clock().tick(11);
        expect(containerDOMEl.querySelectorAll('li')[2].classList.contains('active')).toBeTruthy();

        jasmine.clock().tick(11);
        expect(containerDOMEl.querySelectorAll('li')[3].classList.contains('active')).toBeTruthy();

        jasmine.clock().tick(11);
        expect(containerDOMEl.querySelectorAll('li')[4].classList.contains('active')).toBeTruthy();

        jasmine.clock().tick(11);
        expect(containerDOMEl.querySelectorAll('li')[5].classList.contains('active')).toBeTruthy();

        jasmine.clock().tick(11);
        expect(containerDOMEl.querySelectorAll('li')[6].classList.contains('active')).toBeTruthy();

        jasmine.clock().uninstall();
        done();
      });

  });

  it('should slide with REWIND setting.', (done: any) => {
    TestBed.compileComponents()
      .then(() => {
        jasmine.clock().install();
        const fixture = TestBed.createComponent(TestComponent);
        fixture.debugElement.componentInstance.options.rewind = true;
        fixture.detectChanges();

        const containerDOMEl = fixture.debugElement.children[0].nativeElement;

        expect(containerDOMEl.querySelectorAll('li').length).toEqual(7);

        expect(containerDOMEl.querySelectorAll('li')[0].classList.contains('active')).toBeTruthy();

        containerDOMEl.querySelector('.next').click();
        expect(containerDOMEl.querySelectorAll('li')[1].classList.contains('active')).toBeTruthy();

        containerDOMEl.querySelector('.next').click();
        expect(containerDOMEl.querySelectorAll('li')[2].classList.contains('active')).toBeTruthy();

        containerDOMEl.querySelector('.next').click();
        expect(containerDOMEl.querySelectorAll('li')[3].classList.contains('active')).toBeTruthy();

        containerDOMEl.querySelector('.next').click();
        expect(containerDOMEl.querySelectorAll('li')[4].classList.contains('active')).toBeTruthy();

        containerDOMEl.querySelector('.next').click();
        expect(containerDOMEl.querySelectorAll('li')[5].classList.contains('active')).toBeTruthy();

        containerDOMEl.querySelector('.next').click();
        expect(containerDOMEl.querySelectorAll('li')[6].classList.contains('active')).toBeTruthy();

        containerDOMEl.querySelector('.next').click();
        jasmine.clock().tick(11);
        expect(containerDOMEl.querySelectorAll('li')[0].classList.contains('active')).toBeTruthy();

        jasmine.clock().uninstall();
        done();
      });

  });

  it('should slide with NAVIGATION.', async(() => {
    TestBed.compileComponents()
      .then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.debugElement.componentInstance.options.navigation = true;
        fixture.detectChanges();

        const containerDOMEl = fixture.debugElement.children[0].nativeElement;

        expect(containerDOMEl.querySelectorAll('.ngx-agile-slider-nav-dots').length).toEqual(7);
        expect(containerDOMEl.querySelectorAll('.ngx-agile-slider-nav-dots.active').length).toEqual(1);
        expect(containerDOMEl.querySelectorAll('.ngx-agile-slider-nav-dots.active')[0].classList.contains('active')).toBeTruthy();
        expect(containerDOMEl.querySelectorAll('li.ngx-agile-slider-item')[0].classList.contains('active')).toBeTruthy();

        containerDOMEl.querySelectorAll('.ngx-agile-slider-nav-dots')[1].click();
        expect(containerDOMEl.querySelectorAll('li.ngx-agile-slider-item')[1].classList.contains('active')).toBeTruthy();

        containerDOMEl.querySelectorAll('.ngx-agile-slider-nav-dots')[2].click();
        expect(containerDOMEl.querySelectorAll('li.ngx-agile-slider-item')[2].classList.contains('active')).toBeTruthy();

        containerDOMEl.querySelectorAll('.ngx-agile-slider-nav-dots')[3].click();
        expect(containerDOMEl.querySelectorAll('li.ngx-agile-slider-item')[3].classList.contains('active')).toBeTruthy();

        containerDOMEl.querySelectorAll('.ngx-agile-slider-nav-dots')[4].click();
        expect(containerDOMEl.querySelectorAll('li.ngx-agile-slider-item')[4].classList.contains('active')).toBeTruthy();

        containerDOMEl.querySelectorAll('.ngx-agile-slider-nav-dots')[5].click();
        expect(containerDOMEl.querySelectorAll('li.ngx-agile-slider-item')[5].classList.contains('active')).toBeTruthy();

        containerDOMEl.querySelectorAll('.ngx-agile-slider-nav-dots')[6].click();
        expect(containerDOMEl.querySelectorAll('li.ngx-agile-slider-item')[6].classList.contains('active')).toBeTruthy();
      });

  }));

});

@Component({
  selector: 'ngx-agile-slider-test-comp',
  template: `
    <ngx-agile-slider-container [sliderOptions]="options">
      <ngx-agile-slider-item>
        <div>1</div>
      </ngx-agile-slider-item>
      <ngx-agile-slider-item>
        <div>2</div>
      </ngx-agile-slider-item>
      <ngx-agile-slider-item>
        <div>3</div>
      </ngx-agile-slider-item>
      <ngx-agile-slider-item>
        <div>4</div>
      </ngx-agile-slider-item>
      <ngx-agile-slider-item>
        <div>5</div>
      </ngx-agile-slider-item>
      <ngx-agile-slider-item>
        <div>6</div>
      </ngx-agile-slider-item>
      <ngx-agile-slider-item>
        <div>7</div>
      </ngx-agile-slider-item>
    </ngx-agile-slider-container>
  `
})
class TestComponent {
  public options: SliderOptionInterface = {
    duration: 1,
    autoPlay: false,
    autoPlayDirection: 'NEXT',
    autoPlayInterval: 10,
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
    classActiveItem: 'active',
    classNavigationFrame: '',
    classNavigationItem: '',
    classActiveNavigationItem: ''
  };
}
