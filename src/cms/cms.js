import React from 'react';
import CMS from 'netlify-cms-app';
import StyleSheetInjector from './stylesheetinjector';

import AboutPagePreview from './preview-templates/AboutPagePreview';

CMS.registerPreviewStyle('/sc.css');

CMS.registerPreviewTemplate('about', props => (
  <StyleSheetInjector>
    <AboutPagePreview {...props} />
  </StyleSheetInjector>
));
