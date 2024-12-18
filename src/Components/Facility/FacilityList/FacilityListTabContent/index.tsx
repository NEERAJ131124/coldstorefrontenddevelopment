import React, { useEffect, useState } from 'react'
import { Card, CardBody, Row, TabContent, TabPane } from 'reactstrap';
import { useSelector } from 'react-redux';
import CommonFacilityList from '../Common/CommonFacilityList';
import { RootState } from '../../../../ReduxToolkit/Store';
import { getFacility } from '../../../../api-service/Facility/Index';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../../Layout/Loader';

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
                            {facilities.length>0?facilities.map((item, index) => (<CommonFacilityList item={item} key={index} />))
                            :
                            <div className='text-center'>
                            <span>You haven't added any facility yet. Please add your facility.</span>
                            </div>
}
                        </Row>
                    </TabPane>
                </TabContent>
            </CardBody>
        </Card>
    )
}