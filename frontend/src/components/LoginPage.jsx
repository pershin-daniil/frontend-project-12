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
import LoginCard from './LoginCard.jsx';

const LoginPage = () => {
  const inputNameRef = useRef();
  const [authFailed, setAuthFailed] = useState(false);
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
    },
    validationSchema: yup.object().shape({
      username: yup.string().trim().required(t('errors.required')),
      password: yup.string().required(t('errors.required')),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.loginPath(), {
          username: values.username,
          password: values.password,
        });
        localStorage.setItem('userdatas', JSON.stringify(res.data));
        auth.logIn();
        setAuthFailed(false);
        navigate(routes.chatPagePath());
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError) {
          if (err.response.status === 401) {
            setAuthFailed(true);
            navigate(routes.loginPagePath());
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
    title: t('entry'),
    placeholderName: t('placeholders.login'),
    placeholderPassword: t('placeholders.password'),
    noAccount: t('noAccount'),
    registration: t('registration'),
    error: t('errors.invalidFeedback'),
    authFailed,
    inputNameRef,
    path: routes.signupPagePath(),
  };

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <LoginCard values={values} />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
