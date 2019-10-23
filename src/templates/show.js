import React, { useState } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import Layout from "../components/layout"
import Artist from "../components/artist"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    showData: allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          frontmatter {
            title
            dates
            tagline
            location
            image {
              childImageSharp {
                fluid(maxWidth: 1600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            showCredits {
              credit
              artist
            }
            ticketLink
            photoGallery {
              id
              image {
                childImageSharp {
                  fluid(maxWidth: 1600) {
                    ...GatsbyImageSharpFluid
                  }
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
        }
      }
    }
  }
`

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
`

const ShowContent = styled.div`
  margin: 0 auto;
  margin-top: -40px;
  background: white;
  border-radius: 16px;
  padding: 16px 32px;
  max-width: 1300px;
  @media (max-width: 900px) {
    margin-top: 0px;
  }
`

const Section = styled.section`
  padding-bottom: 48px;
  border-bottom: 1px solid ${props => props.theme.grey9};
  &:last-child {
    border-bottom: none;
  }
  & .section-head {
    margin: 36px 0px;
    font-size: ${props => props.theme.fontSize.subHeading};
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: ${props => props.theme.primary3};
    text-transform: uppercase;
  }
`

const TopContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 85px;
  & .title {
    color: ${props => props.theme.grey1};
    font-size: ${props => props.theme.fontSize.display};
    font-weight: bold;
    margin: 24px 0px;
  }
  & .credit {
    margin: 0;
    line-height: 1.5;
    color: ${props => props.theme.grey5};
  }
  & .description {
    color: ${props => props.theme.grey1};
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
`

const TicketBoxDesktop = styled.div`
  display: grid;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  background: ${props => props.theme.grey10};
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
`

const TicketBoxMobile = styled.div`
  background: ${props => props.theme.grey10};
  display: none;
  @media (max-width: 900px) {
    display: grid;
    justify-content: center;
    padding: 16px;
  }
`

const DatesLocation = styled.div`
  & h2,
  h3,
  h4 {
    font-family: "Roboto", Arial, Helvetica, sans-serif;
  }
  & h2 {
    font-size: ${props => props.theme.fontSize.highLevel};
    color: ${props => props.theme.grey1};
  }
  & h3 {
    margin-top: 32px;
    font-size: ${props => props.theme.emphasis};
    color: ${props => props.theme.primary3};
  }
  & h4 {
    margin-top: 16px;
    color: ${props => props.theme.grey1};
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
`

const BuyTicketsButton = styled.button`
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  color: ${props => props.theme.grey10};
  background: ${props => props.theme.warning3};
  border: none;
  padding: 16px 55px;
  min-width: 283px;
  &:hover {
    background: ${props => props.theme.warning4};
    cursor: pointer;
  }
`

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
`

const PhotoGalleryMainImageContainer = styled.div`
  position: relative;
  min-height: 700px;
  margin: 32px 0px;
  overflow: hidden;
`

const PhotoGalleryMainImage = styled(Img)`
  border: 2px solid ${props => props.theme.primary5};
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
`

const PhotoGalleryCarousel = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  grid-gap: 8px;
  & button {
    display: inline-flex;
    padding: 0;
    border: none;
    background: none;
    width: 100%;
    height: 100%;
  }
`

const PhotoGalleryThumb = styled(Img)`
  border-radius: 16px;
  border: 2px solid ${props => props.theme.primary5};
  opacity: 0.5;
  transition: 0.4s linear;
  width: 100%;
  &:hover,
  :focus,
  :active {
    border: 2px solid ${props => props.theme.primary3};
    cursor: pointer;
    opacity: 1;
  }
  &.selected {
    opacity: 1;
  }
`

const ShowTemplate = ({ data: { showData } }) => {
  const show = showData.edges[0].node.frontmatter
  const description = showData.edges[0].node.html

  const [selectedPhoto, setSelectedPhoto] = useState(
    show.photoGallery && show.photoGallery.length ? show.photoGallery[0] : ""
  )
  const [photoActive, setPhotoActive] = useState(0)

  const handlePhotoThumbClick = e => {
    const newImage = show.photoGallery.find(photo => {
      return photo.id === e.currentTarget.id
    })
    const newImageIndex = show.photoGallery.findIndex(photo => {
      return photo.id === e.currentTarget.id
    })
    if (!newImage) return
    setPhotoActive(newImageIndex)
    setSelectedPhoto(newImage)
  }

  return (
    <Layout>
      <SEO title={show.title} />
      <HeroBanner>
        <Img
          fluid={show.image.childImageSharp.fluid}
          objectFit="cover"
          objectPosition="50% 50%"
          style={{
            width: "100%",
            height: "50vh",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            zIndex: "-1",
          }}
        />
      </HeroBanner>
      {show.ticketLink ? (
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
              {show.showCredits.map(credit => {
                return (
                  <p className="credit" key={credit.artist}>
                    {credit.credit} <strong>{credit.artist}</strong>
                  </p>
                )
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
              {show.ticketLink ? (
                <a
                  href={show.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BuyTicketsButton>Buy Tickets</BuyTicketsButton>
                </a>
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
          <Section>
            <h2 className="section-head">Photos</h2>
            <PhotoGalleryMainImageContainer>
              {show.photoGallery.map((photo, index) => {
                return (
                  <PhotoGalleryMainImage
                    key={photo.id}
                    fluid={photo.image.childImageSharp.fluid}
                    className={index === photoActive ? "active" : ""}
                    style={{ zIndex: index, position: "absolute" }}
                    alt={photo.altText}
                  />
                )
              })}
            </PhotoGalleryMainImageContainer>
            <PhotoGalleryCarousel>
              {show.photoGallery.map((photo, index) => {
                const selected =
                  selectedPhoto.id === photo.id && photoActive === index
                return (
                  <button
                    key={photo.id}
                    name={photo.id}
                    id={photo.id}
                    onClick={handlePhotoThumbClick}
                  >
                    <PhotoGalleryThumb
                      fluid={photo.image.childImageSharp.fluid}
                      alt={photo.altText}
                      className={selected ? "selected" : ""}
                    />
                  </button>
                )
              })}
            </PhotoGalleryCarousel>
          </Section>
        ) : null}
        {show.cast && show.cast.length ? (
          <Section>
            <h2 className="section-head">Cast</h2>
            <ArtistGrid>
              {show.cast.map(artist => {
                return <Artist artist={artist} key={artist.artist} />
              })}
            </ArtistGrid>
          </Section>
        ) : null}
        {show.creativeTeam.length ? (
          <Section>
            <h2 className="section-head">Creative Team</h2>
            <ArtistGrid>
              {show.creativeTeam.map(artist => {
                return <Artist artist={artist} key={artist.artist} />
              })}
            </ArtistGrid>
          </Section>
        ) : null}
        {show.sections && show.sections.length
          ? show.sections.map(section => {
              return (
                <Section>
                  <h2 className="section-head">{section.sectionHead}</h2>
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                </Section>
              )
            })
          : null}
      </ShowContent>
    </Layout>
  )
}

export default ShowTemplate
