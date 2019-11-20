import React from 'react';
import { graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import styled from 'styled-components';
import Layout from '../components/layout';
import ContactForm from '../components/contactform';
import DonateForm from '../components/donateform';
import SEO from '../components/seo';
import VolunteerForm from '../components/volunteerform';
import AuditionForm from '../components/auditionform';

export const query = graphql`
  query($slug: String!) {
    pageData: allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          frontmatter {
            title
            pageForm
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
          excerpt
        }
      }
    }
  }
`;

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
`;

const PageContent = styled.div`
  margin: 0 auto;
  margin-top: ${props => (props.inset ? '-40px' : '40px')};
  background: white;
  border-radius: 16px;
  padding: 16px 32px;
  max-width: 1300px;
  @media (max-width: 768px) {
    padding: 16px 32px;
    max-width: 768px;
  }
`;

const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 92px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.section`
  padding-bottom: 48px;
  border-bottom: 1px solid ${props => props.theme.grey9};
  &:last-child {
    border-bottom: none;
  }
  &.head {
    border-bottom: none;
    padding-bottom: 0px;
  }
  & .section-head {
    margin: 36px 0px;
    font-size: ${props => props.theme.fontSize.subHeading};
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: ${props => props.theme.primary3};
    text-transform: uppercase;
  }
  & .main-content {
    line-height: 2;
  }
`;

const FormPage = ({ data: { pageData } }) => {
  const page = pageData.edges[0].node;
  const components = {
    contactform: ContactForm,
    donateform: DonateForm,
    volunteerform: VolunteerForm,
    auditionform: AuditionForm,
  };
  const Tag = components[page.frontmatter.pageForm];
  return (
    <Layout>
      <SEO
        title={page.frontmatter.title}
        description={page.excerpt}
        image={
          page.frontmatter.showBanner &&
          page.frontmatter.image.childImageSharp.fluid.src
        }
      />
      {page.frontmatter.showBanner ? (
        <HeroBanner fluid={page.frontmatter.image.childImageSharp.fluid} />
      ) : null}
      <PageContent inset={page.frontmatter.showBanner}>
        <Section className="head">
          <h1 className="section-head">{page.frontmatter.title}</h1>
        </Section>
        <TwoColumn>
          <Section>
            <div>{page.frontmatter.pageForm && <Tag />}</div>
          </Section>
          <Section>
            <div
              className="main-content"
              dangerouslySetInnerHTML={{ __html: page.html }}
            />
          </Section>
        </TwoColumn>
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
              );
            })
          : null}
      </PageContent>
    </Layout>
  );
};

export default FormPage;
