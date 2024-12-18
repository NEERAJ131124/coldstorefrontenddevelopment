import React, { useEffect, useState } from 'react'
import { Card, Col, FormGroup, Modal, ModalBody, ModalHeader, Nav, NavItem, NavLink, Row } from 'reactstrap'
import { Badges, H5, Image, P } from '../../../../AbstractElements'
import { FacilityListData } from '../../../../Types/Facility.type'
import { createNameProfileImage } from '../../../../Common/methods'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getFacilityDetails } from '../../../../api-service/Facility/Index'
import Loader from '../../../../Layout/Loader'
import { DoPayment, FacilityListTitle, FacilityTitle } from '../../../../Utils/Constants'
import Breadcrumbs from '../../../../CommonElements/Breadcrumbs'
import { ArrowDownLeft, ArrowLeft } from 'react-feather'

export default function ViewFacility() {
    const { id } = useParams();
    const [item, setItem] = useState<FacilityListData | null>(null);
    const [doPayment, setDoPayment] = useState(false)
    const togglePayment = () => {
        setDoPayment(!doPayment);
    };
    const navigate = useNavigate();
    const getFacilityDetail = async (id: any) => {
        const response = await getFacilityDetails(id, navigate)
        if (response != null) {
            setItem(response.data)
        }
    }
    useEffect(() => {
        getFacilityDetail(id)
    }, [id])
    const handlePayment = (id: any) => {
        setDoPayment(true)
    }
    return (
        <>
            <Breadcrumbs pageTitle="Facility" parent={FacilityTitle} title={FacilityListTitle} />
            <Row className='project-cards'>
                <Col md={12} className="project-list">
                    <Card>
                        <Row>
                            <Col md={6}>
                                <Nav className="border-tab" tabs>
                                    <NavItem>
                                        <h3>Facility Details</h3>
                                    </NavItem>
                                </Nav>
                            </Col>
                            <Col md={6} className='d-md-block d-none'>
                                <FormGroup className="mb-0 me-0">
                                    <Link className="btn btn-primary d-flex align-items-center" to={`${process.env.PUBLIC_URL}/facility/view`}>
                                        <ArrowLeft /> Back
                                    </Link>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xxl={12} md={12} className='pt-3'>
                    <Card className='p-3'>
                        {
                            !item ? <Loader></Loader> :
                                <div className={`project-box font-dark bg-light-${item?.IsActive ? 'success' : 'danger'}`}>
                                    <Badges style={{ cursor: 'pointer' }} color={item?.IsPaid ? 'success' : 'danger'} onClick={() => handlePayment(item._id)}>{item?.IsActive ? "Active" : "Payment Pending"}</Badges>
                                    <H5 className={`f-w-500 mb-2 text-${item?.IsActive ? 'success' : 'danger'}`}> {item?.Name}</H5>
                                    <div className="d-flex mb-2 align-items-center">
                                        <Image className='img-20 me-1 rounded-circle' src={createNameProfileImage(item?.Name ?? "U", item?.Name ?? "K")} alt='' />
                                        <P className="font-light">{item?.Name}</P>
                                    </div>
                                    <Row className='details'>
                                        <Col xs={4}>
                                            <span>{'Email'} </span>
                                        </Col>
                                        <Col xs={8} className={`font-${item?.IsActive ? 'success' : 'danger'}`}>
                                            {item?.ContactDetails[1]}
                                        </Col>
                                        <Col xs={4}>
                                            <span>{'Phone'} </span>
                                        </Col>
                                        <Col xs={8} className={`font-${item?.IsActive ? 'success' : 'danger'}`}>
                                            {item?.ContactDetails[0]}
                                        </Col>
                                        <Col xs={4}>
                                            <span>{'City'} </span>
                                        </Col>
                                        <Col xs={8} className={`font-${item?.IsActive ? 'success' : 'danger'}`}>
                                            {item?.GeoLocation.City}
                                        </Col>
                                        <Col xs={4}>
                                            <span>{'State'} </span>
                                        </Col>
                                        <Col xs={8} className={`font-${item?.IsActive ? 'success' : 'danger'}`}>
                                            {item?.GeoLocation.State.StateName}
                                        </Col>
                                        <Col xs={4}>
                                            <span>{'Country'}</span>
                                        </Col>
                                        <Col xs={8} className={`font-${item?.IsActive ? 'success' : 'danger'}`}>
                                            {item?.GeoLocation.Country.CountryName}
                                        </Col>
                                        <Col xs={4}>
                                            <span>{'Operating Hours'}</span>
                                        </Col>
                                        <Col xs={8} className={`font-${item?.IsActive ? 'success' : 'danger'}`}>
                                            {item?.OpeningTime}  to {item?.ClosingTime}
                                        </Col>
                                    </Row>
                                    <div className='project-status mt-4'>
                                        {/* {
                                            item && item?.StorageFacilityCapacities.map((item: any, index: any) => (
                                                <div key={item.StorageTypeId.TypeId} className="d-flex justify-content-between align-items-center gap-1 mb-2">
                                                    <P className="mb-0">{item.StorageTypeId.Type}</P>
                                                    <P className="mb-0">{item.StorageCapacity} {item.CapacityUnit}</P>
                                                </div>
                                            ))
                                        } */}
                                    </div>
                                </div>
                        }
                    </Card>


                    <Modal modalClassName='modal-bookmark modal-centered' isOpen={doPayment} toggle={togglePayment} size='lg'>
                        <ModalHeader toggle={togglePayment}> {DoPayment}</ModalHeader>
                        <ModalBody>
                            Hello this is your Payment Modal
                        </ModalBody>
                    </Modal>
                </Col>
            </Row>

        </>

    )
}

