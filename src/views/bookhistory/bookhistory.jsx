import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingHistoryItemComponent from "components/bookinghistory/bookingitem";
import { getAllReservation } from "reduxstore/bookreducer/action";

export default function BookingHistoryPage() {
  const user = useSelector((state) => state.auth.user);
  const reservations = useSelector((state) => state.reservation.reservations);

  //get Reservations
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReservation());
  }, []);

  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    if (reservations) {
      const temp = reservations.filter((item) => item?.guest?._id === user.userID);
      setFiltered(temp);
    }
  }, [reservations]);

  return (
    <div className="max-w-7xl mx-auto my-5">
      <div className="relative bg-gray-900">
        <div className="h-80 absolute inset-x-0 bottom-0 xl:top-0 xl:h-full">
          <div className="h-full w-full xl:grid xl:grid-cols-2">
            <div className="h-full xl:relative xl:col-start-2">
              <img
                className="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"
                src="https://legendarystorage.s3.us-east-2.amazonaws.com/background/bg-arrive-guest1.jpg"
                alt="People working on laptops"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"
              />
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-cols-2 xl:grid-flow-col-dense xl:gap-x-8">
          <div className="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
            <h2 className="text-sm font-semibold tracking-wide uppercase">
              <span className="bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">Booking</span>
            </h2>
            <p className="mt-3 text-3xl font-extrabold text-white">Booking History</p>
            <p className="mt-5 text-lg text-gray-300">When you book, it’ll show up here.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-5">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered?.map((item, index) => (
            <div key={index}>
              <BookingHistoryItemComponent reservation={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
