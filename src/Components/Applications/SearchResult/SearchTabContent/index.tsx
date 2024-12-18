import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { TabContent, TabPane } from 'reactstrap';
import { SearchTabContentProp } from '../../../../Types/SearchResult.type';
import { AppDispatch, RootState } from '../../../../ReduxToolkit/Store';
import { fetchSearchData } from '../../../../ReduxToolkit/Reducers/SearchResultReducer';
import AllTab from './AllTab';
import ImageTab from './ImageTab';
import VideoTab from './VideoTab';
import { fetchFacilitySearchData } from '../../../../ReduxToolkit/Reducers/FacilitySearchReducer';

interface ExtendedSearchTabContentProp extends SearchTabContentProp {
    searchText: string; // Add searchText to props
}


export default function SearchTabContent({ activeTab ,searchText}: ExtendedSearchTabContentProp) {
    const { allFacilityResult } = useSelector((state: RootState) => state.facilitySearchResult);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => { dispatch(fetchFacilitySearchData()); }, [dispatch]);

    console.log(allFacilityResult);
    const searchResult = allFacilityResult.filter((item) => item.Name?.toLowerCase().includes(searchText.toLowerCase()));
    console.log(searchResult);

    return (
        <TabContent activeTab={activeTab}>
            <TabPane className='search-links' tabId={1}>
                <AllTab searchText={searchText} allFacilityResult={searchResult} />
            </TabPane>
            {/* <TabPane tabId={2}>
                <ImageTab />
            </TabPane> */}
            {/* <TabPane tabId={3}>
                <VideoTab allResult={allResult} />
            </TabPane> */}
        </TabContent>
    )
}





// import React, { useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux';
// import { TabContent, TabPane } from 'reactstrap';
// import { SearchTabContentProp } from '../../../../Types/SearchResult.type';
// import { AppDispatch, RootState } from '../../../../ReduxToolkit/Store';
// import { fetchSearchData } from '../../../../ReduxToolkit/Reducers/SearchResultReducer';
// import AllTab from './AllTab';
// import ImageTab from './ImageTab';
// import VideoTab from './VideoTab';

// interface ExtendedSearchTabContentProp extends SearchTabContentProp {
//     searchText: string; // Add searchText to props
// }


// export default function SearchTabContent({ activeTab ,searchText}: ExtendedSearchTabContentProp) {
//     const { allResult } = useSelector((state: RootState) => state.searchResult);
//     const dispatch = useDispatch<AppDispatch>();
//     useEffect(() => { dispatch(fetchSearchData()); }, [dispatch]);

//     console.log(allResult);
//     const searchResult = allResult.filter((item) => item.title?.toLowerCase().includes(searchText.toLowerCase()));
//     console.log(searchResult);

//     return (
//         <TabContent activeTab={activeTab}>
//             <TabPane className='search-links' tabId={1}>
//                 <AllTab allResult={searchResult} />
//             </TabPane>
//             <TabPane tabId={2}>
//                 <ImageTab />
//             </TabPane>
//             <TabPane tabId={3}>
//                 <VideoTab allResult={allResult} />
//             </TabPane>
//         </TabContent>
//     )
// }