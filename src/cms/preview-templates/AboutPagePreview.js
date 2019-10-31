import React from 'react';
import PropTypes from 'prop-types';
import { ContentPageTemplate } from '../../templates/contentpage';

const AboutPagePreview = ({ entry }) => {
  const title = entry.getIn(['data', 'title']).toJS();
  return <ContentPageTemplate title={title} />;
};

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default AboutPagePreview;
