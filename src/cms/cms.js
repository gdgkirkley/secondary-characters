import CMS from 'netlify-cms-app';

import AboutPagePreview from './preview-templates/AboutPagePreview';

import './sc.css';

console.log('CMS');

CMS.registerPreviewTemplate('about', AboutPagePreview);
