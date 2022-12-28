import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  memo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGuestAdults,
  getGuestChildren,
  getGuestInfants,
  getGuestPets,
  getTotalGuest,
} from "../../../redux/reducer/BookTravel";

function GuestForm(props) {
  const dispatch = useDispatch();
  const [showGuest, setShowGuest] = useState(false);
  const refGuest = useRef();
  const { checkDateIn, checkDateOut } = useSelector(
    (state) => state.CalendarReducer
  );
  const { totalGuest, guestAdults, guestChildren, guestInfants, guestPets } =
    useSelector((state) => state.BookTravel);
  const { inforRoom } = useSelector((state) => state.LocationRoomReducer);

  const [totalBookedDate, setTotalDate] = useState(1);
  const [isOverGuest, setOverGuest] = useState(false);

  useEffect(() => {
    //guest Popup
    if (!props.noPopUp) {
      let handleGuestPopUp = (e) => {
        if (refGuest) {
          if (!refGuest.current?.contains(e.target)) {
            setShowGuest(false);
          }
        }
      };
      document.addEventListener("mousedown", handleGuestPopUp);
      return () => {
        document.removeEventListener("mousedown", handleGuestPopUp);
      };
    }
  }, []);
  useEffect(() => {
    if (checkDateOut && checkDateIn) {
      let totalDateBookCur = 1;
      let dateClone = checkDateIn.clone();
      while (dateClone.isBefore(checkDateOut, "day")) {
        dateClone.add(1, "day").clone();
        totalDateBookCur += 1;
      }
      setTotalDate(totalDateBookCur);
    }
  }, [checkDateOut, checkDateIn]);
  //
  useLayoutEffect(() => {
    if (props?.totalGuest) {
    }
    let resultGuest = guestAdults + guestChildren + guestInfants + guestPets;
    if (resultGuest < inforRoom?.khach && resultGuest > 0) {
      dispatch(getTotalGuest(resultGuest));
      setOverGuest(false);
    }
    if (resultGuest < 0) {
      setOverGuest(true);
    }
    if (resultGuest == inforRoom?.khach) {
      dispatch(getTotalGuest(resultGuest));
      setOverGuest(true);
    }
  }, [guestAdults, guestChildren, guestInfants, guestPets, inforRoom]);
  //
  useLayoutEffect(() => {
    if (props?.totalGuest) {
      dispatch(getTotalGuest(props.totalGuest));
      if (totalGuest === inforRoom?.khach) {
        setOverGuest(true);
      }
    }
  }, [props?.totalGuest]);

  useEffect(() => {
    if (props.getFormGuest) {
      setShowGuest(true);
    }
    if (props.getFormGuest && props.doNotPopUp) {
      setShowGuest(false);
    }
  }, [props.getFormGuest, props.doNotPopUp]);
  return (
    <div className="wrap_label-guest ">
      {props.getFormGuest && (
        <label
          ref={refGuest}
          htmlFor="guest border_around"
          className="label_guest border_around"
          onClick={() => {
            if (props.noPopUp) {
            } else {
              setShowGuest(!showGuest);
            }
          }}
        >
          <span>Guest</span>
          <input
            type="text"
            onChange={() => {}}
            name="guest"
            value={`${totalGuest} guest`}
            id="guest"
          />
          <div className="label_guest-updown">
            {!showGuest && <i className="fa-solid fa-angle-down"></i>}
            {showGuest && <i className="fa-solid fa-angle-up"></i>}
          </div>

          {showGuest && (
            <div
              className="label_guest-item boxshadow"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="limit_guest">
                Limit Guest : <p> {inforRoom.khach}</p>
              </div>
              <div className="label_guest-type">
                <div className="label_guest-title">
                  <h6>Adults</h6>
                  <p>Age 13+</p>
                </div>
                <div className="label_guest-icon">
                  <i
                    className="fa-solid fa-circle-minus"
                    onClick={async () => {
                      try {
                        if (guestAdults > 0) {
                          await dispatch(getGuestAdults(guestAdults - 1));
                        }
                      } catch (error) {}
                    }}
                  ></i>
                  <p>{guestAdults}</p>
                  <i
                    onClick={() => {
                      if (guestAdults >= 0) {
                        dispatch(getGuestAdults(guestAdults + 1));
                      }
                    }}
                    className={`fa-solid fa-circle-plus ${
                      isOverGuest && "isOver"
                    }`}
                  ></i>
                </div>
              </div>
              <div className="label_guest-type">
                <div className="label_guest-title">
                  <h6>Children</h6>
                  <p>Ages 2–12</p>
                </div>
                <div className="label_guest-icon">
                  <i
                    className="fa-solid fa-circle-minus"
                    onClick={() => {
                      if (guestChildren > 0) {
                        dispatch(getGuestChildren(guestChildren - 1));
                      }
                    }}
                  ></i>
                  <p>{guestChildren}</p>
                  <i
                    className={`fa-solid fa-circle-plus ${
                      isOverGuest && "isOver"
                    }`}
                    onClick={() => {
                      if (guestChildren >= 0) {
                        dispatch(getGuestChildren(guestChildren + 1));
                      }
                    }}
                  ></i>
                </div>
              </div>
              <div className="label_guest-type">
                <div className="label_guest-title">
                  <h6>Infants</h6>
                  <p>Under 2</p>
                </div>
                <div className="label_guest-icon">
                  <i
                    className="fa-solid fa-circle-minus"
                    onClick={() => {
                      if (guestInfants > 0) {
                        dispatch(getGuestInfants(guestInfants - 1));
                      }
                    }}
                  ></i>
                  <p>{guestInfants}</p>
                  <i
                    className={`fa-solid fa-circle-plus ${
                      isOverGuest && "isOver"
                    }`}
                    onClick={() => {
                      if (guestInfants >= 0) {
                        dispatch(getGuestInfants(guestInfants + 1));
                      }
                    }}
                  ></i>
                </div>
              </div>
              <div className="label_guest-type">
                <div className="label_guest-title">
                  <h6>Pets</h6>
                </div>
                <div className="label_guest-icon">
                  <i
                    className="fa-solid fa-circle-minus"
                    onClick={() => {
                      if (guestPets > 0) {
                        dispatch(getGuestPets(guestPets - 1));
                      }
                    }}
                  ></i>
                  <p>{guestPets}</p>
                  <i
                    className={`fa-solid fa-circle-plus ${
                      isOverGuest && "isOver"
                    }`}
                    onClick={() => {
                      if (guestPets >= 0) {
                        dispatch(getGuestPets(guestPets + 1));
                      }
                    }}
                  ></i>
                </div>
              </div>
            </div>
          )}
        </label>
      )}
      {props.getTax && checkDateIn && checkDateOut && (
        <div className="taxes">
          <div className="taxes-date taxes-item">
            <p>
              {inforRoom?.giaTien}$ X {totalBookedDate} nights
            </p>
            <p>${Number(totalBookedDate) * Number(inforRoom.giaTien)}</p>
          </div>
          <div className="taxes-fee taxes-item border-bottom">
            <p>Service fee</p>
            <p>$0</p>
          </div>
          <div className="taxes-total taxes-item">
            <p>Total before taxes</p>
            <p>${Number(totalBookedDate) * Number(inforRoom.giaTien)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default memo(GuestForm);
