import React, { useEffect, useState } from "react";
import ManageListReserveComponent from "components/host/managelist/reserves";
import ManageListTapComponent from "components/host/managelist/tap";
import { Route, Switch, useLocation } from "react-router-dom";
import { SwitchHorizontalIcon, ViewListIcon, CalendarIcon, ClipboardListIcon } from "@heroicons/react/solid";
import ManageListCalendarComponent from "components/host/managelist/calendar";
import ManageListTransactionsComponent from "components/host/managelist/transcations";
import ManageListListComponent from "components/host/managelist/list";

function ManageListPage() {
  const [tabs, setTabs] = useState([
    {
      name: "Reserves",
      href: "/user/manage-list/reserves",
      icon: ViewListIcon,
      current: true,
    },
    {
      name: "Calendar",
      href: "/user/manage-list/calendar",
      icon: CalendarIcon,
      current: false,
    },
    {
      name: "Transaction",
      href: "/user/manage-list/transaction-history",
      icon: SwitchHorizontalIcon,
      current: false,
    },
    {
      name: "List",
      href: "/user/manage-list/list",
      icon: ClipboardListIcon,
      current: false,
    },
  ]);

  const location = useLocation();
  useEffect(() => {
    setTabs([
      {
        name: "Reserves",
        href: "/user/manage-list/reserves",
        icon: ViewListIcon,
        current: location.pathname == "/user/manage-list/reserves" ? true : false,
      },
      {
        name: "Calendar",
        href: "/user/manage-list/calendar",
        icon: CalendarIcon,
        current: location.pathname == "/user/manage-list/calendar" ? true : false,
      },
      {
        name: "Transaction",
        href: "/user/manage-list/transaction-history",
        icon: SwitchHorizontalIcon,
        current: location.pathname == "/user/manage-list/transaction-history" ? true : false,
      },
      {
        name: "List",
        href: "/user/manage-list/list",
        icon: ClipboardListIcon,
        current: location.pathname == "/user/manage-list/list" ? true : false,
      },
    ]);
  }, [location]);
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <ManageListTapComponent tabs={tabs} />
        <div>
          <Switch>
            <Route path={"/user/manage-list/reserves"} component={ManageListReserveComponent} />
            <Route path={"/user/manage-list/calendar"} component={ManageListCalendarComponent} />
            <Route path={"/user/manage-list/transaction-history"} component={ManageListTransactionsComponent} />
            <Route path={"/user/manage-list/list"} component={ManageListListComponent} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default ManageListPage;
