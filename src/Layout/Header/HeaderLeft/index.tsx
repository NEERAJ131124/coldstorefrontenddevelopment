import React from 'react'
import SearchContainer from './SearchContainer';
import FullSearch from './FullSearch';
import SearchFacility from './SearchContainer/searchFacility';

export default function HeaderLeft() {

    return (
        <div className="header-left">
            <FullSearch/>
            <SearchFacility/>
        </div>
    )
}