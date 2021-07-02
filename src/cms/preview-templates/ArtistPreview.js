import React from 'react';
import markdownIt from 'markdown-it';

const markdownParse = new markdownIt({
  html: true,
});

const ArtistPreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();
  console.log(data);
  return (
    <div className="artist-credit">
      <div className="artist-headshot">
        <img src={getAsset(data.headshot)} />
      </div>
      <p className="credit" style={{ fontSize: '14px' }}>
        <strong className="name">{data.name}</strong>
        <br /> <i>Credit Goes Here</i>
      </p>

      <p>Popup Bio Preview: </p>
      <div className="artist-modal-preview">
        <h2>{data.name}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: markdownParse.render(data.body),
          }}
        />
      </div>
    </div>
  );
};

export default ArtistPreview;
