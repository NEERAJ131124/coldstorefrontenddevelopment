import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SearchResultApi } from "../../api";
import { SearchResultInitialState, TabDataItems } from "../../Types/SearchResult.type";
import { getAllFacility } from "../../api-service/Facility/Index";
import { useNavigate } from "react-router-dom";
import { FacilityListData, FacilitySearchResultInitialState } from "../../Types/Facility.type";

export const fetchSearchData = createAsyncThunk<FacilityListData[], void, {}>("api/searchResult", async () => {
    const navigate = useNavigate()
    const response = await getAllFacility(navigate)
    return response.data;
});

const initialState: FacilitySearchResultInitialState = { allFacilityResult: [] };

const FacilitySearchResultSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {
        setAllFacilityResult: (state, action: PayloadAction<FacilityListData[]>) => {
            state.allFacilityResult = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearchData.fulfilled, (state, action) => {
            state.allFacilityResult = action.payload;
        });
    },
});

export const { setAllFacilityResult } = FacilitySearchResultSlice.actions;
export default FacilitySearchResultSlice.reducer;
