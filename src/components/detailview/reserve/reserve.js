import React, { useState, useEffect, Children } from 'react'
import { MinusCircleIcon,  PlusCircleIcon } from '@heroicons/react/outline';
import { Link, useHistory } from 'react-router-dom'
import { classNames, getDaysArray } from 'shared/function';
import { Toast } from 'components/common/notification';
import { useSelector } from 'react-redux';

function ReserveComponent({ property, checkedInOut, propertyId }) {
    const [guests, setGuests] = useState({
        adult: 1, 
        children: 0,
        infants: 0,
        pets: 0
    });

    //Increase or Decrease the Gust Num
    const CalcGuestNum = ( method, type ) => {
        if((method === "INCREASE") && ((guests.adult + guests.children)<property?.guestNum ) ){
            setGuests(
                {
                    ...guests,
                    [type]: guests[type] + 1
                }
            )
        }
        else if(method === "DECREASE"){
            setGuests(
                {
                    ...guests,
                    [type]: (guests[type]>0)? (guests[type] - 1) : 0
                }
            )
        }
    }

    //Guest Data
    const GuestLayout = [
        {
            title: "Adult",
            param: "adult"
        },
        {
            title: "Children",
            param: "children"
        },
    ]

    //Get Date Array
    const[dateArray, setDateArray] = useState([]);
    useEffect(() => {
       if(checkedInOut?.from && checkedInOut?.to){
           const array = getDaysArray(checkedInOut?.from, checkedInOut?.to);
           setDateArray(array);
       }
    }, [checkedInOut]);

    //Go to Book
    const history = useHistory();
    const AuthToken = useSelector( state => state.auth.token );
    const gotoBook = () => {
        if(AuthToken){
            if(dateArray.length){
                history.push(`/book/${propertyId}?adult=${guests.adult}&children=${guests.children}&infants=${guests.infants}&checkedin=${checkedInOut?.from}&checkedout=${checkedInOut?.to}&pets=${guests.pets}`)
            }
            else{
                Toast('', 'Please choose checked-in and checked-out', 'danger');
            }
        }
        else{
            Toast('', 'You must sign in', 'danger');
            history.push('/signin');
        }
    }

    //Pet Allowed?
    const [isPet, setIsPet] = useState(false);
   
    return (
        <div>
            <section aria-labelledby="announcements-title">
                <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="text-center w-full">
                        <h2
                        className="text-base font-medium text-gray-900"
                        id="announcements-title"
                        >
                            Guests
                        </h2>
                        <div className="flow-root mt-6">
                        <ul className="-my-5 py-5">
                            {
                                GuestLayout.map((item, index) => (
                                    <div className="flex justify-between px-5 gird grid-cols-2" key={index}>
                                        <p>{item.title}:</p>
                                        <div className="flex justify-between w-1/2">
                                            <div className="cursor-pointer" onClick={() => {CalcGuestNum("DECREASE", item.param)}}>
                                                <MinusCircleIcon 
                                                    className={classNames(
                                                        ((guests[item.param])>0 ) ? 'text-gray-800' : 'text-gray-300',
                                                        'h-6'
                                                    )} 
                                                />
                                            </div>
                                                { guests[item.param] }
                                            <div className="cursor-pointer" onClick={() => {CalcGuestNum("INCREASE", item.param)}}>
                                                <PlusCircleIcon
                                                    className={classNames(
                                                        ((guests.adult + guests.children)<property?.guestNum ) ? 'text-gray-800' : 'text-gray-300',
                                                        'h-6'
                                                    )} 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="flex justify-between px-5 gird grid-cols-2">
                                <p>Infants:</p>
                                <div className="flex justify-between w-1/2">
                                    <div className="cursor-pointer" onClick={() => { setGuests({ ...guests, infants: guests.infants ? (guests.infants-1) : 0 }) }}>
                                        <MinusCircleIcon 
                                            className={classNames(
                                                ((guests.infants)>0 ) ? 'text-gray-800' : 'text-gray-300',
                                                'h-6'
                                            )} 
                                        />
                                    </div>
                                        { guests.infants }
                                    <div className="cursor-pointer" onClick={() => { setGuests({ ...guests, infants: guests.infants+1 }) }}>
                                        <PlusCircleIcon
                                            className={classNames(
                                                ((guests.infants)<3 ) ? 'text-gray-800' : 'text-gray-300',
                                                'h-6'
                                            )} 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                {
                                    property?.amenities?.find(element => element === 'Pets Allowed')&&<div className="py-5 px-5">
                                        <div className="flex justify-left items-center">
                                            <input 
                                                type="checkbox" 
                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                onChange={(e)=>{
                                                    setIsPet(e.target.checked);
                                                    setGuests({ ...guests, pets: 0 })
                                                }}
                                            />
                                            <p className="ml-2 text-gray-400">Do you want Pets?</p>
                                        </div>
                                       {
                                            isPet && <div>
                                               <div className="flex justify-between gird grid-cols-2">
                                                    <p>pets:</p>
                                                    <div className="flex justify-between w-1/2">
                                                        <div className="cursor-pointer" onClick={() => { setGuests({ ...guests, pets: guests.pets ? (guests.pets-1) : 0 }) }}>
                                                            <MinusCircleIcon 
                                                                className={classNames(
                                                                    ((guests.pets)>0 ) ? 'text-gray-800' : 'text-gray-300','h-6'
                                                                )} 
                                                            />
                                                        </div>
                                                            { guests.pets }
                                                        <div className="cursor-pointer" onClick={() => { setGuests({ ...guests, pets: guests.pets+1 }) }}>
                                                            <PlusCircleIcon
                                                                className={classNames(
                                                                    ((guests.pets)<3 ) ? 'text-gray-800' : 'text-gray-300','h-6'
                                                                )} 
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                           </div>
                                       }
                                    </div>
                                }
                            </div>
                            
                            <div className="py-5 px-10">
                                <p className="text-gray-800">
                                    <span className="text-lg font-bold">${property?.nightlyRate}</span>
                                    /night
                                </p>
                                <div className="flex justify-between py-4 px-5 text-gray-800">
                                    <p className="underline">${property?.nightlyRate} x {dateArray.length} nights</p>
                                    <p>${ parseInt(property?.nightlyRate) * dateArray.length}</p>
                                </div>
                                <div className="flex pb-5 px-5 justify-between">
                                    <p className="underline">Deposit fee</p>
                                    <p>${property?.depositFee | 0}</p>
                                </div>
                                {
                                    isPet && <div className="flex pb-5 px-5 justify-between">
                                        <p className="underline">Pet fee</p>
                                        <p>${(property?.petAllowFee?.fee | 0)*guests.pets}</p>
                                    </div>
                                }
                                <div  className="flex pb-5 px-5 justify-end">
                                    <span className="font-bold mr-2">{ guests.adult + guests.children }</span> Guests
                                </div>
                                <hr />
                                <div className="flex justify-between px-5 py-2">
                                    <p className="font-bold">Total</p>
                                    <p className="font-bold">${(parseInt(property?.nightlyRate) * dateArray.length) + (property?.depositFee | 0) + (property?.petAllowFee?.fee | 0)*guests.pets}</p>
                                </div>
                            </div>
                        </ul>
                    </div>
                    <div className="mt-6">
                    <div
                        onClick={gotoBook}
                        className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-800"
                    >
                        Reserve
                    </div>
                    </div>
                </div>
                </div>
            </section>
        </div>
    )
}

export default ReserveComponent;
