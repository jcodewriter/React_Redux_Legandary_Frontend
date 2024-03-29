import React from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SparklesIcon } from "@heroicons/react/outline";
import { formLayout } from "./constant";
import { InputBox } from "components/basicui/basicui";
import { staging } from "shared/api";
import { useHistory } from "react-router";

export default function StagingInfoModalComponent({ isOpen, setisOpen }) {
  const cancelButtonRef = useRef(null);
  const history = useHistory();

  const onClose = () => {
    setisOpen(false);
  };

  const [stagingInfo, setStagingInfo] = useState({
    username: "",
    email: "",
    phone: "",
    spaceType: "House",
    spaceStyle: "Traditional",
    spaceArea: "Less than 500 sq ft",
    spaceFurniture: "Living Room",
    stagingTime: "Immediately",
    ownerType: "Homeowner",
  });

  const setValue = (e, param) => {
    setStagingInfo({
      ...stagingInfo,
      [param]: e.target.value,
    });
  };

  const onSubmit = async () => {
    if (stagingInfo.username && stagingInfo.email && stagingInfo.phone) {
      const res = await staging(stagingInfo);
      if (res.status === 200) {
        history.push("/staging-success");
      }
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        auto-reopen="true"
        className="fixed z-50 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <SparklesIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Let Legendary Estates Airbnb stage your home!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Enter your information to schedule an appointment with our staging consultant. Provide your property details
                      and we will reach out to you shortly to discuss options to transform your space
                    </p>
                    <div className="py-5 border-b grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
                      <div className="col-span-1">
                        <InputBox
                          placeholder="Name"
                          value={stagingInfo.username}
                          onchange={(e) => {
                            setValue(e, "username");
                          }}
                        />
                      </div>
                      <div className="col-span-1">
                        <InputBox
                          placeholder="Email"
                          type="email"
                          value={stagingInfo.email}
                          onchange={(e) => {
                            setValue(e, "email");
                          }}
                        />
                      </div>
                      <div className="col-span-2">
                        <InputBox
                          placeholder="Phone Number"
                          value={stagingInfo.phone}
                          onchange={(e) => {
                            setValue(e, "phone");
                          }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 py-5 gap-5 text-gray-700">
                      {formLayout.map((item) => (
                        <div key={item.name}>
                          <p className="block text-sm font-medium text-gray-700">{item.title}</p>
                          <select
                            id="propertyType"
                            name="propertyType"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300  sm:text-sm rounded-md"
                            defaultValue="Canada"
                            onChange={(e) => {
                              setValue(e, item.name);
                            }}
                          >
                            {item.options.map((option, index) => (
                              <option key={index}>{option}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={onSubmit}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={onClose}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
