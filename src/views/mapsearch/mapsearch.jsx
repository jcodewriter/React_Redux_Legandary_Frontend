import GoogleMapComponent from "components/googlemap";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllProperties } from "reduxstore/propertyreducer/action";

function MapSearchPage() {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties.properties);
  useEffect(() => {
    dispatch(getAllProperties());
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-8">
        <div className="col-span-5 h-screen relative">
          <GoogleMapComponent locations={properties.map((property) => property.propertyLocation)} />
        </div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}

export default MapSearchPage;
