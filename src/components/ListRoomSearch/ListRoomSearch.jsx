import React from "react";
import { useSelector } from "react-redux";
import BodyComponent from "../BodyComponent/BodyComponent";
import MapContainer from "../MapConponent/MapContainer";

export default function ListRoomSearch(props) {
  let { requestListRoom } = useSelector((state) => state.BookTravel);
  console.log(requestListRoom);
  return (
    <div className="list_room-filter">
      <div className="row">
        <div className="col-8">
          <BodyComponent isFilter={requestListRoom} />
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
