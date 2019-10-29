import React, { useState, useEffect } from "react"
import styled from "styled-components"
import addToMailchimp from "gatsby-plugin-mailchimp"

const EmailBarStyle = styled.div`
  background-color: ${props => props.theme.accent5};
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 170px;
  padding: 8px 64px;
  justify-content: center;
  align-items: center;
  @media (max-width: 1250px) {
    grid-gap: 20px;
  }
  @media (max-width: 950px) {
    grid-template-columns: 1fr;
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
    text-align: center;
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
  position: relative;
  justify-self: center;
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

const SuccessMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60px;
  min-width: 60px;
  padding: 8px 16px;
  border-radius: 16px;
  position: absolute;
  bottom: 60px;
  right: 0;
  z-index: 2;
  background: white;
  transition: 1s ease-in-out;
  opacity: 0;
  visibility: hidden;
  &.display {
    opacity: 1;
    visibility: visible;
  }
`

const EmailBar = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

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

  const handleChange = e => {
    setEmail(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    addToMailchimp(email)
      .then(data => {
        setMessage(data.msg)
        setTimeout(() => {
          setMessage("")
        }, 3000)
      })
      .catch(err => {})
  }

  return (
    <EmailBarStyle>
      <h2>Stay up to date!</h2>
      <SignUpForm onSubmit={handleSubmit} method="POST">
        <input
          type="text"
          placeholder={
            windowSize.width > 768
              ? "Add your email..."
              : "Stay up to date! Add your email..."
          }
          value={email}
          name="email"
          onChange={handleChange}
        />
        <SignUpButton type="submit">Sign Up!</SignUpButton>
        <SuccessMessage className={message ? "display" : ""}>
          {message}
        </SuccessMessage>
      </SignUpForm>
    </EmailBarStyle>
  )
}

export default EmailBar
