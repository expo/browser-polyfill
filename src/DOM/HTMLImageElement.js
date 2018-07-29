import { Image, ImageStore } from 'react-native';

import Element from './Element';
class HTMLImageElement extends Element {
  get src() {
    return this.localUri;
  }

  set src(value) {
    this.localUri = value;
    this._load();
  }

  get onload() {
    return this._onload;
  }
  set onload(value) {
    this._onload = value;
  }

  get complete() {
    return this._complete;
  }
  set complete(value) {
    this._complete = value;
    if (value) {
      this.emitter.emit('load', this);
      this.onload();
    }
  }

  constructor(props) {
    super('img');
    this._load = this._load.bind(this);
    this._onload = () => {};
    if (props !== null && typeof props === 'object') {
      const { localUri, width, height } = props || {};
      this.src = localUri;
      this.width = width;
      this.height = height;
      this._load();
    }
  }

  _load() {
    if (this.src) {
      if (this.src.startsWith && this.src.startsWith('data:')) {
        // is base64 - convert and try again;
        this._base64 = this.src;
        ImageStore.addImageFromBase64(
          this.src,
          uri => {
            this.src = uri;
            if (this.src.startsWith && !this.src.startsWith('data:')) {
              this._load();
            }
          },
          error => {
            if (global.__debug_browser_polyfill_image) {
              console.log(`@expo/browser-polyfill: Error:`, error.message);
            }
            this.emitter.emit('error', { target: this, error });
          }
        );
        return;
      }
      if (!this.width || !this.height) {
        this.complete = false;
        this.emitter.emit('loading', this);
        Image.getSize(
          this.src,
          (width, height) => {
            this.width = width;
            this.height = height;
            this.complete = true;
          },
          error => {
            this.emitter.emit('error', { target: this });
          }
        );
      } else {
        this.complete = true;
      }
    }
  }
}
export default HTMLImageElement;
