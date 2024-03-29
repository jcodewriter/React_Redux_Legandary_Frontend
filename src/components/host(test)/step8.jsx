import { InputBox } from "components/basicui/basicui";
import { Toggle } from "components/basicui/basicui";
import { ButtonComponent } from "components/basicui/basicui";
import React from "react";
import { useDispatch } from "react-redux";
import { createNewProperty } from "reduxstore/propertyreducer/action";

function HostFeesComponent({ nextStep, previousStep, property, setProperty }) {
  const dispatch = useDispatch();
  const setDepositeFee = (e) => {
    setProperty({
      ...property,
      depositFee: e.target.value,
    });
  };
  const setPetFee = (e) => {
    setProperty({
      ...property,
      petAllowFee: {
        ...property.petAllowFee,
        fee: e.target.value,
      },
    });
  };
  const setPetLimit = (e) => {
    setProperty({
      ...property,
      petAllowFee: {
        ...property.petAllowFee,
        number: e.target.value,
      },
    });
  };
  const setManageType = (type) => {
    type
      ? setProperty({
          ...property,
          manageType: "LEA",
        })
      : setProperty({
          ...property,
          manageType: "HOST",
        });
  };
  const setStaging = (e) => {
    setProperty({
      ...property,
      stagingFee: {
        ...property.stagingFee,
        hours: e.target.value,
      },
    });
  };
  const createProperty = () => {
    try {
      dispatch(createNewProperty(JSON.stringify(property)));
      nextStep();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md">
        <div className="relative bg-gray-900">
          <div className="absolute inset-x-0 bottom-0 xl:top-0 xl:h-full">
            <div className="h-full w-full xl:grid xl:grid-cols-2">
              <div className="h-full xl:relative xl:col-start-2">
                <img
                  className="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"
                  src="https://legendarystorage.s3.us-east-2.amazonaws.com/background/bg-discuss-guest.jpg"
                  alt="People working on laptops"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"
                />
              </div>
            </div>
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:grid xl:grid-cols-2 xl:grid-flow-col-dense xl:gap-x-8">
            <div className="relative xl:col-start-1 py-3 sm:py-5 md:py-16">
              <p className="text-2xl text-white font-extrabold">Fees</p>
              <div className="py-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <span className="text-white text-lg">Deposite Fee($)</span>
                    <p className="text-white">As a host, you can set a Deposit fee for your property.</p>
                    <InputBox type="number" onchange={setDepositeFee} />
                    <span className="text-white text-xs">
                      If you want to set a deposit fee, please enter your desired amount. Please leave it blank otherwise.
                    </span>
                  </div>
                </div>
                <p className="text-white mt-5 text-lg">Pet Fee($)</p>
                <p className="text-white">
                  If you selected to allow pets inside the property, you can also set a fee for each pet per night or
                  accommodation.
                </p>
                <div className="py-4">
                  <p className="text-white">Select your pet free preference:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <Toggle
                        getToggleValue={() => {
                          setManageType(true);
                        }}
                        removeToggleValue={() => {
                          setManageType(false);
                        }}
                        classnames="text-white"
                        label="Per night"
                      />
                    </div>
                    <div className="col-span-1">
                      <Toggle
                        getToggleValue={() => {
                          setManageType(true);
                        }}
                        removeToggleValue={() => {
                          setManageType(false);
                        }}
                        classnames="text-white"
                        label="Per accommodation"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <InputBox type="number" placeholder="Pet allow fee" onchange={setPetFee} />
                    <span className="text-white text-xs">Please enter the amount you want to charge for each pet per night.</span>
                  </div>
                  <div className="col-span-1">
                    <InputBox type="number" placeholder="How many?" onchange={setPetLimit} />
                    <span className="text-white text-xs">How many pets are you allowing inside your property?</span>
                  </div>
                </div>
                <p className="text-white text-lg mt-2">Other service offered by Legendary Estates Airbnb</p>
                <p className="text-white">Management by Legendary Estates Airbnb</p>
                <p className="text-white text-xs italic">
                  LEA can manage your property and handle everything for you. If you agree to have your property managed by LEA,
                  20% of platform sales will go to LEA.
                </p>
                <div className="flex items-center py-2">
                  <Toggle
                    getToggleValue={() => {
                      setManageType(true);
                    }}
                    removeToggleValue={() => {
                      setManageType(false);
                    }}
                  />
                  <span className="text-white text-xs">Do you want Legendary Estates Airbnb to manage the property for you?</span>
                </div>
              </div>
              <div className="flex justify-between py-3">
                <ButtonComponent onClick={previousStep} label="Prev" classes="bg-indigo-500 hover-bg-indigo-600" />
                <ButtonComponent onClick={createProperty} label="Next" classes="bg-indigo-500 hover-bg-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostFeesComponent;
