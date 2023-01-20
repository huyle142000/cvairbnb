import React, { useCallback, useEffect, useRef, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import { bothServiceToken } from "../../services/BothTokenService";
import { MAP_BOX_TOKEN } from "../../utils/setting";
import CardComponent from "../CardComponent/CardComponent";

export default function MapContainer(props) {
  const dispatch = useDispatch();
  const { roomFullList } = useSelector((state) => state.LocationRoomReducer);
  const [showPopup, togglePopup] = useState({});
  const [viewport, setViewport] = useState({
    initialViewState: {
      latitude: 46.5362364654109,
      longtitude: 108.168944342317,
      zoom: 5,
    },
  });

  const mapRef = useRef("");
  const onSelectCity = useCallback((view) => {
    if (view) {
      mapRef.current?.flyTo({
        center: [view.longitude, view.latitude],
        zoom: 5,
        duration: 1000,
      });
    }
  }, []);
  useEffect(() => {
    if (props.viewRequest && mapRef) {
      onSelectCity(props.viewRequest);
      setTimeout(() => {
        onSelectCity(props.viewRequest);
      }, 1000);
    }
  }, [props?.viewRequest]);
  useEffect(() => {
    if (props.bookingLocation) {
      onSelectCity(props.bookingLocation);
      setTimeout(() => {
        onSelectCity(props.bookingLocation);
      }, 1000);
    }
  }, [props?.bookingLocation]);

  useEffect(() => {
    getCoordinates();
  }, []);
  useEffect(() => {}, [showPopup]);
  let [arrGeolocationRoom, setArrLocal] = useState([]);
  let getCoordinates = () => {
    roomFullList.map((room) => {
      if (room.tenPhong) {
        bothServiceToken
          .getMapBoxGeocoding(room.tenPhong)
          .then((res) => {
            setArrLocal((prev) =>
              prev?.concat({
                roomInfo: room,
                latitude: res.data?.features[0]?.center[1],
                longitude: Number(res.data?.features[0]?.center[0]),
              })
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  const renderLocation = () => {
    return arrGeolocationRoom?.map((room, index) => {
      let { id, giaTien } = room?.roomInfo;
      const { latitude, longitude } = room;
      return (
        <Marker
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            togglePopup({ ...showPopup, showMap: id });
          }}
          key={index}
          latitude={latitude}
          longitude={longitude}
          offsetLeft={-20}
          offsetTop={-30}
        >
          <div className="marker__price">
            <span>{`${giaTien}$`}</span>
          </div>
          {showPopup.showMap === id && (
            <div
              onClick={() => {
                togglePopup({ ...showPopup, showMap: "" });
              }}
            >
              <Popup
                latitude={latitude}
                longitude={longitude}
                closeButton={false}
                closeOnClick={true}
                focusAfterOpen={true}
                onClose={() => {
                  togglePopup(false);
                }}
                anchor="top-right"
              >
                <CardComponent
                  isActiveMap={false}
                  card={room?.roomInfo}
                  filerRoom={props.filerRoom}
                />
              </Popup>
            </div>
          )}
        </Marker>
      );
    });
  };

  return (
    <>
      <div
        className={`map__container ${
          props.dataFilter !== undefined ? "filter" : ""
        }`}
      >
        <Map
          ref={mapRef}
          {...viewport}
          initialViewState={viewport}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onViewportChange={(viewport) => setViewport(viewport)}
          mapboxAccessToken={MAP_BOX_TOKEN}
        >
          {renderLocation()}
        </Map>
      </div>
    </>
  );
}
