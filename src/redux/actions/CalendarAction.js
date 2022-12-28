import _ from "lodash";
import moment from "moment";
import { bothServiceToken } from "../../services/BothTokenService";
import { getDateIsBooked } from "../reducer/CalendarReducer";

export const getDateIsBookedAPI = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.get("dat-phong");
      const arrFilter = [];
      await data.content.filter((phong) => {
        if (phong.maPhong == id) {
          arrFilter.push({ ngayDen: phong.ngayDen, ngayDi: phong.ngayDi });
        }
      });
      let a;
      let arrFilters = arrFilter.sort((a, b) => {
        return new Date(b.ngayDi) - new Date(a.ngayDi);
      });
      arrFilters = arrFilters.filter((date) => {
        if (!moment(date.ngayDen).isSame(a)) {
          a = date.ngayDen;
          return date;
        }
        a = date.ngayDen;
      });
      dispatch(getDateIsBooked(arrFilters));
    } catch (error) {
      console.log(error.response);
    }
  };
};
