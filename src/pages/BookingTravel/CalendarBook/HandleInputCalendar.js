import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInforDateToBook } from "../../../redux/reducer/BookTravel";
import {
  getCheckIn,
  getCheckOut,
} from "../../../redux/reducer/CalendarReducer";
import { USER_LOGIN } from "../../../utils/setting";
import CalendarBook from "./CalendarBook";
import { useCheckDate } from "./checkDate";

export const HandleInputCalendar = (inforRoom) => {
  const { totalGuest } = useSelector((state) => state.BookTravel);
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //
  const checkInRef = useRef();
  const checkOutRef = useRef();

  //
  const [totalBookedDate, setTotalDate] = useState(1);
  const [checkInDate, setDateIn] = useState("");
  const [checkOutDate, setDateOut] = useState("");
  const [focus, setFocus] = useState(false);
  const [isCheckOut, setCheckOut] = useState(false);
  const [isShow, setShow] = useState(false);
  const { checkDateIn, checkDateOut } = useSelector(
    (state) => state.CalendarReducer
  );
  const [errorDateIn, setErrorDateIn] = useState(false);
  const [errorDateOut, setErrorDateOut] = useState(false);
  // Guest
  const [adult, setAdult] = useState(0);
  const [children, setChildren] = useState(0);
  const [infant, setInfants] = useState(0);
  const [pet, setPet] = useState(0);
  const [showGuest, setShowGuest] = useState(false);
  const refGuest = useRef();
  useEffect(() => {
    if (checkDateIn !== "") {
      if (checkDateIn._i) {
        setDateIn(
          moment(checkDateIn._i, ["DD/MM/YYYY", "MM/DD/YYYY"]).format(
            "DD/MM/YYYY"
          )
        );
      } else {
        setDateIn(
          moment(checkDateIn._d, ["DD/MM/YYYY", "MM/DD/YYYY"]).format(
            "DD/MM/YYYY"
          )
        );
      }
    } else {
      setDateIn("");
    }
  }, [checkDateIn]);
  useEffect(() => {
    if (checkDateOut !== "") {
      if (checkDateOut._i) {
        setDateOut(checkDateOut._i);
      } else {
        setDateOut(moment(checkDateOut._d).format("DD/MM/YYYY"));
      }
    }

    if (checkDateOut && checkDateIn) {
      let totalDateBookCur = 1;
      let dateClone = checkDateIn.clone();
      while (dateClone.isBefore(checkDateOut, "day")) {
        dateClone.add(1, "day").clone();
        totalDateBookCur += 1;
      }
      setTotalDate(totalDateBookCur);
    }
  }, [checkDateOut]);
  const { checkDateIsBooked, dateOutCheck } = useCheckDate(inforRoom?.id);

  const checkDateValid = (name, value) => {
    let dateFormat = "DD/MM/YYYY";
    let checkValid = moment(value, dateFormat, true).clone().isValid();
    let result = checkDateIsBooked(value, 1);
    let result2 = moment(value, "DD/MM/YYYY").isBefore(new Date(), "day");
    // && !result
    if (name === "checkIn") {
      if (checkValid && result === "" && !result2) {
        dispatch(getCheckIn(moment(value, "DD/MM/YYYY")));
        setErrorDateIn(false);
        setCheckOut(true);
        return true;
      } else {
        setErrorDateIn(true);
        dispatch(getCheckIn(""));
        return false;
      }
    }
    if (name === "checkOut") {
      const convertDates = moment(value, ["DD/MM/YYYY"])
        .clone()
        .format("YYYY-MM-DD");
      const convertCheckIn = moment(checkInDate, ["YYYY-MM-DD", "DD/MM/YYYY"])
        .clone()
        .format("YYYY-MM-DD");
      let result4 = true;
      if (dateOutCheck.length !== 0) {
        const convertCheckOut = moment(dateOutCheck[0], [
          "YYYY-MM-DD",
          "DD/MM/YYYY",
        ])
          .clone()
          .format("YYYY-MM-DD");
        result4 = moment(convertDates, "YYYY-MM-DD")
          .clone()
          .isBefore(convertCheckOut, "day");
      }
      let result3 = moment(convertDates, "YYYY-MM-DD")
        .clone()
        .isAfter(convertCheckIn, "day");

      // && !result2

      if (checkValid && !result && result3 && result4) {
        dispatch(getCheckOut(moment(value, ["DD/MM/YYYY"])));
        setErrorDateOut(false);
        return true;
      } else {
        setErrorDateOut(true);
        dispatch(getCheckOut(""));
        return false;
      }
    }
  };
  const submitCheckIn = async (e) => {
    e.preventDefault();
    let checkValidDateIn;
    let checkValidDateOut;
    try {
      checkValidDateIn = checkDateValid("checkIn", checkInDate);
      checkValidDateOut = checkDateValid("checkOut", checkOutDate);
      if (
        checkInDate &&
        checkOutDate &&
        totalGuest > 0 &&
        checkValidDateIn &&
        checkValidDateOut
      ) {
        await navigate("/confirmpay");
      }
    } catch (error) {}
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "checkIn") {
      setDateIn(value);
    }
    if (name === "checkOut") {
      setDateOut(value);
    }
  };
  const focusInput = (e) => {
    let { name } = e.target;

    if (name === "checkIn") {
      setFocus(true);
    }
    if (name === "checkOut") {
      setFocus(false);
    }
  };
  const renderInputForm = () => {
    return (
      <div className="select_dates">
        <div className="select_dates-title">
          <h3>Select dates</h3>
          <p>Add your travel dates for exact pricing</p>
        </div>

        <form
          onSubmit={(e) => {
            submitCheckIn(e);
          }}
          className="form_calendar"
        >
            <label
              htmlFor="checkIn"
              className={`border_around label_checkIn ${
                errorDateIn && "error"
              } ${focus && "border_checkIn"}`}
            >
              <span>Check-In</span>
              <input
                value={checkInDate}
                className="checkIn-input"
                placeholder="DD/MM/YYYY"
                onBlur={(e) => {
                  let { name, value } = e.target;
                  checkDateValid(name, value);
                }}
                onClick={(e) => {
                  focusInput(e);
                }}
                ref={checkInRef}
                type="text"
                name="checkIn"
                id="checkIn"
                onChange={(e) => handleChange(e)}
              />
              <p>
                <i className="fa-solid fa-circle-exclamation"></i>Date is not
                Valid
              </p>
            </label>
            <label
              htmlFor="checkOut"
              className={`border_around ${
                isCheckOut || checkOutDate !== "" ? "" : "opacity_label"
              } ${errorDateOut && "error"} ${
                !focus && "border_checkOut"
              } label_checkOut`}
            >
              <span>Check-Out</span>
              <input
                onBlur={(e) => {
                  let { name, value } = e.target;
                  checkDateValid(name, value);
                }}
                onClick={(e) => {
                  focusInput(e);
                }}
                value={checkOutDate}
                placeholder="DD/MM/YYYY"
                disabled={isCheckOut || checkOutDate !== "" ? false : true}
                type="text"
                id="checkOut"
                name="checkOut"
                onChange={(e) => handleChange(e)}
                ref={checkOutRef}
              />
              <p>
                <i className="fa-solid fa-circle-exclamation"></i>Date is not
                Valid
              </p>
            </label>
        </form>
      </div>
    );
  };
  return {
    checkDateValid,
    checkInRef,
    setFocus,
    checkOutRef,
    renderInputForm,
    checkInDate,
    setShow,
    isCheckOut,
    checkOutDate,
    isShow,
    submitCheckIn,
    handleChange,
    totalBookedDate,
    refGuest,
    setShowGuest,
    showGuest,
    adult,
    children,
    infant,
    pet,
    setAdult,
    setChildren,
    setInfants,
    setPet,
    setErrorDateIn,
    setErrorDateOut,
  };
};
