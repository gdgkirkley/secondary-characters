import React, { useState, useEffect, useRef } from "react"
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
`

const TopMenu = styled.ul`
  display: flex;
  justify-content: space-evenly;
  margin: 0;
  margin-right: 64px;
  width: 100%;
  z-index: 999;
  @media (max-width: 1600px) {
    margin-right: 16px;
  }
  @media (max-width: 865px) {
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 95px;
    right: 0;
    bottom: 0;
    background: white;
    margin-right: 0px;
    padding: 0;
    visibility: hidden;
    opacity: 0;
    transition: all 200ms;
    overflow: auto;
    &.open {
      visibility: visible;
      opacity: 1;
    }
  }
`

const DropMenu = styled.ul`
  display: flex;
  flex-direction: column;
  justify-items: center;
  text-align: center;
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translate(-50%, 0%);
  width: calc(100% + 60px);
  background: white;
  border: 1px solid ${props => props.theme.grey6};
  border-radius: 16px;
  padding: 16px 24px;
  list-style: none;
  visibility: hidden;
  opacity: 0;
  transition: 0.2s ease-in-out;
  @media (max-width: 1600px) {
    width: calc(100% + 100px);
  }
  @media (max-width: 865px) {
    display: inline-flex;
    position: initial;
    width: 100%;
    transform: none;
    border: none;
    height: 0;
    padding: 0;
    &.open {
      padding: 16px 24px;
      height: auto;
    }
  }
  & li {
    word-wrap: none;
    font-size: ${props => props.theme.fontSize.emphasis};
    line-height: 2;
  }
  & a {
    color: ${props => props.theme.primary5};
    & :hover {
      color: ${props => props.theme.primary4};
    }
  }
  &.open {
    visibility: visible;
    opacity: 1;
  }
`

const TopMenuItem = styled.li`
  font-size: ${props => props.theme.fontSize.subHeading};
  list-style: none;
  color: ${props => props.theme.primary5};
  text-transform: uppercase;
  font-family: "Roboto Condensed";
  font-weight: bold;
  display: flex;
  align-items: center;
  position: relative;
  transition: 0.2s ease-in-out;
  @media (max-width: 1600px) {
    font-size: ${props => props.theme.fontSize.emphasis};
  }
  @media (max-width: 865px) {
    flex-direction: column;
    font-size: ${props => props.theme.fontSize.subHeading};
    & svg {
      display: none;
    }
    &.open {
      &:after,
      :before {
        display: none;
      }
    }
  }
  &:focus {
    text-decoration: underline;
    outline: none;
  }
  &:hover {
    color: ${props => props.theme.primary4};
    outline: none;
    cursor: pointer;
    & svg {
      transform: rotate(0deg);
    }
  }
  &.open {
    &:after,
    :before {
      content: "";
      position: absolute;
      left: 50%;
      bottom: -28px;
      -webkit-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      transform: translateX(-50%);
      border-left: 14px solid transparent;
      border-right: 14px solid transparent;
      border-bottom: 14px solid #fff;
      width: 0;
      height: 0;
      @media (max-width: 1600px) {
        bottom: -36px;
      }
    }
    &:before {
      border-left: 16px solid transparent;
      border-right: 16px solid transparent;
      border-bottom: 16px solid ${props => props.theme.grey7};
      -webkit-animation: 0.6s ArrowIn 1;
      animation: 0.6s ArrowIn 1;
      transition: 0.4s ease-in-out;
    }
  }
  & svg {
    transform: rotate(-90deg);
    color: ${props => props.theme.accent7};
    width: 16px;
    height: 100%;
    transition: 0.2s linear;
  }
`

const NavBar = props => {
  const { navMenuItems } = props
  const [open, setOpen] = useState(false)
  const [dropMenus, setDropMenus] = useState({})

  const outer = useRef()

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [])

  const handleOutsideClick = e => {
    if (outer.current.contains(e.target)) {
      return
    }
    setDropMenus({})
  }

  const handleToggle = () => {
    setOpen(!open)
  }

  const handleMenuItemClick = e => {
    if (e.keyCode && e.keyCode !== 13) return
    setDropMenus({
      [e.target.id]: !dropMenus[e.target.id],
    })
  }

  return (
    <NavBarStyle>
      <Bars className="bars" onClick={handleToggle} />
      <TopMenu className={open ? "open" : ""} ref={outer}>
        {navMenuItems.edges[0].node.frontmatter.menuItems.map(menuItem => {
          return (
            <TopMenuItem
              onClick={handleMenuItemClick}
              onKeyDown={handleMenuItemClick}
              id={menuItem.label}
              key={menuItem.label}
              className={dropMenus[menuItem.label] ? "open" : ""}
              tabIndex="0"
            >
              {menuItem.label}{" "}
              <Caret id={menuItem.label} onClick={handleMenuItemClick} />
              {menuItem.dropdown.length ? (
                <DropMenu className={dropMenus[menuItem.label] ? "open" : ""}>
                  {menuItem.dropdown.map(dropItem => {
                    const beginLinkRegex = /^..\//
                    const fixedLink = dropItem.linkURL.replace(
                      beginLinkRegex,
                      "/"
                    )
                    return (
                      <Link to={fixedLink} key={dropItem.label}>
                        <li>{dropItem.label}</li>
                      </Link>
                    )
                  })}
                </DropMenu>
              ) : null}
            </TopMenuItem>
          )
        })}
      </TopMenu>
    </NavBarStyle>
  )
}

export default NavBar
