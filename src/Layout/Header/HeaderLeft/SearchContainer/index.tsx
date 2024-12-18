import React, { ChangeEvent, useEffect, useState } from 'react'
import { menuList } from '../../../../Data/Layout/SidebarMenuList';
import { SearchSuggestionItem, SidebarMenuItem } from '../../../../Types/Layout.type';
import { Input } from 'reactstrap';
import ResponsiveSearchList from './ResponsiveSearchList';
import { getAllFacility } from '../../../../api-service/Facility/Index';
import { useNavigate } from 'react-router-dom';
// import { setFacility } from '../../../../ReduxToolkit/Reducers/FacilityReducer';

export default function SearchContainer() {
  const [arr, setArr] = useState<SearchSuggestionItem[]>([]);
  const [searchedWord, setSearchedWord] = useState<string>("");
  const [searchedArray, setSearchedArray] = useState<SearchSuggestionItem[]>([]);
  const [arrFacility, setArrFacility] = useState<SearchSuggestionItem[]>([]);

const navigate = useNavigate();
  useEffect(() => {
    const suggestionArray: SearchSuggestionItem[] = [];
    const getAllLink = (item: SidebarMenuItem, icon: string | undefined) => {
      if (item.children) {
        item.children.forEach((ele) => {
          getAllLink(ele, icon);
        });
      } else {
        suggestionArray.push({ icon: icon, title: item.title || '', path: item.path || "" });
      }
    };
    menuList?.forEach((item) => {
      item.items?.forEach((child) => {
        getAllLink(child, child.icon);
      });
    });
    setArr(suggestionArray);
  }, []);

  const getAllFacilities = async ()=>{
    const response = await getAllFacility(navigate);
    if(response!=null){
      setArrFacility(response.data)
    }
  }

  // useEffect(() => {
  //   getAllFacilities()
  // }, [searchedWord]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debugger;
    if (!searchedWord) setSearchedWord("");
    setSearchedWord(e.target.value);
    let data = [...arr];
    let result = data.filter((item) => item.title?.toLowerCase().includes(e.target.value.toLowerCase()));
    // let result1 = arrFacility.filter((item) => item.title?.toLowerCase().includes(e.target.value.toLowerCase()));
    // console.log(result1)
    setSearchedArray(result);
  };

  return (
    <div className="form-group-header d-lg-block d-none">
      <div className="Typeahead Typeahead--twitterUsers">
        <div className="u-posRelative d-flex align-items-center">
          <Input className="demo-input Typeahead-input form-control-plaintext w-100 p-0" type="text" placeholder='Search anything...' name="q" value={searchedWord} onChange={(e) => handleSearch(e)} />
          <i className="search-bg iconly-Search icli" />
        </div>
        <div className={`Typeahead-menu custom-scrollbar ${searchedWord.length ? "is-open" : ""}`} >
          {/* <ResponsiveSearchList searchedArray={searchedArray} /> */}
        </div>
      </div>
    </div>
  )
}