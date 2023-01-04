import { Col, Row } from "antd";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { regions } from "./Region";
import FormUser from "../FormUser/FormUser";
import { useDispatch, useSelector } from "react-redux";
import {
  getListLocationAPI,
  getSuggestionLocation,
} from "../../redux/actions/LocationRoomAction";
import CalendarBook from "../../pages/BookingTravel/CalendarBook/CalendarBook";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import {
  getListRoomRequest,
  getRequestListTrips,
} from "../../redux/reducer/BookTravel";
import {
  getCheckInRequest,
  getCheckOutRequest,
} from "../../redux/reducer/CalendarReducer";

export default function Header() {
  const navigate = useNavigate();
  // reducer

  const { checkInRequest, checkOutRequest } = useSelector(
    (state) => state.CalendarReducer
  );
  // ref
  const formFlex = useRef();
  const headerWrap = useRef();

  let arrCheckEleHeaderNav = [
    "dot",
    "span_popup-location",
    "btn--def",
    "search__icon",
    "search__display",
    "search__icon-glass",
    "exp__flex",
    "header__exp",
    "header__border",
  ];
  useEffect(() => {
    const handleClickFormSearch = (e) => {
      if (formFlex) {
        if (!formFlex?.current?.contains(e.target)) {
          if (arrCheckEleHeaderNav.includes(e.target.classList[0])) {
            setActiveForm(0);
            refWhere?.current?.focus();
          } else {
            setActiveForm("");
          }
          setShowCalendar1(false);
          setShowCalendar2(false);
        }
      } else {
        setActiveForm(0);
      }
    };

    document.addEventListener("click", handleClickFormSearch);

    const handleClickHeaderNav = (e) => {
      if (headerWrap) {
        if (!headerWrap.current.contains(e.target)) {
          setActvieSearch(false);
        }
      }
    };

    document.addEventListener("scroll", handleClickHeaderNav);
    return () => {
      document.removeEventListener("mousedown", handleClickFormSearch);
      document.removeEventListener("scroll", handleClickHeaderNav);
    };
  });
  //
  const ADULT_TYPE = 0;
  const CHILD_TYPE = 1;
  const INFANTS_TYPE = 2;
  const PET_TYPE = 3;
  const [activeSearch, setActvieSearch] = useState(false);
  const [activeSearchHeader, setActiveSearchHeader] = useState(false);
  const [activeForm, setActiveForm] = useState(0);
  const [adultsNum, setAdultsNum] = useState(0);
  const [chidNum, setChidNum] = useState(0);
  const [infantsNum, setInfantsNum] = useState(0);
  const [petNum, setPetNum] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setTotalGuest(adultsNum + chidNum + infantsNum + petNum);
  }, [adultsNum, chidNum, infantsNum, petNum]);

  const { arrSuggest } = useSelector((state) => state.LocationRoomReducer);
  const [totalGuest, setTotalGuest] = useState(0);
  const [arrSuggestRegion, setArrSuggestRegion] = useState([]);
  // Calendar
  const [isShowCalendar1, setShowCalendar1] = useState(false);
  const [isShowCalendar2, setShowCalendar2] = useState(false);
  //Region search state
  const [region, setRegion] = useState("");

  useEffect(() => {
    if (activeSearch) {
      setActiveSearchHeader(true);
    } else {
      setActiveSearchHeader(false);
    }
  }, [activeSearch]);

  useEffect(() => {
    const arrSuggestTemp = [];
    arrSuggest?.map((location) => {
      const { center, context } = location;
      arrSuggestTemp.push({ center, context });
    });
    setArrSuggestRegion(arrSuggestTemp);
  }, [arrSuggest]);
  // Location List
  const [locationSearch, setLocationSearch] = useState("");
  // Handle location
  const [value, setValueInput] = useState("");
  const [locationFirstFind, setLocationFirstFind] = useState("");
  // Check location when click map header
  let params = useParams();
  const handleSearch = () => {
    let locationValue = "";
    if (locationSearch) {
      locationValue = locationSearch;
    } else {
      locationValue = locationFirstFind;
    }

    let dateOutRequest;
    if (!checkOutRequest) {
      dateOutRequest = moment(checkInRequest, ["DD-MM-YYYY", "YYYY-MM-DD"])
        .clone()
        .add(1, "day");
      dispatch(getCheckOutRequest(dateOutRequest));
    } else {
      dateOutRequest = checkOutRequest;
    }
    let request = {
      locationRequest: locationValue,
      checkInRequest: checkInRequest,
      checkOutRequest: dateOutRequest,
      guestRequest: totalGuest,
    };

    dispatch(getRequestListTrips(request));
    setActvieSearch(false);

    //
    setValueInput("");
    setActiveForm("");
    //
    setShowCalendar1(false);
    setShowCalendar2(false);
    //
    dispatch(getCheckInRequest(""));
    dispatch(getCheckOutRequest(""));
    //
    setAdultsNum(0);
    setChidNum(0);
    setInfantsNum(0);
    setPetNum(0);
    if (locationValue) {
      if (locationValue == "I'm flexible") {
        navigate("/listFlex");
      } else {
        dispatch(getListRoomRequest([]));
        if (params.id == "requestday") {
          navigate(`roomsearch/dayrequest`);
        } else {
          navigate(`roomsearch/requestday`);

        }
      }
    } else {
      navigate("/");

      setActvieSearch(false);
    }
    if (checkInRequest) {
      dispatch(getListRoomRequest([]));
      if (params.id == "requestday") {
        navigate(`roomsearch/dayrequest`);
      } else {
        navigate(`roomsearch/requestday`);
      }
    }
  };

  useEffect(() => {
    dispatch(getListLocationAPI());
  }, []);
  useEffect(() => {
    if (locationSearch) {
      setValueInput(locationSearch);
    }
  }, [locationSearch]);

  //Ref Element
  const refWhere = useRef();

  const closeActiveSearch = () => {
    setActvieSearch(false);
  };
  const ref = useDetectClickOutside({ onTriggered: closeActiveSearch });
  const changeNumberGuest = (val, type) => {
    switch (type) {
      case ADULT_TYPE:
        if (val === -1 && adultsNum === 0) {
          return;
        }
        setAdultsNum(adultsNum + val);
        break;
      case CHILD_TYPE:
        if (val === -1 && chidNum === 0) {
          return;
        }
        setChidNum(chidNum + val);
        break;

      case INFANTS_TYPE:
        if (val === -1 && infantsNum === 0) {
          return;
        }
        setInfantsNum(infantsNum + val);
        break;

      case PET_TYPE:
        if (val === -1 && petNum === 0) {
          return;
        }
        setPetNum(petNum + val);
        break;

      default:
    }
  };

  const renderHeaderSearch = () => {
    if (!activeSearchHeader) {
      return (
        <div
          className="header__search"
          onClick={() => {
            setActvieSearch(!activeSearch);
          }}
        >
          <div className="header__border">
            <button className="btn--def btn--left">Anywhere</button>
            <span className="dot"></span>
            <button className="btn--def btn--middle">Any week</button>
            <span className="dot"></span>
            <span className="search__display">
              <button className="btn--def btn--right header_span">
                Add guests
              </button>
              <span className="search__icon">
                <i className="search__icon-glass fa-solid fa-magnifying-glass"></i>
              </span>
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="header__exp">
          <div className="exp__flex">
            <span className="span_popup-location active ">Stays</span>
            <span>Experiences</span>
          </div>
          <span>Online Experiences</span>
        </div>
      );
    }
  };

  //Search region render
  const renderRegion = () => {
    return regions.map((region) => {
      const { id, content, src } = region;
      return (
        <Col key={id} span={8}>
          <img
            onClick={() => {
              setRegion(content);
              setLocationSearch(content);
            }}
            className="img-fluid"
            src={src}
            alt=""
          />
          <div className="area">{content}</div>
        </Col>
      );
    });
  };

  const renderExtendRegionSearch = () => {
    if (arrSuggestRegion?.length === 0) {
      return (
        <div className="region__container">
          <div className="region__content">
            <h3>Search by region</h3>
            <Row gutter={[16, 16]}>{renderRegion()}</Row>
          </div>
        </div>
      );
    } else {
      return (
        <div className="region__container region__search">
          {renderSuggestRegion()}
        </div>
      );
    }
  };

  const renderSuggestRegion = () => {
    //place/region, country, locality,
    return arrSuggestRegion?.map((region, index) => {
      const { context } = region;
      if (index === 0) {
        let location = getRegionName(context);

        if (location !== locationFirstFind) {
          setLocationFirstFind(location);
        }
      }
      if (region.context !== undefined) {
        return (
          <div
            onClick={() => {
              let location = getRegionName(context);
              setLocationSearch(location);
            }}
            key={"region-" + index}
            className="region__row"
          >
            <div className="location__icon">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div className="region__name">{getRegionName(context)}</div>
          </div>
        );
      }
    });
  };

  const getRegionName = (context) => {
    let regionName = "";
    context?.map((ct, index) => {
      const { id, text } = ct;
      if (!id?.includes("postcode")) {
        regionName += text;
        if (index < context.length - 1) {
          regionName += ", ";
        }
      }
    });
    return regionName;
  };
  const renderExtendSearch = () => {
    //extend region search
    if (activeForm === 0) {
      return (
        <div className="search--extend">{renderExtendRegionSearch()};</div>
      );
    }
    //extend guest search
    if (activeForm === 3) {
      return (
        <div className="search--extend right">
          <div className="guest__container">
            <div className="guest__content">
              <div className="guest__card">
                <div className="card--left">
                  <div className="card__title">Adults</div>
                  <div className="card__subtitle">Ages 13 or above</div>
                </div>
                <div className="card--right">
                  <span
                    onClick={() => {
                      changeNumberGuest(-1, ADULT_TYPE);
                    }}
                    className={`amount--change noselect sub ${
                      adultsNum === 0 ? "disabled" : ""
                    }`}
                  >
                    _
                  </span>
                  <span className="number">{adultsNum}</span>
                  <span
                    onClick={() => {
                      changeNumberGuest(1, ADULT_TYPE);
                    }}
                    className="amount--change noselect"
                  >
                    +
                  </span>
                </div>
              </div>
              <div
                className="guest__card"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="card--left">
                  <div className="card__title">Children</div>
                  <div className="card__subtitle">Ages 2–12</div>
                </div>
                <div className="card--right">
                  <span
                    onClick={() => {
                      changeNumberGuest(-1, CHILD_TYPE);
                    }}
                    className={`amount--change noselect sub ${
                      chidNum === 0 ? "disabled" : ""
                    }`}
                  >
                    _
                  </span>
                  <span className="number">{chidNum}</span>
                  <span
                    onClick={() => {
                      changeNumberGuest(1, CHILD_TYPE);
                    }}
                    className="amount--change noselect"
                  >
                    +
                  </span>
                </div>
              </div>
              <div
                className="guest__card"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="card--left">
                  <div className="card__title">Infants</div>
                  <div className="card__subtitle">Under 2</div>
                </div>
                <div className="card--right">
                  <span
                    onClick={() => {
                      changeNumberGuest(-1, INFANTS_TYPE);
                    }}
                    className={`amount--change noselect sub ${
                      infantsNum === 0 ? "disabled" : ""
                    }`}
                  >
                    _
                  </span>
                  <span className="number">{infantsNum}</span>
                  <span
                    onClick={() => {
                      changeNumberGuest(1, INFANTS_TYPE);
                    }}
                    className="amount--change noselect"
                  >
                    +
                  </span>
                </div>
              </div>
              <div
                className="guest__card"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="card--left">
                  <div className="card__title">Pets</div>
                  <div className="card__subtitle">
                    Bringing a service animal?
                  </div>
                </div>
                <div className="card--right">
                  <span
                    onClick={() => {
                      changeNumberGuest(-1, PET_TYPE);
                    }}
                    className={`amount--change noselect sub ${
                      petNum === 0 ? "disabled" : ""
                    }`}
                  >
                    _
                  </span>
                  <span className="number">{petNum}</span>
                  <span
                    onClick={() => {
                      changeNumberGuest(1, PET_TYPE);
                    }}
                    className="amount--change noselect"
                  >
                    +
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const handleInputRegionChange = (e) => {
    let val = e.target.value;
    setValueInput(e.target.value);
    dispatch(getSuggestionLocation(val));
  };
  const renderSearchForm = () => {
    return (
      <form className="form__search" action="">
        <div className="form__flex" ref={formFlex}>
          <div
            className={`ip__where ${activeForm === 0 ? "active" : ""}`}
            onClick={() => {
              if (activeForm === 0) {
                setActiveForm("");
              } else {
                // set
                refWhere?.current?.focus();
                setActiveForm(0);
              }
              setShowCalendar2(false);
              setShowCalendar1(false);
            }}
          >
            <label className="form__label form__label-where">
              <span>Where</span>

              <input
                id="where"
                onChange={handleInputRegionChange}
                type="text"
                value={value}
                ref={refWhere}
                placeholder={`${
                  region === "" ? "Search destinations" : region
                }`}
              />
            </label>
          </div>
          <div
            className={`checkin ${activeForm === 1 ? "active" : ""}`}
            onClick={() => {
              setActiveForm(1);
              if (activeForm === 1) {
                setActiveForm("");
              }
              setShowCalendar1(!isShowCalendar1);
              if (isShowCalendar1 === false) {
                setShowCalendar2(false);
              }
            }}
          >
            <div className="form__label">
              <label htmlFor="">
                <span>Check in</span>
                <input
                  onChange={() => {}}
                  placeholder="Add dates"
                  value={
                    checkInRequest &&
                    moment(checkInRequest, ["YYYY-MM-DD", "DD-MM-YYYY"]).format(
                      "MMM DD"
                    )
                  }
                  type="text"
                />
              </label>
            </div>
            <span className="header_span"></span>
          </div>
          <div
            className={`checkout ${activeForm === 2 ? "active" : ""}`}
            onClick={() => {
              setActiveForm(2);
              if (activeForm === 2) {
                setActiveForm("");
              }
              if (isShowCalendar2 === false) {
                setShowCalendar1(false);
              }
              setShowCalendar2(!isShowCalendar2);
            }}
          >
            <div className="form__label">
              <label htmlFor="">
                <span>Check Out</span>
                <input
                  onChange={() => {}}
                  placeholder="Add dates"
                  value={
                    checkOutRequest &&
                    moment(checkOutRequest, [
                      "YYYY-MM-DD",
                      "DD-MM-YYYY",
                    ]).format("MMM DD")
                  }
                  type="text"
                />
              </label>
            </div>
          </div>
          <div
            className={`ip__who ${activeForm === 3 ? "active" : ""}`}
            onClick={() => {
              setActiveForm(3);
              if (activeForm === 3) {
                setActiveForm("");
              }
              setShowCalendar1(false);
              setShowCalendar2(false);
            }}
          >
            <div className="search--flex">
              <div className="search__content">
                <div className="form__label">Who</div>
                {renderTotalGuestNumber()}
              </div>
              <div
                className="btn--search"
                onClick={() => {
                  handleSearch();
                }}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
                <span>Search</span>
              </div>
            </div>
          </div>
          <div className="header-popupCalendar">
            {isShowCalendar1 || isShowCalendar2 ? (
              <CalendarBook filterRoom={true} />
            ) : (
              ""
            )}
          </div>
          {renderExtendSearch()}
        </div>
      </form>
    );
  };

  const renderTotalGuestNumber = () => {
    if (totalGuest === 0) {
      return <span className="header_span">Add guests</span>;
    } else if (totalGuest === 1) {
      return <span className="active__guest">{totalGuest} guest</span>;
    } else {
      return <span className="active__guest">{totalGuest} guests</span>;
    }
  };

  return (
    <>
      <div
        ref={ref}
        className={`header ${
          activeSearch ? "active__search" : ""
        } border_around-thin header_responsive`}
      >
        <div className="header__top container" ref={headerWrap}>
          <div
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          >
            <svg fill="currentcolor" className="header_lg-text">
              <path d="M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.55-9.68-7.04-14.48l-.1-.2c-.25-.47-.5-.99-.76-1.47-.32-.57-.63-1.18-1.14-1.76a5.3 5.3 0 00-8.2 0c-.47.58-.82 1.19-1.14 1.76-.25.52-.5 1.03-.76 1.5l-.1.2c-2.45 4.8-4.84 9.68-7.04 14.48l-.06.06c-.22.52-.48 1.06-.73 1.64-.16.35-.32.73-.48 1.15a6.8 6.8 0 007.2 9.23 8.38 8.38 0 003.18-1.1c1.3-.73 2.55-1.79 3.95-3.32 1.4 1.53 2.68 2.59 3.95 3.33A8.38 8.38 0 0022.75 32a6.79 6.79 0 006.75-5.83 5.94 5.94 0 00-.26-3.5zm-14.36 1.66c-1.72-2.2-2.84-4.22-3.22-5.95a5.2 5.2 0 01-.1-1.96c.07-.51.26-.96.52-1.34.6-.87 1.65-1.41 2.8-1.41a3.3 3.3 0 012.8 1.4c.26.4.45.84.51 1.35.1.58.06 1.25-.1 1.96-.38 1.7-1.5 3.74-3.21 5.95zm12.74 1.48a4.76 4.76 0 01-2.9 3.75c-.76.32-1.6.41-2.42.32-.8-.1-1.6-.36-2.42-.84a15.64 15.64 0 01-3.63-3.1c2.1-2.6 3.37-4.97 3.85-7.08.23-1 .26-1.9.16-2.73a5.53 5.53 0 00-.86-2.2 5.36 5.36 0 00-4.49-2.28c-1.85 0-3.5.86-4.5 2.27a5.18 5.18 0 00-.85 2.21c-.13.84-.1 1.77.16 2.73.48 2.11 1.78 4.51 3.85 7.1a14.33 14.33 0 01-3.63 3.12c-.83.48-1.62.73-2.42.83a4.76 4.76 0 01-5.32-4.07c-.1-.8-.03-1.6.29-2.5.1-.32.25-.64.41-1.02.22-.52.48-1.06.73-1.6l.04-.07c2.16-4.77 4.52-9.64 6.97-14.41l.1-.2c.25-.48.5-.99.76-1.47.26-.51.54-1 .9-1.4a3.32 3.32 0 015.09 0c.35.4.64.89.9 1.4.25.48.5 1 .76 1.47l.1.2c2.44 4.77 4.8 9.64 7 14.41l.03.03c.26.52.48 1.1.73 1.6.16.39.32.7.42 1.03.19.9.29 1.7.19 2.5zM41.54 24.12a5.02 5.02 0 01-3.95-1.83 6.55 6.55 0 01-1.6-4.48 6.96 6.96 0 011.66-4.58 5.3 5.3 0 014.08-1.86 4.3 4.3 0 013.7 1.92l.1-1.57h2.92V23.8h-2.93l-.1-1.76a4.52 4.52 0 01-3.88 2.08zm.76-2.88c.58 0 1.09-.16 1.57-.45.44-.32.8-.74 1.08-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.55.45zM53.45 8.46c0 .35-.06.67-.22.93-.16.25-.38.48-.67.64-.29.16-.6.22-.92.22-.32 0-.64-.06-.93-.22a1.84 1.84 0 01-.67-.64 1.82 1.82 0 01-.22-.93c0-.36.07-.68.22-.93.16-.3.39-.48.67-.64.29-.16.6-.23.93-.23a1.84 1.84 0 011.6.86 2 2 0 01.21.94zm-3.4 15.3V11.7h3.18v12.08h-3.19zm11.68-8.9v.04c-.15-.07-.35-.1-.5-.13-.2-.04-.36-.04-.55-.04-.89 0-1.56.26-2 .8-.48.55-.7 1.32-.7 2.31v5.93h-3.19V11.69h2.93l.1 1.83c.32-.64.7-1.12 1.24-1.48a3.1 3.1 0 011.81-.5c.23 0 .45.02.64.06.1.03.16.03.22.06v3.2zm1.28 8.9V6.74h3.18v6.5c.45-.58.96-1.03 1.6-1.38a5.02 5.02 0 016.08 1.31 6.55 6.55 0 011.6 4.49 6.96 6.96 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.1 1.57-2.92.03zm6.15-2.52c.57 0 1.08-.16 1.56-.45.44-.32.8-.74 1.08-1.25.26-.51.38-1.12.38-1.8 0-.67-.12-1.28-.38-1.79a3.75 3.75 0 00-1.08-1.25 2.95 2.95 0 00-3.12 0c-.45.32-.8.74-1.09 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.56.45zm7.51 2.53V11.69h2.93l.1 1.57a3.96 3.96 0 013.54-1.89 4.1 4.1 0 013.82 2.44c.35.76.54 1.7.54 2.75v7.24h-3.19v-6.82c0-.84-.19-1.5-.57-1.99-.38-.48-.9-.74-1.56-.74-.48 0-.9.1-1.27.32-.35.23-.64.52-.86.93a2.7 2.7 0 00-.32 1.35v6.92h-3.16zm12.52 0V6.73h3.19v6.5a4.67 4.67 0 013.73-1.89 5.02 5.02 0 013.95 1.83 6.57 6.57 0 011.59 4.48 6.95 6.95 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.09 1.57-2.93.03zm6.18-2.53c.58 0 1.09-.16 1.56-.45.45-.32.8-.74 1.09-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a3.63 3.63 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.95.45 1.55.45z"></path>
            </svg>
            <svg width="30" height="32" className="header-svg_lg">
              <path
                d="M29.3864 22.7101C29.2429 22.3073 29.0752 21.9176 28.9157 21.5565C28.6701 21.0011 28.4129 20.4446 28.1641 19.9067L28.1444 19.864C25.9255 15.0589 23.5439 10.1881 21.0659 5.38701L20.9607 5.18316C20.7079 4.69289 20.4466 4.18596 20.1784 3.68786C19.8604 3.0575 19.4745 2.4636 19.0276 1.91668C18.5245 1.31651 17.8956 0.833822 17.1853 0.502654C16.475 0.171486 15.7005 -9.83959e-05 14.9165 4.23317e-08C14.1325 9.84805e-05 13.3581 0.171877 12.6478 0.503224C11.9376 0.834571 11.3088 1.31742 10.8059 1.91771C10.3595 2.46476 9.97383 3.05853 9.65572 3.68858C9.38521 4.19115 9.12145 4.70278 8.8664 5.19757L8.76872 5.38696C6.29061 10.1884 3.90903 15.0592 1.69015 19.8639L1.65782 19.9338C1.41334 20.463 1.16057 21.0102 0.919073 21.5563C0.75949 21.9171 0.592009 22.3065 0.448355 22.7103C0.0369063 23.8104 -0.094204 24.9953 0.0668098 26.1585C0.237562 27.334 0.713008 28.4447 1.44606 29.3804C2.17911 30.3161 3.14434 31.0444 4.24614 31.4932C5.07835 31.8299 5.96818 32.002 6.86616 32C7.14824 31.9999 7.43008 31.9835 7.71027 31.9509C8.846 31.8062 9.94136 31.4366 10.9321 30.8639C12.2317 30.1338 13.5152 29.0638 14.9173 27.5348C16.3194 29.0638 17.6029 30.1338 18.9025 30.8639C19.8932 31.4367 20.9886 31.8062 22.1243 31.9509C22.4045 31.9835 22.6864 31.9999 22.9685 32C23.8664 32.002 24.7561 31.8299 25.5883 31.4932C26.6901 31.0444 27.6554 30.3161 28.3885 29.3804C29.1216 28.4447 29.5971 27.3341 29.7679 26.1585C29.9287 24.9952 29.7976 23.8103 29.3864 22.7101ZM14.9173 24.377C13.1816 22.1769 12.0678 20.1338 11.677 18.421C11.5169 17.7792 11.4791 17.1131 11.5656 16.4573C11.6339 15.9766 11.8105 15.5176 12.0821 15.1148C12.4163 14.6814 12.8458 14.3304 13.3374 14.0889C13.829 13.8475 14.3696 13.7219 14.9175 13.7219C15.4655 13.722 16.006 13.8476 16.4976 14.0892C16.9892 14.3307 17.4186 14.6817 17.7528 15.1151C18.0244 15.5181 18.201 15.9771 18.2693 16.4579C18.3556 17.114 18.3177 17.7803 18.1573 18.4223C17.7661 20.1349 16.6526 22.1774 14.9173 24.377ZM27.7406 25.8689C27.6212 26.6908 27.2887 27.4674 26.7762 28.1216C26.2636 28.7759 25.5887 29.2852 24.8183 29.599C24.0393 29.9111 23.1939 30.0217 22.3607 29.9205C21.4946 29.8089 20.6599 29.5239 19.9069 29.0824C18.7501 28.4325 17.5791 27.4348 16.2614 25.9712C18.3591 23.3846 19.669 21.0005 20.154 18.877C20.3723 17.984 20.4196 17.0579 20.2935 16.1475C20.1791 15.3632 19.8879 14.615 19.4419 13.9593C18.9194 13.2519 18.2378 12.6768 17.452 12.2805C16.6661 11.8842 15.798 11.6777 14.9175 11.6777C14.0371 11.6777 13.1689 11.8841 12.383 12.2803C11.5971 12.6765 10.9155 13.2515 10.393 13.9589C9.94707 14.6144 9.65591 15.3624 9.5414 16.1465C9.41524 17.0566 9.4623 17.9822 9.68011 18.8749C10.1648 20.9993 11.4748 23.384 13.5732 25.9714C12.2555 27.4348 11.0845 28.4325 9.92769 29.0825C9.17468 29.5239 8.34007 29.809 7.47395 29.9205C6.64065 30.0217 5.79525 29.9111 5.0162 29.599C4.24581 29.2852 3.57092 28.7759 3.05838 28.1217C2.54585 27.4674 2.21345 26.6908 2.09411 25.8689C1.97932 25.0334 2.07701 24.1825 2.37818 23.3946C2.49266 23.0728 2.62663 22.757 2.7926 22.3818C3.0274 21.851 3.27657 21.3115 3.51759 20.7898L3.54996 20.7197C5.75643 15.9419 8.12481 11.0982 10.5894 6.32294L10.6875 6.13283C10.9384 5.64601 11.1979 5.14267 11.4597 4.6563C11.7101 4.15501 12.0132 3.68171 12.3639 3.2444C12.6746 2.86903 13.0646 2.56681 13.5059 2.35934C13.9473 2.15186 14.4291 2.04426 14.9169 2.04422C15.4047 2.04418 15.8866 2.15171 16.3279 2.35911C16.7693 2.56651 17.1593 2.86867 17.4701 3.24399C17.821 3.68097 18.1242 4.15411 18.3744 4.65538C18.6338 5.13742 18.891 5.63623 19.1398 6.11858L19.2452 6.32315C21.7097 11.0979 24.078 15.9415 26.2847 20.7201L26.3046 20.7631C26.5498 21.2936 26.8033 21.8419 27.042 22.382C27.2082 22.7577 27.3424 23.0738 27.4566 23.3944C27.7576 24.1824 27.8553 25.0333 27.7406 25.8689Z"
                fill="currentcolor"
              ></path>
            </svg>
          </div>
          {renderHeaderSearch()}
          <FormUser />
          {renderSearchForm()}
        </div>
      </div>
      <div
        className={`bg__overlay ${activeSearch ? "d-block" : "d-none"}`}
      ></div>
    </>
  );
}
