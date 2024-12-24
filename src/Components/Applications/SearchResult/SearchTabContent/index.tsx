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
import { calculateDistance, getCurrentLocation } from '../../../../Common/methods';
import { Btn } from '../../../../AbstractElements';
import Loader from '../../../../Layout/Loader';
import { AnyAaaaRecord } from 'node:dns';

interface ExtendedSearchTabContentProp extends SearchTabContentProp {
    searchText: any
}

export default function SearchTabContent({ activeTab, searchText }: ExtendedSearchTabContentProp) {
    const { allFacilityResult } = useSelector((state: RootState) => state.facilitySearchResult);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => { dispatch(fetchFacilitySearchData()); }, [dispatch]);

    // const filterNearbyStorage = async (facilities:any, maxDistance:any) => {
    //     try {
    //         debugger;
    //         const nearbyFacilities = await facilities.filter((facility:any) => {
    //             const distance = calculateDistance(facility.GeoLocation.Latitude,facility.GeoLocation.Longitude);
    //             return distance <= maxDistance; // Check if within the max distance (e.g., 10 km)
    //         });

    //         console.log("nearby facility: ",nearbyFacilities)
    //         return nearbyFacilities;
    //     } catch (error) {
    //         console.error("Error getting user location:", error);
    //         return [];
    //     }
    // };

        const { 1: advancedFilters } = searchText;
         debugger;
        const searchQuery = advancedFilters?.searchText?.toLowerCase() || ""; 
        const capacityFilter = advancedFilters?.searchCapacity || 0; 
        const storageTypeIdFilter = advancedFilters?.StorageTypeId || ""; 
        const searchResult = allFacilityResult.filter((item) =>
                ((item?.Name).toLowerCase()).includes(searchQuery)||
                item?.GeoLocation.Pincode?.includes(searchQuery) ||
                item?.StorageFacilityCapacities.some(capacity => capacity.StorageCapacity >= capacityFilter  && capacity?.StorageTypeId?._id == storageTypeIdFilter)
            );


    
        
    return (
        <>
            {
              allFacilityResult && <Loader />
            }
            <TabContent activeTab={activeTab}>
                <TabPane className='search-links' tabId={1}>
                    {/* <Btn onClick={()=>filterNearbyStorage(allFacilityResult,1)}>Nearby Stores</Btn> */}
                    <AllTab searchText={searchText} allFacilityResult={searchResult} />
                </TabPane>
                {/* <TabPane tabId={2}>
                        <ImageTab />
                        </TabPane> */}
                {/* <TabPane tabId={3}>
                         <VideoTab allResult={allResult} />
                        </TabPane> */}
            </TabContent>

        </>

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