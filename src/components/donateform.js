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

const Suggested = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 36px;
  margin: 16px 0px;
`

const Secured = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  & img {
    border-radius: ${props => props.theme.borderRadius};
  }
`

const Currency = styled.span`
  display: flex;
  align-items: center;
  & span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    padding: 16px 0px;
    min-height: 36px;
    font-size: ${props => props.theme.fontSize.reading};
    line-height: 1.3;
    border: 1px solid ${props => props.theme.grey6};
    border-right: none;
    background: ${props => props.theme.grey10};
    border-radius: 16px 0px 0px 16px;
  }
  & .currency {
    border-radius: 0px 16px 16px 0px;
  }
`

const DonateForm = () => {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    amount: "25.00",
  })

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const handleValueButton = e => {
    e.preventDefault()
    setValues({
      ...values,
      amount: e.target.value,
    })
  }

  return (
    <>
      <Form
        method="POST"
        action="https://www.paypal.com/cgi-bin/webscr"
        data-netlify="true"
        name="Donate Form"
      >
        <input type="hidden" name="form-name" value="Donate Form" />
        <input type="hidden" name="cmd" value="_donations" />
        <input
          type="hidden"
          name="business"
          value="shelley@secondarycharacters.org"
        />
        <input
          type="hidden"
          name="item_name"
          value="Donation to Secondary Characters"
        />
        <input type="hidden" name="currency_code" value="CAD" />
        <input type="hidden" name="tax" value="0" />
        <label htmlFor="first_name">
          First Name:
          <input
            type="text"
            value={values.first_name}
            name="first_name"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="last_name">
          Last Name:
          <input
            type="text"
            value={values.last_name}
            name="last_name"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={values.email}
            name="email"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="amount">
          How much would you like to donate?
          <Suggested>
            <button type="button" value="10" onClick={handleValueButton}>
              $10
            </button>
            <button type="button" value="25" onClick={handleValueButton}>
              $25
            </button>
            <button type="button" value="50" onClick={handleValueButton}>
              $50
            </button>
          </Suggested>
          <Currency>
            <span>$</span>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={values.amount}
              name="amount"
              onChange={handleChange}
              className="currency"
            />
          </Currency>
        </label>
        <button type="submit">Donate with Paypal</button>
      </Form>
      <Secured>
        <a
          href="https://www.paypal.com/webapps/mpp/paypal-popup"
          title="How PayPal Works"
        >
          <img
            src="https://www.paypalobjects.com/digitalassets/c/website/marketing/na/us/logo-center/9_bdg_secured_by_pp_2line.png"
            border="0"
            alt="Secured by PayPal"
          />
        </a>
      </Secured>
    </>
  )
}

export default DonateForm
