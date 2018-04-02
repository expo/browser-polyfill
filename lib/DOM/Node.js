import { EventEmitter } from 'fbemitter';

class Node {
  style = {};
  emitter = new EventEmitter();

  constructor(nodeName) {
    this.nodeName = nodeName;
  }

  get ownerDocument() {
    return window.document;
  }

  className = {
    baseVal: '',
  };

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

  appendChild() {}
  insertBefore() {}
  removeChild() {}
  setAttributeNS() {}

  getBoundingClientRect = () => ({
    left: 0,
    top: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  });
}

export default Node;
