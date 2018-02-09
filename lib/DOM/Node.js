class Node {
  constructor(nodeName) {
    this.nodeName = nodeName;
  }

  get ownerDocument() {
    return window.document;
  }

  className = {
    baseVal: '',
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
