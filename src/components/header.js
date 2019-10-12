import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import NavBar from "./navbar"

const HeaderStyle = styled.header`
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  align-items: center;
  box-shadow: ${props => props.theme.bs};
`

const Logo = styled.div`
  width: 128px;
  margin-left: 64px;
  @media (max-width: 768px) {
    margin-left: 0px;
  }
`

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
                linkType
                linkURL
              }
            }
          }
        }
      }
    }
  `)

  return (
    <HeaderStyle>
      <Logo>
        <Link to="/">
          <Img fluid={data.placeholderImage.childImageSharp.fluid} />
        </Link>
      </Logo>
      <NavBar navMenuItems={data.navbarData} />
    </HeaderStyle>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
