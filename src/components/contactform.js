import React, { useState } from "react"
import styled from "styled-components"

const Form = styled.form`
  display: grid;
  grid-gap: 16px;
  & label {
    width: 100%;
    margin: 8px 0px;
    font-weight: bold;
    font-family: "Roboto Condensed", Arial, Helvetica, sans-serif;
    color: ${props => props.theme.grey6};
    & input,
    textarea {
      width: 100%;
      margin: 8px 0px;
      padding: 16px 24px;
      min-height: 36px;
      border: 1px solid ${props => props.theme.grey6};
      border-radius: 16px;
      background: ${props => props.theme.grey10};
      transition: 0.3s linear;
      font-family: "Roboto", Arial, Helvetica, sans-serif;
      font-size: ${props => props.theme.fontSize.reading};
      &:hover,
      :focus {
        border: 1px solid ${props => props.theme.primary5};
        background: white;
      }
      &:focus {
        outline: none;
      }
    }
    & textarea {
      min-height: 150px;
    }
  }
  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${props => props.theme.borderRadius};
    border: 1px solid ${props => props.theme.primary5};
    font-size: ${props => props.theme.fontSize.emphasis};
    background: white;
    font-family: "Roboto Condensed", sans-serif;
    font-weight: bold;
    color: ${props => props.theme.primary4};
    min-height: 65px;
    transition: 0.4s linear;
    &:hover,
    :focus {
      background: ${props => props.theme.primary4};
      color: ${props => props.theme.grey10};
      cursor: pointer;
      outline: none;
    }
  }
`

const ContactForm = () => {
  const [values, setValues] = useState({
    email: "",
    name: "",
    message: "",
  })

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Form name="Contact Form" method="POST" data-netlify="true">
      <input type="hidden" name="form-name" value="Contact Form" />
      <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="message">
        Message
        <textarea
          name="message"
          value={values.message}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Send your message!</button>
    </Form>
  )
}

export default ContactForm