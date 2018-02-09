import { Image } from 'react-native';

import Element from './Element';
class HTMLImageElement extends Element {
  get src() {
    return this.localUri;
  }

  set src(value) {
    this.localUri = value;
    this._load();
  }

  _onload = () => {};

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
    if (props) {
      const { localUri, width, height } = props || {};
      this.src = localUri;
      this.width = width;
      this.height = height;
      this._load();
    }
  }

  _load = () => {
    if (this.src) {
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
  };
}
export default HTMLImageElement;
