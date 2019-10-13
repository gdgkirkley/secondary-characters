import React from "react"
import { graphql } from "gatsby"
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
            image
            showCredits {
              credit
              artist
            }
            ticketLink
            creativeTeam {
              credit
              artist
            }
          }
          html
        }
      }
    }
  }
`

const HeroBanner = styled.div`
  background: url("${props => props.backgroundImage}");
  background-size: cover;
  background-position: 50% 50%;
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
  @media (max-width: 768px) {
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
  & h2,
  h3,
  h4 {
    font-family: "Roboto", Arial, Helvetica, sans-serif;
  }
  & h2 {
    font-size: ${props => props.theme.fontSize.subHeading};
    color: ${props => props.theme.grey1};
  }
  & h3 {
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
`

const ShowTemplate = ({ data: { showData } }) => {
  const show = showData.edges[0].node.frontmatter
  const description = showData.edges[0].node.html
  return (
    <Layout>
      <SEO title={show.title} />
      <HeroBanner backgroundImage={show.image} />
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
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
            <TicketBoxDesktop>
              <a href={show.ticketLink}>
                <BuyTicketsButton>Buy Tickets</BuyTicketsButton>
              </a>
              <div className="dates-location">
                <h2>{show.dates}</h2>
                <h4>at the {show.location}</h4>
              </div>
              <h3>{show.tagline}</h3>
            </TicketBoxDesktop>
          </TopContent>
        </Section>
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
      </ShowContent>
    </Layout>
  )
}

export default ShowTemplate
