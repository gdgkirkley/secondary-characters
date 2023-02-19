import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const ArtistCredit = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
  background: white;
  border: none;
  & p {
    font-size: ${(props) => props.theme.fontSize.information};
    & .name {
      font-size: ${(props) => props.theme.fontSize.reading};
      margin: 8px 0px;
      line-height: 1.5;
    }
  }
  & button {
    background: white;
    border: 0;
    margin: 0;
    padding: 0;
    color: ${(props) => props.theme.primary5};
    font-size: ${(props) => props.theme.fontSize.information};
    min-height: 20px;
    transition: 0.2s linear;
  }
  &:hover {
    cursor: ${(props) => (props.noHover ? 'inherit' : 'pointer')};
    & .name {
      color: ${(props) =>
        props.noHover ? props.theme.grey3 : props.theme.primary5};
    }
    & button {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  @media (max-width: 768px) {
    max-width: 150px;
    & p {
      word-break: normal;
      & .name {
        word-break: normal;
      }
    }
  }
`;

const ArtistHeadshot = styled.div`
  height: 150px;
  width: 150px;
  border-radius: ${(props) => props.theme.borderRadius};
  background: ${(props) => props.theme.accent5};
  overflow: hidden;
  display: flex;
  align-items: center;
  align-self: center;
  border: 0px solid ${(props) => props.theme.primary5};
  transition: border 0.1s ease-in-out;
  position: relative;

  ${ArtistCredit}:hover & {
    border: ${(props) =>
      props.noHover ? 'none' : `3px solid ${props.theme.primary5}`};
  }
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const ArtistImage = styled(GatsbyImage)`
  object-fit: cover;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const ArtistBioModal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transform: scale(1.1);
  transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
  &.show-modal {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
    transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
  }
  & button {
    &.close-button {
      float: right;
      width: 3rem;
      max-height: 30px;
      min-height: 30px;
      padding: 0;
      line-height: 0.5;
      text-align: center;
      cursor: pointer;
      border-radius: 0.25rem;
      color: white;
      background-color: ${(props) => props.theme.primary5};;
      border: none;
      &:hover {
        background-color: ${(props) => props.theme.primary3};;
      }
      @media (max-width: 768px) {
        width: 24px;
        line-height: 1.5;
      }
    }
  }
`;

const ArtistBioModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 16px;
  min-width: 500px;
  max-height: 80%;
  overflow-y: scroll;
  border-radius: 16px;
  line-height: 2;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
  & h2,
  h3 {
    color: ${(props) => props.theme.grey1};
    margin: 8px 0px;
  }
  @media (max-width: 768px) {
    min-width: 98vw;
    min-height: 50vh;
  }
`;

const Artist = ({ artist }) => {
  const [showModal, setShowModal] = useState(false);

  const data = useStaticQuery(graphql`
    query {
      artists: allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "artist" } } }
      ) {
        edges {
          node {
            frontmatter {
              name
              headshot {
                childImageSharp {
                  gatsbyImageData(width: 200)
                }
              }
            }
            html
          }
        }
      }
    }
  `);

  const toggleBioModal = () => {
    trackCustomEvent({
      category: 'artist',
      action: 'bio',
      label: 'View artist bio',
    });
    setShowModal(!showModal);
  };

  const foundArtist = data.artists.edges.find((art) => {
    return art.node.frontmatter.name === artist.artist;
  });

  if (foundArtist) {
    return (
      <>
        <ArtistCredit onClick={toggleBioModal}>
          <ArtistHeadshot>
            <ArtistImage
              image={getImage(foundArtist.node.frontmatter.headshot)}

            />
          </ArtistHeadshot>
          <p className="credit">
            <strong className="name">
              {foundArtist.node.frontmatter.name}
            </strong>
            <br />
            {artist.credit}
          </p>
          <button>See Bio</button>
        </ArtistCredit>
        <ArtistBioModal className={showModal ? 'show-modal' : ''}>
          <ArtistBioModalContent>
            <button className="close-button" onClick={toggleBioModal}>
              &times;
            </button>
            <h2>{foundArtist.node.frontmatter.name}</h2>
            <h3>{artist.credit}</h3>
            <div dangerouslySetInnerHTML={{ __html: foundArtist.node.html }} />
          </ArtistBioModalContent>
        </ArtistBioModal>
      </>
    );
  }

  return (
    <ArtistCredit noHover={true}>
      <ArtistHeadshot noHover={true} />
      <p className="credit">
        <strong className="name">{artist.artist}</strong>
        <br />
        {artist.credit}
      </p>
    </ArtistCredit>
  );
};

export default Artist;
