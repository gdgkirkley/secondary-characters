import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Caret from "./icons/caret"
import Bars from "./icons/bars"

const NavBarStyle = styled.nav`
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 865px) {
    justify-content: flex-end;
  }
  & .bars {
    display: none;
    @media (max-width: 865px) {
      display: inline-flex;
      margin-right: 32px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  & ul {
    display: flex;
    justify-content: space-evenly;
    margin: 0;
    margin-right: 64px;
    width: 100%;
    @media (max-width: 1600px) {
      margin-right: 0px;
    }
    @media (max-width: 865px) {
      flex-direction: column;
      align-items: center;
      z-index: 999;
      position: fixed;
      top: 95px;
      right: 0;
      bottom: 0;
      background: white;
      margin-right: 0px;
      visibility: hidden;
      opacity: 0;
      transition: all 200ms;
      overflow: auto;
      &.open {
        visibility: visible;
        opacity: 1;
        & body {
          position: fixed;
        }
      }
    }
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
    @media (max-width: 1600px) {
      font-size: ${props => props.theme.fontSize.emphasis};
    }
    @media (max-width: 865px) {
      font-size: ${props => props.theme.fontSize.subHeading};
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
  const [open, setOpen] = useState(false)
  const { navMenuItems } = props

  const handleToggle = () => {
    console.log("Clicking")
    setOpen(!open)
  }

  return (
    <NavBarStyle>
      <Bars className="bars" onClick={handleToggle} />
      <ul className={open ? "open" : ""}>
        {navMenuItems.edges[0].node.frontmatter.menuItems.map(menuItem => {
          return (
            <Link to={menuItem.linkURL} key={menuItem.label}>
              <li>
                {menuItem.label} <Caret />
              </li>
            </Link>
          )
        })}
      </ul>
    </NavBarStyle>
  )
}

export default NavBar
