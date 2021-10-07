import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearState, getPropertiesByHost } from "reduxstore/propertyreducer/action";

function ManageListListComponent() {
  const applications = [
    {
      applicant: {
        name: "Ricardo Cooper",
        email: "ricardo.cooper@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      date: "2020-01-07",
      dateFull: "January 7, 2020",
      stage: "Completed phone screening",
      href: "#",
    },
    {
      applicant: {
        name: "Kristen Ramos",
        email: "kristen.ramos@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      date: "2020-01-07",
      dateFull: "January 7, 2020",
      stage: "Completed phone screening",
      href: "#",
    },
    {
      applicant: {
        name: "Ted Fox",
        email: "ted.fox@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      date: "2020-01-07",
      dateFull: "January 7, 2020",
      stage: "Completed phone screening",
      href: "#",
    },
  ];
  const properties = useSelector((state) => state.properties.properties);
  const userID = useSelector((state) => state.auth.userID);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearState());
    dispatch(getPropertiesByHost(userID));
  }, []);
  console.log(properties);

  return (
    <div className="py-5">
      <p className="text-2xl font-bold">Properties</p>
      <ul className="divide-y divide-gray-200">
        {applications.map((item, index) => (
          <li key={index}>
            <div className="flex items-center px-4 py-4 sm:px-6">
              <p>{item.applicant.name}</p>
            </div>
          </li>
        ))}
        <li></li>
      </ul>
    </div>
  );
}

export default ManageListListComponent;
