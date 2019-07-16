import { Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
const { writeAsStringAsync, documentDirectory } = FileSystem;
const EncodingType = FileSystem.EncodingType || FileSystem.EncodingTypes;

import uuidv1 from 'uuid/v1';

import Element from './Element';

const b64Extensions = {
  '/': 'jpg',
  i: 'png',
  R: 'gif',
  U: 'webp',
};

function b64WithoutPrefix(b64) {
  return b64.split(',')[1];
}

function getMIMEforBase64String(b64) {
  let input = b64;
  if (b64.includes(',')) {
    input = b64WithoutPrefix(b64);
  }
  const first = input.charAt(0);
  const mime = b64Extensions[first];
  if (!mime) {
    throw new Error('Unknown Base64 MIME type: ', b64);
  }
  return mime;
}

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
      if (
        typeof this.src === 'string' &&
        this.src.startsWith &&
        this.src.startsWith('data:')
      ) {
        // is base64 - convert and try again;
        this._base64 = this.src;
        const base64result = this.src.split(',')[1];
        (async () => {
          try {
            const MIME = getMIMEforBase64String(base64result);
            this.localUri = `${documentDirectory}${uuidv1()}-b64image.${MIME}`;
            await writeAsStringAsync(this.localUri, base64result, {
              encoding: EncodingType.Base64,
            });
            this._load();
          } catch (error) {
            if (global.__debug_browser_polyfill_image) {
              console.log(`@expo/browser-polyfill: Error:`, error.message);
            }
            this.emitter.emit('error', { target: this, error });
          }
        })();
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
          },
        );
      } else {
        this.complete = true;
      }
    }
  }
}
export default HTMLImageElement;
