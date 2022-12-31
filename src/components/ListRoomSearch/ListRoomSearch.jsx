import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDateBookedToFilterAPI } from "../../redux/actions/CalendarAction";
import { getListFullRoomAPI } from "../../redux/actions/LocationRoomAction";
import BodyComponent from "../BodyComponent/BodyComponent";
import MapContainer from "../MapConponent/MapContainer";

export default function ListRoomSearch(props) {
  const dispatch = useDispatch();

  let { requestListRoom, arrListRoomRequest } = useSelector(
    (state) => state.BookTravel
  );
  // dispatch(getListFullRoomAPI());
  let { roomFullList } = useSelector((state) => state.LocationRoomReducer);
  useEffect(() => {
    dispatch(getDateBookedToFilterAPI(requestListRoom, roomFullList));
  }, []);
  return (
    <div className="list_room-filter">
      <div className="row">
        <div className="col-8">
          <BodyComponent
            isFilter={requestListRoom}
            arrListRoomRequest={arrListRoomRequest}
          />
        </div>
        <div className="col-4">
          <div className="map_filter">
            <MapContainer filerRoom={"filter"} />
          </div>
        </div>
      </div>
    </div>
  );
}
