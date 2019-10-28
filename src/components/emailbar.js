import React, { useState, useEffect } from "react"
import styled from "styled-components"

const EmailBarStyle = styled.div`
  background-color: ${props => props.theme.accent5};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 8px 0px;
  @media (max-width: 768px) {
    justify-content: center;
    padding: 8px;
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
    padding: 16px 24px;
    width: 380px;
    border-radius: 1000px 0px 0px 1000px;
    font-size: ${props => props.theme.fontSize.reading};
    font-family: "Roboto Condensed", Arial, Helvetica, sans-serif;
    border: none;
    @media (max-width: 768px) {
      width: 300px;
      border-radius: 1000px;
    }
  }
`

const SignUpForm = styled.form`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

const SignUpButton = styled.button`
  border-radius: 0px 1000px 1000px 0px;
  width: 140px;
  border: none;
  border-left: 1px solid ${props => props.theme.grey9};
  background: white;
  color: ${props => props.theme.primary5};
  &:hover {
    cursor: pointer;
    background: ${props => props.theme.primary5};
    color: white;
  }
  @media (max-width: 768px) {
    border-radius: 1000px;
    margin: 16px 0px;
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
      setWindowSize(getSize())
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
      <SignUpForm onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={
            windowSize.width > 768
              ? "Add your email..."
              : "Stay up to date! Add your email..."
          }
        />
        <SignUpButton type="submit">Sign Up!</SignUpButton>
      </SignUpForm>
    </EmailBarStyle>
  )
}

export default EmailBar
