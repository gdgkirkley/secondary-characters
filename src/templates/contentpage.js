import React from 'react';
import { graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import styled from 'styled-components';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Section from '../components/section';
import showdown from 'showdown';

const converter = new showdown.Converter();

export const query = graphql`
  query ($slug: String!) {
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
              relativePath
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

const HeroBanner = styled(BackgroundImage)`
  background-color: ${(props) => props.theme.accent7};
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
`;

const PageContent = styled.div`
  margin: 0 auto;
  margin-top: ${(props) => (props.inset ? '-40px' : '40px')};
  background: white;
  border-radius: 16px;
  padding: 16px 32px;
  max-width: 1300px;
`;

function ContentPage({ data: { pageData } }) {
  const page = pageData.edges[0].node;
  return (
    <Layout>
      <Seo
        title={page.frontmatter.title}
        description={page.excerpt}
        image={
          page.frontmatter.image &&
          `/img/${page.frontmatter.image.relativePath}`
        }
      />
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
          ? page.frontmatter.sections.map((section) => {
              return (
                <Section
                  key={section.sectionHead}
                  id={encodeURI(section.sectionHead.toLowerCase())}
                >
                  <h1 className="section-head">{section.sectionHead}</h1>
                  <div
                    className="main-content"
                    dangerouslySetInnerHTML={{
                      __html: converter.makeHtml(section.content),
                    }}
                  />
                </Section>
              );
            })
          : null}
      </PageContent>
    </Layout>
  );
}

export default ContentPage;
