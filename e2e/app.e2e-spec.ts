import { CarouselModulPage } from './app.po';

describe('carousel-modul App', function() {
  let page: CarouselModulPage;

  beforeEach(() => {
    page = new CarouselModulPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
