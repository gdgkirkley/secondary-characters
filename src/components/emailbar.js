import React from "react"
import styled from "styled-components"

const EmailBarStyle = styled.div`
  background-color: ${props => props.theme.accent5};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 8px 0px;
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
  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <EmailBarStyle>
      <h2>Stay up to date!</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Add your email..." />
      </form>
    </EmailBarStyle>
  )
}

export default EmailBar
