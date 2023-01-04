import { wait } from "@testing-library/user-event/dist/utils/misc/wait";
import _ from "lodash";
import moment from "moment";
import { bothServiceToken } from "../../services/BothTokenService";
import { getListRoomRequest } from "../reducer/BookTravel";
import {
  getCheckIn,
  getCheckOut,
  getDateIsBooked,
} from "../reducer/CalendarReducer";
import { closeSpinner, openSpinner } from "../reducer/Loading";

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
export const getDateBookedToFilterAPI = (requestData) => {
  return async (dispatch) => {
    await dispatch(openSpinner());
    try {
      // lấy thông tin ngày đặt của các phòng
      let result = await bothServiceToken.get("phong-thue");
      let { data } = await bothServiceToken.get("dat-phong");
      let response = await bothServiceToken.get("vi-tri");
      //
      let roomFullList = await result.data.content;
      let arrExistLocation = [];
      //
      await response.data.content?.map((vitri) => {
        arrExistLocation.push(vitri.id);
      });
      let arrIdRoom = [];
      // Lọc những room có tồn tại vị trí
      roomFullList = await roomFullList?.filter((room) => {
        return arrExistLocation.includes(room.maViTri);
      });
      // Lấy các mã phòng hợp lệ có tồn tại vị trí (ID)
      await roomFullList.map((room) => {
        arrIdRoom.push(Number(room.id));
      });

      // Mảng chứa các phòng hợp lệ
      let validArrListRom = [];
      //Mảng xử lý phòng
      let arrListRoomToFilter = [];

      let { checkInRequest, checkOutRequest, locationRequest } =
        await requestData;

      // TH có yêu cầu ngày đi ngày đến
      let arrFiltersRoomIsBooked;
      // mã phòng không hợp lệ sau khi xử lý
      let arrMaPhongHandle = [];
      // nếu có điều kiện là ngày đi và ngày đến khi user yêu cầu
      if (checkInRequest) {
        // Kiểm tra các phòng đã đặt
        // Lọc các phòng đã đặt có tồn tại vị trí (ID === maPhong)
        let arrRoomIsBooked = await data.content.filter((room) =>
          arrIdRoom.includes(Number(room.maPhong))
        );
        arrFiltersRoomIsBooked = await arrRoomIsBooked.sort((a, b) => {
          return new Date(b.ngayDi) - new Date(a.ngayDi);
        });
        // lọc những ngày bị trùng nếu cùng Id nhưng nếu khác mã phòng thì bỏ qua
        let prevDate;
        let prevIdUser;
        let prevMaPhong;

        arrFiltersRoomIsBooked = await arrFiltersRoomIsBooked.filter((room) => {
          if (prevIdUser == room.maNguoiDung) {
            if (
              !moment(room.ngayDen).isSame(prevDate) &&
              room.maPhong != prevMaPhong
            ) {
              prevDate = room.ngayDen;
              prevIdUser = room.maNguoiDung;
              prevMaPhong = room.maPhong;
              return room;
            }
            if (
              moment(room.ngayDen).isSame(prevDate) &&
              room.maPhong != prevMaPhong
            ) {
              prevDate = room.ngayDen;
              prevIdUser = room.maNguoiDung;
              prevMaPhong = room.maPhong;
              return room;
            }
          } else {
            prevIdUser = room.maNguoiDung;
            prevDate = room.ngayDen;
            prevMaPhong = room.maPhong;
            return room;
          }
        });
        arrFiltersRoomIsBooked = await arrFiltersRoomIsBooked.filter((room) => {
          if (
            (moment(room.ngayDen).isBefore(checkInRequest, "day") &&
              moment(room.ngayDi).isBefore(checkOutRequest, "day")) ||
            (moment(room.ngayDen).isAfter(checkOutRequest, "day") &&
              moment(room.ngayDi).isAfter(checkOutRequest, "day"))
          ) {
          } else {
            return room.maPhong;
          }
        });
        console.log(arrFiltersRoomIsBooked, "arrFiltersRoomIsBooked");
        // arrMaPhongHandle là những phòng không hợp lệ
        arrFiltersRoomIsBooked.map(async (room) => {
          await arrMaPhongHandle.push(room.maPhong);
        });
        console.log(_.uniq(arrMaPhongHandle), "arrMaPhongHandle");
        // Lọc phòng thích hợp với yêu cầu
        arrListRoomToFilter = await roomFullList.filter((room) => {
          return !arrMaPhongHandle.includes(room.id);
        });
      }
      if (!checkInRequest) {
        arrListRoomToFilter = [...roomFullList];
        arrListRoomToFilter = _.uniqBy(arrListRoomToFilter, "id");
      }

      // Trường hợp lọc có vị trí lấy thêm thông tin về Vị trí rồi đẩy vào arrTrips
      if (locationRequest) {
        let arrTrips = [];
        // Call API lấy vị trí của các phòng
        for (let index = 0; index < arrListRoomToFilter.length; index++) {
          let { maViTri } = arrListRoomToFilter[index];
          let response = await bothServiceToken.get(`vi-tri/${maViTri}`);
          let viTri = await response.data.content.tenViTri;
          let tinhThanh = await response.data.content.tinhThanh;
          let quocGia = await response.data.content.quocGia;
          arrTrips.push({
            maPhong: arrListRoomToFilter[index].id,
            viTri: viTri,
            tinhThanh: tinhThanh,
            quocGia: quocGia,
          });
        }
        function stringToSlug(str) {
          // remove accents
          var from =
              "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
            to =
              "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
          for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(RegExp(from[i], "gi"), to[i]);
          }

          str = str
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\-]/g, "")
            .replace(/-+/g, "");

          return str;
        }
        // Xóa dấu kí tự lạ
        let arrCheckLocation = [];
        let checkLocation;
        if (locationRequest.includes(",")) {
          checkLocation = locationRequest.split(",");
          checkLocation.map((location) => {
            arrCheckLocation.push(stringToSlug(location));
          });
        } else {
          checkLocation = locationRequest.split();
          checkLocation.map((location) => {
            arrCheckLocation.push(stringToSlug(location));
          });
        }
        // So sánh location rồi push ra các mã phòng hợp lệ
        let arrIdValidRoom = [];
        let arrRegionEurope = [
          "portugal",
          "iceland",
          "italy",
          "findland",
          "germany",
          "france",
        ];
        let checkValidViTri = false;
        let checkValidTinhThanh = false;
        let checkValidQuocGia = false;

        arrTrips.map(async (trip) => {
          for (let index = 0; index < arrCheckLocation.length; index++) {
            let location = arrCheckLocation[index];
            if (stringToSlug(trip.viTri) == location) {
              checkValidViTri = true;
            } else {
              checkValidViTri = false;
            }
            if (stringToSlug(trip.tinhThanh) == location) {
              checkValidTinhThanh = true;
            } else {
              checkValidTinhThanh = false;
            }
            if (stringToSlug(trip.quocGia) == location) {
              checkValidQuocGia = true;
            } else {
              checkValidQuocGia = false;
            }
            if (location === "europe") {
              if (arrRegionEurope.includes(stringToSlug(trip.viTri))) {
                checkValidViTri = true;
              } else {
                checkValidViTri = false;
              }
              if (arrRegionEurope.includes(stringToSlug(trip.tinhThanh))) {
                checkValidTinhThanh = true;
              } else {
                checkValidTinhThanh = false;
              }
              if (arrRegionEurope.includes(stringToSlug(trip.quocGia))) {
                checkValidQuocGia = true;
              } else {
                checkValidQuocGia = false;
              }
            }
            if (checkValidViTri || checkValidTinhThanh || checkValidQuocGia) {
              arrIdValidRoom.push(trip.maPhong);
            }
          }
        });

        validArrListRom = arrIdValidRoom;
      } else {
        //TH có yêu cầu ngày đi ngày đến nhưng không có yêu cầu địa địa điểm cụ thể
        let arrIdValidRoomNoLocation = [];
        for (let index = 0; index < arrListRoomToFilter.length; index++) {
          let trip = arrListRoomToFilter[index];
          arrIdValidRoomNoLocation.push(trip.id);
        }
        // console.log(arrIdValidRoomNoLocation, "arrIdValidRoomNoLocation");
        await dispatch(getListRoomRequest(arrIdValidRoomNoLocation));
      }
      // dispacth ngày yêu cầu cho các phòng hợp lệ
      await dispatch(getCheckIn(checkInRequest));
      await dispatch(getCheckOut(checkOutRequest));
      if (validArrListRom.length > 0) {
        await dispatch(getListRoomRequest(validArrListRom));
      }
    } catch (error) {
      console.log(error.response);
    } finally {
      await dispatch(closeSpinner());
    }
  };
};
