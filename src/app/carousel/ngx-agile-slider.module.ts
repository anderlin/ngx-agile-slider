// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// deps
import 'hammerjs';

// NgxAgileSlider
import { SliderContainerComponent } from './components/ngx-agile-slider-container.component';
import { SliderItemComponent } from './components/ngx-agile-slider-item.component';
import { LazyLoaderService } from './services/lazy-loader.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    SliderContainerComponent,
    SliderItemComponent
  ],
  exports: [
    SliderContainerComponent,
    SliderItemComponent
  ],
  providers: [
    LazyLoaderService
  ],
  imports: [
    CommonModule,
    HttpModule
  ]
})
export class NgxAgileSliderModule { }
