import _ from "lodash";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDateIsBookedAPI } from "../../../redux/actions/CalendarAction";
let dateOutCheck = [];

export const useCheckDate = (props) => {
  let dispatch = useDispatch();

  useEffect(() => {
    if (arrCheckDateIsBooked.length === 0) {
      dispatch(getDateIsBookedAPI(props?.codeRoom));
    }
  }, [props?.codeRoom]);
  const { arrCheckDateIsBooked } = useSelector(
    (state) => state.CalendarReducer
  );

  const checkDateIsBooked = (date) => {
    let result = "";
    let a = "";
    let b = "";
    let nextdate = moment(date, "YYYY-MM-DD").clone().add(1, "day");
    let convertNextDate = moment(nextdate, "YYYY-MM-DD").format("YYYY-MM-DD");
    let beforedate = moment(date, "YYYY-MM-DD").clone().subtract(1, "day");
    let convertBeforeDate = moment(beforedate, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );
    let convertDate = moment(date, ["YYYY-MM-DD", "DD-MM-YYYY"])
      .clone()
      .format("YYYY-MM-DD");
    arrCheckDateIsBooked?.map((dateBooked) => {
      const { ngayDen, ngayDi } = dateBooked;
      let convertNgayDen = moment(ngayDen, "YYYY-MM-DD")
        .clone()
        .format("YYYY-MM-DD");
      let convertNgayDi = moment(ngayDi, "YYYY-MM-DD")
        .clone()
        .format("YYYY-MM-DD");

      if (
        moment(convertDate, "YYYY-MM-DD").isAfter(convertNgayDen, "day") &&
        moment(convertDate, "YYYY-MM-DD").isBefore(convertNgayDi, "day")
      ) {
        result = "datebooked";
      }
      if (
        moment(convertDate, "YYYY-MM-DD").isSame(convertNgayDen, "day") ||
        moment(convertDate, "YYYY-MM-DD").isSame(convertNgayDi, "day")
      ) {
        result = "datebooked";
      }
      if (
        moment(convertNextDate, "YYYY-MM-DD").isSame(convertNgayDen, "day") ||
        moment(convertNextDate, "YYYY-MM-DD").isSame(convertNgayDi, "day")
      ) {
        if (a) {
          b = true;
          return b;
        } else {
          a = true;
          return a;
        }
      }

      if (
        moment(convertBeforeDate, "YYYY-MM-DD").isSame(convertNgayDen, "day") ||
        moment(convertBeforeDate, "YYYY-MM-DD").isSame(convertNgayDi, "day")
      ) {
        if (a) {
          b = true;
          return b;
        } else {
          a = true;
          return a;
        }
      }
    });

    if (a && b) {
      result = "datebooked";
    }
    return result;
  };
  const beforeDay = (day, checkIn) => {
    if (checkIn) {
      return day.isBefore(checkIn, "day");
    }
    return day.isBefore(new Date(), "day");
  };
  const isToday = (day) => {
    return day.isSame(new Date(), "day");
  };
  const checkDay = (date, checkIn) => {
    if (beforeDay(date, checkIn)) return "before";
    if (isToday(date)) return "today";
    return "";
  };

  const paddingDay = (day) => {
    if (Number(day.format("D")) > 9) {
      return "span_overNine";
    }
    return "span_underNine";
  };
  let dateAfterCheckIn = "";
  let abc = [];
  const getLimitCheckOutAfterCheckIn = (convertCheckIn, getDayCheckOut) => {
    //Get date after check-In
    let array = [];
    arrCheckDateIsBooked?.map((dateBooked) => {
      const { ngayDen } = dateBooked;
      let convertNgayDen = moment(ngayDen).clone().format("YYYY-MM-DD");
      if (moment(convertNgayDen).isAfter(convertCheckIn, "day")) {
        array.push(convertNgayDen);
      }
    });

    array.sort(function (a, b) {
      let da = new Date(a);
      let db = new Date(b);
      return da > db ? 1 : -1;
    });
    return array;
  };
  const checkInOutDay = (day, checkIn, checkOut) => {
    let result = "";
    if (checkIn) {
      let convertDate = day.clone().format("YYYY-MM-DD");
      let convertCheckIn = checkIn.clone().format("YYYY-MM-DD");

      //Get date after check-In
      let array = getLimitCheckOutAfterCheckIn(convertCheckIn);

      if (array.length !== 0) {
        if (dateOutCheck.length === 0) {
          dateOutCheck.push(array[0]);
        }
        dateAfterCheckIn = array[0];
        if (
          moment(convertDate).clone().isBefore(checkIn, "day") ||
          moment(convertDate).clone().isAfter(moment(dateAfterCheckIn), "day")
        ) {
          result = "bg_notBookday";
        }
      } else {
        if (moment(day).clone().isBefore(checkIn, "day")) {
          result = "bg_notBookday";
        }
      }

      if (moment(convertDate).isSame(convertCheckIn, "day")) {
        result = "selected";
      }
      if (checkIn && checkOut) {
        let convertCheckOut = checkOut.clone().format("YYYY-MM-DD");
        if (
          moment(convertDate).isAfter(convertCheckIn) &&
          moment(convertDate).isBefore(convertCheckOut)
        ) {
          abc.push(convertDate);
          result = "bg_isBookday";
        }
        if (moment(convertDate).isSame(convertCheckOut, "day")) {
          abc.push();
          result = "selected";
        }
      }
    }
    return result;
  };
  return {
    checkDay,
    paddingDay,
    checkInOutDay,
    checkDateIsBooked,
    beforeDay,
    dateAfterCheckIn,
    dateOutCheck,
  };
};
