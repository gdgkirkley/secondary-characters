import React, { useState } from 'react';
import { Form } from './styles/formstyles';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

const ContactForm = () => {
  const [values, setValues] = useState({
    email: '',
    name: '',
    message: '',
  });

  const handleChange = e => {
    trackCustomEvent({
      category: 'form',
      action: 'Contact',
      label: e.target.name,
    });

    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

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
  );
};

export default ContactForm;
