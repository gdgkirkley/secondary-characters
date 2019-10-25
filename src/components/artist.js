import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

const ArtistCredit = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  & p {
    font-size: ${props => props.theme.fontSize.information};
    & .name {
      font-size: ${props => props.theme.fontSize.reading};
      margin: 4px 0px;
    }
  }
  &:hover {
    cursor: ${props => (props.noHover ? "inherit" : "pointer")};
    & .name {
      color: ${props => props.theme.primary5};
    }
  }
`

const ArtistHeadshot = styled.div`
  height: 150px;
  width: 150px;
  border-radius: ${props => props.theme.borderRadius};
  background: ${props => props.theme.accent5};
  overflow: hidden;
  display: flex;
  align-items: center;
  align-self: center;
  border: 0px solid ${props => props.theme.primary5};
  transition: border 0.1s ease-in-out;

  ${ArtistCredit}:hover & {
    border: ${props =>
      props.noHover ? "none" : `3px solid ${props.theme.primary5}`};
  }
  @media (max-width: 400px) {
    width: 100px;
    height: 100px;
  }
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
  & span {
    &.close-button {
      float: right;
      width: 1.5rem;
      line-height: 1.5rem;
      text-align: center;
      cursor: pointer;
      border-radius: 0.25rem;
      background-color: lightgray;
      &:hover {
        background-color: darkgrey;
      }
      @media (max-width: 768px) {
        width: 24px;
        line-height: 1.5;
      }
    }
  }
`

const ArtistBioModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 16px;
  min-width: 500px;
  border-radius: 16px;
  & h2,
  h3 {
    color: ${props => props.theme.grey1};
    margin: 8px 0px;
  }
  @media (max-width: 768px) {
    min-width: 98vw;
    min-height: 50vh;
  }
`

const Artist = ({ artist }) => {
  const [showModal, setShowModal] = useState(false)

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
                  fluid(maxWidth: 150) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            html
          }
        }
      }
    }
  `)

  const toggleBioModal = () => {
    setShowModal(!showModal)
  }

  const foundArtist = data.artists.edges.find(art => {
    return art.node.frontmatter.name === artist.artist
  })

  if (foundArtist) {
    return (
      <>
        <ArtistCredit onClick={toggleBioModal}>
          <ArtistHeadshot>
            <Img
              fluid={
                foundArtist.node.frontmatter.headshot.childImageSharp.fluid
              }
              style={{ width: "150px" }}
            />
          </ArtistHeadshot>
          <p className="credit">
            <strong className="name">
              {foundArtist.node.frontmatter.name}
            </strong>
            <br />
            {artist.credit}
          </p>
        </ArtistCredit>
        <ArtistBioModal className={showModal ? "show-modal" : ""}>
          <ArtistBioModalContent>
            <span className="close-button" onClick={toggleBioModal}>
              &times;
            </span>
            <h2>{foundArtist.node.frontmatter.name}</h2>
            <h3>{artist.credit}</h3>
            <div dangerouslySetInnerHTML={{ __html: foundArtist.node.html }} />
          </ArtistBioModalContent>
        </ArtistBioModal>
      </>
    )
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
  )
}

export default Artist
