// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// carousel
import { CarouselContainerComponent } from './components/carousel-container.component';
import { CarouselItemComponent } from './components/carousel-item.component';



@NgModule({
  declarations: [
    CarouselContainerComponent,
    CarouselItemComponent
  ],
  exports: [
    CarouselContainerComponent,
    CarouselItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CarouselModule { }
