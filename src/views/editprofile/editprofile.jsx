import React, { useEffect, useState } from "react";
import { Switch, useLocation } from "react-router-dom";
import TapComponent from "components/editprofile/tap";
import EditAccountPersonalInfoComponent from "components/editprofile/personalinfo";
import { PrivateRoute } from "shared/function";
import EditAccountSecuritySettingComponent from "components/editprofile/securitysetting";
import EditAccountPaymentSettingComponent from "components/editprofile/paymentsetting";
import RedirectFromConnectStripeComponent from "components/editprofile/successpayout";

export default function EditProfilePage() {
  //Control Taps
  const location = useLocation();
  const [tabs, setTaps] = useState([
    { name: "Personal info", href: "/user/edit-profile", current: false },
    {
      name: "Login & Security",
      href: "/user/edit-profile/security-setting",
      current: false,
    },
    {
      name: "Payment & Payout",
      href: "/user/edit-profile/payment-setting",
      current: true,
    },
  ]);
  useEffect(() => {
    setTaps([
      {
        name: "Personal info",
        href: "/user/edit-profile",
        current: location.pathname === "/user/edit-profile" ? true : false,
      },
      {
        name: "Login & Security",
        href: "/user/edit-profile/security-setting",
        current: location.pathname === "/user/edit-profile/security-setting" ? true : false,
      },
      {
        name: "Payment & Payout",
        href: "/user/edit-profile/payment-setting",
        current: location.pathname === "/user/edit-profile/payment-setting" ? true : false,
      },
    ]);
  }, [location]);

  return (
    <div className=" max-w-7xl mx-auto p-5">
      <div className="space-y-3">
        <div>
          <div>
            <h3 className="text-3xl leading-6 font-semibold text-gray-900 py-5">My account</h3>
          </div>
        </div>
        <div className="pt-2">
          <TapComponent tabs={tabs} setTaps={setTaps} />
        </div>
        <div>
          <Switch>
            <PrivateRoute exact path="/user/edit-profile" component={EditAccountPersonalInfoComponent} />
            <PrivateRoute path="/user/edit-profile/security-setting" component={EditAccountSecuritySettingComponent} />
            <PrivateRoute path="/user/edit-profile/payment-setting" component={EditAccountPaymentSettingComponent} />
            <PrivateRoute path="/user/edit-profile/payment-setting" component={EditAccountPaymentSettingComponent} />
            <PrivateRoute path="/user/edit-profile/payoutmethod-success" component={RedirectFromConnectStripeComponent} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
