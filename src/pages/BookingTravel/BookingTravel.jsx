import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getListCommentAPI } from "../../redux/actions/CommentAction";
import {
  getInfoLocationAPI,
  getInfoRoomAPI,
} from "../../redux/actions/LocationRoomAction";

import Details from "./Details/Details";
import FooterDetail from "./FooterDetail/FooterDetail";
let previd = "";
export default function BookingTravel(props) {
  let dispatch = useDispatch();
  let param = useParams();
  useEffect(() => {
    if (param?.id != previd) {
      previd = param?.id;
      dispatch(getInfoRoomAPI(param?.id));
      window.scrollTo(0, 0);
    }
  }, [param?.id]);
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
