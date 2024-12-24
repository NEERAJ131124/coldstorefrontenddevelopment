
import React, { useState } from "react";
import { Row } from "reactstrap";
import PixelstarpSearch from "./PixelstarpSearch";
import PaginationCard from "../Common/PaginationCard";
import { FacilitySearchResultInitialState } from "../../../../../Types/Facility.type";
import { SearchTabContentProp } from "../../../../../Types/SearchResult.type";

export interface ExtendedSearchTabContentProp extends FacilitySearchResultInitialState {
    searchText: {
        searchText: string;
        capacity: string;
        storageTypeId: string;
    };
}

export default function AllTab({ allFacilityResult, searchText }:ExtendedSearchTabContentProp) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of items per page

  // Calculate total pages
  const totalPages = Math.ceil(allFacilityResult.length / itemsPerPage);

  // Get paginated data
  const paginatedResults = allFacilityResult.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page:any) => {
    setCurrentPage(page);
  };

  return (
    <Row>
      <PixelstarpSearch
        paginatedResults={paginatedResults}
        searchText={searchText}
      />
      {
        totalPages>1 &&   
        <PaginationCard
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      }
    </Row>
  );
}






















// import React from 'react'
// import { Row } from 'reactstrap'
// import { SearchResultInitialState } from '../../../../../Types/SearchResult.type'
// import PixelstarpSearch from './PixelstarpSearch'
// import BlogBox from './BlogBox'
// import PaginationCard from '../Common/PaginationCard'
// import { FacilitySearchResultInitialState } from '../../../../../Types/Facility.type'

// export default function AllTab({ allFacilityResult,searchText }: FacilitySearchResultInitialState) {
//     return (
//         <Row>
//             <PixelstarpSearch searchText={searchText} allFacilityResult={allFacilityResult} />
//             {/* <BlogBox allResult={allFacilityResult} /> */}
//             <PaginationCard />
//         </Row>
//     )
// }