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
import useSelection from "antd/lib/table/hooks/useSelection";
import context from "react-bootstrap/esm/AccordionContext";
import MapContainer from "../MapConponent/MapContainer";
import CalendarBook from "../../pages/BookingTravel/CalendarBook/CalendarBook";
import { openModal } from "../../redux/reducer/ModalReducer";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
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
  const [keyword, setKeyword] = useState("");
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
  const { locationList } = useSelector((state) => state.LocationRoomReducer);
  // console.log(locationList)
  const [locationSearch, setLocationSearch] = useState("");
  // Handle location
  const [value, setValueInput] = useState("");
  const [locationFirstFind, setLocationFirstFind] = useState("");
  // Check location when click map header

  const handleCheckLocation = () => {};
  const handleSearch = () => {
    let locationValue = "";
    if (locationSearch) {
      locationValue = locationSearch;
    } else {
      locationValue = locationFirstFind;
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
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="header__exp">
          <div className="exp__flex">
            <span className="active">Stays</span>
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
  // console.log(locationSearch);

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
      // console.log(ct);
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
              <div className="guest__card">
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
              <div className="guest__card">
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
              <div className="guest__card">
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
        <div className="form__flex">
          <div
            className={`ip__where ${activeForm === 0 ? "active" : ""}`}
            onClick={() => {
              setShowCalendar1(false);
              setShowCalendar2(false);

              if (activeForm === 0) {
                setActiveForm("");
              } else {
                // set
                refWhere?.current?.focus();
                console.log(refWhere);
                setActiveForm(0);
              }
            }}
          >
            <label
              className="form__label form__label-where"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <span>Where</span>

              <input
                id="#where"
                onClick={() => {
                  setActiveForm(0);
                }}
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
            <div className="form__label">Check in</div>
            <span className="header_span">Add dates</span>
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
            <div className="form__label">Check Out</div>
            <span className="header_span">Add dates</span>
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
              <div className="btn--search">
                <i className="fa-solid fa-magnifying-glass"></i>
                <span
                  onClick={() => {
                    handleSearch();
                  }}
                >
                  Search
                </span>
              </div>
            </div>
          </div>
          <div className="header-popupCalendar">
            {isShowCalendar1 || isShowCalendar2 ? <CalendarBook /> : ""}
          </div>
        </div>
        {renderExtendSearch()}
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
        className={`header ${activeSearch ? "active__search" : ""}`}
      >
        <div className="header__top container">
          <div
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          >
            <svg fill="currentcolor">
              <path d="M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.55-9.68-7.04-14.48l-.1-.2c-.25-.47-.5-.99-.76-1.47-.32-.57-.63-1.18-1.14-1.76a5.3 5.3 0 00-8.2 0c-.47.58-.82 1.19-1.14 1.76-.25.52-.5 1.03-.76 1.5l-.1.2c-2.45 4.8-4.84 9.68-7.04 14.48l-.06.06c-.22.52-.48 1.06-.73 1.64-.16.35-.32.73-.48 1.15a6.8 6.8 0 007.2 9.23 8.38 8.38 0 003.18-1.1c1.3-.73 2.55-1.79 3.95-3.32 1.4 1.53 2.68 2.59 3.95 3.33A8.38 8.38 0 0022.75 32a6.79 6.79 0 006.75-5.83 5.94 5.94 0 00-.26-3.5zm-14.36 1.66c-1.72-2.2-2.84-4.22-3.22-5.95a5.2 5.2 0 01-.1-1.96c.07-.51.26-.96.52-1.34.6-.87 1.65-1.41 2.8-1.41a3.3 3.3 0 012.8 1.4c.26.4.45.84.51 1.35.1.58.06 1.25-.1 1.96-.38 1.7-1.5 3.74-3.21 5.95zm12.74 1.48a4.76 4.76 0 01-2.9 3.75c-.76.32-1.6.41-2.42.32-.8-.1-1.6-.36-2.42-.84a15.64 15.64 0 01-3.63-3.1c2.1-2.6 3.37-4.97 3.85-7.08.23-1 .26-1.9.16-2.73a5.53 5.53 0 00-.86-2.2 5.36 5.36 0 00-4.49-2.28c-1.85 0-3.5.86-4.5 2.27a5.18 5.18 0 00-.85 2.21c-.13.84-.1 1.77.16 2.73.48 2.11 1.78 4.51 3.85 7.1a14.33 14.33 0 01-3.63 3.12c-.83.48-1.62.73-2.42.83a4.76 4.76 0 01-5.32-4.07c-.1-.8-.03-1.6.29-2.5.1-.32.25-.64.41-1.02.22-.52.48-1.06.73-1.6l.04-.07c2.16-4.77 4.52-9.64 6.97-14.41l.1-.2c.25-.48.5-.99.76-1.47.26-.51.54-1 .9-1.4a3.32 3.32 0 015.09 0c.35.4.64.89.9 1.4.25.48.5 1 .76 1.47l.1.2c2.44 4.77 4.8 9.64 7 14.41l.03.03c.26.52.48 1.1.73 1.6.16.39.32.7.42 1.03.19.9.29 1.7.19 2.5zM41.54 24.12a5.02 5.02 0 01-3.95-1.83 6.55 6.55 0 01-1.6-4.48 6.96 6.96 0 011.66-4.58 5.3 5.3 0 014.08-1.86 4.3 4.3 0 013.7 1.92l.1-1.57h2.92V23.8h-2.93l-.1-1.76a4.52 4.52 0 01-3.88 2.08zm.76-2.88c.58 0 1.09-.16 1.57-.45.44-.32.8-.74 1.08-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.55.45zM53.45 8.46c0 .35-.06.67-.22.93-.16.25-.38.48-.67.64-.29.16-.6.22-.92.22-.32 0-.64-.06-.93-.22a1.84 1.84 0 01-.67-.64 1.82 1.82 0 01-.22-.93c0-.36.07-.68.22-.93.16-.3.39-.48.67-.64.29-.16.6-.23.93-.23a1.84 1.84 0 011.6.86 2 2 0 01.21.94zm-3.4 15.3V11.7h3.18v12.08h-3.19zm11.68-8.9v.04c-.15-.07-.35-.1-.5-.13-.2-.04-.36-.04-.55-.04-.89 0-1.56.26-2 .8-.48.55-.7 1.32-.7 2.31v5.93h-3.19V11.69h2.93l.1 1.83c.32-.64.7-1.12 1.24-1.48a3.1 3.1 0 011.81-.5c.23 0 .45.02.64.06.1.03.16.03.22.06v3.2zm1.28 8.9V6.74h3.18v6.5c.45-.58.96-1.03 1.6-1.38a5.02 5.02 0 016.08 1.31 6.55 6.55 0 011.6 4.49 6.96 6.96 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.1 1.57-2.92.03zm6.15-2.52c.57 0 1.08-.16 1.56-.45.44-.32.8-.74 1.08-1.25.26-.51.38-1.12.38-1.8 0-.67-.12-1.28-.38-1.79a3.75 3.75 0 00-1.08-1.25 2.95 2.95 0 00-3.12 0c-.45.32-.8.74-1.09 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.56.45zm7.51 2.53V11.69h2.93l.1 1.57a3.96 3.96 0 013.54-1.89 4.1 4.1 0 013.82 2.44c.35.76.54 1.7.54 2.75v7.24h-3.19v-6.82c0-.84-.19-1.5-.57-1.99-.38-.48-.9-.74-1.56-.74-.48 0-.9.1-1.27.32-.35.23-.64.52-.86.93a2.7 2.7 0 00-.32 1.35v6.92h-3.16zm12.52 0V6.73h3.19v6.5a4.67 4.67 0 013.73-1.89 5.02 5.02 0 013.95 1.83 6.57 6.57 0 011.59 4.48 6.95 6.95 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.09 1.57-2.93.03zm6.18-2.53c.58 0 1.09-.16 1.56-.45.45-.32.8-.74 1.09-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a3.63 3.63 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.95.45 1.55.45z"></path>
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
