import React from "react";

export default function ContentPolicy() {
  return (
    <div className="container-md">
      <div className="detail-room_policy mt-4">
        <div className="pb-4 border-bottom">
          <img
            src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
            className="img-fluid"
            alt=""
          />
          <p>
            AirCover is comprehensive protection included for free with every
            booking.
          </p>
        </div>
        <div className="row mt-4 mb-4">
          <div className="col-12">
            <div className="row">
              <div className="col-12 col-md-6">
                <h4>Booking Protection Guarantee</h4>
                <p>
                  In the unlikely event that a Host needs to cancel your booking
                  within 30 days of check-in, we’ll find you a similar or better
                  home or we’ll refund you.
                </p>
              </div>
              <div className="col-12 col-md-6">
                <h4>Get-What-You-Booked Guarantee</h4>
                <p>
                  If at any time during your stay you find your listing isn't as
                  advertised – for example, the refrigerator stops working and
                  your Host can’t easily fix it, or it has fewer bedrooms than
                  listed – you'll have three days to report it and we’ll find
                  you a similar or better home, or we’ll refund you.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-12 col-md-6">
                <h4>Check-In Guarantee</h4>
                <p>
                  If you can’t check into your home and the Host cannot resolve
                  the issue, we’ll find you a similar or better home for the
                  length of your original stay or we’ll refund you.
                </p>
              </div>
              <div className="col-12 col-md-6">
                <h4>24-hour Safety Line</h4>
                <p>
                  If you ever feel unsafe, you’ll get priority access to
                  specially trained safety agents, day or night.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
