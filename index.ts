import { NgxAgileSliderModule } from './src/app/carousel/ngx-agile-slider.module';
import { LazyLoaderService } from './src/app/carousel/services/lazy-loader.service';
import { BrowserSpecificPrefixesInterface } from './src/app/carousel/interfaces/browser-specific-prefixes.interface';
import { NavigationItemInterface } from './src/app/carousel/interfaces/navigation-item.interface';
import { SliderOptionInterface } from './src/app/carousel/interfaces/options.interface';

import { SliderItemComponent } from './src/app/carousel/components/ngx-agile-slider-item.component';
import { SliderContainerComponent } from './src/app/carousel/components/ngx-agile-slider-container.component';

export {
  LazyLoaderService,
  BrowserSpecificPrefixesInterface,
  NavigationItemInterface,
  SliderOptionInterface,
  SliderItemComponent,
  SliderContainerComponent,
  NgxAgileSliderModule
};
export default NgxAgileSliderModule;
