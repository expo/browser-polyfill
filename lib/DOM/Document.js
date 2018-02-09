import Element from './Element';

class Document extends Element {
  body = new Element('BODY');
  documentElement = new Element('HTML');

  constructor() {
    super('#document');
  }

  createElement(tagName) {
    return new Element(tagName);
  }

  getElementById(id) {
    return new Element('div');
  }
}

export default Document;
