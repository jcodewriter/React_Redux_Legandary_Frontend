import { createSlice } from "@reduxjs/toolkit";
import {
  deletePropertyById,
  getAllProperties,
  getPropertyById,
  updatePropertyById,
  createNewProperty,
  searchProperties,
  clearState,
  getPropertiesByHost,
} from "./action";
const PREFIX = "property";

const STATUS = {
  INITIAL: 0,
  FULFILLED: 1,
  PENDING: 2,
  REJECTED: 3,
};

const isPendingAction = (action) => action.type.startsWith(`${PREFIX}/`) && action.type.endsWith("pending");
const isRejectedAction = (action) => action.type.startsWith(`${PREFIX}/`) && action.type.endsWith("rejected");

export const PropertySlice = createSlice({
  name: "property",
  initialState: {
    property: {},
    properties: [],
    status: STATUS.INITIAL,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.properties = action.payload;
        state.status = STATUS.FULFILLED;
      })
      .addCase(getPropertyById.fulfilled, (state, action) => {
        state.property = action.payload;
        state.status = STATUS.FULFILLED;
      })
      .addCase(deletePropertyById.fulfilled, (state, action) => {
        state.properties = action.payload;
        state.status = STATUS.FULFILLED;
      })
      .addCase(updatePropertyById.fulfilled, (state, action) => {
        state.property = action.payload;
        state.status = STATUS.FULFILLED;
      })
      .addCase(createNewProperty.fulfilled, (state, action) => {
        state.property = action.payload;
        state.status = STATUS.FULFILLED;
      })
      .addCase(searchProperties.fulfilled, (state, action) => {
        state.properties = action.payload;
        state.status = STATUS.FULFILLED;
      })
      .addCase(getPropertiesByHost.fulfilled, (state, action) => {
        state.properties = action.payload;
        state.status = STATUS.FULFILLED;
      })
      .addCase(clearState.fulfilled, (state, action) => {
        (state.properties = []), (state.property = {}), (state.status = STATUS.INITIAL);
      })
      .addMatcher(isPendingAction, (state, action) => {
        state.status = STATUS.PENDING;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.status = STATUS.REJECTED;
      });
  },
});

export { getAllProperties, getPropertyById, createNewProperty, updatePropertyById, deletePropertyById, getPropertiesByHost };
export default PropertySlice.reducer;
