import React from 'react';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import {StaticImage} from 'gatsby-plugin-image';
import NavBar from './navbar';

const HeaderStyle = styled.header`
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  align-items: center;
  background: white;
  box-shadow: ${props => props.theme.bs};
  @media (max-width: 1600px) {
    grid-template-columns: 1fr 2fr;
  }
  @media (max-width: 1000px) {
    grid-template-columns: 0.5fr 2fr;
  }
  @media (max-width: 768px) {
    position: sticky;
    top: 0;
    z-index: 999;
  }
`;

const Logo = styled.div`
  width: 128px;
  margin-left: 64px;
  @media (max-width: 1250px) {
    margin-left: 0px;
  }
`;

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(
        relativePath: { eq: "sc-logo-no-background_1.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      navbarData: allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "navbar" } } }
      ) {
        edges {
          node {
            id
            frontmatter {
              menuItems {
                label
                dropdown {
                  label
                  linkURL
                }
              }
            }
          }
        }
      }
    }
  `);

  return (
    <HeaderStyle>
      <Logo>
        <Link to="/">
          <StaticImage src="../images/sc-logo-no-background_1.png" alt="Secondary Characters Logo" />
        </Link>
      </Logo>
      <NavBar navMenuItems={data.navbarData} />
    </HeaderStyle>
  );
};

export default Header;
