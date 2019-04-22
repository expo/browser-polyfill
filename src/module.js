import Document from './DOM/Document';

import './window';
import './resize';
import './process';
import './console';
window.document = window.document || new Document();
