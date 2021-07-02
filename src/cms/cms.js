import CMS from 'netlify-cms-app';
import { object } from 'prop-types';

import ContentPagePreview from './preview-templates/ContentPagePreview';

import './sc.css';

CMS.registerPreviewTemplate('about', ContentPagePreview);
CMS.registerPreviewTemplate('advertising', ContentPagePreview);
CMS.registerPreviewTemplate('auditions', ContentPagePreview);
CMS.registerPreviewTemplate('contact', ContentPagePreview);
CMS.registerPreviewTemplate('audition-guide', ContentPagePreview);
CMS.registerPreviewTemplate('volunteer', ContentPagePreview);
CMS.registerPreviewTemplate('support', ContentPagePreview);

CMS.registerEditorComponent({
  id: 'file',
  label: 'File Link',
  fields: [
    { name: 'link', label: 'File', widget: 'file' },
    { name: 'text', label: 'Link Text', widget: 'string' },
  ],
  pattern: /^file (\S+)$/,
  fromBlock: function (match) {
    return {
      file: match[1],
    };
  },
  toBlock: function (obj) {
    return `[${obj.text}](${obj.link})`;
  },
  toPreview: function (obj) {
    return `<a href="${obj.link}">${obj.text}</a>`;
  },
});
