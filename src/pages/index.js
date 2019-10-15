import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import EmailBar from "../components/emailbar"
import ShowCard from "../components/showcard"

const HeroBanner = styled.div`
  background: url("${props => props.backgroundImage}");
  background-color: ${props => props.theme.grey1};
  background-size: cover;
  background-position: 50% 35%;
  width: 100%;
  min-height: 60vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 768px) {
    min-height: 50vh;
  }
`

const Titles = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  color: white;
  & h1,
  h3 {
    color: ${props => props.theme.grey10};
    margin: 0 auto;
    box-shadow: ${props => props.theme.bs};
  }
  & h1 {
    font-size: ${props => props.theme.fontSize.display};
    text-transform: uppercase;
    margin-top: 64px;
  }
  & h3 {
    margin-top: 10px;
    width: 350px;
  }
  @media (max-width: 768px) {
    & h1 {
      font-size: ${props => props.theme.fontSize.highLevel};
      text-transform: uppercase;
      margin-top: 36px;
    }
    & h3 {
      font-size: ${props => props.theme.fontSize.reading};
      margin-top: 20px;
      width: 350px;
    }
  }
`

const Shows = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 170px;
  margin: 64px 250px;
  justify-content: space-around;
  align-items: center;
  transition: 0.2s linear;
  @media (max-width: 1600px) {
    grid-gap: 15%;
  }
  @media (max-width: 975px) {
    grid-template-columns: 1fr;
    margin: 64px 0px;
    grid-gap: 64px;
  }
`

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      homePageData: allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "home-page" } } }
      ) {
        edges {
          node {
            frontmatter {
              title
              subtitle
              headerImage {
                image
              }
            }
          }
        }
      }
      showData: allMarkdownRemark(
        filter: {
          frontmatter: { templateKey: { eq: "show" }, upcoming: { eq: true } }
        }
      ) {
        edges {
          node {
            frontmatter {
              title
              dates
              tagline
              image
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const home = data.homePageData.edges[0].node
  return (
    <Layout>
      <SEO title="Home" />
      <HeroBanner backgroundImage={home.frontmatter.headerImage.image}>
        <Titles>
          <h1>{home.frontmatter.title}</h1>
          <h3>{home.frontmatter.subtitle}</h3>
        </Titles>
      </HeroBanner>
      <EmailBar />
      <Shows>
        {data.showData.edges.map(show => (
          <ShowCard show={show.node} key={show.node.frontmatter.title} />
        ))}
      </Shows>
    </Layout>
  )
}

export default IndexPage
