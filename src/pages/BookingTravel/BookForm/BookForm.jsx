import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/reducer/ModalReducer";
import CalendarBook from "../CalendarBook/CalendarBook";
import { HandleInputCalendar } from "../CalendarBook/HandleInputCalendar";
import GuestForm from "../GuestForm/GuestForm";

export default function BookForm(props) {
  let { inforRoom } = props;
  const refCalendar = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    const handleCalendarPopUp = (e) => {
      if (refCalendar !== null) {
        if (!refCalendar.current?.contains(e.target)) {
          setShow(false);
        }
      }
    };
    document.addEventListener("mousedown", handleCalendarPopUp);
    return () => {
      document.removeEventListener("mousedown", handleCalendarPopUp);
    };
  }, []);
  useEffect(() => {}, [props?.inforRoom]);

  const {
    checkInDate,
    setShow,
    isCheckOut,
    checkOutDate,
    isShow,
    submitCheckIn,
  } = HandleInputCalendar(inforRoom);

  return (
    <div className="bookForm boxshadow bookForm_md">
      <div className="bookForm_header">
        <div className="bookForm_header-title">
          <h6 className="bookForm_giaTien">
            ${Number(inforRoom?.giaTien)}
            <span>night</span>
          </h6>
          <h6 className="bookForm_star-review">
            <span>
              <i className="fa-solid fa-star"></i>4
            </span>
            <ul>
              <li>34 reviews</li>
            </ul>
          </h6>
          <div className="bookForm_title-md">
            {checkInDate && checkOutDate ? (
              <p
                onClick={() => {
                  dispatch(
                    openModal(
                      <CalendarBook
                        inforRoom={inforRoom}
                        classModal={"calendar_modal"}
                      />
                    )
                  );
                }}
              >{`${moment(checkInDate, ["DD-MM-YYYY", "YYYY-MM-DD"]).format(
                "MMM DD"
              )} - ${moment(checkOutDate, ["DD-MM-YYYY", "YYYY-MM-DD"]).format(
                "DD"
              )}`}</p>
            ) : (
              <h6 className="bookForm_star-md">
                <span>
                  <i className="fa-solid fa-star"></i>4
                </span>
                <ul>
                  <li>34 reviews</li>
                </ul>
              </h6>
            )}
          </div>
        </div>

        <div className="bookForm_header-checkDate">
          <label htmlFor="checkIn" className={`border_around label_pop-up`}>
            <span>Check-In</span>
            <input
              value={checkInDate}
              placeholder="Add Date"
              onClick={() => {
                setShow(true);
              }}
              type="text"
              id="checkIn"
              onChange={(e) => {}}
            />
          </label>
          <label
            htmlFor="checkOut"
            className={`border_around label_pop-up ${
              isCheckOut || checkOutDate !== "" ? "" : "opacity_label"
            } `}
          >
            <span>Check-Out</span>
            <input
              onClick={() => {
                setShow(true);
              }}
              value={checkOutDate}
              placeholder="DD/MM/YYYY"
              type="text"
              id="checkOut"
              onChange={(e) => {}}
            />
          </label>
          {isShow && (
            <div className="popupCalendar" ref={refCalendar}>
              <CalendarBook inforRoom={inforRoom} calendarRight={true} />
            </div>
          )}
        </div>
        <div className="wrap_label-guest ">
          <GuestForm getFormGuest={true} doNotPopUp={true} getTax={true} />
        </div>
      </div>
      {checkInDate && checkOutDate ? (
        <>
          <div
            className="btn_form btn_primary btn_bookForm d-block"
            onClick={(e) => {
              submitCheckIn(e);
            }}
          >
            Reserve
          </div>
        </>
      ) : (
        <>
          <div
            className="btn_form btn_primary btn_bookForm"
            onClick={() => {
              setShow(true);
            }}
          >
            Check availability
          </div>
          <div
            className="btn_form btn_primary btn_bookForm-md"
            onClick={() => {
              dispatch(
                openModal(
                  <CalendarBook
                    inforRoom={inforRoom}
                    classModal={"calendar_modal bookForm_md-popup"}
                  />
                )
              );
            }}
          >
            Check availability
          </div>
        </>
      )}
    </div>
  );
}
