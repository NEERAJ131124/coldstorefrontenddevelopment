import React from 'react'
import Breadcrumbs from '../../../CommonElements/Breadcrumbs'
import { Card, CardBody, CardText, CardTitle, Col, Container, Row } from 'reactstrap'
import { DashboardTitle, EcommerceDashboardTitle, EcommerceTitle } from '../../../Utils/Constants'
import AnalyticsCard from './AnalyticsCard'
import UserStatus from './UserStatus'
import SaleCard from './SaleCard'
import SellingProduct from './SellingProduct'
import ValueChart from '../../../Utils/CommonComponents/CommonDashboard/CommonEcommerce/ValueChart'
import { itemsSliderData, salesStatsOption, valueChartData } from '../../../Data/Dashboard/Ecommerce'
import BestSell from './BestSell'
import RadialCard from '../../../Utils/CommonComponents/CommonDashboard/CommonEcommerce/RadialCard'
import ItemsSlider from '../../../Utils/CommonComponents/CommonDashboard/CommonEcommerce/ItemsSlider'
import ActivityTimeline from './ActivityTimeline'
import TargetCard from './TargetCard'
import RecentOrders from './RecentOrders'

export default function EcommerceDashboard() {
    return (
        <>
            <Breadcrumbs pageTitle={EcommerceDashboardTitle} parent={DashboardTitle} title={EcommerceTitle} paragraph='"Welcome back! Continue your journey."' />
            <Container className='dashboard-2' fluid>
                {/* <Row>
                    <AnalyticsCard/>
                    <UserStatus/>
                    <SaleCard/>
                    <SellingProduct/>
                    <ValueChart data={valueChartData} mainColClass='col-xxl-3 col-xl-4 col-md-5 box-col-4'/>
                    <BestSell/>
                    <RadialCard chartData={salesStatsOption} height={350} mainColClass='col-xl-4 col-md-12 box-col-12' colClass='col-sm-6'/>
                    <ItemsSlider data={itemsSliderData}/>
                    <ActivityTimeline/>
                    <TargetCard/>
                    <RecentOrders/>
                </Row> */}
                <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Map Page</CardTitle>
              <CardText>
                This is a simple map page using Reactstrap. You can add your map component here.
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
            </Container>
        </>
    )
}