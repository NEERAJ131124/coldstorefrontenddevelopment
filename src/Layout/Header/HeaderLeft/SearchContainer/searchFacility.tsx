import React, { ChangeEvent, useEffect, useState } from 'react'
import { menuList } from '../../../../Data/Layout/SidebarMenuList';
import { SearchSuggestionItem, SearchSuggestionItem1, SidebarMenuItem } from '../../../../Types/Layout.type';
import { Input } from 'reactstrap';
import ResponsiveSearchList from './ResponsiveSearchList';
import { getAllFacility } from '../../../../api-service/Facility/Index';
import { useNavigate } from 'react-router-dom';
import FacilitySearchList from './facilitySearchList';
import { FacilityListData } from '../../../../Types/Facility.type';
// import { setFacility } from '../../../../ReduxToolkit/Reducers/FacilityReducer';

export default function SearchFacility() {
  const [arr, setArr] = useState<FacilityListData[]>([]);
  const [searchedWord, setSearchedWord] = useState<string>("");
  const [searchedArray, setSearchedArray] = useState<FacilityListData[]>([]);
  const [arrFacility, setArrFacility] = useState<FacilityListData[]>([]);

const navigate = useNavigate();
  useEffect(() => {
    const suggestionArray: FacilityListData[] = [];
   
  }, []);

  const getAllFacilities = async ()=>{
    const response = await getAllFacility(navigate);
    if(response!=null){
      setArrFacility(response.data)
    }
  }

  useEffect(() => {
    getAllFacilities()
  }, [searchedWord]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debugger;
    if (!searchedWord) setSearchedWord("");
    setSearchedWord(e.target.value);
    let data = [...arr];
    // let result = data.filter((item) => item.Name?.toLowerCase().includes(e.target.value.toLowerCase()));
    let result1 = arrFacility.filter((item) => item.Name?.toLowerCase().includes(e.target.value.toLowerCase()) || item.GeoLocation.Country.CountryName?.toLowerCase().includes(e.target.value.toLowerCase()) || item.GeoLocation.City?.toLowerCase().includes(e.target.value.toLowerCase()));
    console.log(result1)
    setSearchedArray(result1);
  };

  return (
    <div className="form-group-header d-lg-block d-none">
      <div className="Typeahead Typeahead--twitterUsers">
        <div className="u-posRelative d-flex align-items-center">
          <Input className="demo-input Typeahead-input form-control-plaintext w-100 p-0" type="text" placeholder='Search facility...' name="q" value={searchedWord} onChange={(e) => handleSearch(e)} />
          <i className="search-bg iconly-Search icli" />
        </div>
        <div className={`Typeahead-menu custom-scrollbar ${searchedWord.length ? "is-open" : ""}`} >
          <FacilitySearchList searchedArray={searchedArray} />
        </div>
      </div>
    </div>
  )
}