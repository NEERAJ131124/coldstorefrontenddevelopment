import React, { useEffect, useState } from 'react'
import { Badge, Card, CardBody, Col, Row, TabContent, TabPane } from 'reactstrap';
import { useSelector } from 'react-redux';
import CommonFacilityList from '../Common/CommonFacilityList';
import { RootState } from '../../../../ReduxToolkit/Store';
import { getFacility } from '../../../../api-service/Facility/Index';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../../../Layout/Loader';
import { Btn, H5 } from '../../../../AbstractElements';
import { PlusSquare } from 'react-feather';
import { AddNewFacility } from '../../../../Utils/Constants';

export default function FacilityListTabContent({ activeTab }: any) {
    const projectListData = useSelector((state: RootState) => state.facility.items);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate()
    const [facilities, setFacilities] = useState([])
    const getFacilityList = async () => {
        const response = await getFacility(navigate)
        if (response) {
            setFacilities(response.data)
        } else {
            console.log("Failed to fetch facility list")
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getFacilityList();
    }, [])


    return (
        <Card>
            {isLoading && <Loader></Loader>}
            <CardBody>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId={1}>
                        <Row>
                            {facilities.length > 0 ? facilities.map((item, index) => (<CommonFacilityList item={item} key={index} />))
                                :
                                <div className='text-center'>
                                    {/* <span>You haven't added any facility yet. Please add your facility.</span> */}
                                </div>

                            }
                            <Col xxl={4} md={6} style={{minHeight:"300px"}}>
                                <div className={`project-box font-dark d-flex justify-content-center`}  style={{minHeight:"335px"}}>
                                    <Link className="btn btn-primary w-75 d-flex justify-content-center" to={`${process.env.PUBLIC_URL}/facility/add`}>
                                        <span className='fs-2'><PlusSquare /> </span>
                                        <span className='mx-2 fs-3'>{AddNewFacility}</span>
                                    </Link>
                                    <Row className='details'>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </CardBody>
        </Card>
    )
}