import { wait } from "@testing-library/user-event/dist/utils";
import { toast } from "react-toastify";
import { bothServiceToken } from "../../services/BothTokenService";
import {
  getLocationList,
  getInforLocation,
  getListRoom,
  getInforRoom,
  getListFullRoom,
  getArrGeolocationRoom,
  getArrSuggestRegion,
  getRoomIdFilter,
} from "../reducer/LocationRoomReducer";
import { roomImage } from "../../utils/roomImage";
import moment from "moment";
import { closeSpinner, openSpinner } from "../reducer/Loading";

export function getListLocationAPI() {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.get("vi-tri");

      await dispatch(getLocationList(data.content));
    } catch (error) {}
  };
}
// upLoad
export function uploadLocation(datas, navigate) {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.post("vi-tri", datas);
      getListLocationAPI();
      // navigate(-1);
      toast.success("Success");
    } catch (e) {
      toast.error("Error!!!");
    }
  };
}
//edit location
export function editLocationAPI(id, datas, navigate) {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.put(`vi-tri/${id}`, datas);
      toast.success("Cật nhập vị trí thành công!!!");
      navigate("/location");
    } catch (e) {
      console.log(e.response.data);
      toast.error("Error!!!");
    }
  };
}
//get Location
export function getInfoLocationAPI(id) {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.get(`vi-tri/${id}`);
      dispatch(getInforLocation(data.content));
    } catch (e) {
      console.log(e);
      toast.error("Error!!!");
    }
  };
}
// delete vị trí
export function deleteLocationAPI(id, navigate) {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.delete(`vi-tri/${id}`);
      toast.success("Success");
      navigate(0);
    } catch (e) {
      toast.error("Error!!!");
    }
  };
}
/***************** ROOM ********************/
//Full-Rooms
export function getListFullRoomAPI() {
  return async (dispatch) => {
    await dispatch(openSpinner());
    try {
      const { data } = await bothServiceToken.get(`phong-thue`);
      let arrRoom = [];

      data.content?.map((room, index) => {
        let imgSrc = "";
        if (index >= roomImage.length) {
          imgSrc = roomImage[index % roomImage.length];
        } else {
          imgSrc = roomImage[index];
        }
        arrRoom.push({ ...room, img: imgSrc });
      });
      dispatch(getListFullRoom(arrRoom));
    } catch (error) {
      console.log(error.response);
    } finally {
      await dispatch(closeSpinner(true));
    }
  };
}
//IdRoom
export function getListRoomAPI(id) {
  return async (dispatch) => {
    await dispatch(openSpinner(true));

    try {
      const { data } = await bothServiceToken.get(
        `phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`
      );
      dispatch(getListRoom(data.content));
    } catch (error) {
    } finally {
      await dispatch(closeSpinner(true));
    }
  };
}
// upLoad
export function uploadRoomAPI(datas, navigate) {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.post("phong-thue", datas);
      // navigate(-1);
      toast.success("Success");
    } catch (e) {
      console.log(e.response.data);
      toast.error("Error!!!");
    }
  };
}
//edit Room
export function editRoomAPI(id, datas, navigate) {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.put(`phong-thue/${id}`, datas);
      getListRoomAPI(id)
      await navigate(-1);
      toast.success("Thành công!!!");
    } catch (e) {
      toast.error("Error!!!");
    }
  };
}
//get Room
export function getInfoRoomAPI(id) {
  return async (dispatch) => {
    await dispatch(openSpinner(true));

    try {
      const { data } = await bothServiceToken.get(`phong-thue/${id}`);
      dispatch(getInforRoom(data.content));
    } catch (e) {
      console.log(e);
      toast.error("Error!!!");
    } finally {
      await dispatch(closeSpinner(true));
    }
  };
}
// delete vị trí
export function deleteRoomAPI(id, navigate) {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.delete(`phong-thue/${id}`);
      toast.success("Success");
      navigate(0);
    } catch (e) {
      toast.error("Error!!!");
    }
  };
}

/* ------------------------------- MAP BOX API ------------------------------ */
//Get Geolocation of address
export function getGeolocationAPI(room) {
  return (middlewareDispatch) => {
    bothServiceToken
      .getMapBoxGeocoding(room.tenPhong)
      .then((res) => {
        middlewareDispatch(
          getArrGeolocationRoom({
            geoRoom: {
              ...room,
              geolocation: {
                latitude: res.data?.features[0].center[1],
                longtitude: res.data?.features[0].center[0],
              },
            },
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getSuggestionLocation(keyword) {
  return (middlewareDispatch) => {
    bothServiceToken
      .getMapBoxGeocoding(keyword)
      .then((res) => {
        middlewareDispatch(getArrSuggestRegion(res.data.features));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
