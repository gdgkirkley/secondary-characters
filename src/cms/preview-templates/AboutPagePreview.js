import React from 'react';
import PropTypes from 'prop-types';

const AboutPagePreview = ({ entry }) => {
  console.log('Rendering');
  const title = entry.getIn(['data', 'title']).toJS();
  return <div>{title}</div>;
};

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default AboutPagePreview;
