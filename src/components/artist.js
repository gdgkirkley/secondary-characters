import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const ArtistCredit = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  & p {
    font-size: ${props => props.theme.fontSize.information};
    & .name {
      font-size: ${props => props.theme.fontSize.reading};
    }
  }
`

const ArtistHeadshot = styled.div`
  height: 150px;
  width: 150px;
  border-radius: ${props => props.theme.borderRadius};
  background: ${props => props.theme.accent5};
  overflow: hidden;
  display: flex;
  align-items: center;
  align-self: center;
  & img {
    width: 150px;
    height: auto;
  }
`

const Artist = ({ artist }) => {
  const data = useStaticQuery(graphql`
    query {
      artists: allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "artist" } } }
      ) {
        edges {
          node {
            frontmatter {
              name
              headshot
            }
            html
          }
        }
      }
    }
  `)

  const foundArtist = data.artists.edges.find(art => {
    return art.node.frontmatter.name === artist.artist
  })

  if (foundArtist) {
    return (
      <ArtistCredit>
        <ArtistHeadshot>
          <img
            src={foundArtist.node.frontmatter.headshot}
            alt={foundArtist.node.frontmatter.name}
          />
        </ArtistHeadshot>
        <p className="credit">
          <strong className="name">{foundArtist.node.frontmatter.name}</strong>
          <br />
          {artist.credit}
        </p>
      </ArtistCredit>
    )
  }

  return (
    <ArtistCredit>
      <ArtistHeadshot />
      <p className="credit">
        <strong className="name">{artist.artist}</strong>
        <br />
        {artist.credit}
      </p>
    </ArtistCredit>
  )
}

export default Artist
