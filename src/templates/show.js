import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import Layout from '../components/layout';
import Artist from '../components/artist';
import Seo from '../components/seo';
import { getSize } from '../lib/functions';

export const query = graphql`
  query ($slug: String!) {
    showData: allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          frontmatter {
            upcoming
            title
            callout
            dates
            tagline
            location
            image {
              childImageSharp {
                gatsbyImageData(width: 1600)
              }
              relativePath
            }
            desktopBanner {
              childImageSharp {
                gatsbyImageData(width: 1600)
              }
            }
            showCredits {
              credit
              artist
            }
            ticketLink
            ticketOnSale
            photoGallery {
              id
              image {
                childImageSharp {
                  gatsbyImageData(width: 1600)
                }
              }
              altText
              imageCredit
              imageDescription
            }
            cast {
              credit
              artist
            }
            creativeTeam {
              credit
              artist
            }
            sections {
              sectionHead
              content
            }
          }
          html
          excerpt
        }
      }
    }
  }
`;

const HeroBanner = styled.div`
  width: 100%;
  min-height: 50vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 768px) {
    min-height: 50vh;
  }
`;

const ShowContent = styled.div`
  margin: 0 auto;
  margin-top: -40px;
  background: white;
  border-radius: 16px;
  padding: 16px 32px;
  max-width: 1300px;

  & blockquote {
    background-color: ${(props) => props.theme.grey10};
    padding: 10px;
    & h2,
    h3 {
      color: ${(props) => props.theme.primary5};
    }
  }

  @media (max-width: 900px) {
    margin-top: 0px;
  }
`;

const Section = styled.section`
  padding-bottom: 48px;
  border-bottom: 1px solid ${(props) => props.theme.grey9};
  &:last-child {
    border-bottom: none;
  }
  & .section-head {
    margin: 36px 0px;
    font-size: ${(props) => props.theme.fontSize.subHeading};
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: ${(props) => props.theme.primary3};
    text-transform: uppercase;
  }
`;

const TopContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 85px;
  & .title {
    color: ${(props) => props.theme.grey1};
    font-size: ${(props) => props.theme.fontSize.display};
    font-weight: bold;
    margin: 24px 0px;
    @media (max-width: 768px) {
      font-size: ${(props) => props.theme.fontSize.title};
    }
  }
  & .credit {
    margin: 0;
    line-height: 1.5;
    color: ${(props) => props.theme.grey5};
    @media (max-width: 768px) {
      font-size: ${(props) => props.theme.fontSize.information};
    }
  }
  & .description {
    color: ${(props) => props.theme.grey1};
    margin: 16px 0px;
    max-width: 750px;
    line-height: 2;
  }
  & .mobile-dates {
    display: none;
  }
  @media (max-width: 900px) {
    grid-gap: 48px;
    grid-template-columns: 1fr;
    & .mobile-dates {
      margin: 24px 0px;
      display: inline-flex;
    }
  }
`;

const TicketBoxDesktop = styled.div`
  display: grid;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  background: ${(props) => props.theme.grey10};
  border-radius: 16px;
  max-width: 425px;
  max-height: 300px;
  padding: 24px;
  @media (max-width: 900px) {
    display: none;
  }
  & a {
    display: flex;
    justify-content: center;
  }
`;

const TicketBoxMobile = styled.div`
  background: ${(props) => props.theme.grey10};
  display: none;
  @media (max-width: 900px) {
    display: grid;
    justify-content: center;
    padding: 16px;
  }
`;

const DatesLocation = styled.div`
  & h2,
  h3,
  h4 {
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
  }
  & h2 {
    font-size: ${(props) => props.theme.fontSize.highLevel};
    color: ${(props) => props.theme.grey1};
    @media (max-width: 768px) {
      font-size: ${(props) => props.theme.fontSize.emphasis};
    }
  }
  & h3 {
    margin-top: 32px;
    font-size: ${(props) => props.theme.emphasis};
    color: ${(props) => props.theme.primary3};
  }
  & h4 {
    margin-top: 16px;
    color: ${(props) => props.theme.grey1};
  }
  & .dates-location {
    & a {
      display: inline-block;
    }
  }
  & a {
    display: flex;
    justify-content: center;
  }
`;

const BuyTicketsButton = styled.button`
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  color: ${(props) => props.theme.grey10};
  background: ${(props) => props.theme.warning3};
  border: none;
  padding: 16px 55px;
  min-width: 283px;
  &:hover {
    background: ${(props) => props.theme.warning4};
    cursor: pointer;
  }
`;

const ArtistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 12px;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PhotoGalleryMainImageContainer = styled.div`
  position: relative;
  min-height: 700px;
  margin: 32px 0px;
  overflow: hidden;
  @media (max-width: 768px) {
    min-height: 250px;
  }
`;

const PhotoGalleryMainImage = styled(GatsbyImage)`
  border: 2px solid ${(props) => props.theme.primary5};
  border-radius: 16px;
  opacity: 0;
  visibility: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 1s ease-in-out;
  &.active {
    opacity: 1;
    visibility: visible;
  }
`;

const PhotoGalleryCarousel = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 8px;
  & button {
    display: inline-flex;
    padding: 0;
    border: none;
    background: none;
    width: 100%;
    height: 100%;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const PhotoGalleryThumb = styled(GatsbyImage)`
  border-radius: 16px;
  border: 2px solid ${(props) => props.theme.primary5};
  opacity: 0.5;
  transition: 0.4s linear;
  width: 100%;
  &:hover,
  :focus,
  :active {
    border: 2px solid ${(props) => props.theme.primary3};
    cursor: pointer;
    opacity: 1;
  }
  &.selected {
    opacity: 1;
  }
`;

const Callout = styled.h2`
  padding: 10px 20px;
  font-size: ${(props) => props.theme.fontSize.emphasis};
  border-radius: ${(props) => props.theme.borderRadius};
  background: ${(props) => props.theme.warning3};
  color: ${(props) => props.theme.grey10};
  margin: 20px 0px;
`;

const ShowTemplate = ({ data: { showData } }) => {
  const show = showData.edges[0].node.frontmatter;
  const description = showData.edges[0].node.html;
  const excerpt = showData.edges[0].node.excerpt;

  const [selectedPhoto, setSelectedPhoto] = useState(
    show.photoGallery && show.photoGallery.length ? show.photoGallery[0] : '',
  );
  const [photoActive, setPhotoActive] = useState(0);

  const handlePhotoThumbClick = (e) => {
    trackCustomEvent({
      category: 'show',
      action: 'Gallery',
      label: 'Photo thumb click',
      value: e.currentTarget.id,
    });

    const newImage = show.photoGallery.find((photo) => {
      return photo.id === e.currentTarget.id;
    });
    const newImageIndex = show.photoGallery.findIndex((photo) => {
      return photo.id === e.currentTarget.id;
    });
    if (!newImage) return;
    setPhotoActive(newImageIndex);
    setSelectedPhoto(newImage);
  };

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth) {
      setWindowSize(getSize());
      const handleResize = () => {
        setWindowSize(getSize());
      };
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <Layout>
      <Seo
        title={show.title}
        description={excerpt}
        image={`/img/${show.image.relativePath}`}
      />
      <HeroBanner>
        <GatsbyImage
          image={
            show.desktopBanner && windowSize.width > 768
              ? getImage(show.desktopBanner)
              : getImage(show.image)
          }
          objectFit="cover"
          objectPosition="50% 50%"
          style={{
            width: '100%',
            height: '60vh',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            zIndex: '-1',
          }}
        />
      </HeroBanner>
      {show.upcoming && show.ticketOnSale && show.ticketLink ? (
        <TicketBoxMobile>
          <a href={show.ticketLink}>
            <BuyTicketsButton>Buy Tickets</BuyTicketsButton>
          </a>
        </TicketBoxMobile>
      ) : null}
      <ShowContent>
        <Section>
          <TopContent>
            <div>
              <h1 className="title">{show.title}</h1>
              {show.callout ? <Callout>{show.callout}</Callout> : null}
              {show.showCredits &&
                show.showCredits.map((credit) => {
                  return (
                    <p className="credit" key={credit.artist}>
                      {credit.credit} <strong>{credit.artist}</strong>
                    </p>
                  );
                })}
              <div className="mobile-dates">
                <DatesLocation>
                  <h2>{show.dates}</h2>
                  <h4>at the {show.location}</h4>
                  <h3>{show.tagline}</h3>
                </DatesLocation>
              </div>
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
            <TicketBoxDesktop>
              {show.upcoming ? (
                show.ticketOnSale ? (
                  show.ticketLink ? (
                    <a
                      href={show.ticketLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BuyTicketsButton>Buy Tickets</BuyTicketsButton>
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
              <DatesLocation>
                <h2>{show.dates}</h2>
                <h4>at the {show.location}</h4>
                <h3>{show.tagline}</h3>
              </DatesLocation>
            </TicketBoxDesktop>
          </TopContent>
        </Section>
        {show.photoGallery && show.photoGallery.length ? (
          <Section id="photos">
            <h2 className="section-head">Photos</h2>
            <PhotoGalleryMainImageContainer>
              {show.photoGallery.map((photo, index) => {
                return (
                  <PhotoGalleryMainImage
                    key={photo.id}
                    image={getImage(photo.image)}
                    className={index === photoActive ? 'active' : ''}
                    style={{ zIndex: index, position: 'absolute' }}
                    alt={photo.altText}
                  />
                );
              })}
            </PhotoGalleryMainImageContainer>
            <PhotoGalleryCarousel>
              {show.photoGallery.map((photo, index) => {
                const selected =
                  selectedPhoto.id === photo.id && photoActive === index;
                return (
                  <button
                    key={photo.id}
                    name={photo.id}
                    id={photo.id}
                    onClick={handlePhotoThumbClick}
                  >
                    <PhotoGalleryThumb
                      image={getImage(photo.image)}
                      alt={photo.altText}
                      className={selected ? 'selected' : ''}
                    />
                  </button>
                );
              })}
            </PhotoGalleryCarousel>
          </Section>
        ) : null}
        {show.cast && show.cast.length ? (
          <Section id="cast">
            <h2 className="section-head">Cast</h2>
            <ArtistGrid>
              {show.cast.map((artist) => {
                return <Artist artist={artist} key={artist.artist} />;
              })}
            </ArtistGrid>
          </Section>
        ) : null}
        {show.creativeTeam && show.creativeTeam.length ? (
          <Section id="creative-team">
            <h2 className="section-head">Creative Team</h2>
            <ArtistGrid>
              {show.creativeTeam.map((artist) => {
                return <Artist artist={artist} key={artist.artist} />;
              })}
            </ArtistGrid>
          </Section>
        ) : null}
        {show.sections && show.sections.length
          ? show.sections.map((section) => {
              return (
                <Section
                  key={section.sectionHead}
                  id={encodeURI(section.sectionHead.toLowerCase())}
                >
                  <h2 className="section-head">{section.sectionHead}</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<div> ${section.content} </div>`,
                    }}
                  />
                </Section>
              );
            })
          : null}
      </ShowContent>
    </Layout>
  );
};

export default ShowTemplate;
