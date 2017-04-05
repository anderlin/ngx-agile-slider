import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NgxAgileSliderModule } from './carousel/ngx-agile-slider.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxAgileSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
