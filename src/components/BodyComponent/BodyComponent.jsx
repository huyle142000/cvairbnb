import { Col } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListFullRoomAPI } from "../../redux/actions/LocationRoomAction";
import { closeSpinner, openSpinner } from "../../redux/reducer/Loading";
import CardComponent from "../CardComponent/CardComponent";
import SpinnerLoading from "../SpinnerLoading/SpinnerLoading";
const MapContainer = React.lazy(() => import("../MapConponent/MapContainer"));
export default function BodyComponent(props) {
  const dispatch = useDispatch();
  const [activeMap, setActiveMap] = useState(false);
  let { roomFullList } = useSelector((state) => state.LocationRoomReducer);
  const [arrListRoom, setListRoom] = useState([]);
  let { isFilter, arrListRoomRequest } = props;
  useEffect(() => {
    dispatch(getListFullRoomAPI());
  }, []);
  useEffect(() => {
    if (roomFullList && props.isFilter === undefined) {
      setListRoom(roomFullList);
    }
  }, [roomFullList]);
  useEffect(() => {
    if (isFilter && arrListRoomRequest) {
      let handleRequestRoom = roomFullList.filter((room) => {
        if (arrListRoomRequest.includes(room.id)) {
          return room;
        }
      });
      setListRoom(handleRequestRoom);
    }
  }, [arrListRoomRequest]);

  let renderListCard = () => {
    return arrListRoom?.map((card, index) => {
      return (
        <Col key={index}>
          <CardComponent card={card} isFilter={props.isFilter} />
        </Col>
      );
    });
  };

  return (
    <>
      {!activeMap && (
        <div className="my_container">
          <div
            className={`body_grid ${
              props.size === 4 ? "body_grid_template1" : "body_grid_template2"
            }`}
          >
            {renderListCard()}
          </div>
        </div>
      )}
      {activeMap && (
        <Suspense fallback={<SpinnerLoading />}>
          <MapContainer arrRoom={arrListRoom} />
        </Suspense>
      )}
      <div
        className="show__map"
        onClick={() => {
          setActiveMap(!activeMap);
        }}
      >
        <div className="btn--show">
          {activeMap ? "Show list" : "Show map"}
          <i className="fa-solid fa-map"></i>
        </div>
      </div>
    </>
  );
}
