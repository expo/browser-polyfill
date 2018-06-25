import { Dimensions, PixelRatio } from 'react-native';
const { width, height } = Dimensions.get('window');
/*
 Window Resize Stub
*/
window.devicePixelRatio = PixelRatio.get();
window.screen = window.screen || {};
window.screen.width = window.innerWidth = window.clientWidth = width;
window.screen.height = window.innerHeight = window.clientHeight = height;
window.screen.orientation =
  window.screen.orientation || window.clientWidth < window.clientHeight
    ? 0
    : 90;

if (!global.__EXPO_BROWSER_POLYFILL_RESIZE) {
  global.__EXPO_BROWSER_POLYFILL_RESIZE = true;
  Dimensions.addEventListener(
    'change',
    ({ screen: { width, height, scale } }) => {
      window.devicePixelRatio = scale;
      window.screen.width = window.innerWidth = window.clientWidth = width;
      window.screen.height = window.innerHeight = window.clientHeight = height;
      window.screen.orientation = width < height ? 0 : 90;
      if (window.emitter && window.emitter.emit) {
        window.emitter.emit('resize');
      }
    },
  );
}
