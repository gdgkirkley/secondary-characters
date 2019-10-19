import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"

const ShowCardStyle = styled.div`
  display: grid;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const ShowImage = styled(BackgroundImage)`
  background-size: cover;
  background-position: 50% 50%;
  min-height: 430px;
  min-width: 570px;
  overflow: hidden;
  z-index: -1;
  @media (max-width: 1600px) {
    min-width: 40vw;
  }
`

const ShowTitle = styled.div`
  margin-top: -35px;
  margin-left: -10px;
  & h1 {
    color: ${props => props.theme.primary3};
    text-transform: uppercase;
    padding: 8px 32px;
    width: fit-content;
    border-radius: ${props => props.theme.borderRadius};
    background-color: ${props => props.theme.primary9};
    margin: 0;
  }
`

const ShowInfo = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-gap: 16px;
  align-items: center;
  padding: 0px 16px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const DateTag = styled.div`
  margin-top: 24px;
  & h3 {
    color: ${props => props.theme.grey1};
    font-size: ${props => props.theme.fontSize.emphasis};
  }
  & .tag {
    color: ${props => props.theme.grey2};
  }
`

const TicketButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${props => props.theme.borderRadius};
  border: 1px solid ${props => props.theme.primary5};
  font-size: ${props => props.theme.fontSize.emphasis};
  font-family: "Roboto Condensed", sans-serif;
  font-weight: bold;
  color: ${props => props.theme.primary4};
  min-height: 65px;
  transition: 0.4s linear;
  &:hover {
    background: ${props => props.theme.primary4};
    color: ${props => props.theme.grey10};
    cursor: pointer;
  }
`

const ShowCard = ({ show }) => {
  return (
    <Link to={show.fields.slug}>
      <ShowCardStyle>
        <ShowImage fluid={show.frontmatter.image.childImageSharp.fluid} />
        <ShowTitle>
          <h1>{show.frontmatter.title}</h1>
        </ShowTitle>
        <ShowInfo>
          <DateTag>
            <h3>Coming {show.frontmatter.dates}</h3>
            <p className="tag">{show.frontmatter.tagline}</p>
          </DateTag>
          <TicketButton>Tickets & Info</TicketButton>
        </ShowInfo>
      </ShowCardStyle>
    </Link>
  )
}

export default ShowCard
