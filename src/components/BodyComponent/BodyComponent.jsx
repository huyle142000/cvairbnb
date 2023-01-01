import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import CardComponent from "../CardComponent/CardComponent";
import { useDispatch, useSelector } from "react-redux";
import { getListFullRoomAPI } from "../../redux/actions/LocationRoomAction";
import { roomImage } from "../../utils/roomImage";
import MapContainer from "../MapConponent/MapContainer";
import { closeSpinner, openSpinner } from "../../redux/reducer/Loading";
import { getDateBookedToFilterAPI } from "../../redux/actions/CalendarAction";

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
    if (isFilter && arrListRoomRequest) {
      let handleRequestRoom = roomFullList.filter((room) => {
        if (arrListRoomRequest.includes(room.id)) {
          return room;
        }
      });
      setListRoom(handleRequestRoom);
    }
  }, [roomFullList, props?.isFilter, arrListRoomRequest]);

  let renderListCard = () => {
    return arrListRoom?.map((card, index) => {
      return (
        <Col key={index}>
          <CardComponent card={card} />
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
      {activeMap && <MapContainer arrRoom={arrListRoom} />}
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
