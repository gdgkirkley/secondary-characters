import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import Facebook from "./icons/facebook"
import Instagram from "./icons/instagram"
import Email from "./icons/email"

const DonateBar = styled.div`
  display: flex;
  /*
  grid-template-columns: 1fr; 
  */
  padding: 16px 128px;
  background-color: ${props => props.theme.primary5};
  @media (max-width: 768px) {
    padding: 48px 20px;
  }
`

const DonateContent = styled.div`
  display: flex;
  /*grid-template-columns: 1fr 1fr; */
  width: 100%;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 1200px) {
    flex-direction: column-reverse;
    text-align: center;
    & h1 {
      padding: 16px 0px;
    }
  }
  & h1 {
    color: ${props => props.theme.grey10};
  }
  & button {
    border: none;
    background: ${props => props.theme.grey10};
    color: ${props => props.theme.primary4};
    text-transform: uppercase;
    font-family: "Roboto Condensed", sans-serif;
    font-size: ${props => props.theme.fontSize.emphasis};
    font-weight: bold;
    border-radius: ${props => props.theme.borderRadius};
    height: 55px;
    min-width: 300px;
    transition: 0.2s linear;
    &:hover {
      color: ${props => props.theme.grey10};
      background: ${props => props.theme.warning3};
      cursor: pointer;
    }
  }
`

const FooterStyle = styled.footer`
  display: grid;
  align-items: center;
  background: ${props => props.theme.grey2};
  position: relative;
  overflow: hidden;
  text-align: center;
  color: ${props => props.theme.grey10};
  z-index: 1;
  & h3 {
    color: ${props => props.theme.grey10};
    margin: 0;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
  }
  &:after {
    content: "";
    min-width: 300px;
    min-height: 300px;
    transform: rotate(40deg);
    background: ${props => props.theme.accent7};
    position: absolute;
    bottom: -150px;
    right: -180px;
    @media (max-width: 1200px) {
      bottom: -250px;
    }
  }
`

const FooterNav = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 48px 64px;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    grid-gap: 32px;
    padding: 48px 0px;
  }
`

const LeftMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`

const SocialLinks = styled.div`
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 1200px) {
    justify-content: center;
  }
`

const SocialBg = styled.div`
  width: 70px;
  height: 70px;
  background: ${props => props.theme.primary3};
  border-radius: ${props => props.theme.borderRadius};
  transition: 0.2s linear;
  margin: 0px 16px;
  & svg {
    width: 40px;
    height: 100%;
    color: ${props => props.theme.grey10};
  }
  &:hover {
    background: ${props => props.theme.primary4};
    cursor: pointer;
  }
`

const RightMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
`

const Trademark = styled.p`
  line-height: 1.5;
  font-size: ${props => props.theme.fontSize.information};
  @media (max-width: 1200px) {
    justify-self: center;
    width: 250px;
    margin-bottom: 90px;
  }
`

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      footer: allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "footer" } } }
      ) {
        edges {
          node {
            frontmatter {
              donateMessage
              donateLink
              leftMenu {
                label
                linkURL
              }
              rightMenu {
                label
                linkURL
              }
              socialLinks {
                icon
                link
              }
              trademark
            }
          }
        }
      }
    }
  `)
  const footer = data.footer.edges[0].node.frontmatter
  return (
    <>
      <DonateBar>
        <DonateContent>
          <Link to={footer.donateLink}>
            <button>Donate Now</button>
          </Link>
          <h1>{footer.donateMessage}</h1>
        </DonateContent>
      </DonateBar>
      <FooterStyle>
        <FooterNav>
          <LeftMenu>
            {footer.leftMenu.map(menuItem => {
              const beginLinkRegex = /^..\//
              const fixedLink = menuItem.linkURL.replace(beginLinkRegex, "/")
              return (
                <Link to={fixedLink} key={menuItem.label}>
                  <h3>{menuItem.label}</h3>
                </Link>
              )
            })}
          </LeftMenu>
          <SocialLinks>
            {footer.socialLinks.map(social => {
              const components = {
                Facebook: Facebook,
                Instagram: Instagram,
                Email: Email,
              }
              const Tag = components[social.icon]
              return (
                <a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={social.icon}
                >
                  <SocialBg>
                    <Tag />
                  </SocialBg>
                </a>
              )
            })}
          </SocialLinks>
          <RightMenu>
            {footer.rightMenu.map(menuItem => {
              const beginLinkRegex = /^..\//
              const fixedLink = menuItem.linkURL.replace(beginLinkRegex, "/")
              return (
                <Link to={fixedLink} key={menuItem.label}>
                  <h3>{menuItem.label}</h3>
                </Link>
              )
            })}
          </RightMenu>
        </FooterNav>
        <Trademark>
          Secondary Characters Musical Theatre Society ©{" "}
          {new Date().getFullYear()}. A registered non-profit. Website by
          Gabriel Kirkley.
        </Trademark>
      </FooterStyle>
    </>
  )
}

export default Footer
