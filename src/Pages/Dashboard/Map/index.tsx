import React from 'react'
import MapPage from '../../../Components/Applications/Maps/Map'
// import Breadcrumbs from '../../../CommonElements/Breadcrumbs'
// import { AddNewFacility, ApplicationTitle } from '../../../Utils/Constants'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'

export default function Map() {
    return (
       <>
        {/* <Breadcrumbs pageTitle={AddNewFacility} parent={ApplicationTitle} title={AddNewFacility} /> */}
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <Card>
                            <CardBody>
                                <MapPage />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}