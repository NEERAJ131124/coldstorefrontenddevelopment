import React, { useState } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import CreateNewFacilityForm from './CreateNewFacilityForm'
import Breadcrumbs from '../../../CommonElements/Breadcrumbs'
import { AddNewFacility, ApplicationTitle } from '../../../Utils/Constants'

export default function ProjectCreateContainer() {
    const [IsCreate,setIsCreate] = useState(true)
    return (
        <>
            <Breadcrumbs pageTitle={IsCreate ? AddNewFacility : "Update Facility" } parent={ApplicationTitle} title={AddNewFacility} />
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <Card>
                            <CardBody>
                                <CreateNewFacilityForm setIsCreate={setIsCreate} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}