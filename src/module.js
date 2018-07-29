import Document from './DOM/Document';

import './window';
import './resize';
import './process';
import 'react-native-console-time-polyfill';
window.document = window.document || new Document();
