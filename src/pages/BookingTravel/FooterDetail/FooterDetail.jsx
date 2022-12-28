import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListCommentAPI } from "../../../redux/actions/CommentAction";
import { getUserCommentInfo } from "../../../redux/actions/FormAction";
import { useFooter } from "./useFooter";
import moment from "moment";
export default function FooterDetail() {
  const { arrListComment, starComment } = useSelector(
    (state) => state.CommentReducer
  );
  const { inforRoom } = useSelector((state) => state.LocationRoomReducer);
  const { inforLocation } = useSelector((state) => state.LocationRoomReducer);
  const { nameList } = useFooter();
  const renderComments = () => {
    return (
      <div className="comment border-bottom">
        <div className="row">
          {arrListComment.map((cmt, i) => {
            let random = Math.floor(Math.random() * nameList.length);
            let randomUser = nameList[random];
            let randomImg = Math.floor(Math.random() * 50);

            return (
              <div className="col-12 col-sm-12 col-xl-6" key={i}>
                <div className="user_comment">
                  <div className="user_comment-header">
                    <img
                      src={`https://i.pravatar.cc/50?img=${randomImg}`}
                      alt=""
                    />
                    <div className="user_comment-name">
                      <p>{randomUser}</p>
                      <p>
                        {moment(cmt.ngayBinhLuan, "MMM YYYY").format(
                          "MMM YYYY"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="user_comment-content">
                    <p>{cmt.noiDung}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  const renderSuperHost = () => {
    let random = Math.floor(Math.random() * nameList.length);
    let randomUser = nameList[random];
    let randomImg = Math.floor(Math.random() * 50);
    return (
      <>
        <div className="super_host-header">
          <img src={`https://i.pravatar.cc/50?img=${randomImg}`} alt="" />
          <div className="super_host-name">
            <p>Hosted by {randomUser}</p>
            <span>Joined in October 2012</span>
          </div>
        </div>
        <div className="super_host-content">
          <div className="row">
            <div className="col-6">
              <p>We love our country Sri Lanka</p>
              <p>
                Galawatta is our home! we like to make our guest as happy as we
                can.
              </p>
              <p>We are like ONE!</p>
              <h6>During your stay</h6>
              <p>
                As my family is living in a house on the neighbour property help
                or company is only a few steps away.
              </p>
            </div>
            <div className="col-6">
              <p>Language: English</p>
              <p>Response rate: 100%</p>
              <p>Response time: within a few hours</p>
              <div className="super_host-protect">
                <i className="fa-solid fa-shield"></i>
                <p>
                  To protect your payment, never transfer money or communicate
                  outside of the Airbnb website or app.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const renderThinkToKnow = () => {
    return (
      <>
        <h3>Things to know</h3>
        <div className="row">
          <div className="col-4">
            <ul className="thing-list">
              <li>House rules</li>
              <li>Check-in: 3:00 PM - 8:00 PM</li>
              <li>Checkout before 11:00 AM</li>
              <li>{inforRoom.khach} guests maximum</li>
            </ul>
          </div>
          <div className="col-4">
            <ul className="thing-list">
              <li>Safety & property</li>
              <li>No smoke alarm</li>
              <li>Security camera/recording device</li>
              <li>Pool/hot tub without a gate or lock</li>
            </ul>
          </div>
          <div className="col-4">
            <ul className="thing-list">
              <li>Cancellation policy</li>
              <li>
                Partial refund: Get back 50% of every night that remains 24
                hours after you cancel. No refund of nights you spent or the
                service fee.
              </li>
              <li>
                Review the Host’s full cancellation policy which applies even if
                you cancel for illness or disruptions caused by COVID-19.
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };
  const renderFooterLast = () => {
    return (
      <>
        <div className="row">
          <div className="col-3">
            <ul className="thing-list">
              <li>Support</li>
              <li>Help Center</li>
              <li>AirCover</li>
              <li>Supporting people with disabilities</li>
              <li>Cancellation options</li>
              <li>Our COVID-19 Response</li>
              <li>Report a neighborhood concern</li>
            </ul>
          </div>
          <div className="col-3">
            <ul className="thing-list">
              <li>Community</li>
              <li>Airbnb.org: disaster relief housing</li>
              <li>Combating discrimination</li>
            </ul>
          </div>
          <div className="col-3">
            <ul className="thing-list">
              <li>Hosting</li>
              <li>Airbnb your home</li>
              <li>AirCover for Hosts</li>
              <li>Explore hosting resources</li>
              <li>Visit our community forum</li>
              <li>How to host responsibly</li>
            </ul>
          </div>
          <div className="col-3">
            <ul className="thing-list">
              <li>Airbnb</li>
              <li>Newsroom</li>
              <li>Learn about new features</li>
              <li>Letter from our founders</li>
              <li>Careers</li>
              <li>Investors</li>
              <li>Gift cards</li>
            </ul>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="footerComment" id="reviews">
      <div className="star_comment">
        <span>
          <i className="fa-solid fa-star"></i>
          {starComment?.star} -
        </span>
        <span> {starComment?.total} reviews</span>
      </div>
      <div className="star_detail ">
        <div className="row">
          <div className="star_detail-wrap col-6">
            <div className="star_detail-item">
              <span className="star_detail-title">Cleanliness</span>
              <div className="wrap_star-number">
                <span className="star_detail-number" aria-hidden="true">
                  4.8
                </span>
              </div>
            </div>
          </div>
          <div className="star_detail-wrap col-6">
            <div className="star_detail-item">
              <span className="star_detail-title">Accuracy</span>
              <div className="wrap_star-number">
                <span className="star_detail-number" aria-hidden="true">
                  5.0
                </span>
              </div>
            </div>
          </div>
          <div className="star_detail-wrap col-6">
            <div className="star_detail-item">
              <span className="star_detail-title">Communication</span>
              <div className="wrap_star-number">
                <span className="star_detail-number" aria-hidden="true">
                  5.0
                </span>
              </div>
            </div>
          </div>
          <div className="star_detail-wrap col-6">
            <div className="star_detail-item">
              <span className="star_detail-title">Location</span>
              <div className="wrap_star-number">
                <span className="star_detail-number" aria-hidden="true">
                  4.9
                </span>
              </div>
            </div>
          </div>
          <div className="star_detail-wrap col-6">
            <div className="star_detail-item">
              <span className="star_detail-title">Check-in</span>
              <div className="wrap_star-number">
                <span className="star_detail-number" aria-hidden="true">
                  5.0
                </span>
              </div>
            </div>
          </div>
          <div className="star_detail-wrap col-6">
            <div className="star_detail-item">
              <span className="star_detail-title">Value</span>
              <div className="wrap_star-number">
                <span className="star_detail-number" aria-hidden="true">
                  4.9
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderComments()}
      <div className="map" id="locations">
        <h3>Where you’ll be</h3>
        <p>
          {inforLocation.tenViTri}, {inforLocation.tinhThanh},
          {inforLocation.quocGia}
        </p>
      </div>
      <div className="super_host border-bottom">{renderSuperHost()}</div>
      <div className="thing-toKnow border-bottom">{renderThinkToKnow()}</div>
      <div className="footer_last border-bottom">{renderFooterLast()}</div>
      <div className="footer_desc">
        <ul className="footer_desc-list">
          <li className="footer_desc-year">© 2022 Airbnb, Inc.</li>
          <li>
            <span>·</span>Privacy
          </li>
          <li>
            <span>·</span>Terms
          </li>
          <li>
            <span>·</span>Sitemap
          </li>
        </ul>
        <ul className="footer_desc-list footer_desc-right">
          <li>
            <i className="fa-solid fa-globe"></i>
            English (US)
          </li>
          <li>£ GBP</li>
          <li>
            <i className="fa-brands fa-facebook-f"></i>
          </li>
          <li>
            <i className="fa-brands fa-twitter"></i>
          </li>
          <li>
            <i className="fa-brands fa-square-instagram"></i>
          </li>
        </ul>
      </div>
    </div>
  );
}
