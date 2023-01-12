import { Card, Col, Container, Form, FormFloating, Image, Row} from "react-bootstrap";
import loginImage from "../assets/login.jpeg"

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
                            <Col as={Form} className="col-12 mt-3 mt-md-0 form" md={6} >
                                <h1 className="text-center mb-4">Войти</h1>
                                <FormFloating className="mb-3">
                                    <input name="username" autoComplete="username" required={true} placeholder="Логин" id="username" className="form-control"/>
                                    <label>Логин</label>
                                </FormFloating>
                                <FormFloating className="mb-4">
                                    <input name="password" autoComplete="current-password" required={true} placeholder="Пароль" type="password" id="password" className="form-control"/>
                                    <label>Пароль</label>
                                </FormFloating>
                                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
                            </Col>
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