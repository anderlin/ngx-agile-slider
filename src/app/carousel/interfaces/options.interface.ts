/**
 *
 */
export interface SliderOptionInterface {
  duration?: number;

  autoPlay?: boolean;
  autoPlayDirection?: string;
  autoPlayInterval?: number;

  rewind?: boolean;
  rewindDuration?: number;

  loop?: boolean;

  navigation?: boolean;

  autoSwitchOff?: boolean;

  swipe?: boolean;

  lazyLoading?: boolean;

  autoHeight?: boolean;

  easeFunction?: string;

  classContainer?: string;
  classFrame?: string;
  classList?: string;
  classPrevButton?: string;
  classNextButton?: string;
  classDeactivatedButton?: string;
  classActiveItem?: string;
  classNavigationFrame?: string;
  classNavigationItem?: string;
  classActiveNavigationItem?: string;
}
