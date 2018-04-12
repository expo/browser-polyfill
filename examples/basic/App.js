import '@expo/browser-polyfill';

import Expo from 'expo';
import React from 'react';
import { View, Text } from 'react-native';

const tests = {
  timer: () => {
    const tag = 'test-timer';
    console.time(tag);
    console.timeEnd(tag);
    console.count(tag);
  },
  userAgent: () => {
    console.log('userAgent: ', global.userAgent);
  },
  process: () => {
    console.log('process: ', global.process);
  },
  navigator: () => {
    console.log('navigator: ', Object.keys(global.navigator));
  },
  performance: () => {
    console.log('performance: ', Object.keys(global.performance));
  },
  window: () => {
    console.log('location: ', Object.keys(window.location));
  },
  correctElementsCreated: () => {
    const { HTMLImageElement, ImageBitmap, HTMLVideoElement, HTMLCanvasElement } = global;
    const types = [
      { type: 'img', inst: HTMLImageElement },
      { type: 'video', inst: HTMLVideoElement },
      { type: 'canvas', inst: HTMLCanvasElement },
      { type: 'img', inst: ImageBitmap },
    ];
    types.forEach(item => {
      const element = document.createElement(item.type);
      console.log('type', item.type, element instanceof item.inst, element instanceof Number);
    });
  },
  elements: () => {
    const { HTMLImageElement, Image, ImageBitmap, HTMLVideoElement, Video, HTMLCanvasElement, Canvas } = global;
    const elements = {
      HTMLImageElement,
      Image,
      ImageBitmap,
      HTMLVideoElement,
      Video,
      HTMLCanvasElement,
      Canvas,
    };
    console.log('Elements: ', Object.keys(elements).map(key => ({ [key]: !!elements[key] })));
  },
  loadImage: () => {
    const image = new global.HTMLImageElement();
    image.addEventListener('loading', () => {
      console.log('Loading Image');
    });
    image.addEventListener('error', () => {
      console.log('Error Loading Image');
    });
    image.onload = () => {
      const { src, width, height } = image;
      console.log('Loaded Image', { src, width, height });
    };
    image.src = 'https://avatars0.githubusercontent.com/u/9664363?s=40&v=4';
  },
  textDecoder: () => {
    console.log('TextDecoder: ', !!global.TextDecoder);
    const utfLabel = 'utf-8';
    const options = { fatal: true };
    const decoder = new TextDecoder(utfLabel, options);

    let data = '{}';
    let buffer = '';
    buffer += decoder.decode(data, { stream: true });
    console.log('TextDecoder buffer', buffer, ' from: ', Object.keys(data));
  },
  context: () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const webgl = canvas.getContext('webgl');
    console.log(context, webgl);
  },
  domParser: () => {
    console.log('window.DOMParser: ', !!window.DOMParser);
    const parser = new window.DOMParser();

    const html = `
    <!DOCTYPE html>
    <html>
      <body>
        <div class="container" id="container-id" name="container-name">
          some text content
          <h1 class="header">Charlie Cheever</h1>
          <p id="subtitle">is my dad.</p>
          <input name="named-input" type="text" value="Ben Affleck" />
        </div>
      </body>
    </html>
    `;
    const dom = parser.parseFromString(html);
    const container = dom.getElementById('container-id');
    Object.keys(container).forEach(key => {
      const obj = container[key];
      console.log(`DOMParser: container.${key}: ${obj}`);
    });
  },
};

const testGL = !Expo.Constants.isDevice;
export default class App extends React.Component {
  componentWillMount() {
    if (!testGL) {
      this.runTests();
    }

    window.addEventListener('resize', this.onLayout);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onLayout);
  }

  onLayout = () => {
    console.log('Update Layout:', window.innerWidth, window.innerHeight, window.devicePixelRatio);
  };

  runTests = () => {
    Object.keys(tests).forEach(key => {
      try {
        console.log('Run Test: ', key);
        tests[key]();
      } catch (error) {
        console.error(`Error running ${key} test: `, error);
      }
    });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Check your console...</Text>
        {testGL && (
          <Expo.GLView
            onContextCreate={context => {
              global.__context = context;
              this.runTests();
            }}
          />
        )}
      </View>
    );
  }
}
