import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import RegisterForm from '../Common/RegisterForm'
import AuthHeader from '../../../../../Layout/AuthHeader/Index'
import Footer from '../../../../../Layout/Footer'

export default function RegisterSimple() {
    return (
        <>
        <AuthHeader/>
        <Container fluid className="p-0">
            <Row className="m-0">
                <Col xs={12} className="p-0">
                    <div className="login-card login-dark">
                        <RegisterForm logoClass='text-center' />
                    </div>
                </Col>
            </Row>
        </Container>
        <Footer/>
        </>
    )
}