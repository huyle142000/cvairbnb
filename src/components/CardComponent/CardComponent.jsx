import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ImageSlider from "./ImageSlider/ImageSlider";

export default function CardComponent(props) {
  const { giaTien, tenPhong, phongNgu, khach, giuong, img, id } = props.card;
  let ramdomStar = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const navigate = useNavigate();
  let star = ramdomStar(3, 5);

  const SVG = (
    style = {
      display: "block",
      fill: "rgba(0, 0, 0, 0.5)",
      height: "26px",
      width: "26px",
      stroke: "#fff",
      strokeWidth: 2,
      overflow: "visible",
      viewBox: "0 0 15 15",
    }
  ) => (
    <svg
      className="svg_heart"
      transform="scale(0.8)"
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path
        d="m 16 28 c 7 -4.733 14 -10 14 -17 c 0 -1.792 -0.683 -3.583 -2.05 -4.95 c -1.367 -1.366 -3.158 -2.05 -4.95 -2.05 c -1.791 0 -3.583 0.684 -4.949 2.05 l -2.051 2.051 l -2.05 -2.051 c -1.367 -1.366 -3.158 -2.05 -4.95 -2.05 c -1.791 0 -3.583 0.684 -4.949 2.05 c -1.367 1.367 -2.051 3.158 -2.051 4.95 c 0 7 7 12.267 14 17 Z"
        fill={style.fill}
      />
    </svg>
  );
  return (
    <div
      className={`card_item ${
        props.isActiveMap === undefined ? "" : "card__map"
      } ${props.filerRoom && "request_room"}`}
    >
      <div className="card_img">
        <ImageSlider image={img} id={id} />
        <div className="card_img_icon">{SVG()}</div>
      </div>
      <div
        className="card_content"
        onClick={() => {
          navigate(`/bookingtravel/${id}`);
        }}
      >
        <div className="card_name">
          <div className={`card_name_text`}>
            {tenPhong.length > 50
              ? tenPhong.substring(0, 50) + "..."
              : tenPhong}
          </div>
          <div className="card_name_icon">
            <span>
              <i className="fa-solid fa-star"></i>
            </span>
            <span className="icon_star">{star}</span>
          </div>
        </div>
        {props.isActiveMap === undefined && (
          <>
            <div className="card_des">
              Phòng ngủ: {phongNgu} - Giường: {giuong}
            </div>
            <div className="card_time">Số khách: {khach}</div>
          </>
        )}
        <div className="card_price">
          <strong>${giaTien}</strong> /1đêm
        </div>
      </div>
    </div>
  );
}
