import React, { useState, useEffect } from "react"
import styled from "styled-components"

const EmailBarStyle = styled.div`
  background-color: ${props => props.theme.accent5};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 8px 0px;
  @media (max-width: 768px) {
    flex-direction: column;
    & h2 {
      display: none;
    }
  }
  & h2 {
    color: ${props => props.theme.grey10};
    font-size: ${props => props.theme.fontSize.title};
    font-weight: bold;
    text-transform: uppercase;
    margin: 0;
  }
  & input {
    padding: 16px;
    width: 380px;
    border-radius: ${props => props.theme.borderRadius};
    border: none;
  }
`

const EmailBar = () => {
  const getSize = () => {
    if (typeof window !== "undefined" && window.innerWidth) {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    }
    return null
  }

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth) {
      const handleResize = () => {
        setWindowSize(getSize())
      }
      window.addEventListener("resize", handleResize)

      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <EmailBarStyle>
      <h2>Stay up to date!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={
            windowSize.width > 768
              ? "Add your email"
              : "Stay up to date! Add your email"
          }
        />
      </form>
    </EmailBarStyle>
  )
}

export default EmailBar
