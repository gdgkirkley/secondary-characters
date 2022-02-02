import React, { useState } from 'react';
import markdownIt from 'markdown-it';

const markdownParse = new markdownIt({
  html: true,
});

const ShowPagePreview = ({ entry, getAsset, fieldsMetadata }) => {
  const data = entry.getIn(['data']).toJS();
  const sections = entry.getIn(['data', 'sections'])?.toJS();
  const [selectedPhoto, setSelectedPhoto] = useState(
    data.photoGallery && data.photoGallery.length ? data.photoGallery[0] : '',
  );
  const [photoActive, setPhotoActive] = useState(0);

  const handlePhotoThumbClick = (e) => {
    const newImage = data.photoGallery.find((photo) => {
      return photo.id === e.currentTarget.id;
    });
    const newImageIndex = data.photoGallery.findIndex((photo) => {
      return photo.id === e.currentTarget.id;
    });
    if (!newImage) return;
    setPhotoActive(newImageIndex);
    setSelectedPhoto(newImage);
  };

  console.log(data, sections, fieldsMetadata);

  console.log(data.photoGallery);
  return (
    <div>
      <div
        class="image-banner"
        style={{
          backgroundImage: `url(${
            data.desktopBanner
              ? getAsset(data.desktopBanner)
              : getAsset(data.image)
          })`,
        }}
      />

      <div class="page-content" style={{ marginTop: '-40px' }}>
        <div class="top-content">
          <div>
            <h1 class="title">{data.title}</h1>
            {data.callout ? <div class="callout">{data.callout}</div> : null}
            {data.showCredits &&
              data.showCredits.map((credit) => {
                return (
                  <p className="credit" key={credit.artist}>
                    {credit.credit} <strong>{credit.artist}</strong>
                  </p>
                );
              })}
            <div
              class="main-content"
              dangerouslySetInnerHTML={{
                __html: markdownParse.render(data.body),
              }}
            />
          </div>
          <div class="tickets-box">
            {data.upcoming ? (
              data.ticketOnSale ? (
                data.ticketLink ? (
                  <a
                    href={data.ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="buy-tickets">Buy Tickets</button>
                  </a>
                ) : (
                  // If it's marked on sale but there's no link.
                  <h2>Tickets On Sale Soon!</h2>
                )
              ) : (
                // If it's not on sale yet, but is upcoming
                <h2>Tickets On Sale Soon!</h2>
              )
            ) : null}
            <div className="dates-location">
              <h2>{data.dates}</h2>
              <h4>at the {data.location}</h4>
              <h3>{data.tagline}</h3>
            </div>
          </div>
        </div>
        {data.photoGallery && data.photoGallery.length ? (
          <div className="section" id="photos">
            <h2 className="section-head">Photos</h2>
            <div class="photo-gallery-container">
              {data.photoGallery.map((photo, index) => {
                return (
                  <img
                    key={photo.id}
                    src={getAsset(photo.image)}
                    className={
                      index === photoActive
                        ? 'photo-gallery-main-image active'
                        : 'photo-gallery-main-image'
                    }
                    style={{ zIndex: index, position: 'absolute' }}
                    alt={photo.altText}
                  />
                );
              })}
            </div>
            <div class="photo-gallery-carousel">
              {data.photoGallery.map((photo, index) => {
                const selected =
                  selectedPhoto.id === photo.id && photoActive === index;
                return (
                  <button
                    key={photo.id}
                    name={photo.id}
                    id={photo.id}
                    onClick={handlePhotoThumbClick}
                  >
                    <img
                      src={getAsset(photo.image)}
                      alt={photo.altText}
                      className={
                        selected
                          ? 'photo-gallery-thumb selected'
                          : 'photo-gallery-thumb'
                      }
                    />
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
        {data.cast && data.cast.length ? (
          <div className="section" id="cast">
            <h2 className="section-head">Cast</h2>
            <div className="artist-grid">
              {data.cast.map((artist) => {
                return (
                  <div className="artist-credit" key={artist.name}>
                    <div className="artist-headshot" />
                    <p className="credit" style={{ fontSize: '14px' }}>
                      <strong className="name">{artist.artist}</strong>
                      <br /> {artist.credit}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
        {data.creativeTeam && data.creativeTeam.length ? (
          <div className="section" id="creative-team">
            <h2 className="section-head">Creative Team</h2>
            <div className="artist-grid">
              {data.creativeTeam.map((artist) => {
                return (
                  <div className="artist-credit" key={artist.artist}>
                    <div className="artist-headshot" />
                    <p className="credit" style={{ fontSize: '14px' }}>
                      <strong className="name">{artist.artist}</strong>
                      <br /> {artist.credit}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
        {sections?.length
          ? sections.map((section) => (
              <div class="section">
                <h2 class="section-head">{section.sectionHead}</h2>
                <div
                  class="main-content"
                  dangerouslySetInnerHTML={{
                    __html: section.content
                      ? markdownParse.render(section.content)
                      : '',
                  }}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default ShowPagePreview;
