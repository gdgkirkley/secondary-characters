import React from 'react';
import PropTypes from 'prop-types';
import { ContentPageTemplate } from '../../templates/contentpage';

const AboutPagePreview = ({ entry, widgetFor }) => {
  const data = entry.get('data');
  console.log(data);
  return (
    <ContentPageTemplate
      frontmatter={data.get('frontmatter')}
      html={data.get('html')}
    />
  );
};

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default AboutPagePreview;
