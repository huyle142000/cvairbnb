// import { delay } from "@reduxjs/toolkit/dist/utils";
import { wait } from "@testing-library/user-event/dist/utils";

import moment from "moment";
import { toast } from "react-toastify";
import { bothServiceToken } from "../../services/BothTokenService";
import { getInforYourTrips } from "../reducer/BookTravel";
import { getCheckIn, getCheckOut } from "../reducer/CalendarReducer";
import { closeSpinner, openSpinner } from "../reducer/Loading";
import { getDateIsBookedAPI } from "./CalendarAction";

export const bookTravelAPI = (payload, navigate) => {
  return async (dispatch) => {
    await dispatch(openSpinner());
    try {
      const { data } = await bothServiceToken.post("dat-phong", payload);
      await dispatch(getCheckIn(""));
      await dispatch(getCheckOut(""));

      await navigate(`/bookingtravel/${payload.maPhong}`);
      await dispatch(getDateIsBookedAPI(payload.maPhong));
      await toast.success("You have successfully booked travel !", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(error.response, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      await dispatch(closeSpinner());
    }
  };
};
export const getInforTripsAPI = (id) => {
  return async (dispatch) => {
    await dispatch(openSpinner());
    try {
      const { data } = await bothServiceToken.get(
        `dat-phong/lay-theo-nguoi-dung/${id}`
      );
      const arrFilter = [...data.content];
      let arrFilters = arrFilter.sort((a, b) => {
        return new Date(b.ngayDi) - new Date(a.ngayDi);
      });
      let a;
      arrFilters = arrFilters.filter((date) => {
        if (!moment(date.ngayDen).isSame(a)) {
          a = date.ngayDen;
          return date;
        }
        a = date.ngayDen;
      });

      dispatch(getInforYourTrips(arrFilters));
    } catch (error) {
      toast.error(error.response, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      await dispatch(closeSpinner());
    }
  };
};
export const getListTripsAPI = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.get(`phong-thue/${id}`);
      const arrFilter = [...data.content];

      let arrFilters = arrFilter.sort((a, b) => {
        return new Date(b.ngayDi) - new Date(a.ngayDi);
      });
      let a;
      arrFilters = arrFilters.filter((date) => {
        if (!moment(date.ngayDen).isSame(a)) {
          a = date.ngayDen;
          return date;
        }
        a = date.ngayDen;
      });
      dispatch(getInforYourTrips(arrFilters));
    } catch (error) {
      toast.error(error.response, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
};
