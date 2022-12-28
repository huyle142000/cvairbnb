import moment from "moment";
import React, { useEffect, useState, memo, useRef } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCheckIn,
  getCheckOut,
  getLimitCheckOut,
} from "../../../redux/reducer/CalendarReducer";

import { useCheckDate } from "./checkDate";
import { HandleInputCalendar } from "./HandleInputCalendar";
let nameOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function CalendarBook(props) {
  // getValue From Use
  const { checkDay, paddingDay, checkInOutDay, checkDateIsBooked } =
    useCheckDate(props);
  const { checkInRef, checkOutRef, renderInputForm } = HandleInputCalendar(
    props.inforRoom
  );
  //Selector
  const { checkDateIn, checkDateOut } = useSelector(
    (state) => state.CalendarReducer
  );
  useEffect(() => {}, [checkInRef, checkOutRef]);
  //

  const dispatch = useDispatch();
  // Calendar left
  let [value, setValue] = useState(moment());
  const startDay = value.clone().startOf("month");
  const endDay = value.clone().endOf("month");
  const [calendar, setCalendar] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  // Calendar right
  let [value2, setValue2] = useState(moment().clone().add(1, "month"));
  const startDay2 = value2.clone().startOf("month");
  const endDay2 = value2.clone().endOf("month");
  const [calendar2, setCalendar2] = useState([]);
  const [checkOut, setCheckOut] = useState("");

  const arrCalendarDate = () => {
    const day = startDay.clone().subtract(1, "day");
    let arrCalendar = [];
    while (day.isBefore(endDay, "day")) {
      arrCalendar.push(
        Array(1)
          .fill(0)
          .map(() => {
            return day.add(1, "day").clone();
          })
      );
    }
    const day2 = startDay2.clone().subtract(1, "day");
    let arrCalendar2 = [];
    while (day2.isBefore(endDay2, "day")) {
      arrCalendar2.push(
        Array(1)
          .fill(0)
          .map(() => {
            return day2.add(1, "day").clone();
          })
      );
    }
    //
    setCalendar(arrCalendar);
    setCalendar2(arrCalendar2);
  };
  useEffect(() => {
    arrCalendarDate();
  }, [value]);
  useEffect(() => {
    if (checkDateIn !== "") {
      setCheckIn(moment(checkDateIn));
    } else {
      setCheckIn("");
    }
    if (checkDateOut !== "") {
      setCheckOut(moment(checkDateOut));
    } else {
      setCheckOut("");
    }
  }, [checkDateIn, checkDateOut]);
  const prevMonth = (payload) => {
    return payload.clone().subtract(1, "month");
  };
  const nextMonth = (payload) => {
    return payload.clone().add(1, "month");
  };
  const renderHeader = (startDay) => {
    let month = startDay.format("MMMM");
    let year = startDay.format("YYYY");
    return (
      <>
        <div className="calendar-wmy">
          <div className="title_wmy d-flex justify-content-around">
            <h5>
              {month} {year}
            </h5>
          </div>
          {nameOfWeek.map((week, i) => {
            return (
              <div key={i} className="calendar_span">
                {week}
              </div>
            );
          })}
        </div>
      </>
    );
  };
  const renderCalendar = (calendar, startDay, value, number) => {
    return (
      <>
        {calendar.map((week, index) => {
          return (
            <Fragment key={index}>
              {index === 0 && (
                <Fragment key={index}>{renderHeader(startDay)}</Fragment>
              )}
              {week.map((day, i) => {
                return (
                  <Fragment key={i}>
                    {day.format("D") == 1 && i === 0 && (
                      <>
                        {Array.from({
                          length: day.format("d"),
                        }).map((a, i) => {
                          return <div key={i} className="calendar_span"></div>;
                        })}
                      </>
                    )}
                    <div className="calendar_span" key={i}>
                      <span
                        className={`${paddingDay(day)} ${checkDay(
                          day,
                          checkIn
                        )} ${checkDateIsBooked(day)} ${checkInOutDay(
                          day,
                          checkIn,
                          checkOut
                        )}
                         `}
                        onClick={() => {
                          if (checkIn !== "") {
                            setCheckOut(day);
                            dispatch(
                              getCheckOut(
                                moment(moment(day, "DD-MM-YYYY"), "DD-MM-YYYY")
                              )
                            );
                          } else {
                            setCheckIn(day);
                            dispatch(
                              getCheckIn(
                                moment(moment(day, "DD-MM-YYYY"), "DD-MM-YYYY")
                              )
                            );
                          }
                          if (checkIn !== "" && checkOut !== "") {
                            if (moment(checkIn).isSame(day, "day")) {
                              setCheckIn("");
                              setCheckOut("");
                              dispatch(getCheckIn(""));
                              dispatch(getCheckOut(""));
                            } else {
                              setCheckOut(day);
                              dispatch(getCheckOut(day));
                            }
                          }
                        }}
                      >
                        {day.format("D")}
                      </span>
                    </div>
                  </Fragment>
                );
              })}
            </Fragment>
          );
        })}
      </>
    );
  };

  return (
    <div className="bookForm_header-checkDate">
      <div className="bookForm_pop-up boxshadow">
        {props.inforRoom && renderInputForm()}
        <div className="row">
          <div
            className={`col-12 col-xl-6 ${
              props.calendarRight && "col-sm-6"
            } calendar_left`}
          >
            <div className="calendar ">
              {value.isSame(new Date(), "month") ? (
                <div></div>
              ) : (
                <div
                  className="decrease_calendar calendar-icon_month"
                  onClick={() => {
                    setValue(prevMonth(value));
                    setValue2(prevMonth(value2));
                  }}
                >
                  <i className="fa-solid fa-angle-left"></i>
                </div>
              )}
              {renderCalendar(calendar, startDay, checkIn, 1)}
              <div
                className="increase_calendar calendar-icon_month increase_calendar-lg"
                onClick={() => {
                  setValue(nextMonth(value));
                  setValue2(nextMonth(value2));
                }}
              >
                <i className="fa-solid fa-angle-right"></i>
              </div>
            </div>
          </div>
          <div
            className={`col-12 col-sm-6 calendar_right ${
              props.calendarRight && "calendar_medium"
            }`}
          >
            <div className="calendar">
              <div
                className="increase_calendar calendar-icon_month"
                onClick={() => {
                  setValue(nextMonth(value));
                  setValue2(nextMonth(value2));
                }}
              >
                <i className="fa-solid fa-angle-right"></i>
              </div>
              {renderCalendar(calendar2, startDay2, checkOut, 2)}
            </div>
          </div>
        </div>
        <div className="text-right mt-3">
          <button
            className="btn btn_second"
            onClick={() => {
              setCheckIn("");
              setCheckOut("");
            }}
          >
            Clear dates
          </button>
        </div>
      </div>
    </div>
  );
}
export default memo(CalendarBook);
