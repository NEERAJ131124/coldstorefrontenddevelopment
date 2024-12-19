
import { Col, Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default function PaginationCard({ currentPage, totalPages, onPageChange }:any) {
  const handlePageClick = (page:any) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Col xs={12} className="m-t-30">
      <Pagination className="pagination-primary mt-4">
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink onClick={() => handlePageClick(currentPage - 1)}>
            {"Previous"}
          </PaginationLink>
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem active={currentPage === index + 1} key={index}>
            <PaginationLink onClick={() => handlePageClick(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink onClick={() => handlePageClick(currentPage + 1)}>
            {"Next"}
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </Col>
  );
}
























// import React from 'react'
// import { Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
// import { Href } from '../../../../../Utils/Constants'

// export default function PaginationCard() {
//     return (
//         <Col xs={12} className="m-t-30">
//             <Pagination className='pagination-primary mt-4'>
//                 <PaginationItem disabled><PaginationLink href={Href}>{'Previous'}</PaginationLink></PaginationItem>
//                 <PaginationItem active><PaginationLink href={Href}>{'1'}</PaginationLink></PaginationItem>
//                 <PaginationItem><PaginationLink href={Href}>{'2'}</PaginationLink></PaginationItem>
//                 <PaginationItem><PaginationLink href={Href}>{'3'}</PaginationLink></PaginationItem>
//                 <PaginationItem><PaginationLink href={Href}>{'Next'}</PaginationLink></PaginationItem>
//             </Pagination>
//         </Col >
//     )
// }
