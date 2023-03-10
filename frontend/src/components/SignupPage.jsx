import axios from 'axios';
import * as yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';
import useAuth from '../hooks/auth.js';
import routes from '../routes.js';
import SignupCard from './SignupCard.jsx';

const SignupPage = () => {
  const inputNameRef = useRef();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    inputNameRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().trim()
        .min(3, t('registrationRules.name'))
        .max(20, t('registrationRules.name'))
        .required(t('errors.required')),
      password: yup.string().trim().min(6, t('registrationRules.password')).required(t('errors.required')),
      passwordConfirmation: yup.string().trim().oneOf([yup.ref('password')], t('registrationRules.passwordEquality')).required(t('errors.required')),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.signupPath(), {
          username: values.username,
          password: values.password,
        });
        localStorage.setItem('userdatas', JSON.stringify(res.data));
        auth.logIn();
        setRegistrationFailed(false);
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError) {
          if (err.response.status === 409) {
            setRegistrationFailed(true);
            navigate(routes.signupPagePath());
            inputNameRef.current.select();
          } else {
            toast.error(t('errors.network'));
          }
        } else {
          toast.error(err.message);
        }
      }
    },
  });

  const values = {
    formik,
    title: t('registration'),
    placeholderName: t('placeholders.username'),
    placeholderPassword: t('placeholders.password'),
    placeholderPasswordConfirmation: t('placeholders.passwordConfirmation'),
    userExists: t('errors.userExist'),
    makeRegistration: t('makeRegistration'),
    registrationFailed,
    inputNameRef,
  };

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <SignupCard values={values} />
        </Col>
      </Row>
    </Container>
  );
// END
};

export default SignupPage;
