import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDateBookedToFilterAPI } from "../../redux/actions/CalendarAction";
import { getListRoomRequest } from "../../redux/reducer/BookTravel";
import { bothServiceToken } from "../../services/BothTokenService";
import SpinnerLoading from "../SpinnerLoading/SpinnerLoading";
const MapContainer = React.lazy(() => import("./../MapConponent/MapContainer"));
const BodyComponent = React.lazy(() =>
  import("./../BodyComponent/BodyComponent")
);

export default function ListRoomSearch(props) {
  const dispatch = useDispatch();

  let { requestListRoom, arrListRoomRequest } = useSelector(
    (state) => state.BookTravel
  );
  useEffect(() => {
      if (arrListRoomRequest.length === 0) {
      dispatch(getDateBookedToFilterAPI(requestListRoom));
    }
  }, [arrListRoomRequest]);
  useEffect(() => {
    return () => {
      dispatch(getListRoomRequest([]));
    };
  }, []);
  useEffect(() => {
    if (requestListRoom) {
      let { locationRequest } = requestListRoom;
      if (locationRequest) {
        locationRequest = locationRequest.split();
        regionMap(locationRequest[locationRequest.length - 1]);
      }
    }
  }, [requestListRoom]);
  const [viewport, setViewport] = useState(props?.requestListRoom);
  const regionMap = async (location) => {
    let arr = "";
    try {
      let response = await bothServiceToken.getMapBoxGeocoding(location);
      arr = {
        latitude: response.data.features[0].center[1],
        longitude: response.data.features[0].center[0],
        zoom: 6,
      };
      setViewport(arr);
    } catch (error) {}
  };

  return (
    <div className="list_room-filter">
      <div className="row">
        <Suspense fallback={<SpinnerLoading />}>
          <div className="col-12 col-md-7">
            <BodyComponent
              isFilter={true}
              arrListRoomRequest={arrListRoomRequest}
            />
          </div>
          <div className="col-12 col-md-5">
            <div className="map_filter">
              <MapContainer filerRoom={"filter"} viewRequest={viewport} />
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}
