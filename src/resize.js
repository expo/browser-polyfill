import { Dimensions } from 'react-native';
const { width, height, scale } = Dimensions.get('window');
/*
 Window Resize Stub
*/
window.devicePixelRatio = scale;
window.innerWidth = width;
window.clientWidth = width;
window.innerHeight = height;
window.clientHeight = height;
window.screen = window.screen || {};
window.screen.orientation =
  window.screen.orientation || window.clientWidth < window.clientHeight ? 0 : 90;

if (!global.__EXPO_BROWSER_POLYFILL_RESIZE) {
  global.__EXPO_BROWSER_POLYFILL_RESIZE = true;
  Dimensions.addEventListener('change', ({ screen: { width, height, scale } }) => {
    window.devicePixelRatio = scale;
    window.innerWidth = width;
    window.clientWidth = width;
    window.innerHeight = height;
    window.clientHeight = height;

    window.screen.orientation = width < height ? 0 : 90;
    if (window.emitter && window.emitter.emit) {
      window.emitter.emit('resize');
    }
  });
}
