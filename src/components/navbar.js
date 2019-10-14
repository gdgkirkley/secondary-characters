import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Caret from "./icons/caret"
import Bars from "./icons/bars"

const NavBarStyle = styled.nav`
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 768px) {
    justify-content: flex-end;
  }
  & .bars {
    display: none;
    @media (max-width: 758px) {
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
    margin-right: 64px;
    width: 100%;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      z-index: 999;
      height: 90vh;
      width: 100%;
      position: absolute;
      top: 80px;
      background: white;
      margin-right: 0px;
      opacity: 0;
      transition: 0.4s ease-in-out;
      &.open {
        opacity: 1;
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
