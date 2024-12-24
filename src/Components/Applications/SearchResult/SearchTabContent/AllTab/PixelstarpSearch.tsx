
import { Col, Label, Row } from "reactstrap";
import { Btn, H6, LI, UL } from "../../../../../AbstractElements";
import MapByCoordinates from "../../../../Facility/component/MapByCoordinates";
import { FaDirections, FaEnvelope, FaMap, FaWhatsapp } from "react-icons/fa";

export default function PixelstarpSearch({ paginatedResults, searchText }: any) {

    const handleOpenGoogleMapsAppAddress = (address: string) => {
        const encodedAddress = encodeURIComponent(address);

        const googleMapsUrl = `https://www.google.com/maps?q=${encodedAddress}`;

        window.open(googleMapsUrl, "_blank");
    };

    const handleWhatsApp = (phoneNumber: number) => {
        const url = `https://wa.me/${phoneNumber}`;
        window.open(url, '_blank');
    };

    const handleEmail = (emailAddress: string) => {
        const url = `mailto:${emailAddress}`;
        window.location.href = url; 
    };

    return (
        <Col xxl={12} xl={12} sm={12} className="box-col-12">
            {searchText?.searchText && (
                <H6 className="f-w-700">{`Search result for "${searchText?.searchText}"`}</H6>
            )}

            {paginatedResults.length > 0 ? (
                paginatedResults.map((item: any) => (
                    <div className="info-block" key={item._id}>
                        <Row>
                            <Col sm={12}>
                                <H6>{item.Name}</H6>
                                <Label>
                                    <i className={`fa-solid fa-location me-1`} />
                                    {item.GeoLocation.City.toLocaleUpperCase()} |{" "}
                                    {item.GeoLocation.State.StateName.toLocaleUpperCase()} |{" "}
                                    {item.GeoLocation.Country.CountryName.toLocaleUpperCase()}
                                    {/* <DistanceComponent latitude={item.GeoLocation.Latitude} longitude={item.GeoLocation.Longitude}/> */}
                                </Label>
                                <div className="star-ratings">
                                    <UL className="search-info simple-list flex-row">
                                        {item.StorageFacilityCapacities.map((facility: any) => (
                                            <LI key={facility._id}>
                                                <i className={`fa-solid fa-cube`} /> {facility?.StorageTypeId?.Type}{" "}
                                                <strong>
                                                    {facility.StorageCapacity} {facility.CapacityUnit}
                                                </strong>
                                            </LI>
                                        ))}
                                    </UL>
                                </div>
                                <div className="mt-2">
                                    <Btn onClick={() => {
                                        const address = `${item.Name},${item.GeoLocation.City}`
                                        handleOpenGoogleMapsAppAddress(address)
                                    }} color="primary">
                                        <span className="me-2 fs-6">
                                            <FaDirections/>
                                        </span>
                                        Open with Google Maps
                                    </Btn>
                                    <Btn
                                        onClick={() => {
                                            const email = item.ContactDetails[1]; // Replace with your desired email index
                                            handleEmail(email);
                                        }}
                                        color="primary"
                                        className="mx-3"
                                    >
                                        <span className="me-2 fs-6"><FaEnvelope/></span>
                                        Email Us ({item.ContactDetails[1]})
                                    </Btn>

                                    {/* WhatsApp Button */}
                                    {/* <Btn
                                        onClick={() => {
                                            const phoneNumber = item.ContactDetails[0]; // Replace with your desired phone index
                                            handleWhatsApp(phoneNumber);
                                        }}
                                        color="primary"
                                    >
                                        <span className="me-2 fs-6"><FaWhatsapp/></span>
                                        Whatsapp Us ({item.ContactDetails[0]})
                                    </Btn> */}
                                </div>
                            </Col>
                        </Row>
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

