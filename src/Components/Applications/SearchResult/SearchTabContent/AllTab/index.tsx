import React from 'react'
import { Row } from 'reactstrap'
import { SearchResultInitialState } from '../../../../../Types/SearchResult.type'
import PixelstarpSearch from './PixelstarpSearch'
import BlogBox from './BlogBox'
import PaginationCard from '../Common/PaginationCard'
import { FacilitySearchResultInitialState } from '../../../../../Types/Facility.type'

export default function AllTab({ allFacilityResult,searchText }: FacilitySearchResultInitialState) {
    return (
        <Row>
            <PixelstarpSearch searchText={searchText} allFacilityResult={allFacilityResult} />
            {/* <BlogBox allResult={allFacilityResult} /> */}
            <PaginationCard />
        </Row>
    )
}