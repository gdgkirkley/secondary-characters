import CMS from 'netlify-cms-app';

import ContentPagePreview from './preview-templates/ContentPagePreview';

import './sc.css';

CMS.registerPreviewTemplate('about', ContentPagePreview);
CMS.registerPreviewTemplate('advertising', ContentPagePreview);
CMS.registerPreviewTemplate('auditions', ContentPagePreview);
CMS.registerPreviewTemplate('contact', ContentPagePreview);
CMS.registerPreviewTemplate('audition-guide', ContentPagePreview);
CMS.registerPreviewTemplate('volunteer', ContentPagePreview);
CMS.registerPreviewTemplate('support', ContentPagePreview);
