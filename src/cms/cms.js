import React from 'react';
import CMS from 'netlify-cms-app';
import StyleSheetInjector from './stylesheetinjector';

import AboutPagePreview from './preview-templates/AboutPagePreview';

import './sc.css';

CMS.registerPreviewTemplate('about', props => {
  console.log(props);
  return (
    <StyleSheetInjector>
      <AboutPagePreview {...props} />
    </StyleSheetInjector>
  );
});
