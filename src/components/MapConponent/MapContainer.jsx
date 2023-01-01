import React, { useCallback, useRef } from "react";
import { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { MAP_BOX_TOKEN } from "../../utils/setting";
import { roomAddress } from "../../utils/roomAddress";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGeolocationAPI } from "../../redux/actions/LocationRoomAction";
import CardComponent from "../CardComponent/CardComponent";
import { isBuffer } from "lodash";

export default function MapContainer(props) {
  const arrRoomModified = [];
  const dispatch = useDispatch();
  const { roomFullList, arrGeolocationRoom } = useSelector(
    (state) => state.LocationRoomReducer
  );
  const [showPopup, togglePopup] = useState({});
  const [viewport, setViewport] = useState({
    initialViewState: {
      latitude: 46.5362364654109,
      longtitude: 108.168944342317,
      zoom: 6,
    },
  });

  const mapRef = useRef("");
  const onSelectCity = useCallback((view) => {
    if (view) {
      mapRef.current?.flyTo({
        center: [view.longitude, view.latitude],
        duration: 2000,
      });
    }
  }, []);
  useEffect(() => {
    if (props.viewRequest && mapRef) {
      onSelectCity(props.viewRequest);
    }
    setTimeout(() => {
      onSelectCity(props.viewRequest);
    }, 2000);
  }, [props?.viewRequest]);

  useEffect(() => {
    roomFullList?.map((room) => {
      const { id } = room;
      //match address in default array
      let addrIndex = roomAddress.findIndex((room) => {
        return room.id === id;
      });
      if (addrIndex !== -1) {
        arrRoomModified.push({
          ...room,
          address: roomAddress[addrIndex].address,
        });
      }

      //match address by name
    });
    getLocationAPI();
  }, []);
  useEffect(() => {}, [showPopup]);

  const getLocationAPI = () => {
    return arrRoomModified?.map((room) => {
      dispatch(getGeolocationAPI(room));
    });
  };

  const renderLocation = () => {
    return arrGeolocationRoom?.map((room) => {
      const { id, giaTien, geolocation } = room;
      const { latitude, longtitude } = geolocation;
      return (
        <Marker
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            togglePopup({ ...showPopup, showMap: id });
          }}
          key={`${
            props.dataFilter === undefined
              ? `card--map--${id}`
              : `card--filter--${id}`
          }`}
          latitude={latitude}
          longitude={longtitude}
          offsetLeft={-20}
          offsetTop={-30}
        >
          <div className="marker__price">
            <span>{`${giaTien}$`}</span>
          </div>
          {showPopup.showMap === id && (
            <Popup
              latitude={latitude}
              longitude={longtitude}
              closeButton={false}
              closeOnClick={true}
              focusAfterOpen={true}
              onClose={() => {
                togglePopup(false);
              }}
              anchor="top-right"
            >
              <CardComponent isActiveMap={false} card={room} />
            </Popup>
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
