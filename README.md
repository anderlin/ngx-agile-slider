# NgxAgileCarousel

This project provides a fast and thin `angular` module for a carousel slider.

# Installation

Install the package via npm

```
npm install --save ngx-agile-slider
```
# Usage

## 1. Import the NgxAgileSliderModule:

```
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxSliderModule} from 'ngx-agile-slider.module';

@NgModule({
    imports: [
        NgxAgileSliderModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```
## 2. Usage example

```
<ngx-agile-slider-container [sliderOptions]="{ loop: true }">
  <ngx-agile-slider-item>
    <span>1</span>
  </ngx-agile-slider-item>
  <ngx-agile-slider-item>
    <span>2</span>
  </ngx-agile-slider-item>
  <ngx-agile-slider-item>
    <span>3</span>
  </ngx-agile-slider-item>
  <ngx-agile-slider-item>
    <span>4</span>
  </ngx-agile-slider-item>
  <ngx-agile-slider-item>
    <span>5</span>
  </ngx-agile-slider-item>
  <ngx-agile-slider-item>
    <span>6</span>
  </ngx-agile-slider-item>
  <ngx-agile-slider-item>
    <span>7</span>
  </ngx-agile-slider-item>
</ngx-agile-slider-container>
```
## 3. Settings

Your can use the SliderOptionInterface interface for additional settings.

```
let sttings = {
  duration: 300, // animation duration
  autoPlay: true, // switches the autoplay function
  autoPlayDirection: 'NEXT', // NEXT for slide forwards. PREV for slide backwards
  autoPlayInterval: 1000, // autoplay interval
  rewind: false, // switches the rewind function
  rewindDuration: 1, // duration for rewind
  loop: true, // switches the loop function
  navigation: true, // activates the dot navigation
  autoSwitchOff: false, // deactivats automatically the slider
  swipe: true, // swipe gestures control
  lazyLoading: true, // image lazy loading
  autoHeight: true, // automatically adjusts in height
  easeFunction: 'ease' // translation function
}
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to GitHub Pages

Run `ng github-pages:deploy` to deploy to GitHub Pages.
