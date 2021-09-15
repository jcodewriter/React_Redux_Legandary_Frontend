import { Toast } from "components/common/notification";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { clearState } from "reduxstore/propertyreducer/action";
import { stripeAccount } from "shared/api";

function WelcomeToHostComponent({ nextStep }) {
  const dispatch = useDispatch();
  const host = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const history = useHistory();

  //Checking the status and go to next
  const startHost = async () => {
    dispatch(clearState());
    // await stripeAccount(token);
    nextStep();
    // if(host.role !== "admin"){
    //   if(host?.chargeEnagleStatus){
    //     nextStep();
    //   } else{
    //     Toast("", "You should add your payout method", "info")
    //     history.push("/user/edit-profile/payment-setting")
    //   }
    // } else{
    //   nextStep();
    // }
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
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 xl:grid xl:grid-cols-2 xl:grid-flow-col-dense xl:gap-x-8">
            <div className="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
              <h2 className="text-sm font-semibold tracking-wide uppercase">
                <span className="bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">Host</span>
              </h2>
              <p className="mt-3 text-3xl font-extrabold text-white">Host your space to our Platform</p>
              <p className="mt-5 text-lg text-gray-300">Easy way to host your place</p>
              <div className="flex justify-end my-28">
                <div
                  className="text-white text-md py-2 px-5 bg-indigo-500 rounded-md cursor-pointer hover:bg-indigo-600"
                  onClick={startHost}
                >
                  Start Hosting
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeToHostComponent;
