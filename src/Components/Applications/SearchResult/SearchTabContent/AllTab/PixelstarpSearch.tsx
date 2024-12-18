import React from 'react'
import { SearchResultInitialState } from '../../../../../Types/SearchResult.type'
import { Col, Label } from 'reactstrap'
import { H6, LI, P, UL } from '../../../../../AbstractElements'
import { Href } from '../../../../../Utils/Constants'
import { FacilitySearchResultInitialState } from '../../../../../Types/Facility.type'

export default function PixelstarpSearch({ allFacilityResult,searchText }: FacilitySearchResultInitialState) {
    return (
        <Col xxl={8} xl={6} className="box-col-12">
            {
             searchText && <H6 className="f-w-700">{`Search result for "${searchText}"`}</H6>
            }
            {allFacilityResult &&
                allFacilityResult.slice(0, 4).map((item) => (
                    <div className='info-block' key={item._id}>
                        {/* <a href={Href}>{item.url}</a> */}
                        <H6>{item.Name}</H6>
                        <Label>{(item.GeoLocation.City).toLocaleUpperCase()} | {(item.GeoLocation.State.StateName).toLocaleUpperCase()} | {(item.GeoLocation.Country.CountryName).toLocaleUpperCase()} </Label>
                        {/* <div className='star-ratings'>
                            <UL className='search-info simple-list flex-row'>
                                <LI>
                                    <i className='fa-solid fa-star' />
                                    <i className='fa-solid fa-star' />
                                    <i className='fa-solid fa-star' />
                                    <i className='fa-regular fa-star' />
                                    <i className='fa-regular fa-star' />
                                </LI>
                                <LI>{item.star}</LI>
                                <LI>{item.vote}</LI>
                                <LI>{item.news}</LI>
                            </UL>
                        </div> */}
                    </div>
                )
                )}
        </Col>
    )
}