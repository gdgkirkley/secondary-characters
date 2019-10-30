import React from "react"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    pageData: allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          frontmatter {
            title
            showBanner
            image {
              childImageSharp {
                fluid(maxWidth: 1600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            sections {
              sectionHead
              content
              displayButton
            }
          }
          html
        }
      }
    }
  }
`

const HeroBanner = styled(BackgroundImage)`
  background-color: ${props => props.theme.accent7};
  background-size: cover;
  background-position: 50% 50%;
  width: 100%;
  min-height: 50vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: -1;
  @media (max-width: 768px) {
    min-height: 50vh;
  }
`

const PageContent = styled.div`
  margin: 0 auto;
  margin-top: ${props => (props.inset ? "-40px" : "40px")};
  background: white;
  border-radius: 16px;
  padding: 16px 32px;
  max-width: 1300px;
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
  & .main-content {
    line-height: 2;
  }
`

export const ContentPageTemplate = ({ frontmatter, html }) => (
  <Layout>
    <SEO title={frontmatter.title} />
    {frontmatter.showBanner ? (
      <HeroBanner
        fluid={frontmatter.image && frontmatter.image.childImageSharp.fluid}
      />
    ) : null}
    <PageContent inset={frontmatter.showBanner}>
      <Section>
        <h1 className="section-head">{frontmatter.title}</h1>
        <div
          className="main-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Section>
      {frontmatter.sections && frontmatter.sections.length
        ? frontmatter.sections.map(section => {
            return (
              <Section key={section.sectionHead}>
                <h1 className="section-head">{section.sectionHead}</h1>
                <div
                  className="main-content"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </Section>
            )
          })
        : null}
    </PageContent>
  </Layout>
)

const ContentPage = ({ data: { pageData } }) => {
  const page = pageData.edges[0].node
  return (
    <Layout>
      <SEO title={page.frontmatter.title} />
      {page.frontmatter.showBanner ? (
        <HeroBanner
          fluid={
            page.frontmatter.image &&
            page.frontmatter.image.childImageSharp.fluid
          }
        />
      ) : null}
      <PageContent inset={page.frontmatter.showBanner}>
        <Section>
          <h1 className="section-head">{page.frontmatter.title}</h1>
          <div
            className="main-content"
            dangerouslySetInnerHTML={{ __html: page.html }}
          />
        </Section>
        {page.frontmatter.sections && page.frontmatter.sections.length
          ? page.frontmatter.sections.map(section => {
              return (
                <Section key={section.sectionHead}>
                  <h1 className="section-head">{section.sectionHead}</h1>
                  <div
                    className="main-content"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </Section>
              )
            })
          : null}
      </PageContent>
    </Layout>
  )
}

export default ContentPage
