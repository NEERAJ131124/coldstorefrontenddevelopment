import React from "react";
import { SearchSuggestionListType1 } from "../../../../Types/Layout.type";
import { Link } from "react-router-dom";
import { Btn } from "../../../../AbstractElements";

export default function FacilitySearchList({ searchedArray }: SearchSuggestionListType1) {
    return (
        <>
            {searchedArray?.map((item, index) => (
                <div className="ProfileCard u-cf" key={index}>
                    <div className="ProfileCard-details">
                        <div className="ProfileCard-realName d-flex">
                            <div>
                                {item.Name}  | {item.GeoLocation.City} | {item.GeoLocation.Country.CountryName} 
                            </div>
                        </div>
                    </div>
                    <div className="text-end me-2">
                        <Btn className={'text-end me-2'}>View</Btn>
                        {/* <Btn className={'text-end'} color="success">Call</Btn> */}
                    </div>
                </div>
            ))}
            {!searchedArray?.length && <p>Opps!! There are no result found.</p>}
        </>
    )
}