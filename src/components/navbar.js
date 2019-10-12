import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Caret from "./icons/caret"

const NavBarStyle = styled.nav`
  display: flex;
  justify-content: space-evenly;
  margin-right: 64px;
  @media (max-width: 768px) {
    display: none;
  }
  & li {
    font-size: ${props => props.theme.fontSize.subHeading};
    list-style: none;
    color: ${props => props.theme.primary5};
    text-transform: uppercase;
    font-family: "Roboto Condensed";
    font-weight: bold;
    display: flex;
    align-items: center;
    @media (max-width: 1525px) {
      font-size: ${props => props.theme.fontSize.emphasis};
    }
    &:hover {
      cursor: pointer;
      & svg {
        transform: rotate(180deg);
      }
    }
    & svg {
      transform: rotate(0deg);
      color: ${props => props.theme.accent7};
      width: 16px;
      transition: 0.2s linear;
    }
  }
`

const NavBar = props => {
  const { navMenuItems } = props
  return (
    <NavBarStyle>
      {navMenuItems.edges[0].node.frontmatter.menuItems.map(menuItem => {
        return (
          <Link to={menuItem.linkURL} key={menuItem.label}>
            <li>
              {menuItem.label} <Caret />
            </li>
          </Link>
        )
      })}
    </NavBarStyle>
  )
}

export default NavBar
