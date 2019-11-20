import React, { useState } from 'react';
import { Form } from './styles/formstyles';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

const AuditionForm = () => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    message: '',
    referrer: '',
  });

  const handleChange = e => {
    trackCustomEvent({
      category: 'form',
      action: 'Audition',
      label: e.target.name,
    });

    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form name="Audition Form" method="POST" data-netlify="true">
      <input type="hidden" name="form-name" value="Audition Form" />
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
      <label htmlFor="age">
        Age
        <input
          type="number"
          name="age"
          value={values.age}
          onChange={handleChange}
          step="1"
          required
        />
      </label>
      <p>
        Please state when you are available to audition on the days listed. We
        will contact you to confirm a specific time.
      </p>
      <p>
        If you have recent solo SC experience and would like to be considered to
        attend callbacks directly, please let us know in this box. You may also
        choose to audition
      </p>
      <label htmlFor="message">
        Audition Availability:
        <textarea
          name="message"
          value={values.message}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="referrer">
        How did you hear about auditions?
        <input
          type="text"
          name="referrer"
          value={values.referrer}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Get your audition!</button>
    </Form>
  );
};

export default AuditionForm;
