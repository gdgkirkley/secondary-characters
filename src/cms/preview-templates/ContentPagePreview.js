import React from 'react';
import PropTypes from 'prop-types';
import markdownIt from 'markdown-it';

const markdownParse = new markdownIt({
  html: true,
});

const ContentPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();
  const sections = entry.getIn(['data', 'sections'])?.toJS();

  return (
    <div>
      {data.showBanner ? (
        <div
          class="image-banner"
          style={{ backgroundImage: `url(${getAsset(data.image)})` }}
        />
      ) : null}
      <div
        class="page-content"
        style={{ marginTop: data.showBanner ? '-40px' : '40px' }}
      >
        <div class="section">
          <h1 class="section-head">{data.title}</h1>
          <div
            class="main-content"
            dangerouslySetInnerHTML={{
              __html: markdownParse.render(data.body),
            }}
          />
        </div>
        {sections?.length
          ? sections.map((section) => (
              <div class="section">
                <h2 class="section-head">{section.sectionHead}</h2>
                <div
                  class="main-content"
                  dangerouslySetInnerHTML={{
                    __html: markdownParse.render(section.content),
                  }}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

ContentPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default ContentPagePreview;
