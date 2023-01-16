import {Card, Col, Container, Image, Row} from "react-bootstrap";
import loginImage from "../assets/login.jpeg";
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';


const SignupSchema = Yup.object().shape({
    userName: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .max(64, 'Too Long!')
        .required('Required'),
});



function Login () {
    return (
        <Container fluid={true} className="h-100">
            <Row className="justify-content-center align-content-center h-100">
                <Col className="col-12" md={8} xxl={6}>
                    <Card className="shadow-sm">
                        <Row as={Card.Body} className="p-5">
                            <Col className="col-12 d-flex align-items-center justify-content-center" md={6}>
                                <Image src={loginImage} roundedCircle={true} alt="Войти" draggable="false" unselectable="on"/>
                            </Col>
                            <Formik
                                initialValues={{
                                    userName: '',
                                    password: '',
                                }}
                                validationSchema={SignupSchema}
                                onSubmit={values => {
                                    // same shape as initial values
                                    console.log(values);
                                }}
                            >
                                {({ errors, touched }) => (
                                    <Form className="col-12 mt-3 mt-md-0 form" md={6}>
                                        <h1 className="text-center mb-4">Войти</h1>
                                        <div className="form-floating mb-3">
                                                <Field name="userName" id="userName" className={"form-control " + (errors.userName && touched.userName ? "is-invalid" : null)} placeholder="Login"/>
                                            <label htmlFor="userName">Login</label>

                                            {errors.userName && touched.userName ? (
                                                <div className="text-danger mt-2">{errors.userName}</div>
                                            ) : null}

                                        </div>
                                        <div className="form-floating mb-4">
                                            <Field name="password" type="password" className={"form-control " + (errors.password && touched.password ? "is-invalid": null)} placeholder="password"/>
                                            <label htmlFor="password">Password</label>

                                            {errors.password && touched.password ? (
                                                <div className="text-danger mt-2">{errors.password}</div>
                                            ) : null}

                                        </div>
                                        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">LogIn</button>
                                    </Form>
                                )}
                            </Formik>
                        </Row>
                        <Card.Footer className="p-4">
                            <div className="text-center">
                                <span>Нет аккаунта? </span>
                                <a href={`/signup`}>Регистрация</a>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>);
}
export default Login;