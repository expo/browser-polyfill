import Node from './Node';
import EventEmitter from 'EventEmitter';

class Element extends Node {
  style = {};
  emitter = new EventEmitter();
  constructor(tagName) {
    return super(tagName.toUpperCase());
  }

  get tagName() {
    return this.nodeName;
  }

  _checkEmitter = () => {
    if (
      !this.emitter ||
      !(
        this.emitter.on ||
        this.emitter.addEventListener ||
        this.emitter.addListener
      )
    ) {
      this.emitter = new EventEmitter();
    }
  };

  addEventListener = (eventName, listener) => {
    this._checkEmitter();
    if (this.emitter.on) {
      this.emitter.on(eventName, listener);
    } else if (this.emitter.addEventListener) {
      this.emitter.addEventListener(eventName, listener);
    } else if (this.emitter.addListener) {
      this.emitter.addListener(eventName, listener);
    }
  };

  removeEventListener = (eventName, listener) => {
    this._checkEmitter();
    if (this.emitter.off) {
      this.emitter.off(eventName, listener);
    } else if (this.emitter.removeEventListener) {
      this.emitter.removeEventListener(eventName, listener);
    } else if (this.emitter.removeListener) {
      this.emitter.removeListener(eventName, listener);
    }
  };

  setAttributeNS() {}

  createElementNS = tagName => {
    const canvas = this.createElement(tagName);
    canvas.getContext = () => ({
      fillRect: () => ({}),
      drawImage: () => ({}),
      getImageData: () => ({}),
      getContextAttributes: () => ({
        stencil: true,
      }),
      getExtension: () => ({
        loseContext: () => ({}),
      }),
    });
    canvas.toDataURL = () => ({});
    canvas.getBoundingClientRect = () => ({});

    return canvas;
  };

  get clientWidth() {
    return this.innerWidth;
  }
  get clientHeight() {
    return this.innerHeight;
  }

  get offsetWidth() {
    return this.innerWidth;
  }
  get offsetHeight() {
    return this.innerHeight;
  }

  get innerWidth() {
    return window.innerWidth;
  }
  get innerHeight() {
    return window.innerHeight;
  }

  getContext(contextType) {
    return {
      fillRect: _ => {},
      drawImage: _ => {},
      getImageData: _ => {},
      getContextAttributes: _ => ({
        stencil: true,
      }),
      getExtension: _ => ({
        loseContext: _ => {},
      }),
    };
  }
}

export default Element;
