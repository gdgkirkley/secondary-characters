import React, { useState } from 'react';
import { Form } from './styles/formstyles';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

const VolunteerForm = () => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    contact: true,
    message: '',
  });

  const handleChange = e => {
    trackCustomEvent({
      category: 'form',
      action: 'Volunteer',
      label: e.target.name,
    });

    if (e.target.name === 'contact') {
      return setValues({
        ...values,
        contact: !values.contact,
      });
    }
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form data-netlify="true" name="Volunteer Form" method="POST">
      <input type="hidden" name="form-name" value="Volunteer Form" />
      <label htmlFor="firstName">
        First Name
        <input
          type="text"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="lastName">
        Last Name
        <input
          type="text"
          name="lastName"
          value={values.lastName}
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
      <label htmlFor="phone">
        Phone
        <input
          type="tel"
          name="phone"
          value={values.phone}
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
      <label htmlFor="contact" className="checkbox">
        I consent to Secondary Characters contacting me about volunteer
        opportunities:
        <input
          type="checkbox"
          name="contact"
          checked={values.contact}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Send your message!</button>
    </Form>
  );
};

export default VolunteerForm;
