import React, { useEffect, useState } from 'react';
import PropertyIistItem from 'components/properties/propertylist';
import { useDispatch, useSelector } from "react-redux";
import { getAllProperties, searchProperties } from 'reduxstore/propertyreducer/action';
import { useLocation } from 'react-router-dom';
import qs from 'qs'
import SearchComponent from 'components/properties/search';
import { SpinnerDotted } from 'spinners-react';

const PropertiesPage  = () => {
    //Get Properties from backend
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        if(!location.search){
            dispatch(getAllProperties());
        }
        else{
            const query = qs.parse(location.search, { ignoreQueryPrefix: true });
            const queryBody = {
                nightlyRateRangeFrom: '',
                nightlyRateRangeTo: '',
                location: {

                },
                propertyType: '',
                propertySpaceFeature: '',
                guestNum: (parseInt(query.adult) + parseInt(query.children)),
                amenities: []
            }
            dispatch(searchProperties(queryBody));
        }
    }, []);
    const properties = useSelector((state) => state.properties.properties);
    const status = useSelector((state) => state.properties.status);

    //Handle Drawer
    return (
        <div>
            <div className="container mx-auto min-h-screen">
                <div className="mt-10 text-center">
                    <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Check out our Properties</h3>
                </div>
                <SearchComponent/>
                <div>
                    {
                        (status == 2)?
                            <div className='flex justify-center py-10'>
                                <SpinnerDotted size={100} thickness={100} speed={100} color="#FF000055" enabled={(status == 2)} />
                            </div>
                        :
                        
                            (
                                properties.length?
                                    <div className ="md:grid md:grid-cols-3 md:px-4 lg:px-8">
                                        {
                                            properties.map((propety, index)=>(
                                                <PropertyIistItem item={propety} key={index}/>
                                            ))
                                        }
                                    </div>
                                : 
                                    <>
                                        <div className="py-20 text-center">
                                            <span className="text-gray-200 text-5xl text-center">Sorry, We can't find items</span>
                                        </div>
                                    </>
                            )
                        
                    }
                </div>
            </div>
           
        </div>
    )
}

export default PropertiesPage;