import React, { useState } from "react"
import styled from "styled-components"
import { encode } from "punycode"

const Form = styled.form`
  display: grid;
  grid-gap: 16px;
  border: 1px solid ${props => props.theme.grey10};
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
      background: ${props => props.theme.grey9};
      transition: 0.1s linear;
      font-family: "Roboto", Arial, Helvetica, sans-serif;
      font-size: ${props => props.theme.fontSize.reading};
      &:hover,
      :focus {
        border: 1px solid ${props => props.theme.primary5};
        background: ${props => props.theme.grey10};
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
    &:hover {
      background: ${props => props.theme.primary4};
      color: ${props => props.theme.grey10};
      cursor: pointer;
    }
  }
`

const ContactForm = () => {
  const [values, setValues] = useState({
    email: "",
    name: "",
    message: "",
  })

  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...values }),
    })
      .then(() => alert("Message sent!"))
      .catch(err => alert(err))

    e.preventDefault()
  }

  return (
    <Form onSubmit={handleSubmit}>
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
