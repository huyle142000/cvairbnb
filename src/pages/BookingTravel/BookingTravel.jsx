import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getListCommentAPI } from "../../redux/actions/CommentAction";
import {
  getInfoLocationAPI,
  getInfoRoomAPI,
} from "../../redux/actions/LocationRoomAction";

import Details from "./Details/Details";
import FooterDetail from "./FooterDetail/FooterDetail";

export default function BookingTravel(props) {
  let dispatch = useDispatch();
  let location = useLocation();
  useEffect(() => {
    let getIdRoom = location.pathname.split("/");
    dispatch(getInfoRoomAPI(getIdRoom[2]));
  }, []);
  const { inforRoom } = useSelector((state) => state.LocationRoomReducer);
 

  useEffect(() => {
    dispatch(getListCommentAPI(inforRoom?.id));
  }, [inforRoom?.id]);
  useEffect(() => {
    if (inforRoom?.maViTri) {
      dispatch(getInfoLocationAPI(inforRoom?.maViTri));
    }
  }, [inforRoom?.maViTri]);

  return (
    <div className="container-sm">
      <Details inforRoom={inforRoom} />
      <FooterDetail />
    </div>
  );
}
