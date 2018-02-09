import '@expo/browser-polyfill';

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
  elements: () => {
    const { HTMLImageElement, Image, HTMLVideoElement, Video, HTMLCanvasElement, Canvas } = global;
    const elements = {
      HTMLImageElement,
      Image,
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

export default class App extends React.Component {
  componentWillMount() {
    Object.keys(tests).forEach(key => {
      try {
        console.log('Run Test: ', key);
        tests[key]();
      } catch (error) {
        console.error(`Error running ${key} test: `, error);
      }
    });
    window.addEventListener('resize', this.onLayout);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onLayout);
  }

  onLayout = () => {
    console.log('Update Layout:', window.innerWidth, window.innerHeight, window.devicePixelRatio);
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Check your console...</Text>
      </View>
    );
  }
}
