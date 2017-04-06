import { CarouselModulPage } from './app.po';
import { by, element } from 'protractor';

describe('carousel-module App', function() {
  let page: CarouselModulPage;

  beforeEach(() => {
    page = new CarouselModulPage();
    page.navigateTo();
  });

  it('should display message saying app works', () => {
    console.log(element(by.id('aaa')).getInnerHtml());
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
