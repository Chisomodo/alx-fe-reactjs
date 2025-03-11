// src/components/formikForm.jsx

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'; // All imports present
import * as Yup from 'yup';

const validationSchema = Yup.object({ // validationSchema present
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function FormikForm() {
  const handleSubmit = (values, { resetForm }) => {
    // Simulate API call (replace with actual API call)
    console.log('Formik form data:', values);
    resetForm();
  };

  return (
    <Formik // Formik component present
      initialValues={{ username: '', email: '', password: '' }} // initialValues present
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form> {/* Form component present */}
        <div>
          <label htmlFor="username">Username:</label>
          <Field type="text" id="username" name="username" /> {/* Field component present */}
          <ErrorMessage name="username" component="div" style={{ color: 'red' }} /> {/* ErrorMessage component present */}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <Field type="password" id="password" name="password" />
          <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
        </div>
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}

export default formikForm;