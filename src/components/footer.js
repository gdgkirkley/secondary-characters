import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Facebook from "./icons/facebook"
import Instagram from "./icons/instagram"
import Email from "./icons/email"

const DonateBar = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 0px 128px;
  background-color: ${props => props.theme.primary5};
`

const DonateContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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
    @media (max-width: 758px) {
      bottom: -250px;
    }
  }
`

const FooterNav = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0px 128px;
  padding: 48px 64px;
  @media (max-width: 758px) {
    grid-template-columns: 1fr;
    margin: 0;
  }
`

const LeftMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const SocialLinks = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const SocialBg = styled.div`
  width: 70px;
  height: 70px;
  background: ${props => props.theme.primary3};
  border-radius: ${props => props.theme.borderRadius};
  transition: 0.2s linear;
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
`

const Trademark = styled.p`
  font-size: ${props => props.theme.fontSize.information};
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
    <div>
      <DonateBar>
        <DonateContent>
          <button>Donate Now</button>
          <h1>{footer.donateMessage}</h1>
        </DonateContent>
      </DonateBar>
      <FooterStyle>
        <FooterNav>
          <LeftMenu>
            {footer.leftMenu.map(menuItem => {
              return <h3 key={menuItem.label}>{menuItem.label}</h3>
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
                <SocialBg>
                  <Tag />
                </SocialBg>
              )
            })}
          </SocialLinks>
          <RightMenu>
            {footer.rightMenu.map(menuItem => {
              return <h3 key={menuItem.label}>{menuItem.label}</h3>
            })}
          </RightMenu>
        </FooterNav>
        <Trademark>{footer.trademark}</Trademark>
      </FooterStyle>
    </div>
  )
}

export default Footer
