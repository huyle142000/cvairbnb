import _ from "lodash";
import moment from "moment";
import { bothServiceToken } from "../../services/BothTokenService";
import { getListRoomRequest } from "../reducer/BookTravel";
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
export const getDateBookedToFilterAPI = (requestData, roomFullList) => {
  return async (dispatch) => {
    try {
      // lấy thông tin ngày đặt của các phòng
      let { data } = await bothServiceToken.get("dat-phong");
      let response = await bothServiceToken.get("vi-tri");
      let arrExistLocation = [];
      await response.data.content?.map((vitri) => {
        arrExistLocation.push(vitri.id);
      });
      let arrIdRoom = [];
      roomFullList = await roomFullList?.filter((room) =>
        arrExistLocation.includes(room.id)
      );
      await roomFullList.map((room) => {
        arrIdRoom.push(Number(room.id));
      });
      const arrFilter = await data.content.filter((room) =>
        arrIdRoom.includes(Number(room.maPhong))
      );
      let arrFilters = await arrFilter.sort((a, b) => {
        return new Date(b.ngayDi) - new Date(a.ngayDi);
      });

      // lọc những ngày bị trùng nếu cùng Id nhưng nếu khác mã phòng thì bỏ qua
      let prevDate;
      let prevIdUser;
      let prevMaPhong;

      arrFilters = await arrFilters.filter((room) => {
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
      // Mảng chứa các phòng hợp lệ
      let validArrListRom = [];
      // nếu có điều kiện là ngày đi và ngày đến khi user yêu cầu
      let { checkInRequest, checkOutRequest, guestRequest, locationRequest } =
        await requestData;
      if (checkInRequest) {
        arrFilters = await arrFilters.filter((room) => {
          if (
            (moment(room.ngayDen).isBefore(checkInRequest, "day") &&
              moment(room.ngayDi).isBefore(checkOutRequest, "day")) ||
            (moment(room.ngayDen).isAfter(checkOutRequest, "day") &&
              moment(room.ngayDi).isAfter(checkOutRequest, "day"))
          ) {
            if (guestRequest > 0) {
              if (room.soLuongKhach >= guestRequest) {
                return room;
              }
            } else {
              return room;
            }
          }
        });
      }
      arrFilters = _.uniqBy(arrFilters, "maPhong");
      // Trường hợp lọc có vị trí lấy thêm thông tin về Vị trí rồi đẩy vào arrTrips
      if (locationRequest) {
        let arrTrips = [];
        for (let index = 0; index < arrFilters.length; index++) {
          let { data } = await bothServiceToken.get(
            `phong-thue/${arrFilters[index].maPhong}`
          );
          let response = await bothServiceToken.get(
            `vi-tri/${data.content.maViTri}`
          );
          let viTri = await response.data.content.tenViTri;
          let tinhThanh = await response.data.content.tinhThanh;
          let quocGia = await response.data.content.quocGia;
          arrTrips.push({
            maPhong: arrFilters[index].maPhong,
            viTri: stringToSlug(viTri),
            tinhThanh: stringToSlug(tinhThanh),
            quocGia: stringToSlug(quocGia),
          });
        }

        // console.log(arrTrips, "array");
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
        let checkValidViTri = false;
        let checkValidTinhThanh = false;
        let checkValidQuocGia = false;

        arrTrips.map((trip) => {
          arrCheckLocation.map((location) => {
            if (trip.viTri == location) {
              checkValidViTri = true;
            }
            if (trip.tinhThanh == location) {
              checkValidTinhThanh = true;
            }
            if (trip.quocGia == location) {
              checkValidQuocGia = true;
            }
          });
          if (checkLocation.length === 1) {
            if (checkValidViTri || checkValidTinhThanh || checkValidQuocGia) {
              arrIdValidRoom.push(trip.maPhong);
              console.log(locationRequest);
            }
          } else {
            if (checkValidViTri || (checkValidTinhThanh && checkValidQuocGia)) {
              arrIdValidRoom.push(trip.maPhong);
            }
          }
        });
        validArrListRom = arrIdValidRoom;
      }
      console.log(validArrListRom)
      dispatch(getListRoomRequest(validArrListRom));
    } catch (error) {
      console.log(error.response);
    }
  };
};
