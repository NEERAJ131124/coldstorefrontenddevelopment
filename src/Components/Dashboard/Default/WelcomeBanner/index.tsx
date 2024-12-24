import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col } from 'reactstrap'
import { Btn, H1, Image, P } from '../../../../AbstractElements'
import { dynamicImage, dynamicNumber } from '../../../../Utils'
import { Href } from '../../../../Utils/Constants'
import DashboardSvgIcon from '../../../../Utils/CommonComponents/DashboardSvgIcon'
import { UserResponse } from '../../../../Types/Users.type'
import { useNavigate } from 'react-router-dom'
import { getUserProfile } from '../../../../api-service/Users/Index'

export default function WelcomeBanner() {
  const [user, setUser] = useState<UserResponse | null>(null);
    const navigate = useNavigate()
   const getUser = async () => {
        const response = await getUserProfile(navigate)
        if (response != null) {
            setUser(response.data)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <Col xl={12} sm={12} className="proorder-xxl-1 box-col-6">
            <Card className="welcome-banner">
                <CardHeader className="p-0 card-no-border">
                    <div className="welcome-card">
                        <Image className="w-100 img-fluid" src={dynamicImage(`dashboard-1/welcome-bg.png`)} alt="" />
                        {dynamicNumber(5).map((item, index) => (
                            <Image key={index + 1} className={`position-absolute img-${item} img-fluid`} src={dynamicImage(`dashboard-1/img-${item}.png`)} alt="" />
                        ))}
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="d-flex align-center">
                        <H1>{"Hello, "} {user?.FirstName} {user?.LastName}
                            <Image src={dynamicImage(`dashboard-1/hand.png`)} alt="" />
                        </H1>
                    </div>
                    <P> {'Welcome back! Let’s start from where you left.'}</P>
                    {/* <div className="d-flex align-center justify-content-between">
                        <Btn color='primary' className="btn-pill" href={Href}>{'Whats New!'}</Btn>
                        <span>
                            <DashboardSvgIcon className='stroke-icon' iconId='watch' />
                            {' 11:14 AM'}
                        </span>
                    </div> */}
                </CardBody>
            </Card>
        </Col>
    )
}