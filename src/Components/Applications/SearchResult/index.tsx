import React, { useState } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import SearchResultHeader from './SearchResultHeader';
import SearchNav from './SearchNav';
import SearchTabContent from './SearchTabContent';
import Breadcrumbs from '../../../CommonElements/Breadcrumbs';
import { SearchPagesTitle, SearchWebsiteTitle } from '../../../Utils/Constants';
import SearchFilter from './SearchTabContent/SearchfilterSidebar';

export default function SearchResultContainer() {
    const [activeTab, setActiveTab] = useState(1);
    const [searchText, setSearchText] = useState('');
    // Function to update the search text from the SearchFilter component
    const searchFacility = (filterValue: string) => {
        console.log('Search value:', filterValue);
        setSearchText(filterValue);
    };

    return (
        <>
            <Breadcrumbs pageTitle={SearchWebsiteTitle} parent={SearchWebsiteTitle} title={SearchWebsiteTitle} />
            <Container className='search-page' fluid>
                <Row>
                    <Col sm={3}>
                        <SearchFilter onFilterChange={searchFacility} />
                    </Col>
                    <Col sm={9}>
                        <Card>
                            <CardBody>
                                <SearchTabContent activeTab={activeTab} searchText={searchText} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
