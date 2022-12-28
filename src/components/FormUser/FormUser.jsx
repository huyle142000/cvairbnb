import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import { logoutForm } from "../../redux/reducer/FormReducer";
import { openModal } from "../../redux/reducer/ModalReducer";
import { USER_LOGIN } from "../../utils/setting";
const avatar = "";
function FormUser() {
  const [isPump, setPump] = useState(false);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem(USER_LOGIN));
  const navigate = useNavigate();
  const refs = React.useRef(null);
  useEffect(() => {
    const handlePopUp = (e) => {
      if (refs) {
        if (!refs.current?.contains(e.target)) {
          setPump(false);
        }
      }
    };
    document.addEventListener("mousedown", handlePopUp);
    return () => {
      document.removeEventListener("mousedown", handlePopUp);
    };
  }, []);
  const renderForm = () => {
    return (
      <>
        {isPump && (
          <div className="form_user-popup text-left" ref={refs}>
            <h6
              onClick={() => {
                dispatch(openModal(<Register classModal={"form_modal"} />));
              }}
            >
              Sign Up
            </h6>
            <h6
              className="border_bottom"
              onClick={() => {
                dispatch(openModal(<Login classModal={"form_modal"} />));
              }}
            >
              Log In
            </h6>
            <div className="form_user-popup-child">
              <h6>Airbnb is your home</h6>
              <h6>Host Experience</h6>
              <h6>Help</h6>
            </div>
          </div>
        )}
      </>
    );
  };
  const renderUser = () => {
    return (
      <>
        {isPump && (
          <div className="form_user-popup text-left" ref={refs}>
            <h6
              onClick={() => {
                navigate("profile");
              }}
            >
              Profile
            </h6>
            <h6
              className="border_bottom"
              onClick={() => {
                navigate("yourbooking");
              }}
            >
              Your Travel Booking
            </h6>
            <div className="form_user-popup-child border_bottom">
              <h6>Airbnb is your home</h6>
              <h6>Host Experience</h6>
              <h6>Help</h6>
            </div>
            <h6
              onClick={() => {
                dispatch(logoutForm(navigate));
              }}
            >
              Log Out
            </h6>
          </div>
        )}
      </>
    );
  };
  return (
    <div className="header__right">
      <h6>Airbnb is your home</h6>
      <div className="btn--header globe__icon">
        <i className="fa-solid fa-globe"></i>
      </div>
      <div className="form_user">
        <div
          className="form_user-icon"
          onClick={() => {
            setPump(!isPump);
          }}
        >
          <i className="fa-solid fa-bars"></i>

          {user != null ? (
            <img src={user.avatar} alt="" />
          ) : (
            <i className="fa-solid fa-circle-user"></i>
          )}
        </div>
        {user != null ? renderUser() : renderForm()}
      </div>
    </div>
  );
}
export default memo(FormUser);
