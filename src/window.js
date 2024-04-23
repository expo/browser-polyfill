import { EventEmitter } from 'fbemitter';
import { TextDecoder, TextEncoder } from 'text-encoding';
import Document from './DOM/Document';

import './performance';

import HTMLImageElement from './DOM/HTMLImageElement';
import HTMLCanvasElement from './DOM/HTMLCanvasElement';
import HTMLVideoElement from './DOM/HTMLVideoElement';
import CanvasRenderingContext2D from 'expo-2d-context';

global.HTMLImageElement = global.HTMLImageElement || HTMLImageElement;
global.Image = global.Image || HTMLImageElement;
global.ImageBitmap = global.ImageBitmap || HTMLImageElement;
global.HTMLVideoElement = global.HTMLVideoElement || HTMLVideoElement;
global.Video = global.Video || HTMLVideoElement;
global.HTMLCanvasElement = global.HTMLCanvasElement || HTMLCanvasElement;
global.Canvas = global.Canvas || HTMLCanvasElement;
global.CanvasRenderingContext2D =
  global.CanvasRenderingContext2D || CanvasRenderingContext2D;
// This causes the cryptic error: 
// `Value is undefined, expected an Object`
// global.WebGLRenderingContext = global.WebGLRenderingContext || function() {};

function checkEmitter() {
  if (
    !window.emitter ||
    !(
      window.emitter.on ||
      window.emitter.addEventListener ||
      window.emitter.addListener
    )
  ) {
    window.emitter = new EventEmitter();
  }
}

window.scrollTo = window.scrollTo || (() => ({}));

window.addEventListener = (eventName, listener) => {
  checkEmitter();
  const addListener = () => {
    if (window.emitter.on) {
      window.emitter.on(eventName, listener);
    } else if (window.emitter.addEventListener) {
      window.emitter.addEventListener(eventName, listener);
    } else if (window.emitter.addListener) {
      window.emitter.addListener(eventName, listener);
    }
  };

  addListener();

  if (eventName.toLowerCase() === 'load') {
    if (window.emitter && window.emitter.emit) {
      setTimeout(() => {
        window.emitter.emit('load');
      }, 1);
    }
  }
};

window.removeEventListener = (eventName, listener) => {
  checkEmitter();
  if (window.emitter.off) {
    window.emitter.off(eventName, listener);
  } else if (window.emitter.removeEventListener) {
    window.emitter.removeEventListener(eventName, listener);
  } else if (window.emitter.removeListener) {
    window.emitter.removeListener(eventName, listener);
  }
};

window.DOMParser = window.DOMParser || require('xmldom-qsa').DOMParser;
global.TextDecoder = global.TextDecoder || TextDecoder;
global.TextEncoder = global.TextEncoder || TextEncoder;

const agent = 'chrome';
global.userAgent = global.userAgent || agent;
global.navigator.userAgent = global.navigator.userAgent || agent;
global.navigator.product = 'ReactNative';
global.navigator.platform = global.navigator.platform || [];
global.navigator.appVersion = global.navigator.appVersion || 'OS10';
global.navigator.maxTouchPoints = global.navigator.maxTouchPoints || 5;
global.navigator.standalone =
  global.navigator.standalone === null ? true : global.navigator.standalone;

window['chrome'] = window['chrome'] || {
  extension: {},
};

///https://www.w3schools.com/js/js_window_location.asp
// Newer versions of React Native define `window.location` that can't be reassigned.
// When the `location` is defined, we don't have to do anything else.
if ('location' in window === false) {
  window.location = {
    href: '', //  window.location.href returns the href (URL) of the current page
    hostname: '', //window.location.hostname returns the domain name of the web host
    pathname: '', //window.location.pathname returns the path and filename of the current page
    protocol: 'https', //window.location.protocol returns the web protocol used (http: or https:)
    assign: null, //window.location.assign loads a new document
  };
}

if (global.document) {
  global.document.readyState = 'complete';
}
