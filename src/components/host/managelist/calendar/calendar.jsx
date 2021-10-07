import React, { useState, useEffect } from "react";
import CalendertEditDrawerComponenet from "./drawer";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { XIcon } from "@heroicons/react/outline"
import { RadioGroup } from '@headlessui/react'
import { classNames } from "shared/function";
import { ButtonComponent } from "components/basicui/basicui";
import { InputBox } from "components/basicui/basicui";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPropertiesByHost } from "reduxstore/propertyreducer/action";

const plans = [
  { name: 'Available' },
  { name: 'Blocked' },
]

const ManageListCalendarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [radioSelected, setRadioSelected] = useState(plans[0]);
  const calendarRef = React.createRef();
  const properties = useSelector(state => state.properties.properties);
  const userId = useSelector(state => state.auth.user.userID);
  const dispatch = useDispatch();
  console.log(properties);
  useEffect(() => {
    dispatch(getPropertiesByHost(userId));
  }, [])

  const addEvents = (type, label, start, end) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      title: label,
      start: start,
      end: end,
      allDay: true,
    });
  };

  const onClickSave = () => {
    if(radioSelected.name == "Available"){
      addEvents("", "Available", selected.startStr, selected.endStr)
    } else if(radioSelected.name == "Blocked"){
      addEvents("", "Blocked", selected.startStr, selected.endStr)
    }
  }

  return (
    <div className="my-12">
      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-8">
        <div className="col-span-9">
          <div className="pb-8">
            <p>Select Property</p>
            <select className="border py-2 px-5 rounded-md w-full focus:outline-none">
              <option>This is testing1</option>
              <option>This is testing2</option>
              <option>This is testing3</option>
            </select>
          </div>
          <FullCalendar
            ref={calendarRef}
            headerToolbar={{
              start: "title prev,next today",
              center: "",
              end: "dayGridMonth timeGridWeek listWeek",
            }}
            selectable={true}
            selectOverlap={true}
            buttonText={{
              today: "Today",
              month: "Month",
              week: "Week",
              day: "Day",
              list: "List",
            }}
            contentHeight={500}
            initialView={"dayGridMonth"}
            select={(info) => {
              console.log(info);
              setSelected(info);
            }}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            eventAllow
          />
        </div>
        <div className="col-span-3 border-l px-4">
          { 
            selected?<>
              <XIcon className="h-8 w-8 text-gray-500 hover:text-gray-800 cursor-pointer"/>
              <div className="pt-5">
                <p>Selected dates</p>
                <div className="border p-3 text-center">
                  <p>{selected.startStr} ~ {selected.endStr}</p>
                </div>
              </div>
              <div className="py-4 border-b">
                <p>Availability</p>
                <RadioGroup value={radioSelected} onChange={setRadioSelected}>
                  <RadioGroup.Label className="sr-only">Pricing plans</RadioGroup.Label>
                  <div className="relative bg-white rounded-md -space-y-px">
                    {plans.map((plan, planIdx) => (
                      <RadioGroup.Option
                        key={plan.name}
                        value={plan}
                        className={({ checked }) =>
                          classNames(
                            planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                            planIdx === plans.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                            'relative p-2 flex flex-col cursor-pointer md:pl-4 md:pr-6 focus:outline-none'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className="flex items-center text-sm">
                              <span
                                className={classNames(
                                  checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                                  active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                                  'h-4 w-4 rounded-full border flex items-center justify-center'
                                )}
                                aria-hidden="true"
                              >
                                <span className="rounded-full bg-white w-1.5 h-1.5" />
                              </span>
                              <RadioGroup.Label
                                as="span"
                                className={classNames(checked ? 'text-indigo-900' : 'text-gray-900', 'ml-3 font-medium')}
                              >
                                {plan.name}
                              </RadioGroup.Label>
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              { 
                radioSelected?.name === "Available" &&
                <div>
                  <div className="py-4 border-b">
                    <InputBox label="Nightly price"/> 
                    <p className='text-sm py-2'>You’re always in control of your listing, price, and availability. Read more</p>
                  </div>
                  <div className="py-4">
                    <p className="text-xl">Custom settings</p>
                    <p className="mt-3">Adjust your length of stay settings or add a discount for the selected dates to encourage guests to book.</p>
                    <p className="text-indigo-500 text-right py-3 cursor-pointer">+ Add custom settings</p>
                  </div>
                </div>
              }
              <div className="flex justify-center space-x-4 py-4">
                <ButtonComponent onClick={onClickSave} classes="bg-indigo-500 text-white" label="Save"/>
                <ButtonComponent classes="bg-indigo-500 text-white" label="Cancel"/>
              </div>
            </>:<>
              <p>You’re always in control of your listing, price, and availability. Read more</p>
            </>
          }
        </div>
      </div>
      <CalendertEditDrawerComponenet inOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default ManageListCalendarComponent;
