
import { Col, Label } from "reactstrap";
import { Btn, H6, LI, UL } from "../../../../../AbstractElements";

export default function PixelstarpSearch({ paginatedResults, searchText }: any) {
    // const handleOpenGoogleMaps = ( latitude:any, longitude : any) => {
    //     debugger;
    //     // Construct Google Maps URL with the provided coordinates
    //     const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    //     window.open(googleMapsUrl, "_blank"); // Open in a new tab
    // };
    const handleOpenGoogleMapsAppAddress = (address: string) => {
        // Encode the address
        const encodedAddress = encodeURIComponent(address);
      
        // Google Maps mobile deep link URL format
        const googleMapsUrl = `https://www.google.com/maps?q=${encodedAddress}`;
      
        // Open in a new tab or app
        window.open(googleMapsUrl, "_blank");
      };
      
    return (
        <Col xxl={12} xl={6} className="box-col-12">
            {searchText && (
                <H6 className="f-w-700">{`Search result for "${searchText}"`}</H6>
            )}
            {paginatedResults.length > 0 ? (
                paginatedResults.map((item: any) => (
                    <div className="info-block" key={item._id}>
                        <H6>{item.Name}</H6>
                        <Label>
                            <i className={`fa-solid fa-location me-1`} />
                            {item.GeoLocation.City.toLocaleUpperCase()} |{" "}
                            {item.GeoLocation.State.StateName.toLocaleUpperCase()} |{" "}
                            {item.GeoLocation.Country.CountryName.toLocaleUpperCase()}
                        </Label>
                        <div className="star-ratings">
                            <UL className="search-info simple-list flex-row">
                                {item.StorageFacilityCapacities.map((facility: any) => (
                                    <LI key={facility._id}>
                                        <i className={`fa-solid fa-cube`} /> {facility.StorageTypeId.Type}{" "}
                                        <strong>
                                            {facility.StorageCapacity} {facility.CapacityUnit}
                                        </strong>
                                    </LI>
                                ))}
                            </UL>
                        </div>
                        <div className="mt-2">
                        {/* <Btn onClick={()=>handleOpenGoogleMaps(item.GeoLocation.Latitude, item.GeoLocation.Longitude)} color="primary">
                            Open in Google Maps
                        </Btn> */}
                        <Btn onClick={()=>{
                            const address = `${item.Name},${item.GeoLocation.City}`
                            handleOpenGoogleMapsAppAddress(address)
                            }} color="primary">
                            Open in Google Maps
                        </Btn>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center">
                    <Label>No results found.</Label>
                </div>
            )}
        </Col>
    );
}

























// import React from 'react'
// import { SearchResultInitialState } from '../../../../../Types/SearchResult.type'
// import { Col, Label } from 'reactstrap'
// import { H6, LI, P, UL } from '../../../../../AbstractElements'
// import { Href } from '../../../../../Utils/Constants'
// import { FacilitySearchResultInitialState } from '../../../../../Types/Facility.type'

// export default function PixelstarpSearch({ allFacilityResult,searchText }: FacilitySearchResultInitialState) {
//     return (
//         <Col xxl={12} xl={6} className="box-col-12">
//             {
//              searchText && <H6 className="f-w-700">{`Search result for "${searchText}"`}</H6>
//             }
//             {allFacilityResult.length>0 ?
//                 allFacilityResult.slice(0, 4).map((item) => (
//                     <div className='info-block' key={item._id}>
//                         {/* <a href={Href}>{item.url}</a> */}
//                         <H6>{item.Name}</H6>
//                         <Label>{(item.GeoLocation.City).toLocaleUpperCase()} | {(item.GeoLocation.State.StateName).toLocaleUpperCase()} | {(item.GeoLocation.Country.CountryName).toLocaleUpperCase()} </Label>
//                         <div className='star-ratings'>
//                             <UL className='search-info simple-list flex-row'>
//                                 {
//                                     item.StorageFacilityCapacities.map((facility) => (
//                                         <LI key={facility._id}>
//                                             <i className={`fa-solid fa-cube`} /> {facility.StorageTypeId.Type} <strong>{facility.StorageCapacity} {facility.CapacityUnit}</strong>
//                                         </LI>
//                                     ))
//                                 }
//                             </UL>
//                         </div>
//                     </div>
//                 )
//                 )
//             : <div className="text-center">
//                 <Label>No results found.</Label>
//                 </div>}
//         </Col>
//     )
// }

